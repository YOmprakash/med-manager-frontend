import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { addMedication } from "../api";

export default function AddMedicationForm({ patientId }) {
    const [form, setForm] = useState({ name: "", dosage: "", frequency: "" });
    const [loading, setLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: addMedication,
        onSuccess: () => {
            setLoading(false);
            toast.success("Medication added successfully!");
            setForm({ name: "", dosage: "", frequency: "" });
        },
        onError: () => {
            setLoading(false);
            toast.error("Failed to add medication.");
        },
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        mutation.mutate({ ...form, patient_id: patientId });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 shadow rounded-lg"
        >
            <h2 className="text-lg font-semibold">Add New Medication</h2>

            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Medication Name"
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="text"
                name="dosage"
                value={form.dosage}
                onChange={handleChange}
                placeholder="Dosage (e.g., 500mg)"
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="text"
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                placeholder="Frequency (e.g., Once a day)"
                className="w-full border p-2 rounded"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? "Adding..." : "Add Medication"}
            </button>
        </form>
    );
}
