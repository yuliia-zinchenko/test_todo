"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "done" | "undone">("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl items-start md:items-center justify-between mb-6 p-4 bg-[#EADBC8] rounded-xl shadow-lg gap-4">
      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#91a487] hover:bg-[#CFBFA0] transition-all px-6 py-3 rounded-lg">
            + Add Task
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-[#EEEEEE] rounded-lg p-6 shadow-xl w-full max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#A2AF9B] mb-4">
              New Task
            </DialogTitle>
            <DialogDescription className="sr-only">
              Dialog for adding a new task
            </DialogDescription>
          </DialogHeader>
          <TaskForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
