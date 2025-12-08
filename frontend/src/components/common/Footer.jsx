import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-400 py-16 border-t border-slate-800/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
        
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer w-fit">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Interview<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Archive</span>
              </span>
            </Link>
            
            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              Democratizing interview knowledge for students. We help engineers crack their dream jobs at top tech companies through verified, anonymous shared experiences.
            </p>

            <div className="flex gap-4 pt-2">
              {[
                { name: 'Twitter', path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 7.8 4.5c2.1-.2 3.2-.4 4.4 1.2 1.6-1.3 3.2-2.5 4.8-1.2" },
                { name: 'LinkedIn', path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1-2 2 2 2 0 0 1 2-2z", fill: true },
                { name: 'GitHub', path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" }
              ].map((icon) => (
                <a 
                  key={icon.name}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                  aria-label={icon.name}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={icon.fill ? "currentColor" : "none"} stroke={icon.fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

        
          <div className="lg:col-span-3 md:col-span-1">
            <h3 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Explore</h3>
            <ul className="space-y-4">
              {[
                { name: "Browse Companies", to: "/" },
                { name: "Features", to: "/features" },
                { name: "Pricing", to: "/pricing" },
                { name: "About Us", to: "/about" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className="text-sm hover:text-purple-400 transition-colors duration-200 block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="lg:col-span-4 md:col-span-1">
            <h3 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to get the latest interview questions and placement trends directly to your inbox.
            </p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your college email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                />
              </div>
              <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]">
                Subscribe to Newsletter
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} Interview Archive. Built with <span className="text-red-500 animate-pulse">♥</span> at MNNIT Allahabad.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/login" className="text-slate-500 hover:text-white transition-colors">Log In</Link>
            <Link to="/signup" className="text-slate-500 hover:text-white transition-colors">Sign Up</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}