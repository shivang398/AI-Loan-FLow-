import React, { useCallback, useEffect, useState } from 'react';
import { App, Button, Drawer, Form, Input, Segmented, Table, Tag, Tabs, Popconfirm, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExternalLink, FileText, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import api from '../../../shared/services/apiClient';
import { BlogContent } from '../../../shared/components/BlogContent';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const MUTED = '#7A92B5';
const BORDER = '#D4DCE8';

interface BlogPost {
  id: string; slug: string; title: string; excerpt: string | null; content: string;
  status: 'DRAFT' | 'PUBLISHED'; authorName: string | null; publishedAt: string | null;
  createdAt: string; updatedAt: string; readMinutes?: number;
}
interface PostForm { title: string; slug?: string; excerpt?: string; authorName?: string; content: string; status: 'DRAFT' | 'PUBLISHED' }

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—');
const slugify = (t: string) => t.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 150);

const FORMAT_HELP = `## Heading            → section heading
- point / * point     → bullet list
1. step               → numbered list
**bold text**         → bold
[link text](https://…) or [text](/blog/…) → link
> quote               → highlighted quote
(blank line)          → new paragraph`;

const STARTER = `Your credit score is a three-digit number between 300 and 900 that lenders check before approving a loan.

## Why it matters
- A score above 750 usually gets faster approvals and lower interest rates
- Late EMIs and high credit-card use pull the score down

## How to improve it
1. Pay every EMI and card bill on time
2. Keep credit-card use under 30% of the limit
3. Avoid applying for many loans at once

[Check your credit score free](/#credit-report)`;

const BlogAdmin: React.FC = () => {
  const { message } = App.useApp();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<BlogPost | 'new' | null>(null);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [form] = Form.useForm<PostForm>();
  const content = Form.useWatch('content', form) ?? '';

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/blog');
      setPosts(data.data);
    } catch {
      message.error('Could not load blog posts');
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => { load(); }, [load]);

  const open = (post: BlogPost | 'new') => {
    setEditing(post);
    setSlugTouched(post !== 'new');
    form.setFieldsValue(post === 'new'
      ? { title: '', slug: '', excerpt: '', authorName: 'Real Money Team', content: STARTER, status: 'DRAFT' }
      : { title: post.title, slug: post.slug, excerpt: post.excerpt ?? '', authorName: post.authorName ?? '', content: post.content, status: post.status });
  };

  const save = async (values: PostForm) => {
    setSaving(true);
    try {
      if (editing === 'new') await api.post('/blog', values);
      else if (editing) await api.put(`/blog/${editing.id}`, values);
      message.success(values.status === 'PUBLISHED' ? 'Post published' : 'Draft saved');
      setEditing(null);
      load();
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Could not save the post');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (post: BlogPost) => {
    try {
      await api.delete(`/blog/${post.id}`);
      message.success('Post deleted');
      load();
    } catch {
      message.error('Could not delete the post');
    }
  };

  const columns: ColumnsType<BlogPost> = [
    {
      title: 'Post', key: 'title',
      render: (_, p) => (
        <div>
          <div style={{ fontWeight: 600, color: NAVY }}>{p.title}</div>
          <div style={{ fontSize: 12, color: MUTED }}>/blog/{p.slug}{p.readMinutes ? ` · ${p.readMinutes} min read` : ''}</div>
        </div>
      ),
    },
    {
      title: 'Status', dataIndex: 'status', width: 120,
      render: (s: BlogPost['status']) => s === 'PUBLISHED' ? <Tag color="green">Published</Tag> : <Tag>Draft</Tag>,
    },
    { title: 'Published', dataIndex: 'publishedAt', width: 170, render: (v: string | null) => <span style={{ fontSize: 13 }}>{fmt(v)}</span> },
    { title: 'Last edited', dataIndex: 'updatedAt', width: 170, render: (v: string) => <span style={{ fontSize: 13 }}>{fmt(v)}</span> },
    {
      title: '', key: 'actions', width: 150, align: 'right',
      render: (_, p) => (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          {p.status === 'PUBLISHED' && (
            <Tooltip title="View on website"><Button size="small" icon={<ExternalLink size={13} />} href={`/blog/${p.slug}`} target="_blank" /></Tooltip>
          )}
          <Tooltip title="Edit"><Button size="small" icon={<Pencil size={13} />} onClick={() => open(p)} /></Tooltip>
          <Popconfirm title="Delete this post?" description="It is removed from the website permanently." okText="Delete" okButtonProps={{ danger: true }} onConfirm={() => remove(p)}>
            <Tooltip title="Delete"><Button size="small" danger icon={<Trash2 size={13} />} /></Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 22, color: NAVY, letterSpacing: '-0.02em' }}>Blog</div>
          <div style={{ fontSize: 13, color: MUTED }}>Posts for the website's /blog. Only published posts are visible to visitors and search engines.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button icon={<RefreshCw size={14} />} onClick={load}>Refresh</Button>
          <Button type="primary" icon={<Plus size={14} />} onClick={() => open('new')}>New post</Button>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderTop: `3px solid ${GOLD}` }}>
        <Table<BlogPost>
          rowKey="id" columns={columns} dataSource={posts} loading={loading} size="middle" scroll={{ x: 760 }}
          pagination={{ pageSize: 20, hideOnSinglePage: true }}
          locale={{ emptyText: <div style={{ padding: 40, color: MUTED, textAlign: 'center' }}><FileText size={22} style={{ marginBottom: 8 }} /><div>No posts yet — click “New post”.</div></div> }}
        />
      </div>

      <Drawer
        open={editing !== null} onClose={() => setEditing(null)} width={Math.min(980, typeof window !== 'undefined' ? window.innerWidth : 980)}
        title={editing === 'new' ? 'New post' : 'Edit post'} destroyOnClose
        extra={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="primary" loading={saving} onClick={() => form.submit()}>Save</Button>
          </div>
        }
      >
        <Form<PostForm> form={form} layout="vertical" onFinish={save} requiredMark={false}
          onValuesChange={(changed) => { if ('title' in changed && !slugTouched) form.setFieldValue('slug', slugify(changed.title ?? '')); }}>
          <Form.Item name="title" label="Title" rules={[{ required: true, min: 3, message: 'Enter a title' }]}>
            <Input size="large" maxLength={200} placeholder="e.g. How to improve your CIBIL score in 6 months" />
          </Form.Item>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0 16px' }}>
            <Form.Item name="slug" label="Web address" extra="realmoneygroups.in/blog/…  (lowercase, numbers, hyphens)"
              rules={[{ pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Use only a-z, 0-9 and hyphens' }]}>
              <Input addonBefore="/blog/" maxLength={150} onChange={() => setSlugTouched(true)} />
            </Form.Item>
            <Form.Item name="authorName" label="Author">
              <Input maxLength={120} placeholder="Real Money Team" />
            </Form.Item>
          </div>
          <Form.Item name="excerpt" label="Summary (shown on the blog list and in Google)" extra="Leave blank to use the first paragraph.">
            <Input.TextArea maxLength={400} showCount autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <Tabs items={[
            {
              key: 'write', label: 'Write',
              children: (
                <>
                  <Form.Item name="content" rules={[{ required: true, min: 20, message: 'Write at least a few sentences' }]} style={{ marginBottom: 8 }}>
                    <Input.TextArea autoSize={{ minRows: 16, maxRows: 40 }} style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontSize: 13.5 }} />
                  </Form.Item>
                  <pre style={{ fontSize: 12, color: MUTED, background: '#F6F8FB', padding: '10px 12px', margin: 0, whiteSpace: 'pre-wrap' }}>{FORMAT_HELP}</pre>
                </>
              ),
            },
            {
              key: 'preview', label: 'Preview',
              children: <div style={{ border: `1px solid ${BORDER}`, padding: '8px 24px 16px', background: '#FFFDF8' }}><BlogContent content={content} /></div>,
            },
          ]} />
          <Form.Item name="status" label="Visibility" style={{ marginTop: 16 }}>
            <Segmented options={[{ label: 'Draft (hidden)', value: 'DRAFT' }, { label: 'Published (on website)', value: 'PUBLISHED' }]} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default BlogAdmin;
