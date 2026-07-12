import React from 'react';
import ContentHeader from '../layout/ContentHeader';
import ContentList from './ContentList';
import ContentCard, { ContentCardProps } from './ContentCard';
import ContentPagination from './ContentPagination';

export type ContentItem = ContentCardProps;

interface SearchControl {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

interface ContentPageProps {
  /* Header */
  eyebrow?: React.ReactNode;
  title: string;
  description?: string;
  search?: SearchControl;
  /* List */
  items: ContentItem[];
  isLoading?: boolean;
  isEmpty?: boolean;
  loadingState?: React.ReactNode;
  emptyState?: React.ReactNode;
  /* ContentPagination (optional) */
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  summary?: string;
  /* Optional filter sidebar/drawer rendered with the page (e.g. services filter). */
  sidebar?: React.ReactNode;
}

/**
 * Reusable list-page composition: a centered ContentHeader (with optional search),
 * a ContentList of ContentCards, and optional ContentPagination — all driven by props.
 * Used by the posts and services pages so there is no per-page container.
 */
const ContentPage: React.FC<ContentPageProps> = ({
  eyebrow,
  title,
  description,
  search,
  items,
  isLoading = false,
  isEmpty = false,
  loadingState,
  emptyState,
  page,
  totalPages,
  onPageChange,
  summary,
  sidebar,
}) => (
  <>
    <ContentHeader
      centered
      eyebrow={eyebrow}
      title={title}
      description={description}
      search={search}
    />

    {sidebar}

    <section className="mx-auto mt-2 max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
      <ContentList
        isLoading={isLoading}
        isEmpty={isEmpty}
        loadingState={loadingState}
        emptyState={emptyState}
      >
        {items.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </ContentList>

      {!isLoading && onPageChange && page != null && totalPages != null && (
        <ContentPagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          summary={summary}
        />
      )}
    </section>
  </>
);

export default ContentPage;
