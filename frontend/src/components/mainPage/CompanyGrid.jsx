import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function CompanyGrid({ search }) {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const limit = 12; // Items per page
  const API = "http://localhost:3000/api";

  // --- Fetch Companies & Trending Data ---
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        // 1. Fetch Paginated Companies (Filtered by Search)
        const res = await axios.get(`${API}/companies`, {
          params: { page, limit, search }
        });
        
        // Assuming backend returns: { data: [...], totalPages: 5, trending: [...] }
        setCompanies(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        
        // 2. Set Trending only on first load
        if (res.data.trending && page === 1 && !search) {
          setTrending(res.data.trending);
        }

      } catch (error) {
        console.error("Error fetching companies:", error);
        // Fallback for demo purposes if backend isn't ready
        if (search === "") setCompanies(mockFallbackData); 
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to prevent too many API calls
    const delayDebounce = setTimeout(() => {
      fetchCompanies();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, page]);


  // --- Loading State ---
  if (loading && companies.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Finding companies...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4 sm:px-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight animate-titleFade">
          Target <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Companies</span>
        </h2>
        <p className="mt-3 text-lg text-slate-600 animate-titleFade delay-100">
          {search ? `Showing results for "${search}"` : "Curated interview experiences from top engineering teams."}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {companies.map((company, index) => (
          <div
            key={company._id || index}
            onClick={() => navigate(`/company/${company.company.toLowerCase()}`)}
            className="group relative p-6 bg-white rounded-2xl border border-slate-200 shadow-sm 
                       cursor-pointer overflow-hidden transition-all duration-300 
                       hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-200
                       animate-itemFade"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-5">
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-110">
                  <img 
                    src={`https://logo.clearbit.com/${company.company.toLowerCase().replace(/\s+/g, '')}.com`}
                    onError={(e) => {e.target.src = "https://via.placeholder.com/50?text=?"}} // Fallback
                    alt={company.company} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                  {company.count || 0} Reviews
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 capitalize mb-2 group-hover:text-purple-700 transition-colors">
                {company.company}
              </h3>

              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${company.avgDifficulty === 'Hard' ? 'bg-red-400' : 'bg-green-400'}`}></span>
                  {company.avgDifficulty || "Moderate"}
                </span>
                
                <span className="flex items-center text-indigo-600 font-semibold text-xs uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                  View 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6"/></svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && companies.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">No companies found</h3>
          <p className="text-slate-500">Try searching for a different company name.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center gap-4">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-white hover:border-purple-200 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Previous
          </button>
          <span className="px-4 py-2.5 text-slate-500 font-medium">
            Page {page} of {totalPages}
          </span>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-white hover:border-purple-200 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Next
          </button>
        </div>
      )}

      {/* Global Trending Section */}
      {!search && trending.length > 0 && (
        <div className="mt-24 pt-10 border-t border-slate-200/60 text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">🔥 Trending on Interview Archive</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {trending.map((t, i) => (
              <button
                key={i}
                onClick={() => navigate(`/company/${t.company.toLowerCase()}`)}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:border-purple-300 hover:text-purple-700 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                {t.company} <span className="ml-1 text-slate-400 font-normal text-xs">({t.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes titleFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes itemFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-titleFade { animation: titleFade 0.8s ease-out forwards; }
        .animate-itemFade { animation: itemFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}

const mockFallbackData = [
  { company: "Google", count: 120, avgDifficulty: "Hard" },
  { company: "Microsoft", count: 95, avgDifficulty: "Medium" },
  { company: "Amazon", count: 150, avgDifficulty: "Medium" },
  { company: "Netflix", count: 40, avgDifficulty: "Hard" },
  { company: "Uber", count: 60, avgDifficulty: "Hard" },
  { company: "Adobe", count: 45, avgDifficulty: "Medium" },
  { company: "Atlassian", count: 30, avgDifficulty: "Medium" },
  { company: "Salesforce", count: 55, avgDifficulty: "Easy" },
];