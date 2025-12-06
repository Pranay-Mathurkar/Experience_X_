import React, { useState } from "react";
import exLogo from "../assets/experience-x-logo.png"; 


const initialRound = { roundType: "", mode: "", difficulty: "", questions: "" };

export default function ShareExperiencePage() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    season: "",
    interviewType: "Internship",
    offerStatus: "Offered",
    overallDifficulty: "Medium",
    tags: "",
    stipend: "",
    baseSalary: "",
    stocks: "",
    mainExperience: "",
    tips: "",
    rounds: [initialRound],
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Resume state
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState("");

  // Coding Links state
  const [codingLinks, setCodingLinks] = useState([
    { platform: "", url: "" }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoundChange = (index, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const rounds = [...prev.rounds];
      rounds[index] = { ...rounds[index], [name]: value };
      return { ...prev, rounds };
    });
  };

  const addRound = () => {
    setForm((prev) => ({ ...prev, rounds: [...prev.rounds, { ...initialRound }] }));
  };

  const removeRound = (index) => {
    setForm((prev) => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index),
    }));
  };

  // Coding Links handlers
  const handleCodingLinkChange = (index, e) => {
    const { name, value } = e.target;
    setCodingLinks(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [name]: value };
      return next;
    });
  };

  const addCodingLink = () => {
    setCodingLinks(prev => [...prev, { platform: "", url: "" }]);
  };

  const removeCodingLink = (index) => {
    setCodingLinks(prev => prev.filter((_, i) => i !== index));
  };

  // Handle resume
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
    setResumeName(file.name);
  };

  const removeResume = () => {
    setResumeFile(null);
    setResumeName("");
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.company || !form.role || !form.mainExperience) {
      setError("Company, Role and Main Experience are required.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("https://your-backend.com/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          codingLinks: codingLinks.filter(l => l.url.trim() !== ""),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitting(false);
      alert("Submitted successfully!");
      // Reset form
      setForm({
        company: "",
        role: "",
        location: "",
        season: "",
        interviewType: "Internship",
        offerStatus: "Offered",
        overallDifficulty: "Medium",
        tags: "",
        stipend: "",
        baseSalary: "",
        stocks: "",
        mainExperience: "",
        tips: "",
        rounds: [initialRound],
      });
      setCodingLinks([{ platform: "", url: "" }]);
      setResumeFile(null);
      setResumeName("");
    } catch (err) {
      setSubmitting(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => alert('Navigate to home')}
          className="group flex items-center text-slate-500 mb-8 hover:text-purple-600 transition"
        >
          <span className="mr-2 text-xl group-hover:-translate-x-1 transition">
            ←
          </span>
          Back to Home
        </button>

        {/* Card */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">

          {/* Header */}
         <div className="mb-8">
  <div className="flex items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-blue-50/50 px-8 py-8 relative overflow-hidden">

              
              <div className="relative z-10 flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-[11px] font-bold uppercase tracking-wider text-purple-600 mb-4">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  SHARE & HELP OTHERS
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-3">
                  Share Your Interview Experience
                </h1>

                <p className="text-slate-600 text-base leading-relaxed">
                  Add details about rounds, questions, and your preparation journey so other
                  candidates can learn from your experience. Your submission stays anonymous.
                </p>
              </div>

              {/* Logo - Aligned to top right */}
             {/* Logo - Centered vertically on the right */}
<div className="relative z-10 flex items-center justify-center shrink-0 self-center">
  <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
    <img
      src={exLogo}
      alt="Experience X Logo"
      className="w-full h-full object-contain drop-shadow-lg"
    />
  </div>
</div>

            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-8">

            {/* ---------------- BASIC DETAILS ---------------- */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Basic Details
              </h2>
              <p className="text-xs text-slate-500">
                Fields marked with * are required.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Company *</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="Google, Amazon, Microsoft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role / Position *</label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="SDE Intern, Frontend Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="Bangalore / Remote / Hybrid"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Season / Year</label>
                  <input
                    name="season"
                    value={form.season}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="Summer 2025, Fall 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Interview Type</label>
                  <select 
                    name="interviewType" 
                    value={form.interviewType} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none cursor-pointer"
                  >
                    <option>Internship</option>
                    <option>Full-time</option>
                    <option>PPO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Offer Status</label>
                  <select 
                    name="offerStatus" 
                    value={form.offerStatus} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none cursor-pointer"
                  >
                    <option>Offered</option>
                    <option>Rejected</option>
                    <option>On Hold</option>
                    <option>In Process</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Overall Difficulty</label>
                  <select 
                    name="overallDifficulty" 
                    value={form.overallDifficulty} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none cursor-pointer"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tags (comma-separated)</label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="DSA, System Design, React, Node.js, Behavioral"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* ---------------- CODING PLATFORM LINKS ---------------- */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Coding Platform Links</h2>
                  <p className="text-xs text-slate-500 mt-1">Optional: Share your profiles (LeetCode, GitHub, etc.)</p>
                </div>
                <button
                  type="button"
                  onClick={addCodingLink}
                  className="text-sm px-4 py-2 rounded-xl border border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 transition-all font-medium"
                >
                  + Add Link
                </button>
              </div>

              <div className="space-y-3">
                {codingLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr,2fr,auto] gap-3 items-center bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <select
                      name="platform"
                      value={link.platform}
                      onChange={(e) => handleCodingLinkChange(index, e)}
                      className="p-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    >
                      <option value="">Select Platform</option>
                      <option value="LeetCode">LeetCode</option>
                      <option value="Codeforces">Codeforces</option>
                      <option value="CodeChef">CodeChef</option>
                      <option value="GitHub">GitHub</option>
                      <option value="GeeksforGeeks">GeeksforGeeks</option>
                      <option value="HackerRank">HackerRank</option>
                      <option value="AtCoder">AtCoder</option>
                      <option value="TopCoder">TopCoder</option>
                      <option value="Other">Other</option>
                    </select>

                    <input
                      type="url"
                      name="url"
                      value={link.url}
                      onChange={(e) => handleCodingLinkChange(index, e)}
                      placeholder="https://leetcode.com/username"
                      className="p-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    />

                    {codingLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCodingLink(index)}
                        className="text-xs text-red-500 hover:text-red-600 font-medium px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ---------------- RESUME UPLOAD ---------------- */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Resume (Optional)</h2>
                <p className="text-xs text-slate-500 mt-1">Upload your resume (PDF, DOC, DOCX - Max 5MB)</p>
              </div>

              {!resumeFile ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-2 text-slate-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-1 text-sm text-slate-600 font-medium">
                      <span className="text-purple-600 font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleResumeChange}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{resumeName}</p>
                      <p className="text-xs text-slate-500">Resume uploaded successfully</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeResume}
                    className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-all"
                  >
                    Remove
                  </button>
                </div>
              )}
            </section>

            {/* ---------------- ROUNDS ---------------- */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Interview Rounds</h2>
                  <p className="text-xs text-slate-500 mt-1">Add details about each round you faced</p>
                </div>
                <button
                  type="button"
                  onClick={addRound}
                  className="text-sm px-4 py-2 rounded-xl border border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 transition-all font-medium"
                >
                  + Add Round
                </button>
              </div>

              <div className="space-y-4">
                {form.rounds.map((round, index) => (
                  <div key={index} className="border border-slate-200 bg-slate-50/50 p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-slate-900">Round {index + 1}</h3>
                      {form.rounds.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeRound(index)} 
                          className="text-xs text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-all"
                        >
                          Remove Round
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Round Type</label>
                        <input
                          name="roundType"
                          value={round.roundType}
                          onChange={(e) => handleRoundChange(index, e)}
                          className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="OA, Tech 1, HR"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Mode</label>
                        <input
                          name="mode"
                          value={round.mode}
                          onChange={(e) => handleRoundChange(index, e)}
                          className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="Online / Onsite"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Difficulty</label>
                        <select
                          name="difficulty"
                          value={round.difficulty}
                          onChange={(e) => handleRoundChange(index, e)}
                          className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none"
                        >
                          <option value="">Select</option>
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Questions / Topics Covered</label>
                      <textarea
                        name="questions"
                        value={round.questions}
                        onChange={(e) => handleRoundChange(index, e)}
                        className="w-full p-3 border border-slate-200 bg-white rounded-lg text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-y"
                        rows={3}
                        placeholder="Describe the questions asked, topics covered, coding problems, behavioral questions, etc."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ---------------- COMPENSATION ---------------- */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Compensation</h2>
                <p className="text-xs text-slate-500 mt-1">Optional: Share salary details anonymously</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Stipend (Monthly)</label>
                  <input
                    name="stipend"
                    value={form.stipend}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="₹80,000/month"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Base Salary (Annual)</label>
                  <input
                    name="baseSalary"
                    value={form.baseSalary}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="₹25 LPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Stocks / Bonus</label>
                  <input
                    name="stocks"
                    value={form.stocks}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="$50k RSUs, joining bonus"
                  />
                </div>
              </div>
            </section>

            {/* ---------------- EXPERIENCE ---------------- */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Detailed Experience *</h2>
                <p className="text-xs text-slate-500 mt-1">Share your complete interview journey</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Main Experience / Story *</label>
                <textarea
                  name="mainExperience"
                  value={form.mainExperience}
                  onChange={handleChange}
                  className="w-full p-4 border border-slate-200 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-y"
                  rows={6}
                  placeholder="Walk us through your interview process, timeline, what went well, challenges faced, and overall experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tips for Future Candidates</label>
                <textarea
                  name="tips"
                  value={form.tips}
                  onChange={handleChange}
                  className="w-full p-4 border border-slate-200 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-y"
                  rows={4}
                  placeholder="Share your preparation strategy, important topics to focus on, mistakes to avoid, resources that helped, etc."
                />
              </div>
            </section>

            {/* ---------------- SUBMIT ---------------- */}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-200 transform
                  ${
                    submitting
                      ? "bg-purple-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:scale-[0.98]"
                  }`}
              >
                {submitting ? "Submitting Your Experience..." : "Submit Experience"}
              </button>
              <p className="text-xs text-slate-500 text-center mt-3">
                By submitting, you agree that your post may be shown publicly in an anonymous form to help other candidates.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
