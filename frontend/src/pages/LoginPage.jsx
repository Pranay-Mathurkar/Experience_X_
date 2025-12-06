import React from 'react';
import LoginForm from "../components/LoginForm";
import IllustrationPanel from "../components/IllustrationPanel";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300/30 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300/30 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-50 w-full">
        <Navbar />
      </div>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex w-full max-w-5xl min-h-[600px] bg-white rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden border border-white/50 animate-slide-up backdrop-blur-sm">
          
          <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center relative">
            <div className="w-full max-w-md animate-fade-in delay-100">
               <LoginForm />
            </div>
          </div>

          <div className="hidden md:block w-1/2 relative border-l border-slate-100 animate-fade-in delay-200">
            <IllustrationPanel />
          </div>
          
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
