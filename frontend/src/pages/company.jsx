// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { useParams } from "react-router-dom";
// // // // // // import axios from "axios";

// // // // // // export default function Company() {
// // // // // //   const { companyName } = useParams(); // comes from /company/:companyName
// // // // // //   const [experiences, setExperiences] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     fetchCompanyExperiences();
// // // // // //   }, [companyName]);

// // // // // //   const fetchCompanyExperiences = async () => {
// // // // // //     try {
// // // // // //       const res = await axios.get(
// // // // // //         `http://localhost:5000/api/company/${companyName}`
// // // // // //       );
// // // // // //       setExperiences(res.data.data);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching company experiences", error);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div style={{ padding: "30px" }}>
// // // // // //       <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
// // // // // //         {companyName.toUpperCase()} Interview Experiences
// // // // // //       </h1>

// // // // // //       {experiences.length === 0 ? (
// // // // // //         <p style={{ textAlign: "center" }}>
// // // // // //           No interview experiences found for this company.
// // // // // //         </p>
// // // // // //       ) : (
// // // // // //         experiences.map((exp) => (
// // // // // //           <div
// // // // // //             key={exp._id}
// // // // // //             style={{
// // // // // //               border: "1px solid #ccc",
// // // // // //               borderRadius: "10px",
// // // // // //               padding: "20px",
// // // // // //               marginBottom: "20px",
// // // // // //               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
// // // // // //             }}
// // // // // //           >
// // // // // //             <h3>{exp.role}</h3>
// // // // // //             <p><b>Location:</b> {exp.location}</p>
// // // // // //             <p><b>Season:</b> {exp.season}</p>
// // // // // //             <p><b>Type:</b> {exp.interviewType}</p>
// // // // // //             <p><b>Offer Status:</b> {exp.offerStatus}</p>
// // // // // //             <p><b>Overall Difficulty:</b> {exp.overallDifficulty}</p>
// // // // // //             <p style={{ marginTop: "10px" }}>{exp.overallExperience}</p>
// // // // // //           </div>
// // // // // //         ))
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useParams } from "react-router-dom";
// // // // // import axios from "axios";

// // // // // export default function Company() {
// // // // //   const { companyName } = useParams(); // /company/google
// // // // //   const [experiences, setExperiences] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     fetchCompanyExperiences();
// // // // //   }, [companyName]);

// // // // //   const fetchCompanyExperiences = async () => {
// // // // //     try {
// // // // //       const res = await axios.get(
// // // // //         `http://localhost:3000/api/company/${companyName}`
// // // // //       );

// // // // //       setExperiences(res.data.data);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching company experiences:", error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return <h2 className="text-center mt-10">Loading...</h2>;
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-slate-50 p-8">
// // // // //       <h1 className="text-4xl font-bold text-center mb-10 uppercase">
// // // // //         {companyName} Interview Experiences
// // // // //       </h1>

// // // // //       {experiences.length === 0 ? (
// // // // //         <p className="text-center text-gray-500">
// // // // //           No interview experiences found for this company.
// // // // //         </p>
// // // // //       ) : (
// // // // //         <div className="max-w-4xl mx-auto space-y-6">
// // // // //           {experiences.map((exp) => (
// // // // //             <div
// // // // //               key={exp._id}
// // // // //               className="bg-white p-6 rounded-xl shadow border"
// // // // //             >
// // // // //               <h2 className="text-xl font-bold mb-2">{exp.role}</h2>

// // // // //               <p><b>Location:</b> {exp.location || "N/A"}</p>
// // // // //               <p><b>Season:</b> {exp.season || "N/A"}</p>
// // // // //               <p><b>Type:</b> {exp.interviewType}</p>
// // // // //               <p><b>Status:</b> {exp.offerStatus}</p>
// // // // //               <p><b>Difficulty:</b> {exp.overallDifficulty}</p>

// // // // //               <hr className="my-3" />

// // // // //               <p className="text-gray-700">
// // // // //                 {exp.mainExperience}
// // // // //               </p>

// // // // //               {exp.tips && (
// // // // //                 <p className="mt-2 text-sm text-green-700">
// // // // //                   <b>Tips:</b> {exp.tips}
// // // // //                 </p>
// // // // //               )}

// // // // //               <p className="text-xs text-gray-400 mt-3">
// // // // //                 Shared by: {exp.user?.name || "Anonymous"}
// // // // //               </p>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import React, { useEffect, useState } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import axios from "axios";

// // // // export default function Company() {
// // // //   const { companyName } = useParams();
// // // //   const navigate = useNavigate();

// // // //   const [experiences, setExperiences] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     fetchCompanyExperiences();
// // // //   }, [companyName]);

// // // //   const fetchCompanyExperiences = async () => {
// // // //     try {
// // // //       const res = await axios.get(
// // // //         `http://localhost:3000/api/company/${companyName}`
// // // //       );
// // // //       setExperiences(res.data.data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching company experiences:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const totalInterviews = experiences.length;

// // // //   if (loading) {
// // // //     return <h2 className="text-center mt-20 text-xl">Loading...</h2>;
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-100">

// // // //       {/* ================= HEADER BANNER ================= */}
// // // //       <div className="relative bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 h-[220px] rounded-b-[32px]">
// // // //         <div className="absolute top-6 left-6">
// // // //           <button
// // // //             onClick={() => navigate("/home")}
// // // //             className="text-white text-sm opacity-80 hover:opacity-100"
// // // //           >
// // // //             ← Back to Companies
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* ================= COMPANY CARD ================= */}
// // // //       <div className="max-w-6xl mx-auto px-6 -mt-20">
// // // //         <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-start">

// // // //           {/* Logo Placeholder */}
// // // //           <div className="w-28 h-28 bg-slate-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
// // // //             Logo
// // // //           </div>

// // // //           {/* Left Content */}
// // // //           <div className="flex-1">
// // // //             <h1 className="text-3xl font-bold capitalize">
// // // //               {companyName}
// // // //             </h1>

// // // //             <p className="text-sm text-gray-500 mt-1">
// // // //               Technology · Multiple Locations
// // // //             </p>

// // // //             <h3 className="mt-5 font-semibold text-gray-800">About</h3>
// // // //             <p className="text-gray-600 text-sm mt-2 leading-relaxed">
// // // //               {companyName} is one of the leading tech companies where candidates
// // // //               frequently share their interview experiences to help others.
// // // //             </p>
// // // //           </div>

// // // //           {/* Right Stats Box */}
// // // //           <div className="bg-slate-50 border rounded-xl p-5 w-full md:w-64 space-y-4">
// // // //             <div className="flex justify-between text-sm">
// // // //               <span className="text-gray-500">Overall Rating</span>
// // // //               <span className="font-semibold">4.5 ⭐</span>
// // // //             </div>

// // // //             <div className="flex justify-between text-sm">
// // // //               <span className="text-gray-500">Interview Difficulty</span>
// // // //               <span className="font-semibold text-red-500">Hard</span>
// // // //             </div>

// // // //             <div className="flex justify-between text-sm">
// // // //               <span className="text-gray-500">Total Interviews</span>
// // // //               <span className="font-semibold">{totalInterviews}</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* ================= INTERVIEWS LIST ================= */}
// // // //       <div className="max-w-5xl mx-auto px-6 mt-16 pb-20">
// // // //         <div className="flex justify-between items-center mb-6">
// // // //           <div>
// // // //             <h2 className="text-2xl font-bold">Recent Interviews</h2>
// // // //             <p className="text-sm text-gray-500">
// // // //               Real experiences shared by candidates
// // // //             </p>
// // // //           </div>

// // // //           <select className="border px-3 py-2 rounded-md text-sm">
// // // //             <option>Newest</option>
// // // //             <option>Oldest</option>
// // // //           </select>
// // // //         </div>

// // // //         {experiences.length === 0 ? (
// // // //           <p className="text-center text-gray-500 mt-10">
// // // //             No interview experiences found for this company.
// // // //           </p>
// // // //         ) : (
// // // //           <div className="space-y-6">
// // // //             {experiences.map((exp) => (
// // // //               <div
// // // //                 key={exp._id}
// // // //                 className="bg-white rounded-xl p-6 shadow border"
// // // //               >
// // // //                 <div className="flex justify-between items-start mb-4">
// // // //                   <div className="flex items-center gap-4">
// // // //                     <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold uppercase">
// // // //                       {exp.user?.name?.charAt(0) || "U"}
// // // //                     </div>

// // // //                     <div>
// // // //                       <h3 className="font-semibold">{exp.user?.name || "Anonymous"}</h3>
// // // //                       <p className="text-xs text-gray-500">{exp.role}</p>
// // // //                     </div>
// // // //                   </div>

// // // //                   <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 font-semibold">
// // // //                     {exp.offerStatus}
// // // //                   </span>
// // // //                 </div>

// // // //                 <div className="flex items-center text-yellow-400 mb-3">
// // // //                   ⭐⭐⭐⭐☆
// // // //                   <span className="text-xs text-gray-500 ml-2">
// // // //                     {exp.overallDifficulty}
// // // //                   </span>
// // // //                 </div>

// // // //                 <p className="text-gray-700 leading-relaxed text-sm">
// // // //                   {exp.mainExperience}
// // // //                 </p>

// // // //                 {exp.tips && (
// // // //                   <p className="mt-3 text-sm text-green-700">
// // // //                     <b>Tips:</b> {exp.tips}
// // // //                   </p>
// // // //                 )}

// // // //                 <div className="flex justify-between text-xs text-gray-400 mt-4">
// // // //                   <span>Location: {exp.location || "N/A"}</span>
// // // //                   <span>Season: {exp.season || "N/A"}</span>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }








// // // import React, { useEffect, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import axios from "axios";

// // // export default function Company() {
// // //   const { companyName } = useParams();
// // //   const navigate = useNavigate();

// // //   const [experiences, setExperiences] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetchCompanyExperiences();
// // //   }, [companyName]);

// // //   const fetchCompanyExperiences = async () => {
// // //     try {
// // //       const res = await axios.get(
// // //         `http://localhost:3000/api/company/${companyName}`
// // //       );
// // //       setExperiences(res.data.data);
// // //     } catch (error) {
// // //       console.error("Error fetching company experiences:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const totalInterviews = experiences.length;

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-slate-50">
// // //         <p className="text-gray-600 text-sm tracking-wide">
// // //           Loading interview experiences...
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-slate-50">
// // //       {/* TOP GRADIENT BANNER */}
// // //       <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-600 h-[230px]">
// // //         <div className="max-w-6xl mx-auto h-full flex items-start justify-between px-6 pt-6">
// // //           <button
// // //             onClick={() => navigate("/home")}
// // //             className="text-white/80 text-sm hover:text-white transition"
// // //           >
// // //             ← Back to companies
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* COMPANY CARD */}
// // //       <div className="max-w-6xl mx-auto px-6 -mt-20 pb-10">
// // //         <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
// // //           {/* Logo */}
// // //           <div className="flex flex-col items-center">
// // //             <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-gray-400 font-medium text-sm shadow-inner">
// // //               Logo
// // //             </div>
// // //             <button className="mt-4 px-4 py-1.5 text-xs rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50">
// // //               Visit website
// // //             </button>
// // //           </div>

// // //           {/* Company info */}
// // //           <div className="flex-1 min-w-0">
// // //             <h1 className="text-3xl font-semibold tracking-tight capitalize">
// // //               {companyName}
// // //             </h1>
// // //             <p className="text-sm text-gray-500 mt-1">
// // //               Technology • Multiple locations
// // //             </p>

// // //             <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-xl">
// // //               {companyName} is a leading technology company where candidates
// // //               actively share their interview journeys to help others prepare
// // //               better and make informed decisions.
// // //             </p>

// // //             <div className="flex flex-wrap gap-2 mt-4 text-[11px] text-slate-600">
// // //               <span className="px-2 py-1 rounded-full bg-slate-100">
// // //                 Interview experiences
// // //               </span>
// // //               <span className="px-2 py-1 rounded-full bg-slate-100">
// // //                 Ratings & difficulty
// // //               </span>
// // //               <span className="px-2 py-1 rounded-full bg-slate-100">
// // //                 Prep tips
// // //               </span>
// // //             </div>
// // //           </div>

// // //           {/* Stats */}
// // //           <div className="w-full md:w-64 bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-4">
// // //             <h3 className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
// // //               At a glance
// // //             </h3>

// // //             <div className="flex items-center justify-between text-sm">
// // //               <span className="text-gray-500">Overall rating</span>
// // //               <span className="font-semibold text-slate-800">
// // //                 4.5
// // //                 <span className="ml-1 text-amber-400">★</span>
// // //               </span>
// // //             </div>

// // //             <div className="flex items-center justify-between text-sm">
// // //               <span className="text-gray-500">Interview difficulty</span>
// // //               <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold">
// // //                 Hard
// // //               </span>
// // //             </div>

// // //             <div className="flex items-center justify-between text-sm">
// // //               <span className="text-gray-500">Total interviews</span>
// // //               <span className="font-semibold text-slate-900">
// // //                 {totalInterviews}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* INTERVIEW LIST HEADER */}
// // //         <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // //           <div>
// // //             <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
// // //               Recent interview experiences
// // //             </h2>
// // //             <p className="text-xs md:text-sm text-gray-500 mt-1">
// // //               Real stories shared by candidates who interviewed at{" "}
// // //               <span className="font-medium">{companyName}</span>.
// // //             </p>
// // //           </div>

// // //           <div className="flex items-center gap-3">
// // //             <span className="text-xs text-slate-500">Sort by</span>
// // //             <select className="border border-slate-200 bg-white text-sm

































// // // Company.jsx
// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // export default function Company() {
// //   const { companyName } = useParams();
// //   const navigate = useNavigate();

// //   const [experiences, setExperiences] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [sortOption, setSortOption] = useState("newest");

// //   useEffect(() => {
// //     fetchCompanyExperiences();
// //   }, [companyName]);

// //   const fetchCompanyExperiences = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:3000/api/company/${companyName}`
// //       );
// //       setExperiences(res.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching company experiences:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ================= STATS CALCULATIONS =================

// //   const totalInterviews = experiences.length;

// //   const averageRating =
// //     totalInterviews === 0
// //       ? 0
// //       : (
// //           experiences.reduce((sum, exp) => sum + (exp.rating || 0), 0) /
// //           totalInterviews
// //         ).toFixed(1);

// //   const difficultyMap = {
// //     Easy: 0,
// //     Medium: 0,
// //     Hard: 0,
// //   };

// //   experiences.forEach((exp) => {
// //     if (exp.overallDifficulty in difficultyMap) {
// //       difficultyMap[exp.overallDifficulty]++;
// //     }
// //   });

// //   const mostCommonDifficulty =
// //     Object.entries(difficultyMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

// //   const offerCount = experiences.filter(
// //     (exp) => exp.offerStatus === "Offered"
// //   ).length;

// //   // ================= SORTING =================

// //   const sortedExperiences = [...experiences].sort((a, b) => {
// //     if (sortOption === "newest") {
// //       return new Date(b.createdAt) - new Date(a.createdAt);
// //     }
// //     if (sortOption === "oldest") {
// //       return new Date(a.createdAt) - new Date(b.createdAt);
// //     }
// //     if (sortOption === "ratingHigh") {
// //       return (b.rating || 0) - (a.rating || 0);
// //     }
// //     if (sortOption === "ratingLow") {
// //       return (a.rating || 0) - (b.rating || 0);
// //     }
// //     return 0;
// //   });

// //   // ================= LOADING UI =================

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-50">
// //         <div className="flex flex-col items-center gap-3">
// //           <div className="h-10 w-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
// //           <p className="text-gray-600 text-sm tracking-wide">
// //             Loading interview experiences...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ================= MAIN UI =================

// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-900">
// //       {/* ================= TOP GRADIENT BANNER ================= */}
// //       <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-600 h-[230px]">
// //         <div className="max-w-6xl mx-auto h-full flex items-start justify-between px-6 pt-6">
// //           <button
// //             onClick={() => navigate("/home")}
// //             className="inline-flex items-center gap-2 text-white/80 text-sm hover:text-white transition"
// //           >
// //             <span className="text-lg">←</span>
// //             <span>Back to companies</span>
// //           </button>

// //           <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs border border-white/20 hover:bg-white/15 transition">
// //             <span className="h-2 w-2 rounded-full bg-emerald-400" />
// //             <span>Follow {companyName}</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* ================= COMPANY CARD ================= */}
// //       <div className="max-w-6xl mx-auto px-6 -mt-20 pb-12">
// //         <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
// //           {/* Logo + CTA */}
// //           <div className="flex flex-col items-start md:items-center gap-4">
// //             <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-gray-400 font-medium text-sm shadow-inner border border-slate-200">
// //               Logo
// //             </div>
// //             <button className="px-4 py-1.5 text-xs rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
// //               Visit website
// //             </button>
// //           </div>

// //           {/* Company info */}
// //           <div className="flex-1 min-w-0">
// //             <h1 className="text-3xl font-semibold tracking-tight capitalize">
// //               {companyName}
// //             </h1>
// //             <p className="text-sm text-gray-500 mt-1">
// //               Technology • Multiple locations
// //             </p>

// //             <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-xl">
// //               {companyName} is a leading technology company where candidates
// //               share detailed interview journeys, difficulty ratings, and prep
// //               strategies to help others make better career decisions.
// //             </p>

// //             <div className="flex flex-wrap gap-2 mt-4 text-[11px] text-slate-600">
// //               <span className="px-2 py-1 rounded-full bg-slate-100">
// //                 Interview experiences
// //               </span>
// //               <span className="px-2 py-1 rounded-full bg-slate-100">
// //                 Ratings & difficulty
// //               </span>
// //               <span className="px-2 py-1 rounded-full bg-slate-100">
// //                 Offer outcomes
// //               </span>
// //               <span className="px-2 py-1 rounded-full bg-slate-100">
// //                 Preparation tips
// //               </span>
// //             </div>
// //           </div>

// //           {/* ================= STATS ================= */}
// //           <div className="w-full md:w-64 bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-4">
// //             <h3 className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
// //               At a glance
// //             </h3>

// //             <div className="flex items-center justify-between text-sm">
// //               <span className="text-gray-500">Overall rating</span>
// //               <span className="font-semibold text-slate-800">
// //                 {averageRating}
// //                 <span className="ml-1 text-amber-400">★</span>
// //               </span>
// //             </div>

// //             <div className="flex items-center justify-between text-sm">
// //               <span className="text-gray-500">Interview difficulty</span>
// //               <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold">
// //                 {mostCommonDifficulty}
// //               </span>
// //             </div>

// //             <div className="flex items-center justify-between text-sm">
// //               <span className="text-gray-500">Total interviews</span>
// //               <span className="font-semibold text-slate-800">
// //                 {totalInterviews}
// //               </span>
// //             </div>

// //             <div className="flex items-center justify-between text-sm">
// //               <span className="text-gray-500">Offers received</span>
// //               <span className="font-semibold text-emerald-600">
// //                 {offerCount}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= SORT DROPDOWN ================= */}
// //         <div className="mt-8 flex justify-end">
// //           <select
// //             value={sortOption}
// //             onChange={(e) => setSortOption(e.target.value)}
// //             className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
// //           >
// //             <option value="newest">Newest</option>
// //             <option value="oldest">Oldest</option>
// //             <option value="ratingHigh">Rating: High to Low</option>
// //             <option value="ratingLow">Rating: Low to High</option>
// //           </select>
// //         </div>

// //         {/* ================= EXPERIENCE LIST ================= */}
// //         <div className="mt-8 grid gap-6">
// //           {sortedExperiences.length === 0 ? (
// //             <div className="text-center text-gray-500 py-16">
// //               No interview experiences found for this company.
// //             </div>
// //           ) : (
// //             sortedExperiences.map((exp) => (
// //               <div
// //                 key={exp._id}
// //                 className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
// //               >
// //                 <div className="flex justify-between items-center mb-3">
// //                   <h3 className="font-semibold text-slate-800">
// //                     {exp.role} — {exp.interviewType}
// //                   </h3>
// //                   <span className="text-xs text-gray-500">
// //                     {new Date(exp.createdAt).toLocaleDateString()}
// //                   </span>
// //                 </div>

// //                 <p className="text-sm text-gray-600 mb-3">
// //                   {exp.experience || "No description provided."}
// //                 </p>

// //                 <div className="flex flex-wrap gap-3 text-xs">
// //                   <span className="px-2 py-1 rounded-full bg-slate-100">
// //                     Difficulty: {exp.overallDifficulty}
// //                   </span>

// //                   <span className="px-2 py-1 rounded-full bg-slate-100">
// //                     Rating: {exp.rating || "N/A"} ★
// //                   </span>

// //                   <span
// //                     className={`px-2 py-1 rounded-full ${
// //                       exp.offerStatus === "Offered"
// //                         ? "bg-emerald-100 text-emerald-700"
// //                         : "bg-rose-100 text-rose-700"
// //                     }`}
// //                   >
// //                     {exp.offerStatus}
// //                   </span>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }













// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // export default function Company() {
// //   const { companyName } = useParams();
// //   const navigate = useNavigate();

// //   const [experiences, setExperiences] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [sortOption, setSortOption] = useState("newest");

// //   useEffect(() => {
// //     fetchCompanyExperiences();
// //   }, [companyName]);

// //   const fetchCompanyExperiences = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:3000/api/company/${companyName}`
// //       );
// //       setExperiences(res.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching company experiences:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ================= STATS CALCULATIONS =================

// //   const totalInterviews = experiences.length;

// //   const averageRating =
// //     totalInterviews === 0
// //       ? 0
// //       : (
// //           experiences.reduce((sum, exp) => sum + (exp.rating || 0), 0) /
// //           totalInterviews
// //         ).toFixed(1);

// //   const difficultyMap = {
// //     Easy: 0,
// //     Medium: 0,
// //     Hard: 0,
// //   };

// //   experiences.forEach((exp) => {
// //     if (exp.overallDifficulty in difficultyMap) {
// //       difficultyMap[exp.overallDifficulty]++;
// //     }
// //   });

// //   const mostCommonDifficulty =
// //     Object.entries(difficultyMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

// //   const offerCount = experiences.filter(
// //     (exp) => exp.offerStatus === "Offered"
// //   ).length;

// //   // ================= SORTING =================

// //   const sortedExperiences = [...experiences].sort((a, b) => {
// //     if (sortOption === "newest") {
// //       return new Date(b.createdAt) - new Date(a.createdAt);
// //     }
// //     if (sortOption === "oldest") {
// //       return new Date(a.createdAt) - new Date(b.createdAt);
// //     }
// //     if (sortOption === "ratingHigh") {
// //       return (b.rating || 0) - (a.rating || 0);
// //     }
// //     if (sortOption === "ratingLow") {
// //       return (a.rating || 0) - (b.rating || 0);
// //     }
// //     return 0;
// //   });

// //   // ================= LOADING UI =================

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-50">
// //         <div className="flex flex-col items-center gap-3">
// //           <div className="h-10 w-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
// //           <p className="text-gray-600 text-sm tracking-wide">
// //             Loading interview experiences...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ================= MAIN UI =================

// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-900">
// //       {/* ================= TOP GRADIENT BANNER ================= */}
// //       <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-600 h-[230px]">
// //         <div className="max-w-6xl mx-auto h-full flex items-start justify-between px-6 pt-6">
// //           <button
// //             onClick={() => navigate("/home")}
// //             className="inline-flex items-center gap-2 text-white/80 text-sm hover:text-white transition"
// //           >
// //             <span className="text-lg">←</span>
// //             <span>Back to companies</span>
// //           </button>

// //           <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs border border-white/20 hover:bg-white/15 transition">
// //             <span className="h-2 w-2 rounded-full bg-emerald-400" />
// //             <span>Follow {companyName}</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* ================= COMPANY CARD ================= */}
// //       <div className="max-w-6xl mx-auto px-6 -mt-20 pb-12">
// //         <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
// //           {/* Logo + CTA */}
// //           <div className="flex flex-col items-start md:items-center gap-4">
// //             <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-gray-400 font-medium text-sm shadow-inner border border-slate-200">
// //               Logo
// //             </div>
// //             <button className="px-4 py-1.5 text-xs rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
// //               Visit website
// //             </button>
// //           </div>

// //           {/* Company info */}
// //           <div className="flex-1 min-w-0">
// //             <h1 className="text-3xl font-semibold tracking-tight capitalize">
// //               {companyName}
// //             </h1>

// //             <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-xl">
// //               {companyName} is a leading technology company where candidates
// //               share detailed interview journeys, difficulty ratings, and prep
// //               strategies to help others make better career decisions.
// //             </p>
// //           </div>

// //           {/* ================= STATS ================= */}
// //           <div className="w-full md:w-64 bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-4">
// //             <div className="flex justify-between text-sm">
// //               <span>Overall Rating</span>
// //               <span>{averageRating} ★</span>
// //             </div>

// //             <div className="flex justify-between text-sm">
// //               <span>Difficulty</span>
// //               <span>{mostCommonDifficulty}</span>
// //             </div>

// //             <div className="flex justify-between text-sm">
// //               <span>Total Interviews</span>
// //               <span>{totalInterviews}</span>
// //             </div>

// //             <div className="flex justify-between text-sm">
// //               <span>Offers</span>
// //               <span>{offerCount}</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= SORT ================= */}
// //         <div className="mt-8 flex justify-end">
// //           <select
// //             value={sortOption}
// //             onChange={(e) => setSortOption(e.target.value)}
// //             className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
// //           >
// //             <option value="newest">Newest</option>
// //             <option value="oldest">Oldest</option>
// //             <option value="ratingHigh">Rating: High to Low</option>
// //             <option value="ratingLow">Rating: Low to High</option>
// //           </select>
// //         </div>

// //         {/* ================= EXPERIENCE LIST ================= */}
// //         <div className="mt-8 grid gap-6">
// //           {sortedExperiences.map((exp) => (
// //             <div
// //               key={exp._id}
// //               className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
// //             >
// //               <div className="flex justify-between items-center mb-2">
// //                 <h3 className="font-semibold">
// //                   {exp.role} — {exp.interviewType}
// //                 </h3>
// //                 <span className="text-xs text-gray-500">
// //                   {new Date(exp.createdAt).toLocaleDateString()}
// //                 </span>
// //               </div>

// //               {/* ✅✅✅ FIXED DESCRIPTION FIELD ✅✅✅ */}
// //               <p className="text-sm text-gray-600 mb-3">
// //                 {exp.mainExperience ||
// //                   exp.experience ||
// //                   exp.description ||
// //                   "No description provided."}
// //               </p>

// //               <div className="flex flex-wrap gap-3 text-xs">
// //                 <span className="px-2 py-1 rounded-full bg-slate-100">
// //                   Difficulty: {exp.overallDifficulty}
// //                 </span>

// //                 <span className="px-2 py-1 rounded-full bg-slate-100">
// //                   Rating: {exp.rating || "N/A"} ★
// //                 </span>

// //                 <span
// //                   className={`px-2 py-1 rounded-full ${
// //                     exp.offerStatus === "Offered"
// //                       ? "bg-emerald-100 text-emerald-700"
// //                       : "bg-rose-100 text-rose-700"
// //                   }`}
// //                 >
// //                   {exp.offerStatus}
// //                 </span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // export default function Company() {
// //   const { companyName } = useParams();
// //   const navigate = useNavigate();

// //   const [experiences, setExperiences] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [sortOption, setSortOption] = useState("newest");

// //   useEffect(() => {
// //     fetchCompanyExperiences();
// //   }, [companyName]);

// //   const fetchCompanyExperiences = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:3000/api/company/${companyName}`
// //       );
// //       setExperiences(res.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching company experiences:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ================= STATS =================

// //   const totalInterviews = experiences.length;

// //   const averageRating =
// //     totalInterviews === 0
// //       ? 0
// //       : (
// //           experiences.reduce((sum, exp) => sum + (exp.rating || 0), 0) /
// //           totalInterviews
// //         ).toFixed(1);

// //   // ================= SORTING =================

// //   const sortedExperiences = [...experiences].sort((a, b) => {
// //     if (sortOption === "newest") {
// //       return new Date(b.createdAt) - new Date(a.createdAt);
// //     }
// //     if (sortOption === "oldest") {
// //       return new Date(a.createdAt) - new Date(b.createdAt);
// //     }
// //     if (sortOption === "ratingHigh") {
// //       return (b.rating || 0) - (a.rating || 0);
// //     }
// //     if (sortOption === "ratingLow") {
// //       return (a.rating || 0) - (b.rating || 0);
// //     }
// //     return 0;
// //   });

// //   // ================= LOADING =================

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-50">
// //         <div className="flex flex-col items-center gap-3">
// //           <div className="h-10 w-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
// //           <p className="text-gray-600 text-sm tracking-wide">
// //             Loading interview experiences...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ================= MAIN UI =================

// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-900">
// //       {/* ================= HEADER ================= */}
// //       <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-600 h-[230px]">
// //         <div className="max-w-6xl mx-auto h-full flex items-start justify-between px-6 pt-6">
// //           <button
// //             onClick={() => navigate("/home")}
// //             className="inline-flex items-center gap-2 text-white/80 text-sm hover:text-white transition"
// //           >
// //             <span className="text-lg">←</span>
// //             <span>Back</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* ================= COMPANY CARD ================= */}
// //       <div className="max-w-6xl mx-auto px-6 -mt-20 pb-12">
// //         <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8">

// //           <div className="flex-1">
// //             <h1 className="text-3xl font-semibold tracking-tight capitalize">
// //               {companyName}
// //             </h1>

// //             <p className="text-sm text-gray-500 mt-3">
// //               Total Experiences: {totalInterviews}
// //             </p>
// //           </div>

// //           <div className="w-full md:w-64 bg-slate-50 border border-slate-100 rounded-xl p-5">
// //             <div className="flex justify-between text-sm">
// //               <span>Average Rating</span>
// //               <span>{averageRating} ★</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= SORT ================= */}
// //         <div className="mt-8 flex justify-end">
// //           <select
// //             value={sortOption}
// //             onChange={(e) => setSortOption(e.target.value)}
// //             className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
// //           >
// //             <option value="newest">Newest</option>
// //             <option value="oldest">Oldest</option>
// //             <option value="ratingHigh">Rating: High to Low</option>
// //             <option value="ratingLow">Rating: Low to High</option>
// //           </select>
// //         </div>

// //         {/* ================= EXPERIENCE CARDS ================= */}
// //         <div className="mt-8 grid gap-6">

// //           {sortedExperiences.map((exp) => (
// //             <div
// //               key={exp._id}
// //               onClick={() => navigate(`/experience/${exp._id}`)}
// //               className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
// //             >
// //               {/* ✅ ROLE + DATE */}
// //               <div className="flex justify-between items-center mb-2">
// //                 <h3 className="font-semibold text-lg">{exp.role}</h3>
// //                 <span className="text-xs text-gray-500">
// //                   {new Date(exp.createdAt).toLocaleDateString()}
// //                 </span>
// //               </div>

// //               {/* ✅ LOCATION */}
// //               <p className="text-sm text-gray-600 mb-1">
// //                 📍 {exp.location || "Not specified"}
// //               </p>

// //               {/* ✅ INTERVIEW TYPE */}
// //               <p className="text-sm text-gray-600 mb-2">
// //                 💼 {exp.interviewType}
// //               </p>

// //               {/* ✅ SHORT EXPERIENCE DESCRIPTION */}
// //               <p className="text-sm text-gray-700 mb-3 line-clamp-3">
// //                 {exp.mainExperience ||
// //                   exp.experience ||
// //                   exp.description ||
// //                   "No description provided."}
// //               </p>

// //               {/* ✅ RATING ONLY */}
// //               <div className="text-sm font-medium text-yellow-600">
// //                 ⭐ {exp.rating || "N/A"} / 5
// //               </div>
// //             </div>
// //           ))}

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Company() {
//   const { companyName } = useParams();
//   const navigate = useNavigate();

//   const [experiences, setExperiences] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOption, setSortOption] = useState("newest");

//   // ✅ FOLLOW + BOOKMARK STATE
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [bookmarks, setBookmarks] = useState([]);

//   const token = localStorage.getItem("token");
//   const API = "http://localhost:3000/api"; // ✅ change port if needed

//   useEffect(() => {
//     fetchCompanyExperiences();
//     fetchUserProfile();
//   }, [companyName]);

//   // ================= FETCH COMPANY DATA =================

//   const fetchCompanyExperiences = async () => {
//     try {
//       const res = await axios.get(`${API}/company/${companyName}`);
//       setExperiences(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching company experiences:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= FETCH USER (FOLLOW + BOOKMARKS) =================

//   const fetchUserProfile = async () => {
//     if (!token) return;

//     try {
//       const res = await axios.get(`${API}/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const user = res.data.user;

//       setIsFollowing(user.followedCompanies?.includes(companyName));
//       setBookmarks(user.bookmarks || []);
//     } catch (err) {
//       console.error("Failed to fetch user profile");
//     }
//   };

//   // ================= FOLLOW / UNFOLLOW =================

//   const toggleFollow = async () => {
//     if (!token) return alert("Please login to follow companies");

//     try {
//       const res = await axios.post(
//         `${API}/follow-company`,
//         { companyName },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setIsFollowing(res.data.followedCompanies.includes(companyName));
//     } catch (error) {
//       alert("Follow failed");
//     }
//   };

//   // ================= BOOKMARK =================

//   const toggleBookmark = async (experienceId, e) => {
//     e.stopPropagation(); // ✅ Prevent card click

//     if (!token) return alert("Login to bookmark");

//     try {
//       const res = await axios.post(
//         `${API}/bookmark`,
//         { experienceId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setBookmarks(res.data.bookmarks);
//     } catch (error) {
//       alert("Bookmark failed");
//     }
//   };

//   // ================= STATS =================

//   const totalInterviews = experiences.length;

//   const averageRating =
//     totalInterviews === 0
//       ? 0
//       : (
//           experiences.reduce((sum, exp) => sum + (exp.rating || 0), 0) /
//           totalInterviews
//         ).toFixed(1);

//   // ================= SORTING =================

//   const sortedExperiences = [...experiences].sort((a, b) => {
//     if (sortOption === "newest")
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     if (sortOption === "oldest")
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     if (sortOption === "ratingHigh") return (b.rating || 0) - (a.rating || 0);
//     if (sortOption === "ratingLow") return (a.rating || 0) - (b.rating || 0);
//     return 0;
//   });

//   // ================= LOADING =================

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="flex flex-col items-center gap-3">
//           <div className="h-10 w-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
//           <p className="text-gray-600 text-sm tracking-wide">
//             Loading interview experiences...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ================= MAIN UI =================

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">
//       {/* ================= HEADER ================= */}
//       <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-600 h-[230px]">
//         <div className="max-w-6xl mx-auto h-full flex items-start justify-between px-6 pt-6">
//           <button
//             onClick={() => navigate("/home")}
//             className="inline-flex items-center gap-2 text-white/80 text-sm hover:text-white transition"
//           >
//             <span className="text-lg">←</span>
//             <span>Back</span>
//           </button>
//         </div>
//       </div>

//       {/* ================= COMPANY CARD ================= */}
//       <div className="max-w-6xl mx-auto px-6 -mt-20 pb-12">
//         <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8">

//           <div className="flex-1">
//             <div className="flex items-center gap-4">
//               <h1 className="text-3xl font-semibold tracking-tight capitalize">
//                 {companyName}
//               </h1>

//               {/* ✅✅✅ FOLLOW BUTTON ✅✅✅ */}
//               <button
//                 onClick={toggleFollow}
//                 className={`px-4 py-1.5 rounded-full text-sm border transition ${
//                   isFollowing
//                     ? "bg-emerald-100 text-emerald-700 border-emerald-300"
//                     : "bg-indigo-600 text-white border-indigo-600"
//                 }`}
//               >
//                 {isFollowing ? "Following" : "Follow"}
//               </button>
//             </div>

//             <p className="text-sm text-gray-500 mt-3">
//               Total Experiences: {totalInterviews}
//             </p>
//           </div>

//           <div className="w-full md:w-64 bg-slate-50 border border-slate-100 rounded-xl p-5">
//             <div className="flex justify-between text-sm">
//               <span>Average Rating</span>
//               <span>{averageRating} ★</span>
//             </div>
//           </div>
//         </div>

//         {/* ================= SORT ================= */}
//         <div className="mt-8 flex justify-end">
//           <select
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
//           >
//             <option value="newest">Newest</option>
//             <option value="oldest">Oldest</option>
//             <option value="ratingHigh">Rating: High to Low</option>
//             <option value="ratingLow">Rating: Low to High</option>
//           </select>
//         </div>

//         {/* ================= EXPERIENCE CARDS ================= */}
//         <div className="mt-8 grid gap-6">
//           {sortedExperiences.map((exp) => (
//             <div
//               key={exp._id}
//               onClick={() => navigate(`/experience/${exp._id}`)}
//               className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer relative"
//             >
//               {/* ✅ BOOKMARK ICON */}
//               <button
//                 onClick={(e) => toggleBookmark(exp._id, e)}
//                 className="absolute top-4 right-4 text-xl"
//               >
//                 {bookmarks.includes(exp._id) ? "⭐" : "☆"}
//               </button>

//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-semibold text-lg">{exp.role}</h3>
//                 <span className="text-xs text-gray-500">
//                   {new Date(exp.createdAt).toLocaleDateString()}
//                 </span>
//               </div>

//               <p className="text-sm text-gray-600 mb-1">
//                 📍 {exp.location || "Not specified"}
//               </p>

//               <p className="text-sm text-gray-600 mb-2">
//                 💼 {exp.interviewType}
//               </p>

//               <p className="text-sm text-gray-700 mb-3 line-clamp-3">
//                 {exp.mainExperience ||
//                   exp.experience ||
//                   exp.description ||
//                   "No description provided."}
//               </p>

//               <div className="text-sm font-medium text-yellow-600">
//                 ⭐ {exp.rating || "N/A"} / 5
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Company() {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");

  // ✅ FOLLOW + BOOKMARK STATE
  const [isFollowing, setIsFollowing] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const token = localStorage.getItem("token");
  const API = "http://localhost:3000/api"; // ✅ Change if needed

  useEffect(() => {
    fetchCompanyExperiences();
    fetchUserProfile();
  }, [companyName]);

  // ================= FETCH COMPANY DATA =================

  const fetchCompanyExperiences = async () => {
    try {
      const res = await axios.get(`${API}/company/${companyName}`);
      setExperiences(res.data.data || []);
    } catch (error) {
      console.error("Error fetching company experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH USER (FOLLOW + BOOKMARKS) =================

  const fetchUserProfile = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${API}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = res.data.user;
      setIsFollowing(
  user.followedCompanies?.includes(companyName.toLowerCase())
);

      setBookmarks(user.bookmarks || []);
    } catch (err) {
      console.error("Failed to fetch user profile");
    }
  };

  // ================= FOLLOW / UNFOLLOW =================

  const toggleFollow = async () => {
    if (!token) return alert("Please login to follow companies");

    try {
      const res = await axios.post(
        `${API}/follow-company`,
       { companyName: companyName.toLowerCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsFollowing(
  res.data.followedCompanies.includes(companyName.toLowerCase())
);

    } catch (error) {
      alert("Follow failed");
    }
  };

  // ================= BOOKMARK =================

  const toggleBookmark = async (experienceId, e) => {
    e.stopPropagation();

    if (!token) return alert("Login to bookmark");

    try {
      const res = await axios.post(
        `${API}/bookmark`,
        { experienceId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookmarks(res.data.bookmarks);
    } catch (error) {
      alert("Bookmark failed");
    }
  };

  // ================= STATS =================

  const totalInterviews = experiences.length;

  const averageRating =
    totalInterviews === 0
      ? 0
      : (
          experiences.reduce((sum, exp) => sum + (exp.rating || 0), 0) /
          totalInterviews
        ).toFixed(1);

  // ================= SORTING =================

  const sortedExperiences = [...experiences].sort((a, b) => {
    if (sortOption === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOption === "ratingHigh") return (b.rating || 0) - (a.rating || 0);
    if (sortOption === "ratingLow") return (a.rating || 0) - (b.rating || 0);
    return 0;
  });

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-gray-600 text-sm tracking-wide">
            Loading interview experiences...
          </p>
        </div>
      </div>
    );
  }

  // ================= MAIN UI =================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= HEADER ================= */}
      <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-600 h-[230px]">
        <div className="max-w-6xl mx-auto h-full flex items-start justify-between px-6 pt-6">
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center gap-2 text-white text-sm hover:text-white/80 transition"
          >
            <span className="text-lg">←</span>
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* ================= COMPANY CARD ================= */}
      <div className="max-w-6xl mx-auto px-6 -mt-32 pb-12 relative z-10">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8">

          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight capitalize text-slate-900">
                {companyName || "Company"}
              </h1>

              {/* ✅ FOLLOW BUTTON */}
              <button
                onClick={toggleFollow}
                className={`px-4 py-1.5 rounded-full text-sm font-medium shadow ${
                  isFollowing
                    ? "bg-emerald-500 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Total Experiences: {totalInterviews}
            </p>
          </div>

          <div className="w-full md:w-64 bg-slate-50 border border-slate-100 rounded-xl p-5">
            <div className="flex justify-between text-sm">
              <span>Average Rating</span>
              <span>{averageRating} ★</span>
            </div>
          </div>
        </div>

        {/* ================= SORT ================= */}
        <div className="mt-8 flex justify-end">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="ratingHigh">Rating: High to Low</option>
            <option value="ratingLow">Rating: Low to High</option>
          </select>
        </div>

        {/* ================= EXPERIENCE CARDS ================= */}
        <div className="mt-8 grid gap-6">
          {sortedExperiences.map((exp) => (
            <div
              key={exp._id}
              onClick={() => navigate(`/experience/${exp._id}`)}
              className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer relative"
            >
              {/* ✅ BOOKMARK ICON */}
              <button
                onClick={(e) => toggleBookmark(exp._id, e)}
                className="absolute top-4 right-4 text-xl"
              >
                {bookmarks.includes(exp._id) ? "⭐" : "☆"}
              </button>

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{exp.role}</h3>
                <span className="text-xs text-gray-500">
                  {new Date(exp.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                📍 {exp.location || "Not specified"}
              </p>

              <p className="text-sm text-gray-600 mb-2">
                💼 {exp.interviewType}
              </p>

              <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                {exp.mainExperience ||
                  exp.experience ||
                  exp.description ||
                  "No description provided."}
              </p>

              <div className="text-sm font-medium text-yellow-600">
                ⭐ {exp.rating || "N/A"} / 5
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
