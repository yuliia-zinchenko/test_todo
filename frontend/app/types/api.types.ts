import { Task } from "./task.types";

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface TodosResponse {
  items: Task[];
  pagination: Pagination;
}

export interface GetTodosParams {
  limit?: number;
  cursor?: number;
  search?: string;
  status?: "done" | "undone" | "all";
  sort?: "asc" | "desc";
}
