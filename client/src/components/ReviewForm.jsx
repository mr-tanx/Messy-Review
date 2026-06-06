import React, { useState } from "react";
import API from "../services/api";

const ReviewForm = () => {
  const [mealType, setMealType] = useState("");
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const tagOptions = ["Good", "Average", "Poor", "quality Issue","quantity issue"];

  // ✅ SINGLE CLEAN FUNCTION
  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    try {
      await API.post("/review", {
        userId: "user1",
        mealType,
        rating,
        tags,
        reviewText,
      });

      alert("Review submitted ✅");

      // ✅ RESET FORM
      setMealType("");
      setRating(0);
      setTags([]);
      setReviewText("");
    } catch (err) {
      alert("Error: " + err.response?.data?.error);
    }
  };

  // ✅ DISABLE BUTTON LOGIC
  const isDisabled = !mealType || rating === 0;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-white mb-5">
        Submit Review
      </h2>

      {/* SELECT MEAL */}
      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Select Meal</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>

      {/* RATING */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Rating</p>
        <div className="flex gap-2 text-xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer transition ${
                rating >= star
                  ? "text-yellow-400 scale-110"
                  : "text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* TAGS */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs transition ${
                tags.includes(tag)
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* TEXTAREA */}
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review..."
        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={isDisabled}
        className={`w-full py-3 rounded-lg font-medium shadow-md transition text-white
          ${
            isDisabled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] hover:shadow-lg"
          }`}
      >
        Submit Review
      </button>

    </div>
  );
};

export default ReviewForm;