import { memo, useEffect, useState } from "react";
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = memo(({ totalItems, itemsPerPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize currentPage from URL params or default to 1
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update URL when page changes
  useEffect(() => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", currentPage.toString());
      return newParams;
    });
  }, [currentPage, setSearchParams]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`px-3 py-1 rounded-md transition ${
            currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
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
          return <span key={`ellipsis-${index}`} className="px-2">...</span>;
        }

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md transition ${
              currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        );
      });
    }
  };

  // Don't render anything if there are no pages
  if (totalPages <= 0) return null;

  return (
    <div className="flex md:justify-end justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded disabled:opacity-50 md:bg-gray-200 hover:bg-gray-300 transition"
        aria-label="First page"
      >
        <FiChevronsLeft size={20} />
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded disabled:opacity-50 md:bg-gray-200 hover:bg-gray-300 transition"
        aria-label="Previous page"
      >
        <FiChevronLeft size={20} />
      </button>

      {windowWidth >= 768 ? (
        <div className="flex space-x-2">
          {renderPageNumbers()}
        </div>
      ) : (
        <span className="px-3 py-1 rounded-md bg-blue-600 text-white">
          {currentPage} / {totalPages}
        </span>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded disabled:opacity-50 md:bg-gray-200 hover:bg-gray-300 transition"
        aria-label="Next page"
      >
        <FiChevronRight size={20} />
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded disabled:opacity-50 md:bg-gray-200 hover:bg-gray-300 transition"
        aria-label="Last page"
      >
        <FiChevronsRight size={20} />
      </button>
    </div>
  );
});

export default Pagination;