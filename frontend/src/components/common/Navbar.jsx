import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Share Experience', to: '/add-review' },
  ];

  const handleNavClick = (href) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-purple-100/50 shadow-sm py-3'
            : 'bg-white/60 backdrop-blur-md border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              type="button"
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
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
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => navigate(link.href)}
                  className="text-sm font-medium text-slate-600 hover:text-purple-600"
                >
                  {link.name}
                </button>
              ))}

              {isLoggedIn && (
                <button
                  type="button"
                  onClick={() => navigate("/chat")}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  💬 Chats
                </button>
              )}
            </div>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-purple-700 transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-slate-700">
                    Hi, {user?.name?.split(' ')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogoutClick}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-full"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="text-2xl"
                aria-label="Toggle navigation menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left text-sm font-medium text-slate-700 py-1"
              >
                {link.name}
              </NavLink>
            ))}

            {isLoggedIn && (
              <button
                type="button"
                onClick={() => handleNavClick("/chat")}
                className="block w-full text-left text-sm font-semibold text-indigo-600 py-1"
              >
                💬 Chats
              </button>
            )}

            {!isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => handleNavClick("/login")}
                  className="block w-full text-left text-sm font-medium text-slate-700 py-1"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick("/signup")}
                  className="block w-full text-left text-sm font-medium text-slate-700 py-1"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-slate-700">
                  Hi, {user?.name}
                </p>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full py-2 text-sm font-semibold text-white bg-red-500 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to offset fixed navbar */}
      <div className="h-20" />
    </>
  );
}