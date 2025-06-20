import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

export default function TodayStatusCard({ medication }) {
  const { name, time, status } = medication;
  const badgeClass =
    status === "pending"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";

  return (
    <div className="rounded-lg  bg-white text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 p-6">
        <CalendarIcon className="w-5 h-5 text-blue-600" />
        <h3 className="text-2xl font-semibold">Today’s Status</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
          <div
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${badgeClass}`}
          >
            {status === "pending" ? "Pending" : "Completed"}
          </div>
        </div>
      </div>
    </div>
  );
}
