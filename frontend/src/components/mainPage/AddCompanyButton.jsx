import React from "react";
import { useNavigate } from "react-router-dom";

export function AddCompanyButton() {
  const navigate = useNavigate();

  // Keep the navigation/authentication logic from the second version (5ebfe5a4516b...)
  const handleAddReview = () => {
    // Check for a token in localStorage for authentication
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login
      navigate("/login");
    } else {
      // If logged in, redirect to the review form
      navigate("/share-experience"); 
      // NOTE: The first version uses '/add-review'. 
      // You should confirm the correct path: '/add-review' or '/share-experience'.
    }
  };

  return (
    <div className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-50">
      <button
        // Use the combined click handler
        onClick={handleAddReview}
        // Use the highly-styled Tailwind classes and hover effects from the first version (HEAD)
        className="group w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
        title="Add a Review"
      >
        {/* Use the SVG plus icon from the first version (HEAD) for a better visual */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" // Adjusted size slightly
          height="28" // Adjusted size slightly
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="z-10"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        
        {/* Use the hover effect from the first version (HEAD) */}
        <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></span>
      </button>
    </div>
  );
}