import React, { useEffect, useState } from "react";
import API from "../services/api";
import ReviewForm from "../components/ReviewForm";
import AnalyticsChart from "../components/AnalyticsChart";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import AdminMenuForm from "../components/AdminMenuForm";

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const adminEmails = ["pondaraudaykumar1970@gmail.com"];
  const isAdmin = adminEmails.includes(user?.email);

  const [menu, setMenu] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  const [range, setRange] = useState("daily");

  // ✅ FETCH MENU
  const fetchMenu = async () => {
    try {
      const res = await API.get("/menu/today");
      setMenu(res.data?.data || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const res = await API.get("/review/today");
      setReviews(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FETCH ANALYTICS (FILTER BASED)
  const fetchAnalytics = async () => {
    try {
      const res = await API.get(`/review/analytics?range=${range}`);
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE REVIEW
  const handleDelete = async (id) => {
    try {
      await API.delete(`/review/${id}`);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ MAIN EFFECT
  useEffect(() => {
    fetchMenu();
    fetchReviews();
    fetchAnalytics();

    const interval = setInterval(() => {
      if (!isEditingMenu) {
        fetchMenu();
        fetchReviews();
      }
    }, 5000);

    return () => clearInterval(interval);

  }, [isEditingMenu, range]);

  // ✅ LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-gray-900">
        <h1 className="text-xl font-semibold tracking-wide">
          🍽️ Mess Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <img src={user?.photoURL} className="w-8 h-8 rounded-full" />
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">

        {/* HERO */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold">Today's Menu</h2>
          <p className="text-sm opacity-80">Quick overview of meals</p>
        </div>

        {/* MENU */}
        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 shadow-md">
          {menu && menu.meals ? (
            ["breakfast", "lunch", "dinner"].map((meal) => (
              <div
                key={meal}
                className="flex justify-between items-center p-3 mb-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
              >
                <div>
                  <p className="font-medium capitalize">{meal}</p>
                  <p className="text-xs text-gray-400">
                    {meal === "breakfast"
                      ? "7:30 AM"
                      : meal === "lunch"
                        ? "12:30 PM"
                        : "7:30 PM"}
                  </p>
                </div>

                <p className="text-sm text-gray-300 text-right max-w-[60%]">
                  {menu.meals[meal].join(", ")}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-3xl mb-2">🍽️</p>
              <p className="text-sm">No menu uploaded for today</p>
              <p className="text-xs text-gray-600 mt-1">
                Admin can add today’s menu
              </p>
            </div>
          )}
        </div>

        {/* ADMIN / REVIEW */}
        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 shadow-md">
          {isAdmin ? (
            <AdminMenuForm
              refreshMenu={fetchMenu}
              existingMenu={menu}
              setIsEditingMenu={setIsEditingMenu}
            />
          ) : (
            <ReviewForm />
          )}
        </div>

        {/* REVIEWS */}
        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 shadow-md">
          <h2 className="text-lg mb-4">Reviews</h2>

          {reviews?.length > 0 ? (
            reviews.map((r) => (
              <div
                key={r._id}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3 hover:bg-gray-700 transition"
              >
                <div>
                  <p className="font-medium">{r.mealType}</p>
                  <p className="text-xs text-gray-400">{r.reviewText}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-sm">
                    ⭐ {r.rating}
                  </span>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="text-red-400 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-3xl mb-2">💬</p>
              <p className="text-sm">No reviews yet</p>
              <p className="text-xs text-gray-600 mt-1">
                Be the first to share feedback
              </p>
            </div>
          )}
        </div>

        {/* ANALYTICS */}
        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 shadow-md">

          <h2 className="text-lg mb-4 text-white">Analytics</h2>

          {/* FILTER BUTTONS */}
          <div className="flex gap-2 mb-4">
            {["daily", "weekly", "monthly"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-full text-sm ${
                  range === r
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {analytics ? (
            <div className="space-y-4">

              <div className="flex justify-between text-sm text-gray-300">
                <p>Total Reviews: {analytics.totalReviews || 0}</p>
                <p>⭐ {analytics.avgRating || 0}</p>
              </div>

              <div className="w-full overflow-x-auto">
                <div className="min-w-[280px] max-w-md mx-auto">
                  <AnalyticsChart analytics={analytics} />
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-3xl mb-2">📊</p>
              <p className="text-sm">No analytics yet</p>
              <p className="text-xs text-gray-600 mt-1">
                Data will appear after reviews
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;