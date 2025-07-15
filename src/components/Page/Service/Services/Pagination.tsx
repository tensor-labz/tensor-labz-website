import { memo, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight
} from "react-icons/fi";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = memo(({ totalItems, itemsPerPage }: PaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page from URL or default to 1
  const getCurrentPage = () => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get("page") || "");
    if (!isNaN(pageParam) && pageParam >= 1 && pageParam <= totalPages) {
      return pageParam;
    }
    return 1;
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  // Always sync to URL
  useEffect(() => {
    setCurrentPage(getCurrentPage());
  }, [location.search, totalPages]);

  // Handle resize for responsive design
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Navigate correctly
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;

      const params = new URLSearchParams(location.search);
      params.set("page", page.toString());
      navigate(`${location.pathname}?${params.toString()}`);
    },
    [location, navigate, currentPage, totalPages]
  );

  const renderPageNumbers = () => {
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
      const pagesToShow = [];
      pagesToShow.push(1);
      if (currentPage > 3) pagesToShow.push(-1);
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pagesToShow.push(i);
      }
      if (currentPage < totalPages - 2) pagesToShow.push(-2);
      pagesToShow.push(totalPages);

      return pagesToShow.map((page, index) =>
        page < 0 ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
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
        )
      );
    }
  };

  if (totalPages <= 1 || totalItems <= 0) return null;

  return (
    <div className="flex md:justify-end justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
      >
        <FiChevronsLeft size={20} />
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
      >
        <FiChevronLeft size={20} />
      </button>

      {windowWidth >= 768 ? (
        <div className="flex space-x-2">{renderPageNumbers()}</div>
      ) : (
        <span className="px-3 py-2 rounded-md bg-blue-600 text-white font-medium">
          {currentPage} / {totalPages}
        </span>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
      >
        <FiChevronRight size={20} />
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
      >
        <FiChevronsRight size={20} />
      </button>
    </div>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
