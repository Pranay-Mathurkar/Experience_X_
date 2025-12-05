import React, { useState } from 'react';

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className={`relative w-full max-w-3xl transition-all duration-300 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
        
        <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full blur opacity-20 transition duration-500 ${isFocused ? 'opacity-40' : 'opacity-20'}`}></div>

        <div className="relative flex items-center">
          <div className="absolute left-6 pointer-events-none">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`transition-colors duration-300 ${isFocused ? 'text-purple-600' : 'text-slate-400'}`}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <input
            type="text"
            className="w-full pl-16 pr-32 py-5 text-lg text-slate-700 bg-white rounded-full border border-slate-200 shadow-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
            placeholder="Search company reviews..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <div className="absolute right-2.5">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
              <span>Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden sm:block">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
          <span>Trending:</span>
          <span className="cursor-pointer hover:text-purple-600 hover:underline transition-colors">Google</span>
          <span>•</span>
          <span className="cursor-pointer hover:text-purple-600 hover:underline transition-colors">Microsoft</span>
          <span>•</span>
          <span className="cursor-pointer hover:text-purple-600 hover:underline transition-colors">Remote Jobs</span>
        </div>

      </div>
    </div>
  );
}