import React from "react";
import { useNavigate } from "react-router-dom";

export function AddCompanyButton() {
  const navigate = useNavigate();

  const handleAddReview = () => {
    const token = localStorage.getItem("token"); // ✅ proper login check

    if (!token) {
      navigate("/login"); // ✅ redirect if NOT logged in
    } else {
      navigate("/share-experience"); // ✅ go to share page if logged in
    }
  };

  return (
    <div className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={handleAddReview}
        className="
          group relative w-16 h-16 sm:w-20 sm:h-20
          rounded-full bg-gradient-to-r from-indigo-600 to-purple-600
          hover:from-indigo-700 hover:to-purple-700
          text-white text-3xl font-bold
          flex items-center justify-center
          shadow-2xl shadow-purple-500/40
          transition-all duration-300
          hover:scale-110 active:scale-95
        "
      >
        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition" />

        {/* Plus icon */}
        <span className="relative z-10">+</span>
      </button>
    </div>
  );
}
