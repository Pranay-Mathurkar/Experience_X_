// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // export default function ExperienceDetail() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [experience, setExperience] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchExperience();
// //   }, [id]);

// //   const fetchExperience = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:3000/api/experience/${id}`
// //       );
// //       setExperience(res.data.data);
// //     } catch (error) {
// //       console.error("Error loading experience", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ================= LOADING UI =================
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-50">
// //         <div className="flex flex-col items-center gap-3">
// //           <div className="h-10 w-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
// //           <p className="text-sm text-gray-600">Loading experience...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!experience) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <p>Experience not found</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-50 px-6 py-10">
// //       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">

// //         {/* ================= HEADER ================= */}
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="text-sm text-indigo-600 mb-4"
// //         >
// //           ← Back
// //         </button>

// //         <h1 className="text-2xl font-bold mb-1">
// //           {experience.company.toUpperCase()} — {experience.role}
// //         </h1>

// //         <p className="text-sm text-gray-500 mb-4">
// //           📍 {experience.location} · 💼 {experience.interviewType} · ⭐{" "}
// //           {experience.rating || "N/A"} / 5
// //         </p>

// //         {/* ================= MAIN EXPERIENCE ================= */}
// //         <div className="mb-6">
// //           <h2 className="font-semibold text-lg mb-2">Interview Experience</h2>
// //           <p className="text-gray-700 leading-relaxed">
// //             {experience.description || experience.mainExperience}
// //           </p>
// //         </div>

// //         {/* ================= ROUNDS ================= */}
// //         <div className="mb-6">
// //           <h2 className="font-semibold text-lg mb-3">Interview Rounds</h2>

// //           {experience.rounds?.map((round, index) => (
// //             <div
// //               key={index}
// //               className="border border-slate-200 rounded-lg p-4 mb-4"
// //             >
// //               <h3 className="font-semibold mb-1">
// //                 Round {index + 1} — {round.roundType}
// //               </h3>

// //               <p className="text-sm mb-2">
// //                 Difficulty:{" "}
// //                 <span className="font-medium">{round.difficulty}</span>
// //               </p>

// //               <ul className="list-disc ml-6 text-sm space-y-1">
// //                 {round.questions.map((q, i) => (
// //                   <li key={i}>{q}</li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>

// //         {/* ================= TIPS ================= */}
// //         {experience.tips && (
// //           <div className="mb-6">
// //             <h2 className="font-semibold text-lg mb-2">
// //               Tips for Other Students
// //             </h2>
// //             <p className="text-gray-700">{experience.tips}</p>
// //           </div>
// //         )}

// //         {/* ================= FINAL INFO ================= */}
// //         <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
// //           <p>
// //             <span className="font-medium">Offer Status:</span>{" "}
// //             {experience.offerStatus}
// //           </p>
// //           <p>
// //             <span className="font-medium">Season:</span>{" "}
// //             {experience.season || "N/A"}
// //           </p>
// //           <p>
// //             <span className="font-medium">Created:</span>{" "}
// //             {new Date(experience.createdAt).toLocaleDateString()}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ExperienceDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [experience, setExperience] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchExperience = async () => {
//       try {
//         // IMPORTANT: matches your controller -> getSingleInterviewExperience
//       const res = await axios.get(
//   `http://localhost:3000/api/share-experience/${id}`
// );

//         // controller returns the document directly, NOT { data: ... }
//         setExperience(res.data);
//       } catch (error) {
//         console.error("Error loading experience:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperience();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="flex flex-col items-center gap-3">
//           <div className="h-10 w-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
//           <p className="text-sm text-gray-600">Loading experience...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!experience) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="bg-white px-6 py-4 rounded-xl shadow">
//           <p className="text-gray-700">Experience not found.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-3 text-sm text-indigo-600"
//           >
//             ← Go back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // convenience
//   const {
//     company,
//     role,
//     location,
//     season,
//     interviewType,
//     offerStatus,
//     overallDifficulty,
//     mainExperience,
//     tips,
//     rounds,
//     codingLinks,
//     stipend,
//     baseSalary,
//     stocks,
//     createdAt,
//     user,
//     rating,
//   } = experience;

//   return (
//     <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
//         {/* BACK BUTTON */}
//         <button
//           onClick={() => navigate(-1)}
//           className="text-sm text-indigo-600 mb-4"
//         >
//           ← Back
//         </button>

//         {/* HEADER */}
//         <h1 className="text-2xl md:text-3xl font-bold mb-1">
//           {company?.toUpperCase()} — {role}
//         </h1>

//         <p className="text-sm text-gray-500 mb-3">
//           📍 {location || "Location not specified"} · 💼 {interviewType} · ⭐{" "}
//           {rating || "N/A"}/5
//         </p>

//         <p className="text-xs text-gray-400 mb-4">
//           {createdAt && new Date(createdAt).toLocaleDateString()}{" "}
//           {user && `• Shared by ${user.name}`}
//         </p>

//         {/* SUMMARY TAGS */}
//         <div className="flex flex-wrap gap-2 mb-6 text-xs">
//           {season && (
//             <span className="px-2 py-1 rounded-full bg-slate-100">
//               Season: {season}
//             </span>
//           )}
//           {overallDifficulty && (
//             <span className="px-2 py-1 rounded-full bg-slate-100">
//               Difficulty: {overallDifficulty}
//             </span>
//           )}
//           {offerStatus && (
//             <span
//               className={`px-2 py-1 rounded-full ${
//                 offerStatus === "Offered"
//                   ? "bg-emerald-100 text-emerald-700"
//                   : "bg-rose-100 text-rose-700"
//               }`}
//             >
//               Offer: {offerStatus}
//             </span>
//           )}
//         </div>

//         {/* MAIN EXPERIENCE DESCRIPTION */}
//         <section className="mb-8">
//           <h2 className="text-lg font-semibold mb-2">Overall Experience</h2>
//           <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//             {mainExperience || "No description provided."}
//           </p>
//         </section>

//         {/* ROUNDS & QUESTIONS */}
//         {Array.isArray(rounds) && rounds.length > 0 && (
//           <section className="mb-8">
//             <h2 className="text-lg font-semibold mb-3">Interview Rounds</h2>

//             {rounds.map((round, index) => (
//               <div
//                 key={index}
//                 className="border border-slate-200 rounded-lg p-4 mb-4"
//               >
//                 <h3 className="font-semibold mb-1">
//                   Round {index + 1} — {round.roundType || "Round"}
//                 </h3>

//                 <p className="text-sm mb-1">
//                   Mode:{" "}
//                   <span className="font-medium">
//                     {round.mode || "Not specified"}
//                   </span>
//                 </p>
//                 <p className="text-sm mb-2">
//                   Difficulty:{" "}
//                   <span className="font-medium">
//                     {round.difficulty || "Not specified"}
//                   </span>
//                 </p>

//                 {Array.isArray(round.questions) && round.questions.length > 0 && (
//                   <>
//                     <p className="text-sm font-medium mb-1">
//                       Questions Asked:
//                     </p>
//                     <ul className="list-disc ml-6 text-sm space-y-1">
//                       {round.questions.map((q, i) => (
//                         <li key={i}>{q}</li>
//                       ))}
//                     </ul>
//                   </>
//                 )}
//               </div>
//             ))}
//           </section>
//         )}

//         {/* CODING LINKS (LEETCODE / GFG) */}
//         {Array.isArray(codingLinks) && codingLinks.length > 0 && (
//           <section className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Coding Question Links</h2>
//             <ul className="list-disc ml-6 text-sm space-y-1">
//               {codingLinks.map((link, i) => (
//                 <li key={i}>
//                   <a
//                     href={link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-indigo-600 underline"
//                   >
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {/* TIPS FOR OTHERS */}
//         {tips && (
//           <section className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">
//               Tips for Future Candidates
//             </h2>
//             <p className="text-gray-700 whitespace-pre-line">{tips}</p>
//           </section>
//         )}

//         {/* COMPENSATION (OPTIONAL) */}
//         {(stipend || baseSalary || stocks) && (
//           <section className="border-t pt-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//             {stipend && (
//               <p>
//                 <span className="font-medium">Stipend:</span> {stipend}
//               </p>
//             )}
//             {baseSalary && (
//               <p>
//                 <span className="font-medium">Base Salary:</span> {baseSalary}
//               </p>
//             )}
//             {stocks && (
//               <p>
//                 <span className="font-medium">Stocks / ESOPs:</span> {stocks}
//               </p>
//             )}
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Icon for the main page header
const BriefcaseIcon = () => (
  <svg
    className="w-8 h-8 text-white mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13.255A23.518 23.518 0 0112 15c-3.18 0-6.23-1.076-8.705-3.145M19 19L5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6m0 0a2 2 0 012 2v1m0 0a2 2 0 01-2 2H5"
    />
  </svg>
);

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(
          `https://experience-9t2k.onrender.com/api/share-experience/${id}`
        );

        setExperience(res.data);
      } catch (error) {
        console.error("Error loading experience:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-base text-gray-600 font-medium">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p className="text-xl text-red-600 mb-4">😔 Experience not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  // convenience
  const {
    company,
    role,
    location,
    season,
    interviewType,
    offerStatus,
    overallDifficulty,
    mainExperience,
    tips,
    rounds,
    codingLinks,
    stipend,
    baseSalary,
    stocks,
    createdAt,
    user,
    rating,
  } = experience;

  const offerBadgeClass =
    offerStatus === "Offered"
      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
      : "bg-rose-100 text-rose-800 border border-rose-200";
  
  const ratingStars = "⭐".repeat(rating || 0) + "☆".repeat(5 - (rating || 0));

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* PAGE TITLE / BREADCRUMB */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            ← Back to all experiences
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* HEADER STRIP - Enhanced Gradient and Icon */}
          <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 px-6 py-6 md:px-8 flex items-start">
            <BriefcaseIcon />
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-indigo-200/90 mb-1">
                Interview Experience
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                {company?.toUpperCase()} &mdash; {role}
              </h1>
              <p className="text-sm mt-1 text-indigo-100/90">
                {location || "Location not specified"} · {interviewType || "N/A"}
              </p>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8 md:py-8 space-y-10">
            {/* SECTION: OVERVIEW 📊 */}
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-4 flex items-center gap-2">
                OVERVIEW & METRICS
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:shadow-md transition-shadow">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                    Interview Season
                  </p>
                  <p className="text-lg font-semibold text-slate-800">
                    🗓️ {season || "Not specified"}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:shadow-md transition-shadow">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                    Overall Difficulty
                  </p>
                  <p className="text-lg font-semibold text-slate-800">
                    {overallDifficulty || "Not specified"}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                      Outcome &amp; Rating
                    </p>
                    <p className="text-lg font-semibold text-slate-800">
                      {offerStatus || "Result not specified"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-medium text-slate-600">
                      Rating: {ratingStars}
                    </p>
                    {offerStatus && (
                      <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${offerBadgeClass}`}>
                        {offerStatus}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex flex-wrap gap-3 text-xs">
                {createdAt && (
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                    ✍️ Added on {new Date(createdAt).toLocaleDateString()}
                  </span>
                )}
                {user?.name && (
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                    Shared by {user.name}
                  </span>
                )}
                {interviewType && (
                  <span className="px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200 font-medium">
                    Type: {interviewType}
                  </span>
                )}
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* SECTION: DETAILED EXPERIENCE 📖 */}
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-4 flex items-center gap-2">
                DETAILED EXPERIENCE NARRATIVE
              </h2>
              <div className="border border-slate-200 rounded-xl bg-white p-5 shadow-inner">
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {mainExperience || "No detailed narrative provided for this experience."}
                </p>
              </div>
            </section>

            {/* SECTION: INTERVIEW ROUNDS 🔄 */}
            {Array.isArray(rounds) && rounds.length > 0 && (
              <>
                <hr className="border-slate-100" />
                <section>
                  <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-4 flex items-center gap-2">
                    INTERVIEW ROUNDS
                  </h2>

                  <div className="space-y-6">
                    {rounds.map((round, index) => (
                      <div
                        key={index}
                        className="relative border-l-4 border-indigo-400 pl-6 py-2 transition-shadow hover:shadow-lg rounded-r-xl bg-white"
                      >
                        <div className="absolute -left-3 top-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {index + 1}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <h3 className="text-lg font-bold text-slate-900">
                            {round.roundType || `Round ${index + 1}`}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                              💻 Mode: {round.mode || "N/A"}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                              Difficulty: {round.difficulty || "N/A"}
                            </span>
                          </div>
                        </div>

                        {Array.isArray(round.questions) &&
                          round.questions.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-slate-100">
                              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                                Key Questions Asked
                              </p>
                              <ul className="list-disc ml-5 text-base text-slate-800 space-y-2">
                                {round.questions.map((q, i) => (
                                  <li key={i}>{q}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* SECTION: CODING LINKS 🔗 */}
            {Array.isArray(codingLinks) && codingLinks.length > 0 && (
              <>
                <hr className="border-slate-100" />
                <section>
                  <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-4 flex items-center gap-2">
                    CODING QUESTION REFERENCES
                  </h2>
                  <div className="border border-slate-200 rounded-xl bg-slate-50 p-5 shadow-inner">
                    <p className="text-sm text-slate-600 mb-3">
                      Direct links to coding problems asked during the interview.
                    </p>
                    <ul className="list-disc ml-5 text-base space-y-2">
                      {codingLinks.map((link, i) => (
                        <li key={i}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 font-medium hover:text-indigo-800 underline underline-offset-2 transition-colors"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </>
            )}

            {/* SECTION: TIPS ✨ */}
            {tips && (
              <>
                <hr className="border-slate-100" />
                <section>
                  <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-4 flex items-center gap-2">
                    TIPS FOR FUTURE CANDIDATES
                  </h2>
                  <div className="border border-amber-300 rounded-xl bg-amber-50/70 p-5 shadow-lg">
                    <p className="text-base text-amber-900 leading-relaxed whitespace-pre-line">
                      {tips}
                    </p>
                  </div>
                </section>
              </>
            )}

            {/* SECTION: COMPENSATION 💰 */}
            {(stipend || baseSalary || stocks) && (
              <>
                <hr className="border-slate-100" />
                <section>
                  <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-4 flex items-center gap-2">
                    COMPENSATION DETAILS
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
                    {stipend && (
                      <div className="border border-green-200 rounded-xl bg-green-50/70 p-5 shadow-md">
                        <p className="text-xs text-green-700 uppercase tracking-wide mb-1">
                          💸 Stipend (Internship)
                        </p>
                        <p className="text-lg font-bold text-green-900">
                          {stipend}
                        </p>
                      </div>
                    )}
                    {baseSalary && (
                      <div className="border border-green-200 rounded-xl bg-green-50/70 p-5 shadow-md">
                        <p className="text-xs text-green-700 uppercase tracking-wide mb-1">
                          💵 Base Salary (FTE)
                        </p>
                        <p className="text-lg font-bold text-green-900">
                          {baseSalary}
                        </p>
                      </div>
                    )}
                    {stocks && (
                      <div className="border border-green-200 rounded-xl bg-green-50/70 p-5 shadow-md">
                        <p className="text-xs text-green-700 uppercase tracking-wide mb-1">
                          📈 Stocks / ESOPs
                        </p>
                        <p className="text-lg font-bold text-green-900">
                          {stocks}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}