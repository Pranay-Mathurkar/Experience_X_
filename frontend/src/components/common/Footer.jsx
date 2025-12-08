// import React from 'react';

// export function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full bg-slate-900 text-slate-300 py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
       
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
      
//           <div className="space-y-4">
       
//             <div className="flex items-center gap-2 cursor-pointer group w-fit">
//               <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/20">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/90">
//                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
//                 </svg>
//               </div>
//               <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
//                 Experience<span className="text-purple-500">_X</span>
//               </span>
//             </div>
            
//             <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
//               Democratizing interview knowledge. We help engineers crack their dream jobs at top tech companies through shared experiences.
//             </p>
//           </div>

// {/*    
//           <div>
//             <h3 className="text-white font-semibold mb-4 tracking-wide">Platform</h3>
//             <ul className="space-y-3 text-sm">
//               <li><a href="#" className="hover:text-purple-400 transition-colors">Browse Companies</a></li>
//               <li><a href="#" className="hover:text-purple-400 transition-colors">Read Reviews</a></li>
//               <li><a href="#" className="hover:text-purple-400 transition-colors">Submit Interview</a></li>
//               <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
//             </ul>
//           </div> */}

   
//           {/* <div>
//             <h3 className="text-white font-semibold mb-4 tracking-wide">Resources</h3>
//             <ul className="space-y-3 text-sm">
//               <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
//               <li><a href="#" className="hover:text-purple-400 transition-colors">Salary Calculator</a></li>
//               <li><a href="#" className="hover:text-purple-400 transition-colors">Resume Guide</a></li>
//               <li><a href="#" className="hover:text-purple-400 transition-colors">Community</a></li>
//             </ul>
//           </div> */}

 
//           <div>
//             <h3 className="text-white font-semibold mb-4 tracking-wide">Stay Updated</h3>
//             <p className="text-xs text-slate-400 mb-4">
//               Get the latest interview questions sent to your inbox.
//             </p>
//             <div className="flex flex-col gap-2">
//               <input 
//                 type="email" 
//                 placeholder="Enter your email" 
//                 className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
//               />
//               <button className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

  
//         <div className="border-t border-slate-800 my-8"></div>

 
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          
//           <p>© {currentYear} Interview Archive. All rights reserved.</p>

//           <div className="flex items-center gap-6">
//             <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 7.8 4.5c2.1-.2 3.2-.4 4.4 1.2 1.6-1.3 3.2-2.5 4.8-1.2"/></svg>
//             </a>
//             <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
//             </a>
//             <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }








// import React from "react";

// export function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full bg-slate-900 text-slate-400 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8">

//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">

//           {/* Logo + Text */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow">
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
//               </svg>
//             </div>

//             <span className="text-lg font-semibold text-white tracking-tight">
//               Experience<span className="text-purple-500">_X</span>
//             </span>
//           </div>

//           {/* Newsletter */}
//           <div className="flex gap-2 w-full md:w-auto">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="flex-1 px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
//             />
//             <button className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition">
//               Subscribe
//             </button>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-slate-800 mb-4"></div>

//         {/* Bottom Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">

//           <p>© {currentYear} Experience_X . All rights reserved.</p>

//           {/* Social Icons */}
//           <div className="flex items-center gap-5 text-slate-400">
//             <a href="#" className="hover:text-white transition" aria-label="Twitter">
//               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 7.8 4.5c2.1-.2 3.2-.4 4.4 1.2 1.6-1.3 3.2-2.5 4.8-1.2"/></svg>
//             </a>

//             <a href="#" className="hover:text-white transition" aria-label="GitHub">
//               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
//             </a>

//             <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
//               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
//             </a>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// }



import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">

          {/* Logo + Description */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>

              <span className="text-lg font-semibold text-white tracking-tight">
                Experience<span className="text-purple-500">_X</span>
              </span>
            </div>

            {/* ✅ Your Beautiful Description */}
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering engineers with real interview experiences to crack their dream jobs at top technology companies.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-auto">
            <p className="text-xs mb-2 text-slate-400">Stay updated with latest interviews</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 w-full md:w-60"
              />
              <button className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mb-5"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">

          <p>© {currentYear} Experience_X. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-slate-400">
            <a href="#" className="hover:text-white transition" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 7.8 4.5c2.1-.2 3.2-.4 4.4 1.2 1.6-1.3 3.2-2.5 4.8-1.2"/>
              </svg>
            </a>

            <a href="#" className="hover:text-white transition" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>

            <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
