import React from "react";

export default function Links() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <span className="text-sm font-medium transition-colors hover:text-primary">
        Task
      </span>
      <span className="text-muted text-sm font-medium transition-colors hover:text-primary">
        Calendar
      </span>
      <span className="text-muted text-sm font-medium transition-colors hover:text-primary">
        Settings
      </span>
    </div>
  );
}
