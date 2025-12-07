import React from "react";

function Pagination({ meta, onPageChange }) {
  if (!meta) return null;

  const { page, totalPages } = meta;

  return (
    <div className="flex items-center justify-between text-xs text-slate-600 mt-2">
      <div>
        Page {page} of {totalPages}
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
