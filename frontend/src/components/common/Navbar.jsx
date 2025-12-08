



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";


// export function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navigate = useNavigate();
//   const { user, handleLogout } = useAuth(); // ✅ REAL AUTH STATE

//   // ✅ TRUE ONLY IF USER EXISTS
//   const isLoggedIn = !!user;

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//  const navLinks = [
//   { name: 'My Account', href: '/account' },
//   { name: 'About', href: '/about' },
//   { name: 'Share Experience', href: '/share-experience' },
// ];

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
//           scrolled
//             ? "bg-white/70 backdrop-blur-xl border-b border-purple-100/50 shadow-sm py-3"
//             : "bg-white/50 backdrop-blur-md border-b border-transparent py-5"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-8">
//           <div className="flex justify-between items-center">

//             {/* ✅ LOGO */}
//             <div
//               className="flex items-center gap-3 cursor-pointer group"
//               onClick={() => navigate("/")}
//             >
//               <span className="text-xl font-bold tracking-tight text-slate-800">
//                 Interview<span className="text-purple-600">Archive</span>
//               </span>
//             </div>

//             {/* Desktop Nav */}
//             <div className="hidden md:flex items-center gap-8">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className="text-sm font-medium text-slate-600 hover:text-purple-600"
//                 >
//                   {link.name}
//                 </a>
//               ))}
//             </div>

//             {/* ✅ AUTH BUTTONS */}
//             <div className="hidden md:flex items-center gap-4">
//               {!isLoggedIn ? (
//                 <>
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="px-5 py-2 text-sm font-semibold text-slate-600"
//                   >
//                     Log in
//                   </button>

//                   <button
//                     onClick={() => navigate("/signup")}
//                     className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-full"
//                   >
//                     Sign Up
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <span className="text-sm font-semibold text-slate-700">
//                     Hi, {user?.name}
//                   </span>

//                   <button
//                     onClick={handleLogout} // ✅ REAL LOGOUT
//                     className="px-6 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-full"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Mobile Toggle */}
//             <div className="md:hidden">
//               <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//                 ☰
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ✅ MOBILE MENU */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
//             {!isLoggedIn ? (
//               <>
//                 <button onClick={() => navigate("/login")}>Log in</button>
//                 <button onClick={() => navigate("/signup")}>Sign up</button>
//               </>
//             ) : (
//               <>
//                 <p className="font-semibold">Hi, {user?.name}</p>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full py-2 text-white bg-red-500 rounded"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </nav>

//       <div className="h-20" />
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, handleLogout } = useAuth(); // ✅ REAL AUTH STATE

  // ✅ TRUE ONLY IF USER EXISTS
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "My Account", href: "/account" },
    { name: "About", href: "/about" },
    { name: "Share Experience", href: "/share-experience" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-purple-100/50 shadow-sm py-3"
            : "bg-white/50 backdrop-blur-md border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center">
            {/* ✅ LOGO */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Interview<span className="text-purple-600">Archive</span>
              </span>
            </div>

            {/* ✅ DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-purple-600"
                >
                  {link.name}
                </a>
              ))}

              {/* ✅ ✅ CHAT BUTTON (ONLY FOR LOGGED-IN USERS) */}
              {isLoggedIn && (
                <button
                  onClick={() => navigate("/chat")}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  💬 Chats
                </button>
              )}
            </div>

            {/* ✅ AUTH BUTTONS */}
            <div className="hidden md:flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-5 py-2 text-sm font-semibold text-slate-600"
                  >
                    Log in
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-full"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-slate-700">
                    Hi, {user?.name}
                  </span>

                  <button
                    onClick={handleLogout} // ✅ REAL LOGOUT
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-full"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* ✅ MOBILE TOGGLE */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* ✅ MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.name}
              </button>
            ))}

            {/* ✅ ✅ MOBILE CHAT BUTTON */}
            {isLoggedIn && (
              <button
                onClick={() => {
                  navigate("/chat");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left font-semibold text-indigo-600"
              >
                💬 Chats
              </button>
            )}

            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate("/login")}>Log in</button>
                <button onClick={() => navigate("/signup")}>Sign up</button>
              </>
            ) : (
              <>
                <p className="font-semibold">Hi, {user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-white bg-red-500 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      <div className="h-20" />
    </>
  );
}
