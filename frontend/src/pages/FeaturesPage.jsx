import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <Navbar />

      <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            New Feature: Salary Insights
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 animate-fade-in-up delay-100">
            Everything you need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              crack the interview.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Stop guessing what will be asked. Access thousands of real interview experiences, salary data, and preparation guides shared by the community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-lg shadow-purple-900/20"
            >
              Get Started for Free
            </button>
            {/* <button className="px-8 py-4 rounded-xl bg-white text-slate-700 font-bold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
              View Demo
            </button> */}
          </div>
        </div>
      </div>

      <div className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:shadow-purple-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real Experiences</h3>
              <p className="text-slate-500 leading-relaxed">
                Access detailed accounts of interview rounds, questions asked, and difficulty levels directly from candidates who were there.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:shadow-purple-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Salary Insights</h3>
              <p className="text-slate-500 leading-relaxed">
                Negotiate better with anonymous, verified salary data including base pay, stocks, and joining bonuses for various roles.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:shadow-purple-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-600"><circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Community First</h3>
              <p className="text-slate-500 leading-relaxed">
                Connect with peers, ask for referrals, and get your resume reviewed by seniors in the industry.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 animate-fade-in-up">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-purple-600 rounded-3xl rotate-3 opacity-10"></div>

              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 transition-transform hover:-translate-y-2 duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">G</div>
                  <div>
                    <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-slate-100 rounded"></div>
                  </div>
                  <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">ACCEPTED</span>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
                  <div className="h-3 w-4/6 bg-slate-100 rounded"></div>
                </div>
                <div className="flex gap-2">
                  <span className="h-6 w-16 bg-purple-50 rounded-md"></span>
                  <span className="h-6 w-16 bg-purple-50 rounded-md"></span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Detailed Interview Archives</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Don't go in blind. Read exact questions asked in OA, Technical, and HR rounds. Filter by role, difficulty, and offer status to find the most relevant experiences for you.
              </p>
              <ul className="space-y-3">
                {['Filter by company tags', 'Search by specific roles', 'View offer statuses'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 animate-fade-in-up delay-200">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-indigo-600 rounded-3xl -rotate-3 opacity-10"></div>

              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-8 transition-transform hover:-translate-y-2 duration-500">
                <div className="flex justify-between items-end h-40 gap-4">
                  <div className="w-full bg-slate-100 rounded-t-lg h-[40%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">12LPA</div>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-t-lg h-[60%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">18LPA</div>
                  </div>
                  <div className="w-full bg-indigo-500 rounded-t-lg h-[85%] relative group shadow-lg shadow-indigo-200">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-100 transition-opacity">25LPA</div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-t-lg h-[50%]"></div>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4 flex justify-between text-xs text-slate-500 font-bold uppercase tracking-wide">
                  <span>Startups</span>
                  <span>MNCs</span>
                  <span>FAANG</span>
                  <span>Service</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Transparent Compensation</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Know your worth before you sign. Compare offers across companies and locations. See breakdown of Base, Stocks (RSUs), and Joining Bonus.
              </p>
              <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-4 transition-all group">
                Explore Salaries 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl shadow-purple-900/20">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-30"></div>
          
          <div className="relative z-10 px-8 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to land your dream job?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
              Join thousands of developers who are sharing their journey and helping each other succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/25"
              >
                Create Free Account
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl transition-all">
                Browse Companies
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
