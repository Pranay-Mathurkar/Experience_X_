import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define a type for a single experience/post (assuming the structure)
const ExperienceCard = ({ exp, onDelete, onEdit }) => (
  <div key={exp._id} className="bg-white p-4 rounded-xl shadow mb-3 border border-slate-100 transition duration-150 hover:shadow-lg">
    <h3 className="font-semibold text-lg text-slate-800">
      {exp.company} — {exp.role}
    </h3>
    <p className="text-sm text-slate-500 mb-3 line-clamp-2">{exp.description || 'No description provided.'}</p>
    
    <div className="flex gap-4 text-sm">
      <button
        onClick={() => onEdit(exp._id)}
        className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
      >
        <i className="fas fa-edit mr-1"></i> Edit
      </button>
      
      <button
        onClick={() => onDelete(exp._id)}
        className="text-red-600 hover:text-red-800 font-medium transition duration-150"
      >
        <i className="fas fa-trash-alt mr-1"></i> Delete
      </button>
    </div>
  </div>
);

export default function MyAccount() {
  const [myExperiences, setMyExperiences] = useState([]);
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]); // State to hold fetched bookmark details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const API_BASE = "http://localhost:3000"; // change 3000 to your real API port

  const headers = { Authorization: `Bearer ${token}` };

  const fetchBookmarks = async (bookmarkIds) => {
    if (!bookmarkIds || bookmarkIds.length === 0) {
      setBookmarks([]);
      return;
    }
    
    try {
      // In a real app, you might have a dedicated endpoint like /api/experiences/batch?ids=...
      // For this example, we'll fetch them one by one or create a single request payload if the API supports it.
      // Assuming a /api/share-experience/:id endpoint exists.
      const bookmarkPromises = bookmarkIds.map(id =>
        axios.get(`${API_BASE}/api/share-experience/${id}`, { headers })
      );
      
      const results = await Promise.allSettled(bookmarkPromises);
      
      const fulfilledBookmarks = results
        .filter(res => res.status === 'fulfilled')
        .map(res => res.value.data);
      
      setBookmarks(fulfilledBookmarks);
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
      // Not setting an overall error, as the main page load was successful.
    }
  };

  const fetchMyAccount = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [resUser, resExp] = await Promise.all([
        axios.get(`${API_BASE}/api/me`, { headers }),
        axios.get(`${API_BASE}/api/my-experiences`, { headers }),
      ]);

      const fetchedUser = resUser.data.user;
      setUser(fetchedUser);
      setMyExperiences(resExp.data);

      // Fetch bookmark details after getting user data
      fetchBookmarks(fetchedUser.bookmarks);

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          setTimeout(() => navigate("/login"), 1500);
      } else {
          setError("Failed to load account data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [token, navigate]); // Added navigate to dependency array

  useEffect(() => {
    fetchMyAccount();
  }, [fetchMyAccount]);

  const deletePost = async (id) => {
    const confirmed = window.confirm("Are you sure you want to permanently delete this experience?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE}/api/share-experience/${id}`, { headers });

      setMyExperiences((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete experience.");
    }
  };
  
  const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-medium text-indigo-600">
          <i className="fas fa-spinner fa-spin mr-2"></i> Loading Account Data...
        </div>
      </div>
    );
  }

  if (error && !user) { // Show full-page error if user data couldn't be loaded
      return (
        <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 px-6 py-4 rounded-xl shadow-lg text-center">
              <p className="text-red-700 font-semibold mb-2">Error</p>
              <p className="text-sm text-red-600">{error}</p>
              <button
                  onClick={fetchMyAccount}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                  Try Again
              </button>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-slate-800">My Account</h1>
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition duration-150 text-sm font-medium"
        >
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </div>
      
      {/* ================= USER PROFILE ================= */}
      <section className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
        <h2 className="text-2xl font-semibold mb-2 text-indigo-600">
            <i className="fas fa-user-circle mr-2"></i> Hello, {user?.name || user?.email || 'User'}
        </h2>
        <p className="text-slate-600">Email: <span className="font-medium">{user?.email || 'N/A'}</span></p>
      </section>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ================= MY EXPERIENCES ================= */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700 border-b pb-2">
            <i className="fas fa-briefcase mr-2"></i> My Shared Experiences ({myExperiences.length})
        </h2>

        {myExperiences.length === 0 ? (
          <p className="p-4 bg-white rounded-lg text-sm text-slate-500 italic border border-dashed">
              You haven't shared any experiences yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myExperiences.map((exp) => (
              <ExperienceCard 
                key={exp._id}
                exp={exp}
                onEdit={() => navigate(`/edit/${exp._id}`)}
                onDelete={deletePost}
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= FOLLOWED COMPANIES ================= */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700 border-b pb-2">
            <i className="fas fa-building mr-2"></i> Followed Companies ({user?.followedCompanies?.length || 0})
        </h2>

        {(!user?.followedCompanies || user.followedCompanies.length === 0) ? (
          <p className="p-4 bg-white rounded-lg text-sm text-slate-500 italic border border-dashed">
              You are not following any companies.
          </p>
        ) : (
          <div className="flex gap-3 flex-wrap">
            {user.followedCompanies.map((c, i) => (
              <span
                key={i}
                className="px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-200 shadow-sm"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* ================= BOOKMARKS ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-700 border-b pb-2">
            <i className="fas fa-bookmark mr-2"></i> Bookmarked Experiences ({bookmarks.length})
        </h2>

        {bookmarks.length === 0 ? (
          <p className="p-4 bg-white rounded-lg text-sm text-slate-500 italic border border-dashed">
              You have no bookmarked experiences.
          </p>
        ) : (
          <div className="grid gap-3">
            {bookmarks.map((exp) => (
              <div
                  key={exp._id}
                  onClick={() => navigate(`/experience/${exp._id}`)}
                  className="p-4 bg-white rounded-lg shadow-sm cursor-pointer border-l-4 border-indigo-500 hover:shadow-md transition duration-150"
              >
                <p className="font-semibold text-slate-800">
                    {exp.company} — {exp.role}
                </p>
                <p className="text-sm text-slate-500 line-clamp-1">
                    {exp.description || 'Click to view details.'}
                </p>
                <span className="text-xs text-indigo-500 hover:underline">
                    View Experience $\to$
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}