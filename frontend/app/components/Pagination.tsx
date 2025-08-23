"use client";

import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={page === 1 || isLoading}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={p === page || isLoading}
            className={`px-3 py-1 border rounded ${
              p === page ? "bg-gray-200 font-bold" : ""
            } disabled:opacity-50`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={page === totalPages || isLoading}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
