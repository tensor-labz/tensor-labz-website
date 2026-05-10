import React, { memo, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import Page from '../components/resuable/Page';
import BlogCard from '../features/blog/components/BlogCard';
import ReactIcon from '../shared/components/ui/ReactIcon';
import { useBlogListController } from '../features/blog/hooks/useBlogListController';
import { EASE_EXPO, VIEWPORT } from '../lib/motion';

const PAGE_SIZE = 20;

const BlogSkeleton = () => (
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

const Blog: React.FC = memo(() => {
  const { blogs, isLoading } = useBlogListController();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => b.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [blogs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesTag = !activeTag || b.tags.includes(activeTag);
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        (b.description ?? '').toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [blogs, activeTag, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleTag = (tag: string | null) => {
    setActiveTag(tag);
    setPage(1);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <Page HeadProps={{ title: 'Blog' }}>
      {/* ── Hero ── */}
      <section className="pt-32 pb-10 px-6 lg:px-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent mb-4"
        >
          ◈ Tensor Labz // Blog
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_EXPO }}
          className="text-3xl sm:text-5xl font-bold font-display text-fg mb-3"
        >
          Insights &amp; Updates
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '3rem' }}
          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          className="h-1 rounded-full mx-auto mb-5 bg-accent"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted text-base max-w-xl mx-auto"
        >
          Engineering articles, project deep-dives, and technical insights from the Tensor Labz team.
        </motion.p>
      </section>

      {/* ── Search + Tag filters ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, ease: EASE_EXPO }}
        className="px-6 lg:px-16 max-w-7xl mx-auto mb-8 space-y-4"
      >
        {/* Search bar */}
        <div className="relative max-w-lg mx-auto">
          <ReactIcon
            name="FiSearch"
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={handleQuery}
            placeholder="Search articles…"
            className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-rim bg-surface text-fg text-sm
              placeholder:text-muted/40 placeholder:font-mono
              focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
              transition-all duration-200"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/50 hover:text-accent transition-colors"
            >
              <ReactIcon name="FiX" size={13} />
            </button>
          )}
        </div>

        {/* Tag pills */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleTag(null)}
              className={`px-3 py-1 rounded border text-[11px] font-mono tracking-wider uppercase transition-all duration-200
                ${!activeTag
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-rim text-muted hover:border-accent/40 hover:text-accent/80'
                }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTag(tag === activeTag ? null : tag)}
                className={`px-3 py-1 rounded border text-[11px] font-mono tracking-wider uppercase transition-all duration-200
                  ${activeTag === tag
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-rim text-muted hover:border-accent/40 hover:text-accent/80'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Articles ── */}
      <section className="px-6 lg:px-16 pb-16 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => <BlogSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={VIEWPORT}
            className="text-center py-24"
          >
            <p className="text-[10px] font-mono tracking-widest uppercase text-accent mb-3">◈ No Results</p>
            <p className="text-muted text-sm">No articles match your search. Try different keywords.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            {paginated.map((blog, i) => (
              <BlogCard
                key={blog.id}
                slug={blog.slug}
                title={blog.title}
                description={blog.description}
                cover_image={blog.cover_image}
                tags={blog.tags}
                created_at={blog.created_at}
                reverse={i % 2 !== 0}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-rim
                text-muted hover:border-accent/50 hover:text-accent
                disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ReactIcon name="FiChevronLeft" size={15} />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              const isActive = n === safePage;
              const isNear = Math.abs(n - safePage) <= 1 || n === 1 || n === totalPages;
              if (!isNear) {
                if (n === safePage - 2 || n === safePage + 2)
                  return <span key={n} className="text-muted/40 text-sm font-mono px-1">…</span>;
                return null;
              }
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-mono
                    transition-all duration-200
                    ${isActive
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-rim text-muted hover:border-accent/40 hover:text-accent/80'
                    }`}
                >
                  {n}
                </button>
              );
            })}

            {/* Next */}
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

        {/* Result count */}
        {!isLoading && filtered.length > 0 && (
          <p className="text-center text-[10px] font-mono text-muted/40 mt-4">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''} · page {safePage} of {totalPages}
          </p>
        )}
      </section>
    </Page>
  );
});

Blog.displayName = 'Blog';
export default Blog;
