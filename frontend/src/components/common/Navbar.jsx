import React, { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl border-b border-purple-100/50 shadow-sm py-3'
            : 'bg-white/50 backdrop-blur-md border-b border-transparent py-5' // Added slight bg to initial state for readability
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center">
            
            {/* --- Logo Section --- */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => window.location.href = "/"}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-105 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <span className="text-xl font-bold tracking-tight text-slate-800 group-hover:text-purple-700 transition-colors">
                Interview<span className="text-purple-600">Archive</span>
              </span>
            </div>

            {/* --- Desktop Navigation --- */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* --- Action Buttons --- */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-purple-700 transition-colors"
              >
                Log in
              </button>
              
              <button
                onClick={() => (window.location.href = "/signup")}
                className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="mr-2">Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur group-hover:opacity-40 transition duration-200" />
              </button>
            </div>

            {/* --- Mobile Toggle --- */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-purple-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-600 hover:text-purple-600 hover:pl-2 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="border-slate-100" />
            <div className="flex flex-col gap-3 pt-2">
              <button onClick={() => window.location.href = "/login"} className="w-full py-2.5 text-slate-600 font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Log in</button>
              <button onClick={() => window.location.href = "/signup"} className="w-full py-2.5 text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md active:scale-95 transition-transform">Sign up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- SPACER DIV: Pushes your content down so the navbar doesn't cover it --- */}
      <div className="h-20 md:h-24" aria-hidden="true" />

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)} style={{ top: '80px' }} />
      )}
    </>
  );
}