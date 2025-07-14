import { memo, useEffect, useState, useCallback } from "react";
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
  initialPage?: number;
}

const Pagination = memo(({ totalItems, itemsPerPage, onPageChange, initialPage = 1 }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with 0 to avoid SSR issues


  // Initialize currentPage with validation
  const getInitialPage = () => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get("page") || "");
    if (!isNaN(pageParam)) return Math.max(1, Math.min(pageParam, totalPages));
  }
  return initialPage;
};

const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Handle window resize with useCallback to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // Set initial window width and handle resize
  useEffect(() => {
    // Only access window on client side
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);
// Update URL query when page changes
useEffect(() => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    url.searchParams.set("page", currentPage.toString());
    window.history.pushState({}, "", url.toString());
  }
}, [currentPage]);

  // Call onPageChange callback when page changes
  useEffect(() => {
    if (onPageChange && currentPage > 0 && currentPage <= totalPages) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange, totalPages]);

  // Reset to page 1 if totalPages changes and current page is out of range
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  }, [totalPages, currentPage]);

  const renderPageNumbers = useCallback(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`px-3 py-2 rounded-md transition-colors duration-200 ${
            currentPage === i + 1
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ));
    } else {
      // Determine which page numbers to show
      let pagesToShow = [];

      // Always show first page
      pagesToShow.push(1);

      // Add ellipsis if needed
      if (currentPage > 3) {
        pagesToShow.push(-1); // -1 represents ellipsis
      }

      // Add pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pagesToShow.push(i);
      }

      // Add ellipsis if needed
      if (currentPage < totalPages - 2) {
        pagesToShow.push(-2); // -2 represents ellipsis
      }

      // Always show last page
      if (totalPages > 1) {
        pagesToShow.push(totalPages);
      }

      return pagesToShow.map((page, index) => {
        if (page < 0) {
          // Render ellipsis
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-gray-500"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-md transition-colors duration-200 ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        );
      });
    }
  }, [totalPages, currentPage, handlePageChange]);

  // Don't render anything if there are no pages or invalid data
  if (totalPages <= 0 || totalItems <= 0) return null;

  return (
    <div className="flex md:justify-end justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        aria-label="First page"
      >
        <FiChevronsLeft size={20} />
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        aria-label="Previous page"
      >
        <FiChevronLeft size={20} />
      </button>

      {windowWidth >= 768 ? (
        <div className="flex space-x-2">
          {renderPageNumbers()}
        </div>
      ) : (
        <span className="px-3 py-2 rounded-md bg-blue-600 text-white font-medium">
          {currentPage} / {totalPages}
        </span>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        aria-label="Next page"
      >
        <FiChevronRight size={20} />
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        aria-label="Last page"
      >
        <FiChevronsRight size={20} />
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;