import React, { memo, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import Page from '../components/resuable/Page';
import PostCard from '../features/posts/components/PostCard';
import ReactIcon from '../shared/components/ui/ReactIcon';
import { usePostListController } from '../features/posts/hooks/usePostListController';
import { useSiteSettings } from '../shared/hooks/useSiteSettings';
import { VIEWPORT } from '../lib/motion';
import PageHeader from '../shared/components/layout/PageHeader';

const PostSkeleton = () => (
  <div className="rounded-xl overflow-hidden border border-rim bg-surface animate-pulse flex flex-col md:flex-row">
    <div className="aspect-video md:aspect-auto md:w-[44%] md:shrink-0 bg-raised" />
    <div className="flex-1 p-5 md:p-8 space-y-4">
      <div className="h-2 bg-raised rounded w-1/4" />
      <div className="h-5 bg-raised rounded w-3/4" />
      <div className="h-3 bg-raised rounded w-full" />
      <div className="h-3 bg-raised rounded w-2/3" />
      <div className="h-3 bg-raised rounded w-1/2" />
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

  return (
    <Page HeadProps={{ title: 'Posts' }}>
      <PageHeader
        centered
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
      />

      {/* ── Posts ── */}
      <section className="px-6 lg:px-16 pb-16 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={VIEWPORT}
            className="text-center py-24"
          >
            <p className="text-[10px] font-mono tracking-widest uppercase text-accent mb-3">
              ◈ No Results
            </p>
            <p className="text-muted text-sm">
              No posts match your search. Try different keywords.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            {paginated.map((post, i) => (
              <PostCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                description={post.description}
                cover_image={post.cover_image}
                cover_media_type={post.cover_media_type}
                tags={post.tags}
                created_at={post.created_at}
                reverse={i % 2 !== 0}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-rim
                text-muted hover:border-accent/50 hover:text-accent
                disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ReactIcon name="FiChevronLeft" size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              const isActive = n === safePage;
              const isNear =
                Math.abs(n - safePage) <= 1 || n === 1 || n === totalPages;
              if (!isNear) {
                if (n === safePage - 2 || n === safePage + 2)
                  return (
                    <span
                      key={n}
                      className="text-muted/40 text-sm font-mono px-1"
                    >
                      …
                    </span>
                  );
                return null;
              }
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-mono
                    transition-all duration-200
                    ${
                      isActive
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-rim text-muted hover:border-accent/40 hover:text-accent/80'
                    }`}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-rim
                text-muted hover:border-accent/50 hover:text-accent
                disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ReactIcon name="FiChevronRight" size={15} />
            </button>
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <p className="text-center text-[10px] font-mono text-muted/40 mt-4">
            {filtered.length} post{filtered.length !== 1 ? 's' : ''} · page{' '}
            {safePage} of {totalPages}
          </p>
        )}
      </section>
    </Page>
  );
});

Posts.displayName = 'Posts';
export default Posts;
