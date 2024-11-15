"use client";
import { Task } from "@prisma/client";
import React, { useRef, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import StatusBullet from "@/components/StatusBullet";
import { TaskStatus } from "@/components/form/schema";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/form";
import { FiPlus } from "react-icons/fi";
type CalendarProps = {
  tasks: Task[];
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Calendar({ tasks }: CalendarProps) {
  const currDate = new Date();
  const [year, setYear] = useState(currDate.getFullYear());
  const [month, setMonth] = useState(currDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(currDate.getDate());
  const selectedDate = new Date(year, month, selectedDay);
  const firstDayOfMonth = startOfMonth(selectedDate);
  const lastDayOfMonth = endOfMonth(selectedDate);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const showModal = !!selectedTask;
  const newTaskFormDefaultDate = useRef<Date | undefined>();
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayIdx =
    getDay(firstDayOfMonth) - 1 < 0 ? 6 : getDay(firstDayOfMonth) - 1;
  const tasksGroupedByDate = tasks.reduce(
    (acc: Record<string, Task[]>, task) => {
      const dateKey = format(task.createdAt, "PPP");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(task);
      return acc;
    },
    {}
  );

  const dClassName = "hover:bg-secondary transition-all px-4 py-1 rounded-full";
  const openNewTaskForm = (date: Date) => {
    newTaskFormDefaultDate.current = date;
    setShowNewTaskForm(true);
  };
  return (
    <div className="p-6">
      <Modal
        title="Task Details"
        isOpen={showModal}
        close={() => setSelectedTask(null)}
      >
        <div className="min-w-[500px]">
          <Form
            task={selectedTask as Task}
            onSubmitOrDelete={() => setSelectedTask(null)}
          />
        </div>
      </Modal>
      <Modal
        title="New Task"
        isOpen={showNewTaskForm}
        close={() => setShowNewTaskForm(false)}
      >
        <div className="min-w-[500px]">
          <Form
          defaultDate={newTaskFormDefaultDate.current}
            onSubmitOrDelete={() => setShowNewTaskForm(false)}
          />
        </div>
      </Modal>

      <div className="flex items-center space-x-2 mb-8">
        <span className="font-medium">Select: </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">{year ? year : "Select a year"}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto py-1 px-0 space-y-3" align="start">
            {/* Prev years */}
            {Array.from({ length: 5 }).map((_, idx) => {
              const y = currDate.getFullYear() - (6 - (idx + 1));
              return (
                <div
                  key={idx}
                  className={dClassName}
                  onClick={() => setYear(y)}
                >
                  {y}
                </div>
              );
            })}
            {/* Curr Year */}
            <div
              className={dClassName}
              onClick={() => setYear(currDate.getFullYear())}
            >
              {currDate.getFullYear()}
            </div>
            {/* Next Years */}
            {Array.from({ length: 5 }).map((_, idx) => {
              const y = currDate.getFullYear() + (idx + 1);
              return (
                <div
                  key={idx}
                  className={dClassName}
                  onClick={() => setYear(y)}
                >
                  {y}
                </div>
              );
            })}
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">{months[month]}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto py-1 px-0 space-y-3" align="start">
            {months.map((m, idx) => (
              <div key={m} className={dClassName} onClick={() => setMonth(idx)}>
                {m}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((w) => (
          <span className="font-medium" key={w}>
            {w}
          </span>
        ))}
        {Array.from({ length: startingDayIdx }).map((_, idx) => (
          <div className="bg-secondary/60 min-h-44" key={idx} />
        ))}
        {daysInMonth.map((date) => (
          <div
            key={date.toISOString()}
            className="bg-secondary relative flex items-end p-1 min-h-44 h-full group"
            onClick={() => setSelectedDay(date.getDate())}
          >
            <div className="space-y-1 w-full">
              {(tasksGroupedByDate[format(date, "PPP")] || []).map((task) => (
                <div
                  className="bg-zinc-700 hover:brightness-125 transition-all rounded shadow p-2 text-sm"
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                >
                  <span className="block truncate font-medium text-left">
                    {task.title}
                  </span>
                  <p className="truncate">{task.description}</p>
                  <StatusBullet status={task.status as TaskStatus} />
                </div>
              ))}
            </div>
            <div
              onClick={() => openNewTaskForm(date)}
              className={cn(
                "bg-zinc-700 text-white font-black absolute top-4 left-4 w-6 h-6 text-sm flex justify-center items-center rounded p-2 shadow opacity-0 group-hover:opacity-100 transition-all"
              )}
            >
              <FiPlus />
            </div>
            <div
              className={cn(
                "font-black absolute top-4 right-4 w-6 h-6 text-sm flex justify-center items-center rounded p-2 shadow",
                isToday(date)
                  ? "bg-red-500 text-white"
                  : "bg-white text-zinc-600"
              )}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
