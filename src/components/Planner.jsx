import { useState } from "react";
import ItineraryForm from "./ItineraryForm";
import Modal from "./Modal";
import { useAuthStore, useModalStore } from "../global/store";
import SearchComponent from "./SearchComponent";


const Planner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = useModalStore((state) => state.openModal)
  const user = useAuthStore((state) => state.user);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className="mt-5 px-10">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          {user ? (
            <h1 className="text-2xl font-bold mb-4">
              Welcome, {user.displayName} 🤗
            </h1>
          ) : (
            <h1 className="text-2xl font-bold mb-4 text-rose-600">
              Authenticate First 😒😤
            </h1>
          )}
          <button
            onClick={openModal}
            disabled={!user}
            className={`border px-3 py-2  text-white rounded-md font-semibold bg-slate-900 ${
              !user ? "cursor-not-allowed " : "cursor-pointer"
            }`}
          >
            <span className="text-xl">+</span> Create New Itinerary
          </button>
        </div>
        <div className="mt-3">
          <SearchComponent />
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ItineraryForm />
        </Modal>
      </div>
    </div>
  );
};

export default Planner;
