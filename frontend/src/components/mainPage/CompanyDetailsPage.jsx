import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));

      setCompany({
        id: id,
        name: "Google",
        logo: "https://logo.clearbit.com/google.com",
        industry: "Technology",
        location: "Mountain View, CA",
        website: "https://google.com",
        description: "Google is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.",
        overallRating: 4.5,
        totalReviews: 128,
        difficulty: "Medium-Hard"
      });

      const mockReviews = [
        { 
          id: 1, 
          user: "Sarthak K.", 
          role: "SDE Intern", 
          date: "2 days ago", 
          rating: 4, 
          location: "Bangalore",
          season: "Summer 2024",
          interviewType: "Internship",
          difficulty: "Hard",
          offerStatus: "Accepted",
          tags: ["DSA", "Graphs", "DP"],
          rounds: [
            { name: "Round 1", type: "Online Assessment", mode: "Online", difficulty: "Medium", topics: "2 Coding questions (Strings, Arrays)" },
            { name: "Round 2", type: "Technical", mode: "Video Call", difficulty: "Hard", topics: "Graph DP problem, deeply discussed time complexity" },
            { name: "Round 3", type: "HR", mode: "Video Call", difficulty: "Easy", topics: "Behavioral questions, Googleyness" }
          ],
          compensation: {
            stipend: "₹1,10,000/month",
            base: "",
            stocks: ""
          },
          experience: "The process was smooth but challenging. The OA was standard LeetCode medium. The technical round focused heavily on edge cases.",
          tips: "Focus on Graph algorithms and Dynamic Programming. Be vocal about your thought process during the interview.",
          helpful: 12 
        },
        { 
          id: 2, 
          user: "Ananya S.", 
          role: "Frontend Engineer", 
          date: "1 week ago", 
          rating: 5, 
          location: "Hyderabad",
          season: "Fall 2023",
          interviewType: "Full Time",
          difficulty: "Medium",
          offerStatus: "Accepted",
          tags: ["System Design", "React", "Accessibility"],
          rounds: [
            { name: "Round 1", type: "Machine Coding", mode: "Onsite", difficulty: "Medium", topics: "Build a nested comment system in React" },
            { name: "Round 2", type: "System Design", mode: "Onsite", difficulty: "Medium", topics: "Design a news feed architecture" }
          ],
          compensation: {
            stipend: "",
            base: "₹28 LPA",
            stocks: "₹10 Lakhs over 4 years"
          },
          experience: "Very professional interviewers. They helped me when I got stuck on the system design round. The machine coding round required writing clean, accessible code.",
          tips: "Brush up on web accessibility (ARIA) and performance optimization techniques.",
          helpful: 8 
        },
        { 
          id: 3, 
          user: "Rahul M.", 
          role: "Backend Developer", 
          date: "3 weeks ago", 
          rating: 2, 
          location: "Remote",
          season: "Winter 2023",
          interviewType: "Full Time",
          difficulty: "Medium",
          offerStatus: "Rejected",
          tags: ["Java", "Spring Boot", "SQL"],
          rounds: [
            { name: "Round 1", type: "Technical", mode: "Video Call", difficulty: "Medium", topics: "Java streams and SQL complex queries" },
            { name: "Round 2", type: "Managerial", mode: "Video Call", difficulty: "Weird", topics: "Asked about gap year repeatedly" }
          ],
          compensation: { stipend: "", base: "", stocks: "" },
          experience: "Everything went well until the hiring manager round. After that, no response for weeks. Very unprofessional behavior from HR considering the size of the company.",
          tips: "Make sure you have a good explanation for any career gaps.",
          helpful: 45 
        },
      ];

      const sortedReviews = mockReviews.sort((a, b) => b.rating - a.rating);
      
      setReviews(sortedReviews);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-violet-600"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading company insights...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-violet-600 mb-6 group transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          Back to Companies
        </Link>

        <div className="bg-white rounded-2xl shadow-xl shadow-violet-200/50 border border-violet-100 overflow-hidden mb-12">
          <div className="h-48 bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-800 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 mb-8 gap-6">
              <div className="flex items-end gap-6">
                <div className="p-1.5 bg-white rounded-2xl shadow-xl">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-100">
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{company.name}</h1>
                  <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
                    {company.industry} 
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    {company.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto mb-2">
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 md:flex-none justify-center px-5 py-2.5 bg-white border border-slate-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 text-slate-700 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Website
                </a>
                <button className="flex-1 md:flex-none justify-center px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-violet-500/30 flex items-center gap-2 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                  Follow
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-bold text-slate-900 mb-3">About</h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  {company.description}
                </p>
              </div>
              
              <div className="bg-violet-50/50 rounded-2xl p-5 border border-violet-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 opacity-70">At a Glance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-violet-100 last:border-0 last:pb-0">
                    <span className="text-slate-500 text-sm">Overall Rating</span>
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-violet-200 shadow-sm">
                      <span className="font-bold text-slate-900">{company.overallRating}</span>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-violet-100 last:border-0 last:pb-0">
                    <span className="text-slate-500 text-sm">Avg Difficulty</span>
                    <span className="font-semibold text-orange-600 text-sm bg-orange-50 px-2 py-0.5 rounded">{company.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-violet-100 last:border-0 last:pb-0">
                    <span className="text-slate-500 text-sm">Total Interviews</span>
                    <span className="font-bold text-slate-900">{company.totalReviews}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Interviews</h2>
            <p className="text-slate-500 mt-1">Real experiences shared by candidates</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-sm font-medium text-slate-500">Sort by:</div>
             <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block p-2.5 font-medium cursor-pointer hover:border-violet-300 transition-colors">
               <option>Highest Rating</option>
               <option>Lowest Rating</option>
               <option>Newest First</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-violet-50 hover:shadow-xl hover:shadow-violet-200/40 hover:border-violet-200 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0
                    ${['bg-violet-600', 'bg-purple-600', 'bg-fuchsia-600', 'bg-indigo-600'][review.id % 4]}`}>
                    {review.user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{review.role}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-sm text-slate-500 font-medium">{review.user}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-sm text-slate-500">{review.date}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-sm text-slate-500">{review.season}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-sm text-slate-500">{review.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md border border-slate-200">
                          {review.interviewType}
                        </span>
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border
                          ${review.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                            review.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                            'bg-red-50 text-red-700 border-red-200'}`}>
                          {review.difficulty}
                        </span>
                        {review.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-violet-50 text-violet-700 text-xs font-semibold rounded-md border border-violet-100">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {review.offerStatus === 'Accepted' ? (
                     <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide rounded-full border border-emerald-100">
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                       Accepted
                     </div>
                  ) : (
                     <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wide rounded-full border border-rose-100">
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                       Rejected
                     </div>
                  )}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill={i < review.rating ? "#FBBF24" : "none"} 
                        stroke={i < review.rating ? "#FBBF24" : "#CBD5E1"} 
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {(review.compensation.stipend || review.compensation.base || review.compensation.stocks) && (
                <div className="mb-6 p-4 bg-violet-50/30 rounded-xl border border-violet-100 flex flex-wrap gap-6">
                  {review.compensation.stipend && (
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Stipend</div>
                      <div className="text-slate-800 font-bold">{review.compensation.stipend}</div>
                    </div>
                  )}
                  {review.compensation.base && (
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Base Salary</div>
                      <div className="text-slate-800 font-bold">{review.compensation.base}</div>
                    </div>
                  )}
                  {review.compensation.stocks && (
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Stocks/Bonus</div>
                      <div className="text-slate-800 font-bold">{review.compensation.stocks}</div>
                    </div>
                  )}
                </div>
              )}

              <div className="mb-6">
                 <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Experience</h4>
                 <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
                   {review.experience}
                 </p>
              </div>

              {review.rounds.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Interview Rounds</h4>
                  <div className="space-y-3">
                    {review.rounds.map((round, idx) => (
                      <div key={idx} className="p-3 border border-violet-100 rounded-lg bg-white shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-800 text-sm">{round.name}:</span>
                          <span className="text-sm text-slate-600">{round.type}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-500">{round.mode}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            round.difficulty === 'Easy' ? 'bg-green-50 text-green-700' :
                            round.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                          }`}>{round.difficulty}</span>
                        </div>
                        <p className="text-sm text-slate-500 italic border-l-2 border-violet-300 pl-3 mt-1">
                          "{round.topics}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {review.tips && (
                <div className="mb-6 bg-violet-50 border border-violet-200 p-4 rounded-xl">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-lg">💡</span>
                     <h4 className="text-sm font-bold text-violet-900 uppercase tracking-wide">Tips for future candidates</h4>
                   </div>
                   <p className="text-violet-800 text-sm leading-relaxed">
                     {review.tips}
                   </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                <button className="text-slate-400 hover:text-violet-600 text-sm font-medium flex items-center gap-2 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                  Helpful ({review.helpful})
                </button>
                <button className="text-slate-400 hover:text-slate-600 text-sm font-medium">
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}