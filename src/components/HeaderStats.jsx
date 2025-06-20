import React from "react";
import { Users } from "lucide-react";

export default function HeaderStats({ name, adherenceRate, streak, missed, takenThisWeek }) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
          <Users className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Caretaker Dashboard</h2>
          <p className="text-white/90 text-lg">
            Monitoring {name}’s medication adherence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Adherence Rate", value: `${adherenceRate}%` },
          { label: "Current Streak", value: streak },
          { label: "Missed This Month", value: missed },
          { label: "Taken This Week", value: takenThisWeek },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
          >
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-white/80">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
