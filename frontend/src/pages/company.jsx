// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function Company() {
//   const { companyName } = useParams(); // comes from /company/:companyName
//   const [experiences, setExperiences] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCompanyExperiences();
//   }, [companyName]);

//   const fetchCompanyExperiences = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/company/${companyName}`
//       );
//       setExperiences(res.data.data);
//     } catch (error) {
//       console.error("Error fetching company experiences", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
//   }

//   return (
//     <div style={{ padding: "30px" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
//         {companyName.toUpperCase()} Interview Experiences
//       </h1>

//       {experiences.length === 0 ? (
//         <p style={{ textAlign: "center" }}>
//           No interview experiences found for this company.
//         </p>
//       ) : (
//         experiences.map((exp) => (
//           <div
//             key={exp._id}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "20px",
//               marginBottom: "20px",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3>{exp.role}</h3>
//             <p><b>Location:</b> {exp.location}</p>
//             <p><b>Season:</b> {exp.season}</p>
//             <p><b>Type:</b> {exp.interviewType}</p>
//             <p><b>Offer Status:</b> {exp.offerStatus}</p>
//             <p><b>Overall Difficulty:</b> {exp.overallDifficulty}</p>
//             <p style={{ marginTop: "10px" }}>{exp.overallExperience}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Company() {
  const { companyName } = useParams(); // /company/google
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyExperiences();
  }, [companyName]);

  const fetchCompanyExperiences = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/company/${companyName}`
      );

      setExperiences(res.data.data);
    } catch (error) {
      console.error("Error fetching company experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 uppercase">
        {companyName} Interview Experiences
      </h1>

      {experiences.length === 0 ? (
        <p className="text-center text-gray-500">
          No interview experiences found for this company.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-white p-6 rounded-xl shadow border"
            >
              <h2 className="text-xl font-bold mb-2">{exp.role}</h2>

              <p><b>Location:</b> {exp.location || "N/A"}</p>
              <p><b>Season:</b> {exp.season || "N/A"}</p>
              <p><b>Type:</b> {exp.interviewType}</p>
              <p><b>Status:</b> {exp.offerStatus}</p>
              <p><b>Difficulty:</b> {exp.overallDifficulty}</p>

              <hr className="my-3" />

              <p className="text-gray-700">
                {exp.mainExperience}
              </p>

              {exp.tips && (
                <p className="mt-2 text-sm text-green-700">
                  <b>Tips:</b> {exp.tips}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-3">
                Shared by: {exp.user?.name || "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
