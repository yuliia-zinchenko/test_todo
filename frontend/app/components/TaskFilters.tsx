"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";

interface TaskFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: "all" | "done" | "undone";
  setStatus: (value: "all" | "done" | "undone") => void;
  sort: "asc" | "desc";
  setSort: (value: "asc" | "desc") => void;
}

export default function TaskFilters({
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
}: TaskFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    setLocalSearch(searchParams.get("search") || "");
    setSearch(searchParams.get("search") || "");
    setStatus(
      (searchParams.get("status") as "all" | "done" | "undone") || "all"
    );
    setSort((searchParams.get("sort") as "asc" | "desc") || "asc");
  }, [searchParams, setSearch, setStatus, setSort]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set("search", debouncedSearch);
    else params.delete("search");
    router.replace(`?${params.toString()}`, { scroll: false });
    setSearch(debouncedSearch);
  }, [debouncedSearch, router, searchParams, setSearch]);

  const handleStatusChange = (value: "all" | "done" | "undone") => {
    setStatus(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "all") params.set("status", value);
    else params.delete("status");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (value: "asc" | "desc") => {
    setSort(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("sort", value);
    else params.delete("sort");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
      <input
        type="text"
        placeholder="Search tasks..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="flex-1 min-w-[200px] border border-[#DCCFC0] rounded-lg p-3 bg-[#FAF9EE] placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#A2AF9B] focus:border-[#A2AF9B] transition-all shadow-sm"
      />

      <select
        value={status}
        onChange={(e) =>
          handleStatusChange(e.target.value as "all" | "done" | "undone")
        }
        className="border border-[#DCCFC0] rounded-lg p-3 bg-[#FAF9EE] text-gray-700
          focus:outline-none focus:ring-2 focus:ring-[#A2AF9B] focus:border-[#A2AF9B] transition-all cursor-pointer shadow-sm"
      >
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
      </select>

      <select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value as "asc" | "desc")}
        className="border border-[#DCCFC0] rounded-lg p-3 bg-[#FAF9EE] text-gray-700
          focus:outline-none focus:ring-2 focus:ring-[#A2AF9B] focus:border-[#A2AF9B] transition-all cursor-pointer shadow-sm"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
