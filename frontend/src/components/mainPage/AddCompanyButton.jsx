import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AddCompanyButton() {
  const navigate = useNavigate();

  const handleClick = () => {
   
    const isLoggedIn = true; 

    if (isLoggedIn) {
      navigate('/add-review');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center mt-12 mb-20">
      <button
        onClick={handleClick}
        className="group w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
        title="Add a Review"
      >
       
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}