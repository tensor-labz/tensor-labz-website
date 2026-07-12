import React, { memo, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import Page from '../components/resuable/Page';
import ContentPage from '../shared/components/ui/ContentPage';
import { usePostListController } from '../features/posts/hooks/usePostListController';
import { useSiteSettings } from '../shared/hooks/useSiteSettings';
import { coverThumbnail } from '../services/postService';
import { VIEWPORT } from '../lib/motion';

const PostSkeleton = () => (
  <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-rim bg-surface md:flex-row">
    <div className="aspect-video bg-raised md:aspect-auto md:w-[44%] md:shrink-0" />
    <div className="flex-1 space-y-4 p-5 md:p-8">
      <div className="h-2 w-1/4 rounded bg-raised" />
      <div className="h-5 w-3/4 rounded bg-raised" />
      <div className="h-3 w-full rounded bg-raised" />
      <div className="h-3 w-2/3 rounded bg-raised" />
      <div className="h-3 w-1/2 rounded bg-raised" />
    </div>
  </div>
);

const Posts: React.FC = memo(() => {
  const { posts, isLoading } = usePostListController();
  const { get } = useSiteSettings();
  const PAGE_SIZE = Math.max(1, parseInt(get('posts.page_size', '20'), 10));
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const items = paginated.map((post, i) => ({
    id: post.id,
    link: `/posts/${post.id}`,
    title: post.title,
    description: post.description,
    imgUrl: coverThumbnail(post.cover_image, post.cover_media_type),
    tags: post.tags,
    created_at: post.created_at,
    reverse: i % 2 !== 0,
  }));

  return (
    <Page HeadProps={{ title: 'Posts' }}>
      <ContentPage
        eyebrow={get('posts.label')}
        title={get('posts.title')}
        description={get('posts.description')}
        search={{
          value: query,
          onChange: handleQuery,
          onClear: () => {
            setQuery('');
            setPage(1);
          },
          placeholder: 'Search posts…',
        }}
        items={items}
        isLoading={isLoading}
        isEmpty={filtered.length === 0}
        loadingState={
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        }
        emptyState={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={VIEWPORT}
            className="py-24 text-center"
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
              ◈ No Results
            </p>
            <p className="text-sm text-muted">
              No posts match your search. Try different keywords.
            </p>
          </motion.div>
        }
        page={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
        summary={
          filtered.length > 0
            ? `${filtered.length} post${filtered.length !== 1 ? 's' : ''} · page ${safePage} of ${totalPages}`
            : undefined
        }
      />
    </Page>
  );
});

Posts.displayName = 'Posts';
export default Posts;
