import { useState, useEffect } from "react";
import API from "../services/api";
const AdminMenuForm = ({ refreshMenu, existingMenu, setIsEditingMenu }) => {

  const [date, setDate] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  const handleSubmit = async () => {
    try {
      const data = {
        date: new Date().toISOString().split("T")[0], // ✅ FIX
        meals: {
          breakfast: breakfast.split(",").map(item => item.trim()),
          lunch: lunch.split(",").map(item => item.trim()),
          dinner: dinner.split(",").map(item => item.trim()),
        },
      };

      await API.post("/menu", data);

      alert("Menu uploaded successfully ✅");
      if (refreshMenu) refreshMenu();
      if (setIsEditingMenu) setIsEditingMenu(false);
      if (refreshMenu) {
        refreshMenu();
      }

      setDate("");
      setBreakfast("");
      setLunch("");
      setDinner("");

    } catch (err) {
      console.error(err);
      alert("Error uploading menu ❌");
    }
  };
  useEffect(() => {
    if (existingMenu && existingMenu.meals) {
      setBreakfast(existingMenu.meals.breakfast.join(", "));
      setLunch(existingMenu.meals.lunch.join(", "));
      setDinner(existingMenu.meals.dinner.join(", "));
    }

  }, [existingMenu]);
  const handleFocus = () => setIsEditingMenu(true);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">

      <h2 className="text-xl font-semibold mb-5 text-white">
        Upload Menu
      </h2>

      {/* INPUTS */}
      <div className="space-y-4">

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onFocus={handleFocus}
          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          placeholder="Breakfast (e.g. idli, dosa)"
          value={breakfast}
          onChange={(e) => setBreakfast(e.target.value)}
          onFocus={handleFocus}
          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          placeholder="Lunch (e.g. rice, dal)"
          value={lunch}
          onChange={(e) => setLunch(e.target.value)}
          onFocus={handleFocus}
          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          placeholder="Dinner (e.g. roti, curry)"
          value={dinner}
          onChange={(e) => setDinner(e.target.value)}
          onFocus={handleFocus}
          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium shadow-md hover:scale-[1.02] hover:shadow-lg transition"
      >
        {existingMenu ? "Update Menu" : "Upload Menu"}
      </button>

    </div>
  );
};

export default AdminMenuForm;