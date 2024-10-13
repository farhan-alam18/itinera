import { useState, useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthStore } from "../global/store";
import Button from "./Button";

const TripDisplay = () => {
  const [tripList, setTripList] = useState([]);
  const user = useAuthStore((state) => state.user);
  const tripsCollectionRef = collection(db, "trips");

  const getTripList = async () => {
    if (!user) return;
    try {
      const q = query(tripsCollectionRef, where("user", "==", user.uid));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTripList(filteredData);
    } catch (err) {
      console.error("Error fetching trip list:", err);
    }
  };

  const deleteTrip = async (id) => {
    const tripDoc = doc(db, "trips", id);
    await deleteDoc(tripDoc);
  };

  useEffect(() => {
    getTripList();
  });

  if (!user) {
    return <p>Please log in to view your trips.</p>;
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">
      {tripList.map((trip, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-lg bg-white w-[70vw] max-w-[650px]"
        >
          <h2 className="text-xl font-bold">{trip.tripName}</h2>
          <p className="text-gray-700">
            <strong>Destination:</strong> {trip.destination}
          </p>
          <p className="text-gray-700">
            <strong>Activities:</strong> {trip.activities.join(", ")}
          </p>
          <p className="text-gray-700">
            <strong>Start Date:</strong> {trip.startDate}
          </p>
          <p className="text-gray-700">
            <strong>End Date:</strong> {trip.endDate}
          </p>
          <p className="text-gray-700">
            <strong>Trip Type:</strong> {trip.tripType}
          </p>
          <div className="flex space-x-2">
            {trip.photos &&
              trip.photos.length > 0 &&
              trip.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={trip.tripName}
                  className="w-16 h-16 rounded-md object-cover"
                />
              ))}
          </div>
          <Button bgColor="bg-rose-600" onClick={() => deleteTrip(trip.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TripDisplay;
