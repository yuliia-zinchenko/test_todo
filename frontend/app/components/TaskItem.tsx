"use client";

import { Task } from "../types/task.types";
import { HiTrash } from "react-icons/hi";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  const handleToggle = () => {
    onToggle(task.id);
  };
  return (
    <div className="flex justify-between w-full max-w-4xl px-6 py-5 bg-[#f0e4d3df] rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex  gap-4 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
          className="w-6 h-6 accent-[#A2AF9B]"
        />
        <div>
          <p
            className={`font-semibold text-lg ${
              task.done ? "line-through text-gray-400" : "text-[#333]"
            } transition-all`}
          >
            {task.title}
          </p>
          {task.text && (
            <p className="text-sm text-gray-500 mt-1">{task.text}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 text-sm font-medium bg-[#DCCFC0] rounded-full text-[#333]">
          {task.priority}
        </span>
        <button
          onClick={() => onRemove(task.id)}
          className="text-red-500 hover:text-red-700 transition-colors font-semibold cursor-pointer"
        >
          <HiTrash className="w-6 h-6 text-red-400 hover:text-red-700 hover:scale-110 transition-all" />
        </button>
      </div>
    </div>
  );
}
