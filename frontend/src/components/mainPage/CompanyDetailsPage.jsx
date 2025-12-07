import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, difficulty: 'Moderate', acceptanceRate: '0%' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      setCompany({
        id: id || "Google",
        name: id || "Google",
        logo: `https://logo.clearbit.com/${(id || "google").toLowerCase().replace(/\s+/g, '')}.com`,
        industry: "Technology",
        location: "Mountain View, CA",
        website: "https://google.com",
        description:
          "Google is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.",
        overallRating: 4.5,
        totalReviews: 128,
        difficulty: "Medium-Hard",
      });

      const mockReviews = [
        {
          _id: "1",
          user: { name: "Sarthak K." },
          role: "SDE Intern",
          date: "2 days ago",
          rating: 4,
          location: "Bangalore",
          season: "Summer 2024",
          interviewType: "Internship",
          overallDifficulty: "Hard",
          offerStatus: "Accepted",
          tags: ["DSA", "Graphs", "DP"],
          rounds: [
            { name: "Round 1", type: "Online Assessment", mode: "Online", difficulty: "Medium", questions: "2 Coding questions (Strings, Arrays)" },
            { name: "Round 2", type: "Technical", mode: "Video Call", difficulty: "Hard", questions: "Graph DP problem, deeply discussed time complexity" },
            { name: "Round 3", type: "HR", mode: "Video Call", difficulty: "Easy", questions: "Behavioral questions, Googleyness" },
          ],
          stipend: "₹1,10,000/month",
          mainExperience:
            "The process was smooth but challenging. The OA was standard LeetCode medium. The technical round focused heavily on edge cases.",
          tips: "Focus on Graph algorithms and Dynamic Programming. Be vocal about your thought process during the interview.",
          helpful: 12,
        },
        {
          _id: "2",
          user: { name: "Ananya S." },
          role: "Frontend Engineer",
          date: "1 week ago",
          rating: 5,
          location: "Hyderabad",
          season: "Fall 2023",
          interviewType: "Full Time",
          overallDifficulty: "Medium",
          offerStatus: "Accepted",
          tags: ["System Design", "React", "Accessibility"],
          rounds: [
            { name: "Round 1", type: "Machine Coding", mode: "Onsite", difficulty: "Medium", questions: "Build a nested comment system in React" },
            { name: "Round 2", type: "System Design", mode: "Onsite", difficulty: "Medium", questions: "Design a news feed architecture" },
          ],
          baseSalary: "₹28 LPA",
          stocks: "₹10 Lakhs over 4 years",
          mainExperience:
            "Very professional interviewers. They helped me when I got stuck on the system design round. The machine coding round required writing clean, accessible code.",
          tips: "Brush up on web accessibility (ARIA) and performance optimization techniques.",
          helpful: 8,
        },
        {
          _id: "3",
          user: { name: "Rahul M." },
          role: "Backend Developer",
          date: "3 weeks ago",
          rating: 2,
          location: "Remote",
          season: "Winter 2023",
          interviewType: "Full Time",
          overallDifficulty: "Medium",
          offerStatus: "Rejected",
          tags: ["Java", "Spring Boot", "SQL"],
          rounds: [
            { name: "Round 1", type: "Technical", mode: "Video Call", difficulty: "Medium", questions: "Java streams and SQL complex queries" },
            { name: "Round 2", type: "Managerial", mode: "Video Call", difficulty: "Weird", questions: "Asked about gap year repeatedly" },
          ],
          mainExperience:
            "Everything went well until the hiring manager round. After that, no response for weeks. Very unprofessional behavior from HR considering the size of the company.",
          tips: "Make sure you have a good explanation for any career gaps.",
          helpful: 45,
        },
      ];

      setReviews(mockReviews);
      const acceptedCount = mockReviews.filter(r => r.offerStatus === 'Accepted').length;
      setStats({ total: mockReviews.length, difficulty: 'Medium-Hard', acceptanceRate: `${Math.round((acceptedCount / mockReviews.length) * 100)}%` });
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 blur-xl opacity-50 rounded-full animate-pulse"></div>
              <div className="relative animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 shadow-lg"></div>
            </div>
            <p className="text-slate-500 font-medium tracking-widest uppercase text-xs animate-pulse">Loading {id}...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-purple-700 mb-10 group transition-all duration-300 ease-out">
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 group-hover:border-purple-300 group-hover:shadow-md transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span className="text-sm font-medium tracking-wide">Back to Browse</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 relative overflow-hidden group hover:border-purple-100 transition-all duration-500 shadow-xl shadow-slate-200/60 hover:shadow-purple-200/50">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 animate-gradientMove"/>

              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-sm border border-slate-100">
                  <img src={company.logo} alt={company.name} onError={e => (e.target.src = 'https://logo.clearbit.com/google.com')} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 capitalize tracking-tight">{company.name}</h1>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 mt-2">Technology</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 relative z-10">
                <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Interviews</div>
                  <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Offer Rate</div>
                  <div className="text-2xl font-bold text-emerald-600">{stats.acceptanceRate}</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 relative z-10">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-slate-500 font-medium">Difficulty</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-xs ${stats.difficulty === 'Easy' ? 'text-emerald-700 bg-emerald-50' : stats.difficulty === 'Hard' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'}`}>{stats.difficulty}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${stats.difficulty === 'Hard' ? 'w-[85%] bg-red-500' : stats.difficulty === 'Easy' ? 'w-[30%] bg-emerald-500' : 'w-[60%] bg-amber-500'}`} />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl shadow-xl p-1 relative overflow-hidden group">
              <div className="bg-slate-900 rounded-[22px] p-6 text-center relative h-full transition-all">
                 <h3 className="text-white font-bold text-lg mb-2">Interviewed here?</h3>
                 <p className="text-slate-400 text-sm mb-6 leading-relaxed">Share your questions and help the community grow.</p>
                 <Link to="/add-review" className="block w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]">Submit Experience</Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Experiences</h2>
              <div className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">Showing {reviews.length} results</div>
            </div>

            {reviews.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-300">
                <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900">No reviews yet</h3>
                <p className="text-slate-500 mt-2 text-sm">Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map(exp => (
                <div key={exp._id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-0.5 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg border border-slate-200 shadow-sm">{exp.user?.name ? exp.user.name.charAt(0) : 'A'}</div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-xl tracking-tight group-hover:text-purple-700 transition-colors">{exp.role}</h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-slate-500">
                          <span className="font-medium text-slate-700">{exp.user?.name || 'Anonymous'}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>{exp.season || 'Recent'}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{exp.location || 'Remote'}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold border uppercase tracking-widest flex items-center gap-2 ${exp.offerStatus?.toLowerCase().includes('accept') ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}> <span className={`w-1.5 h-1.5 rounded-full ${exp.offerStatus?.toLowerCase().includes('accept') ? 'bg-emerald-500' : 'bg-slate-400'}`} /> {exp.offerStatus || 'Pending'} </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200">{exp.interviewType}</span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-lg border ${exp.overallDifficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : exp.overallDifficulty === 'Hard' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>Difficulty: {exp.overallDifficulty}</span>
                    {exp.tags && exp.tags.map((tag, idx) => <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg border border-purple-100">{tag.trim()}</span>)}
                  </div>

                  {(exp.stipend || exp.baseSalary) && (
                    <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                      {exp.stipend && (
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5">Stipend</div>
                          <div className="text-slate-900 font-mono text-lg font-semibold">{exp.stipend}</div>
                        </div>
                      )}
                      {exp.baseSalary && (
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5">Base Salary</div>
                          <div className="text-slate-900 font-mono text-lg font-semibold">{exp.baseSalary}</div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-8 relative z-10">
                    <h4 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-widest">Experience</h4>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{exp.mainExperience}</p>
                  </div>

                  {exp.rounds && exp.rounds.length > 0 && (
                    <div className="space-y-3 mb-8 relative z-10">
                      {exp.rounds.map((round, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 hover:bg-slate-50/80 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                              <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-100 text-[10px] text-slate-500">{idx + 1}</span>
                              {round.type}
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 rounded-md">{round.difficulty}</span>
                          </div>
                          <p className="text-sm text-slate-500 pl-7 border-l-2 border-slate-200">"{round.questions}"</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {exp.tips && (
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-100 flex gap-4 relative z-10">
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-purple-100 text-lg shadow-sm">💡</div>
                      <div>
                        <h4 className="text-[10px] font-bold text-purple-900 uppercase tracking-widest mb-1.5">Advice for Candidates</h4>
                        <p className="text-purple-800 text-sm leading-relaxed">{exp.tips}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}