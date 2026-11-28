import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { commsDb } from '../config/prisma';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import { ok, fail } from '../utils/response';

/**
 * Website blog. ADMIN writes posts in the portal (/blog); the public site reads PUBLISHED posts
 * (/public/blog). Content is plain text with light markdown (## headings, - bullets, **bold**, links),
 * rendered by the frontend as React elements — never as raw HTML.
 */

const SITE = 'https://realmoneygroups.in';
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugify = (text: string) =>
  text.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 150) || 'post';

const readMinutes = (content: string) => Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 200));

/** First paragraph of the content, for posts without an excerpt. */
const autoExcerpt = (content: string) => {
  const para = content.split(/\n\s*\n/).map(p => p.trim()).find(p => p && !/^(#|-|\*|\d+\.|>)/.test(p)) ?? '';
  const plain = para.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[(.+?)\]\((.+?)\)/g, '$1').replace(/\s+/g, ' ');
  return plain.length > 220 ? `${plain.slice(0, 217).trimEnd()}…` : plain;
};

async function uniqueSlug(base: string, exceptId?: string) {
  let slug = base;
  for (let i = 2; ; i++) {
    const clash = await commsDb.blogPost.findUnique({ where: { slug }, select: { id: true } });
    if (!clash || clash.id === exceptId) return slug;
    slug = `${base}-${i}`.slice(0, 160);
  }
}

const summary = (p: { slug: string; title: string; excerpt: string | null; content: string; authorName: string | null; publishedAt: Date | null }) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt || autoExcerpt(p.content),
  authorName: p.authorName,
  publishedAt: p.publishedAt,
  readMinutes: readMinutes(p.content),
});

const xmlEscape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ═══ Public ════════════════════════════════════════════════════════════════════
export const publicBlogRouter = Router();

// GET /public/blog?page=0&size=12 — published posts, newest first
publicBlogRouter.get('/', async (req: Request, res: Response) => {
  const page = Math.max(0, parseInt(String(req.query.page ?? '0'), 10) || 0);
  const size = Math.min(50, Math.max(1, parseInt(String(req.query.size ?? '12'), 10) || 12));
  const where = { status: 'PUBLISHED' };
  const [rows, total] = await Promise.all([
    commsDb.blogPost.findMany({ where, orderBy: { publishedAt: 'desc' }, skip: page * size, take: size }),
    commsDb.blogPost.count({ where }),
  ]);
  res.setHeader('Cache-Control', 'no-cache');   // always fresh: a post must show the moment it is published
  res.json(ok('Blog posts', { items: rows.map(summary), total, page, size }));
});

// GET /public/blog/sitemap.xml — served to search engines as /sitemap-blog.xml (nginx)
publicBlogRouter.get('/sitemap.xml', async (_req: Request, res: Response) => {
  const posts = await commsDb.blogPost.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true }, orderBy: { publishedAt: 'desc' } });
  const urls = [
    `  <url><loc>${SITE}/blog</loc></url>`,
    ...posts.map(p => `  <url><loc>${SITE}/blog/${xmlEscape(p.slug)}</loc><lastmod>${p.updatedAt.toISOString().slice(0, 10)}</lastmod></url>`),
  ];
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=600');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
});

// GET /public/blog/:slug — one published post
publicBlogRouter.get('/:slug', async (req: Request, res: Response) => {
  const post = await commsDb.blogPost.findUnique({ where: { slug: req.params.slug } });
  if (!post || post.status !== 'PUBLISHED') { res.status(404).json(fail('Post not found')); return; }
  res.setHeader('Cache-Control', 'no-cache');   // always fresh: a post must show the moment it is published
  res.json(ok('Blog post', { ...summary(post), content: post.content, updatedAt: post.updatedAt }));
});

// ═══ Admin ═════════════════════════════════════════════════════════════════════
const router = Router();
router.use(authenticate);
router.use(requireRoles('ADMIN'));

const postSchema = z.object({
  title: z.string().trim().min(3, 'Title is too short').max(200),
  slug: z.string().trim().toLowerCase().max(150).regex(SLUG_RE, 'Slug can use only a-z, 0-9 and hyphens').optional().or(z.literal('')),
  excerpt: z.string().trim().max(400).optional().or(z.literal('')),
  content: z.string().trim().min(20, 'Write at least a few sentences').max(200_000),
  authorName: z.string().trim().max(120).optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

// GET /blog — every post (drafts too), newest first
router.get('/', async (_req: Request, res: Response) => {
  const rows = await commsDb.blogPost.findMany({ orderBy: { updatedAt: 'desc' }, take: 500 });
  res.json(ok('Blog posts', rows.map(p => ({ ...p, readMinutes: readMinutes(p.content) }))));
});

router.get('/:id', async (req: Request, res: Response) => {
  const post = await commsDb.blogPost.findUnique({ where: { id: req.params.id } });
  if (!post) { res.status(404).json(fail('Post not found')); return; }
  res.json(ok('Blog post', post));
});

// POST /blog — create
router.post('/', async (req: Request, res: Response) => {
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  const d = parsed.data;
  const now = new Date();
  const post = await commsDb.blogPost.create({
    data: {
      id: randomUUID(),
      slug: await uniqueSlug(d.slug || slugify(d.title)),
      title: d.title,
      excerpt: d.excerpt || null,
      content: d.content,
      authorName: d.authorName || null,
      status: d.status,
      publishedAt: d.status === 'PUBLISHED' ? now : null,
      createdBy: req.user!.email,
    },
  });
  res.status(201).json(ok('Post created', post));
});

// PUT /blog/:id — update (publishing for the first time stamps publishedAt)
router.put('/:id', async (req: Request, res: Response) => {
  const existing = await commsDb.blogPost.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json(fail('Post not found')); return; }
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json(fail(parsed.error.errors[0].message)); return; }
  const d = parsed.data;
  const post = await commsDb.blogPost.update({
    where: { id: existing.id },
    data: {
      slug: await uniqueSlug(d.slug || existing.slug, existing.id),
      title: d.title,
      excerpt: d.excerpt || null,
      content: d.content,
      authorName: d.authorName || null,
      status: d.status,
      publishedAt: d.status === 'PUBLISHED' ? (existing.publishedAt ?? new Date()) : existing.publishedAt,
    },
  });
  res.json(ok('Post saved', post));
});

router.delete('/:id', async (req: Request, res: Response) => {
  const existing = await commsDb.blogPost.findUnique({ where: { id: req.params.id }, select: { id: true } });
  if (!existing) { res.status(404).json(fail('Post not found')); return; }
  await commsDb.blogPost.delete({ where: { id: existing.id } });
  res.json(ok('Post deleted', null));
});

export default router;
