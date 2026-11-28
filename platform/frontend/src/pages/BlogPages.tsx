import React, { useEffect, useState } from 'react';
import { ConfigProvider, App as AntdApp, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Navbar from '../features/landing/components/Navbar';
import Footer from '../features/landing/components/Footer';
import WhatsAppFloat from '../features/landing/components/WhatsAppFloat';
import { C, DISPLAY, SANS } from '../features/landing/theme';
import { landingTheme } from './LandingPage';
import { usePageMeta } from '../shared/hooks/usePageMeta';
import { BlogContent } from '../shared/components/BlogContent';
import '../features/landing/styles/landing.css';

interface PostSummary { slug: string; title: string; excerpt: string; authorName: string | null; publishedAt: string | null; readMinutes: number }
interface Post extends PostSummary { content: string; updatedAt: string }

const fmtDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '');

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ConfigProvider theme={landingTheme}>
    <AntdApp>
      <div style={{ minHeight: '100vh', background: C.ivory, fontFamily: SANS, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </AntdApp>
  </ConfigProvider>
);

const Header: React.FC<{ eyebrow: string; title: React.ReactNode; sub?: React.ReactNode }> = ({ eyebrow, title, sub }) => (
  <section style={{ background: `radial-gradient(ellipse 60% 70% at 85% 50%, ${C.navySoft} 0%, ${C.midnight} 65%)`, padding: 'clamp(48px, 7vw, 88px) 0' }}>
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>
      <p style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>{eyebrow}</p>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(34px, 4.6vw, 56px)', lineHeight: 1.08, color: C.onDark, margin: '16px 0 0' }}>{title}</h1>
      {sub && <div style={{ fontSize: 16, lineHeight: 1.7, color: C.onDarkDim, margin: '16px 0 0' }}>{sub}</div>}
    </div>
  </section>
);

const Meta: React.FC<{ post: PostSummary; light?: boolean }> = ({ post, light }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, fontSize: 13, color: light ? C.onDarkDim : C.muted }}>
    {post.publishedAt && <span>{fmtDate(post.publishedAt)}</span>}
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Clock size={13} /> {post.readMinutes} min read</span>
    {post.authorName && <span>By {post.authorName}</span>}
  </div>
);

/** /blog — published posts, newest first. */
export const BlogListPage: React.FC = () => {
  usePageMeta({
    title: 'Blog | Personal Loans, Credit Score & CIBIL Guides — Real Money',
    description: 'Plain-language guides on personal loans, credit scores, CIBIL reports and borrowing safely, from the Real Money team in Jaipur.',
    path: '/blog',
  });
  const [posts, setPosts] = useState<PostSummary[] | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const SIZE = 12;

  useEffect(() => {
    axios.get('/api/public/blog', { params: { page, size: SIZE } })
      .then(r => { setPosts(prev => (page === 0 ? r.data.data.items : [...(prev ?? []), ...r.data.data.items])); setTotal(r.data.data.total); })
      .catch(() => setError(true));
  }, [page]);

  return (
    <Shell>
      <Header eyebrow="Real Money blog" title="Guides for smarter borrowing" sub="Personal loans, credit scores and CIBIL reports — explained simply." />
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) 24px' }}>
        {posts === null && !error && <div style={{ textAlign: 'center', padding: 60 }}><Spin /></div>}
        {error && <p style={{ color: C.muted, textAlign: 'center' }}>The blog could not be loaded. Please try again shortly.</p>}
        {posts && posts.length === 0 && <p style={{ color: C.muted, textAlign: 'center', fontSize: 16 }}>No posts yet — check back soon.</p>}
        {posts && posts.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {posts.map(p => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, background: C.white, border: `1px solid ${C.line}`, borderTop: `3px solid ${C.gold}`, padding: 26, textDecoration: 'none' }}>
                <Meta post={p} />
                <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 25, lineHeight: 1.2, color: C.navy, margin: 0 }}>{p.title}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: C.ink, margin: 0, flex: 1 }}>{p.excerpt}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.goldDeep }}>
                  Read more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        )}
        {posts && posts.length < total && (
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button className="lp-btn lp-btn-gold" style={{ height: 46, padding: '0 28px' }} onClick={() => setPage(p => p + 1)}>Load more</button>
          </div>
        )}
      </section>
    </Shell>
  );
};

/** /blog/:slug — one post. */
export const BlogPostPage: React.FC = () => {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'missing' | 'error'>('loading');

  useEffect(() => {
    setState('loading');
    axios.get(`/api/public/blog/${encodeURIComponent(slug)}`)
      .then(r => { setPost(r.data.data); setState('ok'); window.scrollTo(0, 0); })
      .catch(err => setState(err?.response?.status === 404 ? 'missing' : 'error'));
  }, [slug]);

  usePageMeta({
    title: post ? `${post.title} | Real Money Blog` : 'Real Money Blog',
    description: post?.excerpt,
    path: `/blog/${slug}`,
  });

  return (
    <Shell>
      {state === 'loading' && <div style={{ textAlign: 'center', padding: 120 }}><Spin /></div>}
      {(state === 'missing' || state === 'error') && (
        <>
          <Header eyebrow="Real Money blog" title={state === 'missing' ? 'Post not found' : 'Something went wrong'} sub={state === 'missing' ? 'This post may have been moved or unpublished.' : 'Please try again shortly.'} />
          <div style={{ textAlign: 'center', padding: 48 }}><Link to="/blog" style={{ color: C.goldDeep, fontWeight: 600 }}>← All posts</Link></div>
        </>
      )}
      {state === 'ok' && post && (
        <article>
          <Header eyebrow="Real Money blog" title={post.title} sub={<Meta post={post} light />} />
          <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(36px, 6vw, 64px) 24px' }}>
            <BlogContent content={post.content} />
            <div style={{ marginTop: 40, padding: '24px 26px', background: C.parchment, borderLeft: `3px solid ${C.gold}` }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 600, color: C.navy }}>Looking for a personal loan?</div>
              <p style={{ fontSize: 15, color: C.ink, margin: '6px 0 16px' }}>Check your credit score free, then compare offers from 50+ banks and NBFCs with one application.</p>
              <Link to="/#credit-report" className="lp-btn lp-btn-gold" style={{ height: 44, padding: '0 22px', display: 'inline-flex', alignItems: 'center' }}>Check my credit score</Link>
            </div>
            <div style={{ marginTop: 32 }}>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.goldDeep, fontWeight: 600, textDecoration: 'none' }}><ArrowLeft size={15} /> All posts</Link>
            </div>
          </div>
        </article>
      )}
    </Shell>
  );
};
