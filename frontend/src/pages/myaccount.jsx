// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const ExperienceCard = ({ exp, onDelete, onEdit }) => (
// //   <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-indigo-300 relative overflow-hidden">
// //     <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
// //     <div className="relative z-10">
// //       <div className="flex items-start justify-between mb-3">
// //         <div className="flex-1">
// //           <h3 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
// //             {exp.company}
// //           </h3>
// //           <p className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
// //             {exp.role}
// //           </p>
// //         </div>
// //       </div>
      
// //       <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
// //         {exp.description || exp.mainExperience || "No description provided."}
// //       </p>
      
// //       <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
// //         <button
// //           onClick={() => onEdit(exp._id)}
// //           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-200 hover:scale-105"
// //         >
// //           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// //           </svg>
// //           Edit
// //         </button>
        
// //         <button
// //           onClick={() => onDelete(exp._id)}
// //           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-all duration-200 hover:scale-105"
// //         >
// //           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// //           </svg>
// //           Delete
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const StatCard = ({ icon, label, value, color = "indigo" }) => {
// //   const colorClasses = {
// //     indigo: {
// //       bg: "from-indigo-50 to-white",
// //       border: "border-indigo-100",
// //       iconBg: "bg-indigo-100",
// //       text: "text-indigo-600",
// //     },
// //     purple: {
// //       bg: "from-purple-50 to-white",
// //       border: "border-purple-100",
// //       iconBg: "bg-purple-100",
// //       text: "text-purple-600",
// //     },
// //     blue: {
// //       bg: "from-blue-50 to-white",
// //       border: "border-blue-100",
// //       iconBg: "bg-blue-100",
// //       text: "text-blue-600",
// //     },
// //   };

// //   const c = colorClasses[color];

// //   return (
// //     <div
// //       className={`bg-gradient-to-br ${c.bg} p-6 rounded-2xl border ${c.border} shadow-sm hover:shadow-md transition-all duration-300`}
// //     >
// //       <div className="flex items-center gap-4">
// //         <div className={`w-14 h-14 rounded-xl ${c.iconBg} flex items-center justify-center`}>
// //           <span className={`text-2xl ${c.text}`}>{icon}</span>
// //         </div>
// //         <div>
// //           <p className="text-sm text-slate-600 font-medium">{label}</p>
// //           <p className={`text-3xl font-bold ${c.text}`}>{value}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const API_BASE = "http://localhost:3000";

// // export default function MyAccount() {
// //   const [myExperiences, setMyExperiences] = useState([]);
// //   const [user, setUser] = useState(null);
// //   const [bookmarks, setBookmarks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");
// //   const headers = { Authorization: `Bearer ${token}` };

// //   const fetchBookmarks = async (bookmarkIds) => {
// //     if (!bookmarkIds || bookmarkIds.length === 0) {
// //       setBookmarks([]);
// //       return;
// //     }

// //     try {
// //       const bookmarkPromises = bookmarkIds.map((id) =>
// //         axios.get(`${API_BASE}/api/share-experience/${id}`, { headers })
// //       );

// //       const results = await Promise.allSettled(bookmarkPromises);

// //       const fulfilledBookmarks = results
// //         .filter((res) => res.status === "fulfilled")
// //         .map((res) => res.value.data);

// //       setBookmarks(fulfilledBookmarks);
// //     } catch (err) {
// //       console.error("Failed to fetch bookmarks:", err);
// //     }
// //   };

// //   const fetchMyAccount = async () => {
// //     if (!token) {
// //       navigate("/login");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError("");

// //       const [resUser, resExp] = await Promise.all([
// //         axios.get(`${API_BASE}/api/me`, { headers }),
// //         axios.get(`${API_BASE}/api/my-experiences`, { headers }),
// //       ]);

// //       const fetchedUser = resUser.data.user;
// //       setUser(fetchedUser);
// //       setMyExperiences(resExp.data);

// //       fetchBookmarks(fetchedUser.bookmarks);
// //     } catch (err) {
// //       console.error(err);
// //       if (err.response && err.response.status === 401) {
// //         setError("Session expired. Please log in again.");
// //         localStorage.removeItem("token");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         setError("Failed to load account data. Please try again.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMyAccount();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []); // run once on mount

// //   const deletePost = async (id) => {
// //     const confirmed = window.confirm(
// //       "Are you sure you want to permanently delete this experience?"
// //     );
// //     if (!confirmed) return;

// //     try {
// //       await axios.delete(`${API_BASE}/api/share-experience/${id}`, { headers });
// //       setMyExperiences((prev) => prev.filter((exp) => exp._id !== id));
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to delete experience.");
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   const handleGoHome = () => {
// //     navigate("/home");
// //   };

// //   const handleEdit = (id) => {
// //     navigate(`/edit/${id}`);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-xl font-semibold text-slate-700">Loading Your Account</p>
// //           <p className="text-sm text-slate-500 mt-2">Please wait...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error && !user) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-slate-50 p-6 flex items-center justify-center">
// //         <div className="bg-white border-2 border-rose-200 px-8 py-10 rounded-2xl shadow-xl text-center max-w-md">
// //           <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
// //               />
// //             </svg>
// //           </div>
// //           <p className="text-rose-700 font-bold text-lg mb-2">Error Loading Account</p>
// //           <p className="text-sm text-slate-600 mb-6">{error}</p>
// //           <button
// //             onClick={fetchMyAccount}
// //             className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50">
// //       {/* Header */}
// //       <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
// //         <div className="max-w-7xl mx-auto px-6 py-4">
// //           <div className="flex justify-between items-center">
// //             <div className="flex items-center gap-4">
// //               <button
// //                 onClick={handleGoHome}
// //                 className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// //                 </svg>
// //                 Back to Home
// //               </button>
// //               <div className="h-8 w-px bg-slate-300"></div>
// //               <div>
// //                 <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
// //                   My Dashboard
// //                 </h1>
// //                 <p className="text-sm text-slate-500 mt-1">Manage your professional experiences</p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={handleLogout}
// //               className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
// //             >
// //               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
// //                 />
// //               </svg>
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-6 py-8">
// //         {/* User Profile Card */}
// //         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl shadow-xl mb-8 text-white relative overflow-hidden">
// //           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
// //           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

// //           <div className="relative z-10 flex items-center gap-6">
// //             <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
// //               <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
// //                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
// //               </svg>
// //             </div>
// //             <div>
// //               <h2 className="text-3xl font-bold mb-2">
// //                 Welcome back, {user?.name || user?.email?.split("@")[0] || "User"}!
// //               </h2>
// //               <p className="text-indigo-100 flex items-center gap-2">
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                 </svg>
// //                 {user?.email || "N/A"}
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {error && (
// //           <div className="mb-6 rounded-xl bg-rose-50 border-l-4 border-rose-500 px-6 py-4 shadow-sm">
// //             <div className="flex items-center gap-3">
// //               <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// //                 />
// //               </svg>
// //               <p className="text-sm text-rose-700 font-medium">{error}</p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Stats Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           <StatCard icon="💼" label="Shared Experiences" value={myExperiences.length} color="indigo" />
// //           <StatCard
// //             icon="🏢"
// //             label="Following Companies"
// //             value={user?.followedCompanies?.length || 0}
// //             color="purple"
// //           />
// //           <StatCard icon="🔖" label="Bookmarked" value={bookmarks.length} color="blue" />
// //         </div>

// //         {/* My Experiences Section */}
// //         <section className="mb-10">
// //           <div className="flex items-center justify-between mb-6">
// //             <div>
// //               <h2 className="text-2xl font-bold text-slate-900">My Shared Experiences</h2>
// //               <p className="text-sm text-slate-500 mt-1">Experiences you've shared with the community</p>
// //             </div>
// //             <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
// //               {myExperiences.length} Total
// //             </span>
// //           </div>

// //           {myExperiences.length === 0 ? (
// //             <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-slate-200">
// //               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                 </svg>
// //               </div>
// //               <p className="text-slate-600 font-medium mb-2">No experiences yet</p>
// //               <p className="text-sm text-slate-500 mb-4">Start sharing your professional experiences with the community</p>
// //               <button
// //                 onClick={() => navigate("/share-experience")}
// //                 className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
// //               >
// //                 Share Your First Experience
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {myExperiences.map((exp) => (
// //                 <ExperienceCard key={exp._id} exp={exp} onEdit={handleEdit} onDelete={deletePost} />
// //               ))}
// //             </div>
// //           )}
// //         </section>

// //         {/* Followed Companies Section */}
// //         <section className="mb-10">
// //           <div className="flex items-center justify-between mb-6">
// //             <div>
// //               <h2 className="text-2xl font-bold text-slate-900">Followed Companies</h2>
// //               <p className="text-sm text-slate-500 mt-1">Companies you're tracking</p>
// //             </div>
// //             <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
// //               {user?.followedCompanies?.length || 0} Companies
// //             </span>
// //           </div>

// //           {!user?.followedCompanies || user.followedCompanies.length === 0 ? (
// //             <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-slate-200">
// //               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
// //                   />
// //                 </svg>
// //               </div>
// //               <p className="text-slate-600 font-medium mb-2">No followed companies</p>
// //               <p className="text-sm text-slate-500">Start following companies to stay updated</p>
// //             </div>
// //           ) : (
// //             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
// //               <div className="flex gap-3 flex-wrap">
// //                 {user.followedCompanies.map((c, i) => (
// //                   <button
// //                     key={i}
// //                     onClick={() => navigate(`/company/${c}`)}
// //                     className="group px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 text-sm font-semibold border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
// //                   >
// //                     🏢 {c}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </section>

// //         {/* Bookmarks Section */}
// //         <section>
// //           <div className="flex items-center justify-between mb-6">
// //             <div>
// //               <h2 className="text-2xl font-bold text-slate-900">Bookmarked Experiences</h2>
// //               <p className="text-sm text-slate-500 mt-1">Experiences saved for later</p>
// //             </div>
// //             <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
// //               {bookmarks.length} Saved
// //             </span>
// //           </div>

// //           {bookmarks.length === 0 ? (
// //             <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-slate-200">
// //               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
// //                 </svg>
// //               </div>
// //               <p className="text-slate-600 font-medium mb-2">No bookmarks yet</p>
// //               <p className="text-sm text-slate-500">Save experiences to read them later</p>
// //             </div>
// //           ) : (
// //             <div className="grid gap-4">
// //               {bookmarks.map((exp) => (
// //                 <div
// //                   key={exp._id}
// //                   onClick={() => navigate(`/experience/${exp._id}`)}
// //                   className="group bg-white p-6 rounded-2xl shadow-sm cursor-pointer border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
// //                 >
// //                   <div className="flex items-start justify-between">
// //                     <div className="flex-1">
// //                       <p className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
// //                         {exp.company} — {exp.role}
// //                       </p>
// //                       <p className="text-sm text-slate-600 line-clamp-2 mb-3">
// //                         {exp.mainExperience || exp.description || "Click to view details."}
// //                       </p>
// //                       <span className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium group-hover:gap-3 transition-all duration-200">
// //                         View Experience
// //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
// //                         </svg>
// //                       </span>
// //                     </div>
// //                     <svg className="w-6 h-6 text-blue-500 flex-shrink-0 ml-4" fill="currentColor" viewBox="0 0 24 24">
// //                       <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
// //                     </svg>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </section>
// //       </div>
// //     </div>
// //   );
// // }























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const ExperienceCard = ({ exp, onDelete, onEdit }) => (
//   <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-indigo-300 relative overflow-hidden">
//     <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
//     <div className="relative z-10">
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex-1">
//           <h3 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
//             {exp.company}
//           </h3>
//           <p className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
//             {exp.role}
//           </p>
//         </div>
//       </div>
      
//       <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
//         {exp.description || exp.mainExperience || "No description provided."}
//       </p>
      
//       <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
//         <button
//           onClick={() => onEdit(exp._id)}
//           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-200 hover:scale-105"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//           </svg>
//           Edit
//         </button>
        
//         <button
//           onClick={() => onDelete(exp._id)}
//           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-all duration-200 hover:scale-105"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//           </svg>
//           Delete
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const StatCard = ({ icon, label, value, color = "indigo" }) => {
//   const colorClasses = {
//     indigo: {
//       bg: "from-indigo-50 to-white",
//       border: "border-indigo-100",
//       iconBg: "bg-indigo-100",
//       text: "text-indigo-600",
//     },
//     purple: {
//       bg: "from-purple-50 to-white",
//       border: "border-purple-100",
//       iconBg: "bg-purple-100",
//       text: "text-purple-600",
//     },
//     blue: {
//       bg: "from-blue-50 to-white",
//       border: "border-blue-100",
//       iconBg: "bg-blue-100",
//       text: "text-blue-600",
//     },
//   };

//   const c = colorClasses[color];

//   return (
//     <div
//       className={`bg-gradient-to-br ${c.bg} p-6 rounded-2xl border ${c.border} shadow-sm hover:shadow-md transition-all duration-300`}
//     >
//       <div className="flex items-center gap-4">
//         <div className={`w-14 h-14 rounded-xl ${c.iconBg} flex items-center justify-center`}>
//           <span className={`text-2xl ${c.text}`}>{icon}</span>
//         </div>
//         <div>
//           <p className="text-sm text-slate-600 font-medium">{label}</p>
//           <p className={`text-3xl font-bold ${c.text}`}>{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const API_BASE = "https://experience-9t2k.onrender.com";

// export default function MyAccount() {
//   const [myExperiences, setMyExperiences] = useState([]);
//   const [user, setUser] = useState(null);
//   const [bookmarks, setBookmarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchBookmarks = async (bookmarkIds) => {
//     if (!bookmarkIds || bookmarkIds.length === 0) {
//       setBookmarks([]);
//       return;
//     }

//     try {
//       const bookmarkPromises = bookmarkIds.map((id) =>
//         axios.get(`${API_BASE}/api/share-experience/${id}`, { headers })
//       );

//       const results = await Promise.allSettled(bookmarkPromises);

//       const fulfilledBookmarks = results
//         .filter((res) => res.status === "fulfilled")
//         .map((res) => res.value.data);

//       setBookmarks(fulfilledBookmarks);
//     } catch (err) {
//       console.error("Failed to fetch bookmarks:", err);
//     }
//   };

//   const fetchMyAccount = async () => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const [resUser, resExp] = await Promise.all([
//         axios.get(`${API_BASE}/api/me`, { headers }),
//         axios.get(`${API_BASE}/api/my-experiences`, { headers }),
//       ]);

//       const fetchedUser = resUser.data.user;
//       setUser(fetchedUser);
//       setMyExperiences(resExp.data);

//       fetchBookmarks(fetchedUser.bookmarks);
//     } catch (err) {
//       console.error(err);
//       if (err.response && err.response.status === 401) {
//         setError("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         setError("Failed to load account data. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyAccount();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // run once on mount

//   const deletePost = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to permanently delete this experience?"
//     );
//     if (!confirmed) return;

//     try {
//       await axios.delete(`${API_BASE}/api/share-experience/${id}`, { headers });
//       setMyExperiences((prev) => prev.filter((exp) => exp._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete experience.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleGoHome = () => {
//     navigate("/home");
//   };

//   const handleEdit = (id) => {
//     navigate(`/edit/${id}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-xl font-semibold text-slate-700">Loading Your Account</p>
//           <p className="text-sm text-slate-500 mt-2">Please wait...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-slate-50 p-6 flex items-center justify-center">
//         <div className="bg-white border-2 border-rose-200 px-8 py-10 rounded-2xl shadow-xl text-center max-w-md">
//           <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//               />
//             </svg>
//           </div>
//           <p className="text-rose-700 font-bold text-lg mb-2">Error Loading Account</p>
//           <p className="text-sm text-slate-600 mb-6">{error}</p>
//           <button
//             onClick={fetchMyAccount}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50">
//       {/* Header */}
//       <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={handleGoHome}
//                 className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Home
//               </button>
//               <div className="h-8 w-px bg-slate-300"></div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   My Dashboard
//                 </h1>
//                 <p className="text-sm text-slate-500 mt-1">Manage your professional experiences</p>
//               </div>
//             </div>
//          <div className="flex items-center gap-3">
//   {/* Logout button */}
//   <button
//     onClick={handleLogout}
//     className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
//   >
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//       />
//     </svg>
//     Logout
//   </button>



//   {/* Icon-only dropdown menu */}
//   <div className="relative">
//     <details className="group">
//       <summary className="list-none flex items-center justify-center w-9 h-9 rounded-lg
//  bg-white/70 border border-slate-200 shadow-sm hover:bg-slate-50 cursor-pointer">
//         <svg
//           className="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M5 12h14M5 6h10M5 18h6"
//           />
//         </svg>
//       </summary>

//       <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
//         <button
//           onClick={() => navigate("/share-experience")}
//           className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
//         >
//           Share Experience
//         </button>
//         <button
//           onClick={() => navigate("/about")}
//           className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
//         >
//           About Us
//         </button>
//         <button
//           onClick={() => navigate("/chat")}
//           className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
//         >
//           Chat
//         </button>
//       </div>
//     </details>
//   </div>
// </div>

//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* User Profile Card */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl shadow-xl mb-8 text-white relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

//           <div className="relative z-10 flex items-center gap-6">
//             <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//               <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//               </svg>
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold mb-2">
//                 Welcome back, {user?.name || user?.email?.split("@")[0] || "User"}!
//               </h2>
//               <p className="text-indigo-100 flex items-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 {user?.email || "N/A"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 rounded-xl bg-rose-50 border-l-4 border-rose-500 px-6 py-4 shadow-sm">
//             <div className="flex items-center gap-3">
//               <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <p className="text-sm text-rose-700 font-medium">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <StatCard icon="💼" label="Shared Experiences" value={myExperiences.length} color="indigo" />
//           <StatCard
//             icon="🏢"
//             label="Following Companies"
//             value={user?.followedCompanies?.length || 0}
//             color="purple"
//           />
//           <StatCard icon="🔖" label="Bookmarked" value={bookmarks.length} color="blue" />
//         </div>

//         {/* My Experiences Section */}
//         <section className="mb-10">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-900">My Shared Experiences</h2>
//               <p className="text-sm text-slate-500 mt-1">Experiences you've shared with the community</p>
//             </div>
//             <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
//               {myExperiences.length} Total
//             </span>
//           </div>

//           {myExperiences.length === 0 ? (
//             <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-slate-200">
//               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <p className="text-slate-600 font-medium mb-2">No experiences yet</p>
//               <p className="text-sm text-slate-500 mb-4">Start sharing your professional experiences with the community</p>
//               <button
//                 onClick={() => navigate("/share-experience")}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
//               >
//                 Share Your First Experience
//               </button>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {myExperiences.map((exp) => (
//                 <ExperienceCard key={exp._id} exp={exp} onEdit={handleEdit} onDelete={deletePost} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Followed Companies Section */}
//         <section className="mb-10">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-900">Followed Companies</h2>
//               <p className="text-sm text-slate-500 mt-1">Companies you're tracking</p>
//             </div>
//             <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
//               {user?.followedCompanies?.length || 0} Companies
//             </span>
//           </div>

//           {!user?.followedCompanies || user.followedCompanies.length === 0 ? (
//             <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-slate-200">
//               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                   />
//                 </svg>
//               </div>
//               <p className="text-slate-600 font-medium mb-2">No followed companies</p>
//               <p className="text-sm text-slate-500">Start following companies to stay updated</p>
//             </div>
//           ) : (
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//               <div className="flex gap-3 flex-wrap">
//                 {user.followedCompanies.map((c, i) => (
//                   <button
//                     key={i}
//                     onClick={() => navigate(`/company/${c}`)}
//                     className="group px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 text-sm font-semibold border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
//                   >
//                     🏢 {c}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </section>

//         {/* Bookmarks Section */}
//         <section>
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-900">Bookmarked Experiences</h2>
//               <p className="text-sm text-slate-500 mt-1">Experiences saved for later</p>
//             </div>
//             <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
//               {bookmarks.length} Saved
//             </span>
//           </div>

//           {bookmarks.length === 0 ? (
//             <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-slate-200">
//               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                 </svg>
//               </div>
//               <p className="text-slate-600 font-medium mb-2">No bookmarks yet</p>
//               <p className="text-sm text-slate-500">Save experiences to read them later</p>
//             </div>
//           ) : (
//             <div className="grid gap-4">
//               {bookmarks.map((exp) => (
//                 <div
//                   key={exp._id}
//                   onClick={() => navigate(`/experience/${exp._id}`)}
//                   className="group bg-white p-6 rounded-2xl shadow-sm cursor-pointer border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <p className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
//                         {exp.company} — {exp.role}
//                       </p>
//                       <p className="text-sm text-slate-600 line-clamp-2 mb-3">
//                         {exp.mainExperience || exp.description || "Click to view details."}
//                       </p>
//                       <span className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium group-hover:gap-3 transition-all duration-200">
//                         View Experience
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                         </svg>
//                       </span>
//                     </div>
//                     <svg className="w-6 h-6 text-blue-500 flex-shrink-0 ml-4" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                     </svg>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ CORRECT API BASE
const API_BASE = "https://experience-9t2k.onrender.com/api";

const ExperienceCard = ({ exp, onDelete, onEdit }) => (
  <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200">
    <h3 className="font-bold text-lg text-slate-900">{exp.company}</h3>
    <p className="text-sm text-indigo-600 mb-2">{exp.role}</p>
    <p className="text-sm text-slate-600 line-clamp-3">
      {exp.mainExperience || "No description provided"}
    </p>

    <div className="flex gap-3 mt-4">
      <button
        onClick={() => onEdit(exp._id)}
        className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(exp._id)}
        className="px-4 py-2 text-sm bg-rose-100 text-rose-700 rounded"
      >
        Delete
      </button>
    </div>
  </div>
);

export default function MyAccount() {
  const [myExperiences, setMyExperiences] = useState([]);
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // ✅ SAFE BOOKMARK FETCH
  const fetchBookmarks = async (bookmarkIds = []) => {
    if (!bookmarkIds.length) {
      setBookmarks([]);
      return;
    }

    try {
      const results = await Promise.allSettled(
        bookmarkIds.map((id) =>
          axios.get(`${API_BASE}/share-experience/${id}`, { headers })
        )
      );

      const valid = results
        .filter((r) => r.status === "fulfilled" && r.value?.data)
        .map((r) => r.value.data);

      setBookmarks(valid);
    } catch (err) {
      console.error("Bookmark load failed:", err);
    }
  };

  // ✅ MAIN FETCH
  const fetchMyAccount = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [userRes, expRes] = await Promise.all([
        axios.get(`${API_BASE}/me`, { headers }),
        axios.get(`${API_BASE}/my-experiences`, { headers }),
      ]);

      if (!userRes.data?.user) {
        throw new Error("Session expired");
      }

      setUser(userRes.data.user);
      setMyExperiences(Array.isArray(expRes.data) ? expRes.data : []);

      fetchBookmarks(userRes.data.user.bookmarks || []);
    } catch (err) {
      console.error("Account load error:", err);
      setError("Session expired. Please login again.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setTimeout(() => navigate("/login"), 1200);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAccount();
  }, []);

  // ✅ DELETE EXPERIENCE (SAFE)
  const deletePost = async (id) => {
    if (!window.confirm("Delete this experience permanently?")) return;

    try {
      await axios.delete(`${API_BASE}/share-experience/${id}`, { headers });

      setMyExperiences((prev) => prev.filter((exp) => exp._id !== id));
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ✅ FULL LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEdit = (id) => navigate(`/edit/${id}`);

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  // ✅ ERROR UI
  if (error && !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow text-rose-600 text-center">
          {error}
          <div className="mt-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ MAIN UI
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-slate-200 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ✅ MY EXPERIENCES */}
      <h2 className="text-lg font-semibold mb-3">My Experiences</h2>

      {myExperiences.length === 0 ? (
        <p className="text-slate-500">No experiences yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {myExperiences.map((exp) => (
            <ExperienceCard
              key={exp._id}
              exp={exp}
              onEdit={handleEdit}
              onDelete={deletePost}
            />
          ))}
        </div>
      )}

      {/* ✅ BOOKMARKS */}
      <h2 className="text-lg font-semibold mt-10 mb-3">Bookmarks</h2>

      {bookmarks.length === 0 ? (
        <p className="text-slate-500">No bookmarks saved.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {bookmarks.map((b) => (
            <div
              key={b._id}
              onClick={() => navigate(`/experience/${b._id}`)}
              className="cursor-pointer bg-white p-4 rounded border hover:shadow"
            >
              <p className="font-bold">{b.company}</p>
              <p className="text-sm text-slate-600">{b.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
