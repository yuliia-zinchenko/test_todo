"use client";

import { Suspense } from "react";
import Header from "../Header";

export default function TaskYeaderWrapper() {
  return (
    <Suspense fallback={<div>Loading tasks...</div>}>
      <Header />
    </Suspense>
  );
}
