import React from 'react';

interface ContentListProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  loadingState?: React.ReactNode;
  emptyState?: React.ReactNode;
  /** The ContentCard items. */
  children?: React.ReactNode;
}

/**
 * Reusable vertical list of ContentCards with loading/empty slots.
 * Shared by the posts and services pages. Any heading/count is the page's job.
 */
const ContentList: React.FC<ContentListProps> = ({
  isLoading = false,
  isEmpty = false,
  loadingState,
  emptyState,
  children,
}) => {
  if (isLoading) return <>{loadingState}</>;
  if (isEmpty) return <>{emptyState}</>;
  return <div className="flex flex-col gap-6">{children}</div>;
};

export default ContentList;
