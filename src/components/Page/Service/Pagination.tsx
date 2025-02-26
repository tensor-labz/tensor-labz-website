import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = memo(({ totalItems, itemsPerPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => (
        <motion.button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`px-3 py-1 rounded-md transition ${
            currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {i + 1}
        </motion.button>
      ));
    } else {
      return (
        <>
          <motion.button
            onClick={() => handlePageChange(1)}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            1
          </motion.button>
          {currentPage > 3 && <span>...</span>}
          {[currentPage - 1, currentPage, currentPage + 1].map((page) =>
            page > 1 && page < totalPages ? (
              <motion.button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {page}
              </motion.button>
            ) : null
          )}
          {currentPage < totalPages - 2 && <span>...</span>}
          <motion.button
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {totalPages}
          </motion.button>
        </>
      );
    }
  };

  return (
    <div className="flex md:justify-end justify-center items-center space-x-2 mt-4">
      <motion.button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded disabled:opacity-50 md:bg-gray-200 md:hover:scale-105 transition"
      >
        <FiChevronsLeft size={20} />
      </motion.button>
      <motion.button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded disabled:opacity-50 md:bg-gray-200 md:hover:scale-105 transition"
      >
        <FiChevronLeft size={20} />
      </motion.button>

      {windowWidth >= 768 ? (
        renderPageNumbers()
      ) : (
        <motion.span className="px-3 py-1 rounded-md bg-blue-600 text-white">{currentPage}</motion.span>
      )}

      <motion.button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded disabled:opacity-50 md:bg-gray-200 md:hover:scale-105 transition"
      >
        <FiChevronRight size={20} />
      </motion.button>
      <motion.button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded disabled:opacity-50 md:bg-gray-200 md:hover:scale-105 transition"
      >
        <FiChevronsRight size={20} />
      </motion.button>
    </div>
  );
});

export default Pagination;
