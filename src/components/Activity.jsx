import React from "react";
import { Check, AlertTriangle, Camera } from "lucide-react";
import { format } from "date-fns";

export default function Activity({ items }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Recent Medication Activity
      </h3>
      <div className="space-y-4">
        {items.map((a, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  a.taken ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {a.taken ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium">
                  {format(new Date(a.date), "EEEE, MMMM d")}
                </p>
                <p className="text-sm text-gray-500">
                  {a.taken ? `Taken at ${a.time}` : "Medication missed"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {a.hasPhoto && (
                <div className="px-2.5 py-0.5 text-xs font-semibold rounded-full border bg-white">
                  <Camera className="w-3 h-3 mr-1" />
                  Photo
                </div>
              )}
              <div
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  a.taken
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {a.taken ? "Completed" : "Missed"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
