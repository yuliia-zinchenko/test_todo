"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useCreateTodoMutation } from "../store/services/api";

export default function TaskForm({ onClose }: { onClose?: () => void }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(1);

  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTodo({
        title,
        text,
        priority,
        done: false,
      }).unwrap();

      setTitle("");
      setText("");
      setPriority(1);

      onClose?.();
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      <div className="flex flex-col">
        <Label htmlFor="title" className="text-gray-700 font-medium mb-2">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 bg-[#FAF9EE] border-[#DCCFC0] focus:border-[#BBDCE5] focus:ring-[#BBDCE5]"
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="text" className="text-gray-700 font-medium mb-2">
          Description
        </Label>
        <Textarea
          id="text"
          placeholder="Enter description (optional)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 bg-[#fafaec] border-[#DCCFC0] focus:border-[#BBDCE5] focus:ring-[#BBDCE5] resize-none"
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="priority" className="text-gray-700 font-medium mb-2">
          Priority (1–10)
        </Label>
        <Input
          id="priority"
          type="number"
          min={1}
          max={10}
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="mt-2 bg-[#FAF9EE] border-[#DCCFC0] focus:border-[#BBDCE5] focus:ring-[#BBDCE5] w-32"
        />
      </div>

      <Button
        type="submit"
        variant="default"
        className="bg-gradient-to-r from-[#A2AF9B] to-[#CFAB8D] text-white font-semibold 
        hover:from-[#939e8d] hover:to-[#D9C4B0] transition-colors 
        shadow-md cursor-pointer transform hover:scale-105 transition-transform"
        disabled={isLoading}
      >
        + Add
      </Button>
    </form>
  );
}
