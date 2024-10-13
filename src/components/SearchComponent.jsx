import { useState, useEffect } from "react";
import TripDisplay from "./TripDisplay";
import { useAuthStore } from "../global/store";

const items = [
  {
    tripName: "European Adventure",
    destination: "Paris, France",
    activities: ["Sightseeing", "Dining", "Museum Tours"],
    startDate: "2024-05-01",
    endDate: "2024-05-10",
    tripType: "Adventure",
    photos: ["paris1.jpg", "paris2.jpg"],
  },
  {
    tripName: "Beach Vacation",
    destination: "Maldives",
    activities: ["Swimming", "Snorkeling", "Relaxing"],
    startDate: "2024-07-15",
    endDate: "2024-07-22",
    tripType: "Leisure",
    photos: ["maldives1.jpg", "maldives2.jpg"],
  },
  {
    tripName: "Business Trip to Tokyo",
    destination: "Tokyo, Japan",
    activities: ["Meetings", "Cultural Tours"],
    startDate: "2024-09-10",
    endDate: "2024-09-14",
    tripType: "Work",
    photos: ["tokyo1.jpg", "tokyo2.jpg"],
  },
];

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const user = useAuthStore((state) => state.user);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = items.filter(
      (item) =>
        item.destination.toLowerCase().includes(query) ||
        item.activity.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    console.log(filteredItems);
  }, [filteredItems]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search the items....."
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={searchQuery}
        onChange={handleSearch}
        disabled={!user}
      />
      <TripDisplay/>
    </div>
  );
};

export default SearchComponent;
