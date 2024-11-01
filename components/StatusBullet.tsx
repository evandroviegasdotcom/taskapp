import React from "react";
import { TaskStatus } from "./form/schema";

type Props = {
  status: TaskStatus;
};
export default function StatusBullet(props: Props) {
  const { status } = props;
  if (status === "done") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span>Done</span>
      </div>
    );
  } else if (status === "progress") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500" />
        <span>In Progress</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <span>Starting</span>
      </div>
    );
  }
}
