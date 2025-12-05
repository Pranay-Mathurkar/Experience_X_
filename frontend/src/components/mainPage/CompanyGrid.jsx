import React from 'react';

const companies = [
  {
    name: "Google",
    snippet: "Focus on Graph algorithms & System Design scaling.",
    img: "https://logo.clearbit.com/google.com",
    tag: "FAANG",
  },
  {
    name: "Microsoft",
    snippet: "Balanced mix of DSA, OOPS, and behavioral rounds.",
    img: "https://logo.clearbit.com/microsoft.com",
    tag: "Tech Giant",
  },
  {
    name: "Amazon",
    snippet: "Leadership Principles are key. Bar Raiser rounds.",
    img: "https://logo.clearbit.com/amazon.com",
    tag: "FAANG",
  },
  {
    name: "Meta",
    snippet: "Speed is crucial. 2 medium-hard problems in 45 mins.",
    img: "https://logo.clearbit.com/meta.com",
    tag: "Social",
  },
  {
    name: "Netflix",
    snippet: "Seniority focused. Culture memo & System Design.",
    img: "https://logo.clearbit.com/netflix.com",
    tag: "Streaming",
  },
  {
    name: "Flipkart",
    snippet: "Machine Coding round (LLD) is the differentiator.",
    img: "https://logo.clearbit.com/flipkart.com",
    tag: "E-commerce",
  },
  {
    name: "Uber",
    snippet: "Concurrency, LLD, and tough algorithmic problems.",
    img: "https://logo.clearbit.com/uber.com",
    tag: "Mobility",
  },
  {
    name: "Adobe",
    snippet: "OS concepts, vector math, and standard DSA.",
    img: "https://logo.clearbit.com/adobe.com",
    tag: "Creative",
  },
];

export function CompanyGrid() {
  return (
    <div className="w-full py-20 px-4 sm:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Target{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Companies
          </span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Curated interview experiences from the industry's top engineering teams.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200 
                       hover:border-purple-200 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 
                       transition-all duration-300 ease-out cursor-pointer overflow-hidden
                       hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={company.img}
                    alt={company.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                  {company.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-700 transition-colors mb-2">
                {company.name}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {company.snippet}
              </p>

              <div className="mt-auto flex items-center text-sm font-semibold text-slate-400 group-hover:text-purple-600 transition-colors">
                <span>View Insights</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ml-2 transform group-hover:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
