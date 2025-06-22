import { useQuery } from "@tanstack/react-query";

import { Pill } from "lucide-react";
import { getAllMedications } from "../api";

const MedicationList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allMedications"],
    queryFn: getAllMedications,
  });

  if (isLoading) return <p>Loading medications...</p>;
  if (isError) return <p>Error fetching medications.</p>;

  if (!data || data.length === 0) return <p>No medications added yet.</p>;

  return (
    <div className="bg-white rounded-lg p-6  py-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Pill className="w-5 h-5 text-blue-600" />
        All Medications
      </h2>
      <ul className="space-y-3">
        {data.map((med) => (
          <li key={med.id} className="p-4 rounded-md border hover:bg-gray-50">
            <div className="font-medium text-gray-800">Name:{med.name}</div>
            <div className="text-sm text-gray-500"> Dosage:{med.dosage}</div>
            <div className="text-sm text-gray-500"> Frequency:{med.frequency}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationList;
