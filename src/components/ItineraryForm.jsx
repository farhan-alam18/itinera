import { useState } from "react";
import { useAuthStore, useModalStore } from "../global/store";
import Button from "./Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const ItineraryForm = () => {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [activities, setActivities] = useState([""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripType, setTripType] = useState("");

  const closeModal = useModalStore((state) => state.closeModal);

  const userResult = useAuthStore((state) => state.user);
  const user = userResult.uid;

  const moviesCollectionRef = collection(db, "trips");

  const handleActivityChange = (index, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = value;
    setActivities(updatedActivities);
  };

  const handleAddActivity = () => {
    setActivities([...activities, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(moviesCollectionRef, {
        user,
        tripName,
        destination,
        activities,
        startDate,
        endDate,
        tripType,
      });
      console.log({
        user,
        tripName,
        destination,
        activities,
        startDate,
        endDate,
        tripType,
      });
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-[600px] border rounded-md shadow-md px-10 py-5 max-h-[90vh] overflow-y-scroll"
    >
      <header className="text-center mt-2 font-bold text-2xl">
        Plan you Itinerary 🚀
      </header>
      <div>
        <label htmlFor="tripName" className="block font-semibold">
          Trip Name:
        </label>
        <input
          type="text"
          id="tripName"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="destination" className="block font-semibold">
          Destination:
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Activities:</label>
        {activities.map((activity, index) => (
          <input
            key={index}
            type="text"
            value={activity}
            onChange={(e) => handleActivityChange(index, e.target.value)}
            placeholder={`Activity ${index + 1}`}
            className="border rounded-md px-3 py-2 mb-2 w-full"
            required
          />
        ))}
        <button
          type="button"
          onClick={handleAddActivity}
          className="text-blue-500"
        >
          Add Another Activity
        </button>
      </div>

      <div>
        <label htmlFor="startDate" className="block font-semibold">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="endDate" className="block font-semibold">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="tripType" className="block font-semibold">
          Trip Type:
        </label>
        <select
          id="tripType"
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
          required
        >
          <option value="">Select Trip Type</option>
          <option value="adventure">Adventure</option>
          <option value="leisure">Leisure</option>
          <option value="work">Work</option>
        </select>
      </div>

      <div className="flex gap-2">
        <input
          type="file"
          id="photos"
          className="border rounded-md px-3 py-2 w-full"
          multiple
        />
        <Button bgColor="bg-slate-500"> Upload</Button>
      </div>

      <div className="flex gap-3">
        <Button type="submit" bgColor="bg-emerald-600">
          Submit Itinerary
        </Button>
        <Button type="button" onClick={closeModal} bgColor="bg-rose-600">
          Close
        </Button>
      </div>
    </form>
  );
};

export default ItineraryForm;
