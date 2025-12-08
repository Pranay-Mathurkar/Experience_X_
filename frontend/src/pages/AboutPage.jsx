import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <Navbar />

      <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-white text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Built for Avishkar 2025
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-8 animate-fade-in-up delay-100">
            Born from <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Innodev</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Interview Archive was crafted during MNNIT Allahabad's annual technofest to solve a critical problem: the lack of a structured, credible, and anonymous platform for interview preparation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-purple-900/5 border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-bl-full opacity-50 transition-transform group-hover:scale-110 origin-top-right"></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">The Problem</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              College students lack a structured, anonymous, and credible resource for technical interview preparation. Existing platforms do not provide college-verified access, verify anonymity, or offer standardized formats, leading to scattered and unreliable data.
            </p>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl shadow-purple-900/20 border border-slate-800 relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600 rounded-tr-full opacity-20 transition-transform group-hover:scale-110 origin-bottom-left"></div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Our Solution</h3>
            <p className="text-slate-300 leading-relaxed relative z-10">
              A dedicated Interview Experience Sharing Platform where access is gated by college email. We provide anonymous posting, company hubs, and real-time insights to help juniors learn directly from seniors' experiences without the social pressure.
            </p>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How it Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {process.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-500 font-bold flex items-center justify-center mb-4 shadow-sm group-hover:border-purple-500 group-hover:text-purple-600 transition-colors">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 mb-24">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Platform Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{feat.title}</h4>
                <p className="text-sm text-slate-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Ready to help someone crack their next interview?
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Share your recent interview experience and make the process easier for the next person.
              </p>
            </div>
            <button
              onClick={() => navigate("/share-experience")}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md"
            >
              Share your experience
            </button>
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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}