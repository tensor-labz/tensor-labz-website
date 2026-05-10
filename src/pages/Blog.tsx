import React, { memo, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import Page from '../components/resuable/Page';
import BlogCard from '../features/blog/components/BlogCard';
import { useBlogListController } from '../features/blog/hooks/useBlogListController';
import { EASE_EXPO, VIEWPORT } from '../lib/motion';

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

  /* Collect all unique tags across all blogs */
  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => b.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [blogs]);

  const filtered = useMemo(
    () => (activeTag ? blogs.filter((b) => b.tags.includes(activeTag)) : blogs),
    [blogs, activeTag]
  );

  return (
    <Page HeadProps={{ title: 'Blog' }}>
      {/* ── Hero ── */}
      <section className="pt-32 pb-12 px-6 lg:px-16 text-center">
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

      {/* ── Tag filter ── */}
      {allTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: EASE_EXPO }}
          className="px-6 lg:px-16 flex flex-wrap gap-2 justify-center mb-8"
        >
          <button
            onClick={() => setActiveTag(null)}
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
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1 rounded border text-[11px] font-mono tracking-wider uppercase transition-all duration-200
                ${activeTag === tag
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-rim text-muted hover:border-accent/40 hover:text-accent/80'
                }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      )}

      {/* ── Grid ── */}
      <section className="px-6 lg:px-16 pb-24 max-w-7xl mx-auto">
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
            <p className="text-muted text-sm">No published articles yet. Check back soon.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.map((blog) => (
              <BlogCard
                key={blog.id}
                slug={blog.slug}
                title={blog.title}
                description={blog.description}
                cover_image={blog.cover_image}
                tags={blog.tags}
                created_at={blog.created_at}
              />
            ))}
          </div>
        )}
      </section>
    </Page>
  );
});

Blog.displayName = 'Blog';
export default Blog;
