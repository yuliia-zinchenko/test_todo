"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../store/services/api";
import TaskItem from "./TaskItem";
import { Task } from "../types/task.types";
import Pagination from "./Pagination";

export default function TaskList() {
  const searchParams = useSearchParams();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const search = searchParams.get("search") || "";
  const status =
    (searchParams.get("status") as "all" | "done" | "undone") || "all";
  const sort = (searchParams.get("sort") as "asc" | "desc") || "asc";
  const limit = 10;

  const [page, setPage] = useState(1);

  const [tasks, setTasks] = useState<Task[]>([]);

  const { data, isFetching, error } = useGetTodosQuery({
    search: search || undefined,
    status,
    sort,
    page,
    limit,
  });

  useEffect(() => {
    if (!data?.items) return;
    setTasks(data.items);
  }, [data]);

  const onToggle = useCallback(
    async (id: number) => {
      const taskToUpdate = tasks.find((t) => t.id === id);
      if (!taskToUpdate) return;

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      );

      try {
        await updateTodo({
          id,
          updates: { ...taskToUpdate, done: !taskToUpdate.done },
        }).unwrap();
      } catch (err) {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, done: taskToUpdate.done } : t))
        );
        console.error("Failed to toggle task:", err);
      }
    },
    [tasks, updateTodo]
  );

  const onRemove = useCallback(
    async (id: number) => {
      const taskToRestore = tasks.find((t) => t.id === id);
      if (!taskToRestore) return;

      setTasks((prev) => prev.filter((t) => t.id !== id));

      try {
        await deleteTodo(id).unwrap();
      } catch (err) {
        setTasks((prev) => [...prev, taskToRestore]);
        console.error("Delete error:", err);
      }
    },
    [tasks, deleteTodo]
  );

  if (error)
    return <div className="text-red-500 p-4">Error fetching tasks</div>;

  return (
    <div className="flex w-full max-w-4xl flex-col items-center">
      <ul className="flex flex-col items-center gap-4 w-full max-w-6xl">
        {tasks.map((task) => (
          <li key={task.id} className="w-full">
            <TaskItem task={task} onToggle={onToggle} onRemove={onRemove} />
          </li>
        ))}

        {isFetching && <li className="w-full text-center py-4">Loading...</li>}

        {tasks.length === 0 && !isFetching && (
          <li className="w-full text-center py-4 text-gray-500">
            No tasks found
          </li>
        )}
      </ul>
      <Pagination
        page={data?.pagination.page || page}
        totalPages={data?.pagination.totalPages || 1}
        onPageChange={setPage}
        isLoading={isFetching}
      />
    </div>
  );
}
