import React, { useState } from "react";

export function SearchBar({ setSearch }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Live Filter Handler
  const handleLiveSearch = (value) => {
    setSearchTerm(value);

    // If empty -> clear filter, else -> filter grid
    if (!value.trim()) {
      setSearch(""); 
    } else {
      setSearch(value.toLowerCase().trim());
    }
  };

  // Manual Trigger (Button/Enter)
  const handleSearch = () => {
    const company = searchTerm.toLowerCase().trim();
    setSearch(company);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4">
      <div className={`relative w-full max-w-3xl transition-all duration-300 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
        
        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full blur opacity-20 transition duration-500 ${isFocused ? 'opacity-40' : 'opacity-20'}`}></div>

        <div className="relative flex items-center">
          {/* Search Icon */}
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

          {/* Input Field */}
          <input
            type="text"
            className="w-full pl-16 pr-32 py-4 text-lg text-slate-700 bg-white rounded-full border border-slate-200 shadow-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
            placeholder="Search company reviews..."
            value={searchTerm}
            onChange={(e) => handleLiveSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Search Button */}
          <div className="absolute right-2.5">
            <button 
              onClick={handleSearch}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden sm:block">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Trending Quick Filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
          <span>Trending:</span>
          {["Google", "Microsoft", "Amazon", "Adobe"].map((company) => (
            <span
              key={company}
              onClick={() => {
                setSearchTerm(company);
                setSearch(company.toLowerCase());
              }}
              className="cursor-pointer hover:text-purple-600 hover:underline transition-colors font-medium"
            >
              {company}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}