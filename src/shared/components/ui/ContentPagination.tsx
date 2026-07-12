import { memo } from 'react';
import ReactIcon from './ReactIcon';

interface ContentPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Optional summary line, e.g. "12 posts · page 1 of 3". */
  summary?: string;
}

/**
 * Reusable pagination (posts-page design): prev/next chevrons + numbered
 * buttons with ellipsis, plus an optional summary line. Controlled via props.
 */
const ContentPagination = memo(
  ({ page, totalPages, onPageChange, summary }: ContentPaginationProps) => {
    return (
      <>
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className="hover:border-accent/50 flex h-9 w-9 items-center justify-center rounded-lg border border-rim text-muted transition-all duration-200 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ReactIcon name="FiChevronLeft" size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              const isActive = n === page;
              const isNear =
                Math.abs(n - page) <= 1 || n === 1 || n === totalPages;
              if (!isNear) {
                if (n === page - 2 || n === page + 2)
                  return (
                    <span
                      key={n}
                      className="text-muted/40 px-1 font-mono text-sm"
                    >
                      …
                    </span>
                  );
                return null;
              }
              return (
                <button
                  key={n}
                  onClick={() => onPageChange(n)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'hover:border-accent/40 hover:text-accent/80 border-rim text-muted'
                  }`}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
              className="hover:border-accent/50 flex h-9 w-9 items-center justify-center rounded-lg border border-rim text-muted transition-all duration-200 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ReactIcon name="FiChevronRight" size={15} />
            </button>
          </div>
        )}

        {summary && (
          <p className="text-muted/40 mt-4 text-center font-mono text-[10px]">
            {summary}
          </p>
        )}
      </>
    );
  }
);

ContentPagination.displayName = 'ContentPagination';
export default ContentPagination;
