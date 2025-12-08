

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CompanyGrid({ search }) {
  const navigate = useNavigate();
  const API = "https://experience-9t2k.onrender.com/api";

  const [companies, setCompanies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("experience-desc");
  const [page, setPage] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetchCompanies();
  }, [sortBy, search, page]);

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API}/company-stats?sort=${sortBy}&search=${search}&page=${page}&limit=${limit}`
      );
      setCompanies(res.data.data);
    } catch (err) {
      console.error("Company fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await axios.get(
        `${API}/company-stats?sort=experience-desc&limit=10`
      );
      setTrending(res.data.data);
    } catch (err) {
      console.error("Trending fetch failed", err);
    }
  };

  return (
    <div className="w-full py-20 px-4 sm:px-8 bg-slate-50">

      {/* ✅ HEADER */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Target <span className="text-purple-600">Companies</span>
        </h2>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 bg-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="experience-desc">Experience ↓</option>
          <option value="experience-asc">Experience ↑</option>
          <option value="rating-desc">Rating ↓</option>
          <option value="rating-asc">Rating ↑</option>
        </select>
      </div>

      {/* ✅ LOADING SKELETON */}
      {loading && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-60 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* ✅ NO RESULT */}
      {!loading && companies.length === 0 && search && (
        <div className="text-center text-red-600 text-lg font-bold py-24">
          ❌ No result found for "{search}"
        </div>
      )}

      {/* ✅ ✅ PROFESSIONAL COMPANY GRID */}
      {!loading && companies.length > 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((company, i) => (
            <div
              key={i}
              onClick={() =>
                navigate(`/company/${company.company.toLowerCase()}`)
              }
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:-translate-y-1"
            >
              {/* ✅ LOGO + BADGE */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 bg-white border rounded-xl flex items-center justify-center shadow-sm">
                  <img
                    src={`https://logo.clearbit.com/${company.company}.com`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/4410/4410419.png";
                    }}
                    className="w-10 h-10 object-contain"
                    alt={company.company}
                  />
                </div>

                <span className="text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  Verified
                </span>
              </div>

              {/* ✅ NAME */}
              <h3 className="text-xl font-bold text-gray-900 capitalize mb-4 group-hover:text-purple-700 transition">
                {company.company}
              </h3>

              {/* ✅ STATS */}
              <div className="space-y-3 text-sm text-gray-700">
                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-2">📄 Total Experience</span>
                  <b>{company.totalExperiences}</b>
                </p>

                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-2">⭐ Avg Rating</span>
                  <b>{company.avgRating || "N/A"}</b>
                </p>
              </div>

              {/* ✅ CTA */}
              <div className="mt-6 text-purple-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                View Insights →
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ ✅ PAGINATION */}
      {companies.length > 0 && (
        <div className="mt-14 flex justify-center gap-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-6 py-2 border rounded-xl font-semibold disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Prev
          </button>

          <span className="px-6 py-2 font-bold">Page {page}</span>

          <button
            disabled={companies.length < limit}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 border rounded-xl font-semibold disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* ✅ ✅ ✅ GLOBAL TRENDING */}
      <div className="mt-24 text-center">
        <h3 className="text-2xl font-extrabold mb-8">🔥 Top 10 Trending</h3>

        <div className="flex flex-wrap justify-center gap-4">
          {trending.map((c, i) => (
            <span
              key={i}
              onClick={() =>
                navigate(`/company/${c.company.toLowerCase()}`)
              }
              className="cursor-pointer bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-200 transition"
            >
              {c.company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
