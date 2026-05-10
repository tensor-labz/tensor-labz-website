import { memo, useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDevice } from '../../../shared/hooks/useDevice';
import ReactIcon from '../../../shared/components/ui/ReactIcon';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = memo(({ totalItems, itemsPerPage }: PaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrentPage = () => {
    const params = new URLSearchParams(location.search);
    const p = parseInt(params.get('page') ?? '1', 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) return p;
    return 1;
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    setCurrentPage(getCurrentPage());
  }, [location.search, totalPages]);

  const deviceType = useDevice();
  const isWide =
    deviceType === 'md' ||
    deviceType === 'lg' ||
    deviceType === 'xl' ||
    deviceType === '2xl';

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      const params = new URLSearchParams(location.search);
      params.set('page', page.toString());
      navigate(`${location.pathname}?${params.toString()}`);
    },
    [location, navigate, currentPage, totalPages]
  );

  const renderPageNumbers = () => {
    const pages =
      totalPages <= 5
        ? Array.from({ length: totalPages }, (_, i) => i + 1)
        : (() => {
            const list: number[] = [1];
            if (currentPage > 3) list.push(-1);
            for (
              let i = Math.max(2, currentPage - 1);
              i <= Math.min(totalPages - 1, currentPage + 1);
              i++
            ) {
              list.push(i);
            }
            if (currentPage < totalPages - 2) list.push(-2);
            list.push(totalPages);
            return list;
          })();

    return pages.map((page, index) =>
      page < 0 ? (
        <span
          key={`ellipsis-${index}`}
          className="px-2"
          className="text-muted"
        >
          …
        </span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className="px-3 py-2 rounded transition-colors duration-200 text-sm font-medium"
          style={
            currentPage === page
              ? { backgroundColor: 'var(--accent)', color: '#fff' }
              : {
                  backgroundColor: 'var(--bg-raised)',
                  color: 'var(--text-muted)',
                }
          }
        >
          {page}
        </button>
      )
    );
  };

  const btnStyle = {
    backgroundColor: 'var(--bg-raised)',
    color: 'var(--text-muted)',
  };
  const btnClass =
    'p-2 rounded transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="flex md:justify-end justify-center items-center gap-1.5 mt-6 flex-wrap">
      {[
        { icon: 'FiChevronsLeft', page: 1, disabled: currentPage === 1 },
        {
          icon: 'FiChevronLeft',
          page: currentPage - 1,
          disabled: currentPage === 1,
        },
      ].map(({ icon, page, disabled }) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={disabled}
          className={btnClass}
          style={btnStyle}
        >
          <ReactIcon name={icon} size={18} />
        </button>
      ))}

      {isWide ? (
        <div className="flex gap-1">{renderPageNumbers()}</div>
      ) : (
        <span
          className="px-3 py-2 rounded text-sm font-medium"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {currentPage} / {totalPages}
        </span>
      )}

      {[
        {
          icon: 'FiChevronRight',
          page: currentPage + 1,
          disabled: currentPage === totalPages,
        },
        {
          icon: 'FiChevronsRight',
          page: totalPages,
          disabled: currentPage === totalPages,
        },
      ].map(({ icon, page, disabled }) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={disabled}
          className={btnClass}
          style={btnStyle}
        >
          <ReactIcon name={icon} size={18} />
        </button>
      ))}
    </div>
  );
});

Pagination.displayName = 'Pagination';
export default Pagination;
