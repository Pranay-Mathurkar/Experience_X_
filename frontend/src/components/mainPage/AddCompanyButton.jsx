import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AddCompanyButton() {
  const handleAddReview = () => {
    const isLoggedIn = true;
    window.location.href = "/share-experience";
  };

  return (
    <div className="w-full flex justify-center mt-14 mb-20">
      <button
        onClick={handleAddReview}
        className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-2xl border-4 border-white/50"
      >
        +
      </button>
    </div>
  );
}