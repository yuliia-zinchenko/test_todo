"use client";

import { Suspense } from "react";
import TaskList from "../TaskList";

export default function TaskListWrapper() {
  return (
    <Suspense fallback={<div>Loading tasks...</div>}>
      <TaskList />
    </Suspense>
  );
}
