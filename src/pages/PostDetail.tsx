import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Page from '../components/resuable/Page';
import ReactIcon from '../shared/components/ui/ReactIcon';
import DetailsPage from '../shared/components/ui/DetailsPage';
import MediaGallery from '../shared/components/ui/MediaGallery';
import { usePostDetailController } from '../features/posts/hooks/usePostDetailController';

const PostDetail: React.FC = memo(() => {
  const { post, isLoading, notFound } = usePostDetailController();

  if (isLoading) {
    return (
      <Page HeadProps={{ title: 'Loading…' }}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent/60">
              Loading post…
            </p>
          </div>
        </div>
      </Page>
    );
  }

  if (notFound || !post) {
    return (
      <Page HeadProps={{ title: '404 — Post Not Found' }}>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
            ◈ 404
          </p>
          <h1 className="font-display text-3xl font-bold text-fg">
            Post not found
          </h1>
          <p className="text-sm text-muted">
            This post may have been removed or is not yet published.
          </p>
          <Link
            to="/posts"
            className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline"
          >
            <ReactIcon name="FiArrowLeft" size={14} /> Back to Posts
          </Link>
        </div>
      </Page>
    );
  }

  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <Page HeadProps={{ title: post.meta_title || post.title }}>
      <DetailsPage
        kicker="◈ POST // TL.SYSTEMS"
        title={post.title}
        description={post.description}
        tags={post.tags}
        meta={date}
        back={{ to: '/posts', label: 'Back to Posts' }}
        cover={
          post.cover_image
            ? { url: post.cover_image, mediaType: post.cover_media_type }
            : undefined
        }
        socialLinks={post.social_links}
        contentHtml={post.content}
      >
        <MediaGallery media={post.additional_media} />
      </DetailsPage>
    </Page>
  );
});

PostDetail.displayName = 'PostDetail';
export default PostDetail;
