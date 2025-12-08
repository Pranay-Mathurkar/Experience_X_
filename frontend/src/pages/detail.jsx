// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ExperienceDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [experience, setExperience] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchExperience();
//   }, [id]);

//   const fetchExperience = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/api/experience/${id}`
//       );
//       setExperience(res.data.data);
//     } catch (error) {
//       console.error("Error loading experience", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= LOADING UI =================
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
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Experience not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 px-6 py-10">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">

//         {/* ================= HEADER ================= */}
//         <button
//           onClick={() => navigate(-1)}
//           className="text-sm text-indigo-600 mb-4"
//         >
//           ← Back
//         </button>

//         <h1 className="text-2xl font-bold mb-1">
//           {experience.company.toUpperCase()} — {experience.role}
//         </h1>

//         <p className="text-sm text-gray-500 mb-4">
//           📍 {experience.location} · 💼 {experience.interviewType} · ⭐{" "}
//           {experience.rating || "N/A"} / 5
//         </p>

//         {/* ================= MAIN EXPERIENCE ================= */}
//         <div className="mb-6">
//           <h2 className="font-semibold text-lg mb-2">Interview Experience</h2>
//           <p className="text-gray-700 leading-relaxed">
//             {experience.description || experience.mainExperience}
//           </p>
//         </div>

//         {/* ================= ROUNDS ================= */}
//         <div className="mb-6">
//           <h2 className="font-semibold text-lg mb-3">Interview Rounds</h2>

//           {experience.rounds?.map((round, index) => (
//             <div
//               key={index}
//               className="border border-slate-200 rounded-lg p-4 mb-4"
//             >
//               <h3 className="font-semibold mb-1">
//                 Round {index + 1} — {round.roundType}
//               </h3>

//               <p className="text-sm mb-2">
//                 Difficulty:{" "}
//                 <span className="font-medium">{round.difficulty}</span>
//               </p>

//               <ul className="list-disc ml-6 text-sm space-y-1">
//                 {round.questions.map((q, i) => (
//                   <li key={i}>{q}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* ================= TIPS ================= */}
//         {experience.tips && (
//           <div className="mb-6">
//             <h2 className="font-semibold text-lg mb-2">
//               Tips for Other Students
//             </h2>
//             <p className="text-gray-700">{experience.tips}</p>
//           </div>
//         )}

//         {/* ================= FINAL INFO ================= */}
//         <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
//           <p>
//             <span className="font-medium">Offer Status:</span>{" "}
//             {experience.offerStatus}
//           </p>
//           <p>
//             <span className="font-medium">Season:</span>{" "}
//             {experience.season || "N/A"}
//           </p>
//           <p>
//             <span className="font-medium">Created:</span>{" "}
//             {new Date(experience.createdAt).toLocaleDateString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        // IMPORTANT: matches your controller -> getSingleInterviewExperience
      const res = await axios.get(
  `http://localhost:3000/api/share-experience/${id}`
);

        // controller returns the document directly, NOT { data: ... }
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
          <p className="text-sm text-gray-600">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white px-6 py-4 rounded-xl shadow">
          <p className="text-gray-700">Experience not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-sm text-indigo-600"
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

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-indigo-600 mb-4"
        >
          ← Back
        </button>

        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-bold mb-1">
          {company?.toUpperCase()} — {role}
        </h1>

        <p className="text-sm text-gray-500 mb-3">
          📍 {location || "Location not specified"} · 💼 {interviewType} · ⭐{" "}
          {rating || "N/A"}/5
        </p>

        <p className="text-xs text-gray-400 mb-4">
          {createdAt && new Date(createdAt).toLocaleDateString()}{" "}
          {user && `• Shared by ${user.name}`}
        </p>

        {/* SUMMARY TAGS */}
        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          {season && (
            <span className="px-2 py-1 rounded-full bg-slate-100">
              Season: {season}
            </span>
          )}
          {overallDifficulty && (
            <span className="px-2 py-1 rounded-full bg-slate-100">
              Difficulty: {overallDifficulty}
            </span>
          )}
          {offerStatus && (
            <span
              className={`px-2 py-1 rounded-full ${
                offerStatus === "Offered"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              Offer: {offerStatus}
            </span>
          )}
        </div>

        {/* MAIN EXPERIENCE DESCRIPTION */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Overall Experience</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {mainExperience || "No description provided."}
          </p>
        </section>

        {/* ROUNDS & QUESTIONS */}
        {Array.isArray(rounds) && rounds.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Interview Rounds</h2>

            {rounds.map((round, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-lg p-4 mb-4"
              >
                <h3 className="font-semibold mb-1">
                  Round {index + 1} — {round.roundType || "Round"}
                </h3>

                <p className="text-sm mb-1">
                  Mode:{" "}
                  <span className="font-medium">
                    {round.mode || "Not specified"}
                  </span>
                </p>
                <p className="text-sm mb-2">
                  Difficulty:{" "}
                  <span className="font-medium">
                    {round.difficulty || "Not specified"}
                  </span>
                </p>

                {Array.isArray(round.questions) && round.questions.length > 0 && (
                  <>
                    <p className="text-sm font-medium mb-1">
                      Questions Asked:
                    </p>
                    <ul className="list-disc ml-6 text-sm space-y-1">
                      {round.questions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </section>
        )}

        {/* CODING LINKS (LEETCODE / GFG) */}
        {Array.isArray(codingLinks) && codingLinks.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Coding Question Links</h2>
            <ul className="list-disc ml-6 text-sm space-y-1">
              {codingLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* TIPS FOR OTHERS */}
        {tips && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Tips for Future Candidates
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{tips}</p>
          </section>
        )}

        {/* COMPENSATION (OPTIONAL) */}
        {(stipend || baseSalary || stocks) && (
          <section className="border-t pt-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {stipend && (
              <p>
                <span className="font-medium">Stipend:</span> {stipend}
              </p>
            )}
            {baseSalary && (
              <p>
                <span className="font-medium">Base Salary:</span> {baseSalary}
              </p>
            )}
            {stocks && (
              <p>
                <span className="font-medium">Stocks / ESOPs:</span> {stocks}
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
