"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../../types/task.types";
import { TodosResponse, GetTodosParams } from "../../types/api.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DEFAULT_LIMIT = 10;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodosResponse, GetTodosParams & { page?: number }>({
      query: (params) => {
        const {
          limit = DEFAULT_LIMIT,
          page = 1,
          search,
          status,
          sort,
        } = params;

        const queryParams: Record<string, string> = {
          limit: limit.toString(),
          page: page.toString(),
        };

        if (search) queryParams.search = search;
        if (status && status !== "all") queryParams.status = status;
        if (sort) queryParams.sort = sort;

        return { url: "/api/todos", params: queryParams };
      },
      providesTags: ["Task"],
    }),

    createTodo: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: "/api/todos",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),

    updateTodo: builder.mutation<Task, { id: number; updates: Partial<Task> }>({
      query: ({ id, updates }) => ({
        url: `/api/todos/${id}`,
        method: "PUT",
        body: updates,
      }),
    }),

    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api;
