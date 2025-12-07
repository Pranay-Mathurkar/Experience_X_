import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const [myExperiences, setMyExperiences] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyAccount();
  }, []);

  const fetchMyAccount = async () => {
    const resUser = await axios.get("http://localhost:PORT/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const resExp = await axios.get("http://localhost:PORT/api/my-experiences", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUser(resUser.data.user);
    setMyExperiences(resExp.data);
  };

  const deletePost = async (id) => {
    if (!confirm("Delete this experience?")) return;

    await axios.delete(`http://localhost:PORT/api/share-experience/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setMyExperiences((prev) => prev.filter((exp) => exp._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* ================= MY EXPERIENCES ================= */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">My Experiences</h2>

        {myExperiences.map((exp) => (
          <div key={exp._id} className="bg-white p-4 rounded-xl shadow mb-4">

            <h3 className="font-semibold">{exp.company} — {exp.role}</h3>

            <div className="flex gap-4 mt-2 text-sm">
              <button
                onClick={() => navigate(`/edit/${exp._id}`)}
                className="text-indigo-600"
              >
                Edit
              </button>

              <button
                onClick={() => deletePost(exp._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ================= FOLLOWED COMPANIES ================= */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">Followed Companies</h2>

        <div className="flex gap-3 flex-wrap">
          {user?.followedCompanies?.map((c, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ================= BOOKMARKS ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Bookmarked Experiences</h2>

        <div className="grid gap-4">
          {user?.bookmarks?.map((id) => (
            <p
              key={id}
              onClick={() => navigate(`/experience/${id}`)}
              className="cursor-pointer text-indigo-600"
            >
              View bookmarked experience
            </p>
          ))}
        </div>
      </section>

    </div>
  );
}


