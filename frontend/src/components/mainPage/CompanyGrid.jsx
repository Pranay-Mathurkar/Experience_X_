import React from "react";
import { useNavigate } from "react-router-dom";

const companies = [
  { name: "Google", snippet: "Focus on Graph algorithms & System Design scaling.", img: "https://logo.clearbit.com/google.com", tag: "FAANG" },
  { name: "Microsoft", snippet: "Balanced mix of DSA, OOPS, and behavioral rounds.", img: "https://logo.clearbit.com/microsoft.com", tag: "Tech Giant" },
  { name: "Amazon", snippet: "Leadership Principles are key. Bar Raiser rounds.", img: "https://logo.clearbit.com/amazon.com", tag: "FAANG" },
  { name: "Meta", snippet: "Speed is crucial. 2 medium-hard problems in 45 mins.", img: "https://logo.clearbit.com/meta.com", tag: "Social" },
  { name: "Netflix", snippet: "Seniority focused. Culture memo & System Design.", img: "https://logo.clearbit.com/netflix.com", tag: "Streaming" },
  { name: "Flipkart", snippet: "Machine Coding round (LLD) is the differentiator.", img: "https://logo.clearbit.com/flipkart.com", tag: "E-commerce" },
  { name: "Uber", snippet: "Concurrency, LLD, and tough algorithmic problems.", img: "https://logo.clearbit.com/uber.com", tag: "Mobility" },
  { name: "Adobe", snippet: "OS concepts, vector math, and standard DSA.", img: "https://logo.clearbit.com/adobe.com", tag: "Creative" },
];

export function CompanyGrid() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-20 px-4 sm:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight animate-titleFade">
          Target{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Companies
          </span>
        </h2>

        <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto animate-titleFade delay-150">
          Curated interview experiences from the industry's top engineering teams.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {companies.map((company, index) => (
          <div
            key={index}
            onClick={() => navigate(`/company/${company.name.toLowerCase()}`)}
            className="group relative p-6 bg-white rounded-2xl border border-slate-200 shadow-md 
                       cursor-pointer overflow-hidden transition-all duration-500 
                       hover:-translate-y-3 hover:shadow-purple-500/20 hover:shadow-2xl
                       animate-itemFade"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            translate-x-[-200%] group-hover:translate-x-[200%] 
                            transition-transform duration-700 ease-out" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-5">
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-2 
                                transition-transform duration-500 group-hover:scale-110">
                  <img src={company.img} alt={company.name} className="w-full h-full object-contain" />
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600
                                 transition-all duration-500 group-hover:bg-purple-50 group-hover:text-purple-700 
                                 group-hover:scale-110">
                  {company.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-700 transition-colors mb-2">
                {company.name}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {company.snippet}
              </p>

              <div className="mt-auto flex items-center text-sm font-semibold text-slate-400 
                              group-hover:text-purple-600 transition-colors">
                <span>View Insights</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes itemFade {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes titleFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-itemFade {
            animation: itemFade 0.85s ease-out forwards;
          }
          .animate-titleFade {
            animation: titleFade 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
