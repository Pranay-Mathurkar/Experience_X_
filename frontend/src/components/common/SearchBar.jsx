// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export function SearchBar() {
//   const [isFocused, setIsFocused] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(""); // ✅ NEW
//   const navigate = useNavigate();

//   const API = "http://localhost:3000/api";

//   const handleSearch = async () => {
//     const company = searchTerm.toLowerCase().trim();
//     if (!company) return;

//     try {
//       setError("");

//       // ✅ CHECK IF COMPANY HAS ANY EXPERIENCE
//       const res = await axios.get(`${API}/company/${company}`);

//       if (res.data.data.length > 0) {
//         // ✅ ONLY NAVIGATE IF EXPERIENCE EXISTS
//         navigate(`/company/${company}`);
//       } else {
//         // ✅ STAY ON HOME + SHOW MESSAGE
//         setError(`❌ No experience added yet for "${company}"`);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div className="w-full flex justify-center py-10 px-4">
//       <div
//         className={`relative w-full max-w-3xl transition-all duration-300 ${
//           isFocused ? "scale-[1.02]" : "scale-100"
//         }`}
//       >
//         <div
//           className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full blur opacity-20 transition duration-500 ${
//             isFocused ? "opacity-40" : "opacity-20"
//           }`}
//         ></div>

//         <div className="relative flex items-center">
//           <div className="absolute left-6 pointer-events-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className={`transition-colors duration-300 ${
//                 isFocused ? "text-purple-600" : "text-slate-400"
//               }`}
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//             </svg>
//           </div>

//           {/* ✅ INPUT */}
//           <input
//             type="text"
//             className="w-full pl-16 pr-32 py-5 text-lg text-slate-700 bg-white rounded-full border border-slate-200 shadow-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
//             placeholder="Search company reviews..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />

//           {/* ✅ SEARCH BUTTON */}
//           <div className="absolute right-2.5">
//             <button
//               onClick={handleSearch}
//               className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
//             >
//               <span>Search</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="hidden sm:block"
//               >
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//                 <polyline points="12 5 19 12 12 19"></polyline>
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* ✅ ERROR MESSAGE ON HOME PAGE */}
//         {error && (
//           <p className="mt-4 text-red-600 font-semibold text-center">
//             {error}
//           </p>
//         )}

//         {/* ✅ TRENDING */}
//         <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
//           <span>Trending:</span>
//           {["Google", "Microsoft", "Amazon"].map((company) => (
//             <span
//               key={company}
//               onClick={() => setSearchTerm(company)}
//               className="cursor-pointer hover:text-purple-600 hover:underline transition-colors"
//             >
//               {company}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";

// export function SearchBar({ setSearch }) {
//   const [isFocused, setIsFocused] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = () => {
//     const company = searchTerm.toLowerCase().trim();
//     setSearch(company); // ✅ FILTERS CompanyGrid
//   };

//   return (
//     <div className="w-full flex justify-center py-10 px-4">
//       <div
//         className={`relative w-full max-w-3xl transition-all duration-300 ${
//           isFocused ? "scale-[1.02]" : "scale-100"
//         }`}
//       >
//         <div
//           className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full blur opacity-20 transition duration-500 ${
//             isFocused ? "opacity-40" : "opacity-20"
//           }`}
//         ></div>

//         <div className="relative flex items-center">
//           <div className="absolute left-6 pointer-events-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className={`transition-colors duration-300 ${
//                 isFocused ? "text-purple-600" : "text-slate-400"
//               }`}
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//             </svg>
//           </div>

//           {/* ✅ INPUT */}
//           <input
//             type="text"
//             className="w-full pl-16 pr-32 py-5 text-lg text-slate-700 bg-white rounded-full border border-slate-200 shadow-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
//             placeholder="Search company reviews..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />

//           {/* ✅ SEARCH BUTTON */}
//           <div className="absolute right-2.5">
//             <button
//               onClick={handleSearch}
//               className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
//             >
//               <span>Search</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="hidden sm:block"
//               >
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//                 <polyline points="12 5 19 12 12 19"></polyline>
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* ✅ TRENDING QUICK SEARCH */}
//         <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
//           <span>Trending:</span>
//           {["Google", "Microsoft", "Amazon"].map((company) => (
//             <span
//               key={company}
//               onClick={() => {
//                 setSearchTerm(company);
//                 setSearch(company.toLowerCase());
//               }}
//               className="cursor-pointer hover:text-purple-600 hover:underline transition-colors"
//             >
//               {company}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";

export function SearchBar({ setSearch }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ LIVE FILTER (same as filter input behavior)
  const handleLiveSearch = (value) => {
    setSearchTerm(value);

    // ✅ If empty → show all companies
    if (!value.trim()) {
      setSearch(""); 
    } else {
      setSearch(value.toLowerCase().trim());
    }
  };

  // ✅ Button & Enter key also work
  const handleSearch = () => {
    const company = searchTerm.toLowerCase().trim();
    setSearch(company);
  };

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div
        className={`relative w-full max-w-3xl transition-all duration-300 ${
          isFocused ? "scale-[1.02]" : "scale-100"
        }`}
      >
        {/* Glow */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full blur opacity-20 transition duration-500 ${
            isFocused ? "opacity-40" : "opacity-20"
          }`}
        ></div>

        {/* Search Box */}
        <div className="relative flex items-center">
          {/* Icon */}
          <div className="absolute left-6 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-colors duration-300 ${
                isFocused ? "text-purple-600" : "text-slate-400"
              }`}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* ✅ INPUT (LIVE FILTER) */}
          <input
            type="text"
            className="w-full pl-16 pr-32 py-5 text-lg text-slate-700 bg-white rounded-full border border-slate-200 shadow-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
            placeholder="Search company reviews..."
            value={searchTerm}
            onChange={(e) => handleLiveSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* ✅ SEARCH BUTTON */}
          <div className="absolute right-2.5">
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hidden sm:block"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* ✅ TRENDING QUICK SEARCH (INSTANT FILTER) */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
          <span>Trending:</span>

          {["Google", "Microsoft", "Amazon"].map((company) => (
            <span
              key={company}
              onClick={() => {
                setSearchTerm(company);
                setSearch(company.toLowerCase());
              }}
              className="cursor-pointer hover:text-purple-600 hover:underline transition-colors"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
