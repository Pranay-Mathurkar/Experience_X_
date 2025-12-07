import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export default function AboutPage() {
  const navigate = useNavigate();

  const team = [
    {
      name: "Pranay Mathurkar",
      role: "Team Lead, Backend",
      reg: "20244129",
      email: "pranay.20244129@mnnit.ac.in",
      initial: "P"
    },
    {
      name: "Prajapati Vishnu Munna",
      role: "Backend Developer",
      reg: "20244127",
      email: "vishnu.20244127@mnnit.ac.in",
      initial: "V"
    },
    {
      name: "Arpit Kumar",
      role: "Frontend Developer",
      reg: "20244037",
      email: "arpit.20244037@mnnit.ac.in",
      initial: "A"
    },
    {
      name: "Samarth Bose",
      role: "Frontend Developer",
      reg: "20244142",
      email: "samarth.20244142@mnnit.ac.in",
      initial: "S"
    }
  ];

  const features = [
    { title: "College-Gated Auth", desc: "Exclusive access via MNNIT verified email IDs." },
    { title: "Anonymous Posting", desc: "Share honest feedback without fear of backlash." },
    { title: "Smart Search", desc: "Powered by Elasticsearch for instant discovery." },
    { title: "Real-time Chat", desc: "Discuss offer details in live company chatrooms." },
    { title: "Analytics Dashboard", desc: "Visualize placement trends and offer patterns." },
    { title: "Structured Logging", desc: "Standardized forms for consistent data quality." }
  ];

  const process = [
    "Register with College Email",
    "JWT Secured Login",
    "Submit Experience",
    "Auto-Update Hubs",
    "Browse & Filter",
    "Discuss in Chatrooms",
    "View Analytics"
  ];

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

        <div>
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Meet the Team</h2>
          <p className="text-slate-500 text-center mb-12">The minds behind Interview Archive</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 text-center group">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center mb-4 group-hover:from-purple-100 group-hover:to-indigo-100 transition-colors">
                  <span className="text-2xl font-bold text-slate-400 group-hover:text-purple-600 transition-colors">{member.initial}</span>
                </div>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm text-purple-600 font-medium mb-4">{member.role}</p>
                <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 break-all">
                  {member.email}
                </div>
              </div>
            ))}
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