import HeaderWrapper from "./components/Wrappers/HeaderWrapper";
import TaskListWrapper from "./components/Wrappers/TaskListWrapper";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9EE] flex flex-col items-center p-6">
      <div className="relative w-full mb-8">
        <div className="flex justify-center w-full">
          <HeaderWrapper />
        </div>
      </div>

      <div className="flex justify-center w-full">
        <TaskListWrapper />
      </div>
    </div>
  );
}
