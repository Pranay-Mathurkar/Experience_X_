import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ExperienceCard = ({ exp, isBookmarked, toggleBookmark, navigate }) => {
  const dateString = new Date(exp.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleChatClick = (e) => {
    e.stopPropagation();
    if (!exp.user?._id) return;
    navigate(`/chat/${exp.user._id}`);
  };

  return (
    <article
      onClick={() => navigate(`/experience/${exp._id}`)}
      className="relative flex flex-col bg-white border border-slate-100/80 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
    >
      {/* Bookmark */}
      <button
        onClick={(e) => toggleBookmark(exp._id, e)}
        className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 shadow-sm hover:bg-slate-50 transition"
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this experience"}
      >
        <svg
          className={`w-5 h-5 transition-colors ${
            isBookmarked
              ? "text-amber-500 fill-amber-500"
              : "text-slate-400 group-hover:text-amber-400"
          }`}
          fill={isBookmarked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>

      {/* Header */}
      <header className="flex items-start justify-between gap-3 mb-2.5 pr-7">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {exp.role}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
            {exp.company || "Company not specified"}
          </p>
        </div>
        <time className="text-[11px] font-medium text-slate-400 flex-shrink-0">
          {dateString}
        </time>
      </header>

      {/* Meta */}
      <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mb-3">
        <div className="inline-flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243m1.414-11.414L12 3l4.243 4.243"
            />
          </svg>
          <dt className="sr-only">Location</dt>
          <dd>{exp.location || "Location not specified"}</dd>
        </div>

        <div className="inline-flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M21 13.255A23.864 23.864 0 0112 15c-3.18 0-6.162-.62-8-1.745M12 4v12"
            />
          </svg>
          <dt className="sr-only">Interview type</dt>
          <dd>{exp.interviewType || "Type not specified"}</dd>
        </div>

        {exp.overallDifficulty && (
          <div className="inline-flex items-center gap-1.5">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                exp.overallDifficulty === "Easy"
                  ? "bg-green-400"
                  : exp.overallDifficulty === "Medium"
                  ? "bg-amber-400"
                  : "bg-red-400"
              }`}
            />
            <dt className="sr-only">Difficulty</dt>
            <dd className="capitalize text-slate-500">
              {exp.overallDifficulty}
            </dd>
          </div>
        )}
      </dl>

      {/* Tags */}
      {exp.tags && exp.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {exp.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
          {exp.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
              +{exp.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Summary */}
      <p className="text-xs text-slate-700 mb-3 line-clamp-3 leading-relaxed">
        {exp.mainExperience ||
          exp.experience ||
          exp.description ||
          "No detailed experience summary provided."}
      </p>

      {/* Footer */}
      <footer className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.62-.921 1.92 0l2.126 6.545a1 1 0 00.95.69h6.883c.969 0 1.372 1.24.588 1.834l-5.57 4.053a1 1 0 00-.364 1.118l2.127 6.545c.3.921-.755 1.688-1.539 1.118L10 18.064l-5.553 3.328c-.784.57-1.838-.197-1.539-1.118l2.127-6.545a1 1 0 00-.364-1.118L.004 11.996c-.784-.594-.381-1.834.588-1.834h6.883a1 1 0 00.95-.69l2.126-6.545z" />
          </svg>
          <span>{exp.rating || "N/A"}</span>
          <span className="text-[10px] text-amber-600/80">/ 5</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleChatClick}
            className="text-[11px] font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            💬 Chat
          </button>

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 group-hover:gap-1.5 transition-all">
            View details
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </div>
      </footer>
    </article>
  );
};

export default function Company() {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const [isFollowing, setIsFollowing] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [filterOfferStatus, setFilterOfferStatus] = useState("");
  const [filterSeason, setFilterSeason] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const token = localStorage.getItem("token");
  const API = "http://localhost:3000/api";
  const headers = { Authorization: `Bearer ${token}` };

  const fetchCompanyExperiences = useCallback(async () => {
    try {
      setError(null);
      const res = await axios.get(`${API}/company/${companyName}`);
      setExperiences(res.data.data || []);
    } catch (err) {
      console.error("Error fetching company experiences:", err);
      setError("Could not load company experiences. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [companyName]);

  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setIsFollowing(false);
      setBookmarks([]);
      return;
    }

    try {
      const res = await axios.get(`${API}/me`, { headers });
      const user = res.data.user;
      // compare case-insensitively if needed
      const following = (user.followedCompanies || []).some(
        (c) => c.toLowerCase() === companyName.toLowerCase()
      );
      setIsFollowing(following);
      setBookmarks(user.bookmarks || []);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    }
  }, [token, companyName]);

  useEffect(() => {
    fetchCompanyExperiences();
    fetchUserProfile();
  }, [fetchCompanyExperiences, fetchUserProfile]);

  const toggleFollow = async () => {
    if (!token)
      return navigate("/login", {
        state: { message: "Please log in to follow companies." },
      });

    try {
      const res = await axios.post(
        `${API}/follow-company`,
        { companyName },
        { headers }
      );
      setIsFollowing(res.data.followedCompanies.includes(companyName));
    } catch (err) {
      alert("Follow operation failed. Check console for details.");
    }
  };

  const toggleBookmark = async (experienceId, e) => {
    e.stopPropagation();

    if (!token)
      return navigate("/login", {
        state: { message: "Please log in to bookmark experiences." },
      });

    try {
      const res = await axios.post(
        `${API}/bookmark`,
        { experienceId },
        { headers }
      );
      setBookmarks(res.data.bookmarks);
    } catch (err) {
      alert("Bookmark operation failed. Check console for details.");
    }
  };

  // Extract unique values for filters
  const uniqueRoles = [...new Set(experiences.map((exp) => exp.role))].filter(
    Boolean
  );
  const uniqueLocations = [
    ...new Set(experiences.map((exp) => exp.location)),
  ].filter(Boolean);
  const uniqueSeasons = [
    ...new Set(experiences.map((exp) => exp.season)),
  ].filter(Boolean);

  // Filter and search logic
  const filteredExperiences = experiences.filter((exp) => {
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      exp.role?.toLowerCase().includes(searchLower) ||
      exp.location?.toLowerCase().includes(searchLower) ||
      exp.season?.toLowerCase().includes(searchLower) ||
      exp.mainExperience?.toLowerCase().includes(searchLower) ||
      exp.tips?.toLowerCase().includes(searchLower) ||
      exp.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      exp.rounds?.some(
        (round) =>
          round.roundType?.toLowerCase().includes(searchLower) ||
          round.questions?.toLowerCase().includes(searchLower)
      );

    const matchesRole = filterRole === "" || exp.role === filterRole;
    const matchesLocation =
      filterLocation === "" || exp.location === filterLocation;
    const matchesType =
      filterType === "" || exp.interviewType === filterType;
    const matchesDifficulty =
      filterDifficulty === "" || exp.overallDifficulty === filterDifficulty;
    const matchesOfferStatus =
      filterOfferStatus === "" || exp.offerStatus === filterOfferStatus;
    const matchesSeason = filterSeason === "" || exp.season === filterSeason;
    const matchesRating =
      filterRating === "" || (exp.rating || 0) >= parseInt(filterRating, 10);

    return (
      matchesSearch &&
      matchesRole &&
      matchesLocation &&
      matchesType &&
      matchesDifficulty &&
      matchesOfferStatus &&
      matchesSeason &&
      matchesRating
    );
  });

  const totalInterviews = experiences.length;
  const filteredCount = filteredExperiences.length;

  const averageRating =
    totalInterviews === 0
      ? "N/A"
      : (
          experiences.reduce((sum, exp) => sum + (exp.rating || 0), 0) /
          totalInterviews
        ).toFixed(1);

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    if (sortOption === "newest") return dateB - dateA;
    if (sortOption === "oldest") return dateA - dateB;
    if (sortOption === "ratingHigh") return (b.rating || 0) - (a.rating || 0);
    if (sortOption === "ratingLow") return (a.rating || 0) - (b.rating || 0);
    return 0;
  });

  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterRole("");
    setFilterLocation("");
    setFilterType("");
    setFilterDifficulty("");
    setFilterOfferStatus("");
    setFilterSeason("");
    setFilterRating("");
  };

  const activeFiltersCount = [
    filterRole,
    filterLocation,
    filterType,
    filterDifficulty,
    filterOfferStatus,
    filterSeason,
    filterRating,
  ].filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-700">
            Loading {companyName} experiences...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top gradient header */}
      <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-600 h-56 shadow-md">
        <div className="max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center gap-2 text-white/80 text-xs sm:text-sm font-medium hover:text-white transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-24 pb-16 relative z-10">
        {/* Company profile card */}
        <section className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-slate-100/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight capitalize text-slate-900 mb-2">
                {companyName || "Unknown Company"}
              </h1>
              <p className="text-sm sm:text-base text-slate-500">
                Real interview experiences shared by candidates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center shadow-sm min-w-[120px]">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Avg. rating
                </p>
                <p className="text-2xl font-bold text-amber-500">
                  {averageRating}{" "}
                  <span className="text-lg align-middle">★</span>
                </p>
              </div>

              <button
                onClick={toggleFollow}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                  isFollowing
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d={
                      isFollowing
                        ? "M5 13l4 4L19 7"
                        : "M18 9v3m0 0v3m0-3h3m-3 0h-3M5 21V4a2 2 0 012-2h4l2 2h4a2 2 0 012 2v10a2 2 0 01-2 2h-4l-2-2H7a2 2 0 01-2-2z"
                    }
                  />
                </svg>
                {isFollowing ? "Following" : "Follow Company"}
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600 font-medium border-t border-slate-100 pt-4">
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2"
                />
              </svg>
            </span>
            <span>
              Total experiences:{" "}
              <span className="font-semibold text-slate-800">
                {totalInterviews}
              </span>
            </span>
          </div>
        </section>

        {error && (
          <div className="mt-6 bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Search and Filter Section */}
        <section className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          {/* Search Bar */}
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, location, tags, questions, experience..."
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Filter Toggle Button */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {showFilters ? "Hide Filters" : "Show Filters"}
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              {/* Role */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Role
                </label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Roles</option>
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Location
                </label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Interview Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Types</option>
                  <option value="Internship">Internship</option>
                  <option value="Full-time">Full-time</option>
                  <option value="PPO">PPO</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Difficulty
                </label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Offer Status */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Offer Status
                </label>
                <select
                  value={filterOfferStatus}
                  onChange={(e) => setFilterOfferStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Statuses</option>
                  <option value="Offered">Offered</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                  <option value="In Process">In Process</option>
                </select>
              </div>

              {/* Season */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Season
                </label>
                <select
                  value={filterSeason}
                  onChange={(e) => setFilterSeason(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Seasons</option>
                  {uniqueSeasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Minimum Rating
                </label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Any Rating</option>
                  <option value="1">1+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>
          )}

          {/* Results Summary */}
          {(searchTerm || activeFiltersCount > 0) && (
            <div className="mt-4 text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredCount}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {totalInterviews}
              </span>{" "}
              experiences
            </div>
          )}
        </section>

        {/* Experiences list */}
        <section className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Interview Experiences
              <span className="ml-2 text-sm text-slate-500">
                ({filteredCount})
              </span>
            </h2>

            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-experiences"
                className="text-xs sm:text-sm font-medium text-slate-600"
              >
                Sort by:
              </label>
              <select
                id="sort-experiences"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="ratingHigh">Rating (high → low)</option>
                <option value="ratingLow">Rating (low → high)</option>
              </select>
            </div>
          </div>

          {filteredCount === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl px-8 py-12 text-center shadow-inner">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-sm sm:text-base font-medium text-slate-700 mb-2">
                No experiences found matching your search
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {sortedExperiences.map((exp) => (
                <ExperienceCard
                  key={exp._id}
                  exp={exp}
                  isBookmarked={bookmarks.includes(exp._id)}
                  toggleBookmark={toggleBookmark}
                  navigate={navigate}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
