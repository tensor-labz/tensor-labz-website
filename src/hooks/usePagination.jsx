import React, { useMemo, useReducer } from "react";

const pageReducer = (state, action) => {
  switch (action.type) {
    case "FIRST":
      return 1;
    case "LAST":
      return action.totalPages;
    case "PREV":
      return state > 1 ? state - 1 : 1;
    case "NEXT":
      return state < action.totalPages ? state + 1 : action.totalPages;
    default:
      return action.page >= 1 && action.page <= action.totalPages
        ? action.page
        : 1;
  }
};

export default function usePagination(items, itemsPerPage = 9) {
  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage);

  const [currentPage, dispatchPage] = useReducer(pageReducer, 1);
  const paginatedItems =useMemo(()=> items?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ),[currentPage,items]);
  return {
    currentPage, 
    totalPages, 
    paginatedItems,
    goToFirst: () => dispatchPage({ type: "FIRST" }),
    goToLast: () => dispatchPage({ type: "LAST", totalPages }),
    goToPrev: () => dispatchPage({ type: "PREV" }),
    goToNext: () => dispatchPage({ type: "NEXT", totalPages }),
    goToPage: (page) =>()=> dispatchPage({ type: "SET", page, totalPages }),
  };
}
