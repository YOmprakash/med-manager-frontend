import { useState, useRef } from "react";
import { format } from "date-fns";
import { Check, Clock, Camera, Image } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { markAsTaken } from "../api";
import { toast } from 'react-toastify'
const MedicationTracker = ({ date, isTaken, onMarkTaken, isToday }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const dailyMedication = {
    name: "Daily Medication Set",
    time: "8:00 AM",
    description: "Complete set of daily tablets",
  };

  const mutation = useMutation({
    mutationFn: ({ date, image }) => markAsTaken(1, date, image), // Replace `1` with dynamic medication ID if needed
    onSuccess: () => {
      onMarkTaken(date); 
      setSelectedImage(null);
      setImagePreview(null);
      toast.success("Medication marked as taken successfully!");
    },
    onError: (error) => {
      toast.error("Failed to mark medication as taken. Please try again.");
    },
  });

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMedicationMarkTaken = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        mutation.mutate({ date, image: base64Image });
      };
      reader.readAsDataURL(selectedImage);
    } else {
      mutation.mutate({ date, image: null });
    }
  };

  if (isTaken) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center p-8 bg-green-50 rounded-xl border-2 border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Medication Completed!
            </h3>
            <p className="text-green-600">
              Great job! You've taken your medication for {format(new Date(date), "MMMM d, yyyy")}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{dailyMedication.name}</h4>
              <p className="text-sm text-gray-500">{dailyMedication.description}</p>
            </div>
          </div>
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-semibold">
            <Clock className="w-3 h-3 mr-1" />
            {dailyMedication.time}
          </div>
        </div>
      </div>

      {/* Image upload */}
      <div className="rounded-lg border-dashed border-2 border-gray-300 p-6 text-center">
        <Image className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="font-medium mb-2">Add Proof Photo (Optional)</h3>
        <p className="text-sm text-gray-500 mb-4">
          Take a photo of your medication or pill organizer as confirmation
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100"
        >
          <Camera className="w-4 h-4 mr-2" />
          {selectedImage ? "Change Photo" : "Take Photo"}
        </button>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-32 object-cover rounded-lg mx-auto border"
            />
            <p className="text-sm text-gray-500 mt-2">
              Photo selected: {selectedImage.name}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleMedicationMarkTaken}
        className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-md flex items-center justify-center disabled:opacity-50"
        disabled={!isToday || mutation.isLoading}
      >
        <Check className="w-5 h-5 mr-2" />
        {isToday ? (mutation.isLoading ? "Submitting..." : "Mark as Taken") : "Cannot mark future dates"}
      </button>

      {!isToday && (
        <p className="text-center text-sm text-gray-500">
          You can only mark today's medication as taken
        </p>
      )}
    </div>
  );
};

export default MedicationTracker;
