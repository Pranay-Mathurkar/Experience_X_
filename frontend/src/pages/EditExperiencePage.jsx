import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import exLogo from "/experience-x-logo.png" ;
import { useAuth } from "../contexts/AuthContext";

const initialRound = { roundType: "", mode: "", difficulty: "", questions: "" };

export default function EditExperiencePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isFormValid =
    form.company.trim() !== "" &&
    form.role.trim() !== "" &&
    form.location.trim() !== "" &&
    form.season.trim() !== "" &&
    form.interviewType.trim() !== "" &&
    form.offerStatus.trim() !== "" &&
    form.overallDifficulty.trim() !== "" &&
    form.tags.trim() !== "" &&
   
    form.mainExperience.trim() !== "" &&
    form.tips.trim() !== "" &&
    form.rounds.every(
      (r) =>
        r.roundType.trim() !== "" &&
        r.mode.trim() !== "" &&
        r.difficulty.trim() !== "" &&
        r.questions.trim() !== ""
    );

  // Load existing experience
  useEffect(() => {
    const fetchExperience = async () => {
      if (!user || !token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://experience-9t2k.onrender.com/api/share-experience/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to load experience");

        const data = await res.json();

        setForm({
          company: data.company || "",
          role: data.role || "",
          location: data.location || "",
          season: data.season || "",
          interviewType: data.interviewType || "Internship",
          offerStatus: data.offerStatus || "Offered",
          overallDifficulty: data.overallDifficulty || "Medium",
          tags: (data.tags || []).join(", "),
          stipend: data.stipend || "",
          baseSalary: data.baseSalary || "",
          stocks: data.stocks || "",
          mainExperience: data.mainExperience || "",
          tips: data.tips || "",
          rounds: data.rounds && data.rounds.length > 0 ? data.rounds : [initialRound],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id, token, user, navigate]);

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

  const handleSubmit = async () => {
    setError("");

    if (!isFormValid) {
      setError("Please fill all required fields.");
      return;
    }

    if (!user || !token) {
      setError("You must be logged in to submit.");
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(
        `https://experience-9t2k.onrender.com/api/share-experience/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            tags: form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      setSubmitting(false);
      navigate(`/company/${form.company}`);
    } catch (err) {
      setSubmitting(false);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-slate-700">Loading Experience</p>
          <p className="text-sm text-slate-500 mt-2">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/account")}
          className="group flex items-center text-slate-500 mb-8 hover:text-purple-600 transition"
        >
          <span className="mr-2 text-xl group-hover:-translate-x-1 transition">←</span>
          Back to My Account
        </button>

        {/* Card */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-blue-50/50 px-8 py-8 relative overflow-hidden">
              <div className="relative z-10 flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-[11px] font-bold uppercase tracking-wider text-purple-600 mb-4">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  EDIT EXPERIENCE
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-3">
                  Update Your Interview Experience
                </h1>

                <p className="text-slate-600 text-base leading-relaxed">
                  Edit the details of your experience. Changes will update the public view
                  for other candidates.
                </p>
              </div>

              {/* Logo */}
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
                Basic Details *
              </h2>
              <p className="text-xs text-slate-500">
                All fields are required.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Company *</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
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
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="SDE Intern, Frontend Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="Bangalore / Remote / Hybrid"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Season / Year *</label>
                  <input
                    name="season"
                    value={form.season}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="Summer 2025, Fall 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Interview Type *</label>
                  <select 
                    name="interviewType" 
                    value={form.interviewType} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option>Internship</option>
                    <option>Full-time</option>
                    <option>PPO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Offer Status *</label>
                  <select 
                    name="offerStatus" 
                    value={form.offerStatus} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option>Offered</option>
                    <option>Rejected</option>
                    <option>On Hold</option>
                    <option>In Process</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Overall Difficulty *</label>
                  <select 
                    name="overallDifficulty" 
                    value={form.overallDifficulty} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tags (comma-separated) *</label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    required
                    placeholder="DSA, System Design, React, Node.js, Behavioral"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* ---------------- ROUNDS ---------------- */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Interview Rounds *</h2>
                  <p className="text-xs text-slate-500 mt-1">All round fields are required.</p>
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
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Round Type *</label>
                        <input
                          name="roundType"
                          value={round.roundType}
                          onChange={(e) => handleRoundChange(index, e)}
                          required
                          className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="OA, Tech 1, HR"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Mode *</label>
                        <input
                          name="mode"
                          value={round.mode}
                          onChange={(e) => handleRoundChange(index, e)}
                          required
                          className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="Online / Onsite"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Difficulty *</label>
                        <select
                          name="difficulty"
                          value={round.difficulty}
                          onChange={(e) => handleRoundChange(index, e)}
                          required
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
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Questions / Topics Covered *</label>
                      <textarea
                        name="questions"
                        value={round.questions}
                        onChange={(e) => handleRoundChange(index, e)}
                        required
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
                <h2 className="text-xl font-semibold text-slate-900">Compensation(optional)</h2>
                {/* <p className="text-xs text-slate-500 mt-1">All compensation fields are required.</p> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Stipend (Monthly) 
                  </label>
                  <input
                    name="stipend"
                    value={form.stipend}
                    onChange={handleChange}
                    
                    className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="₹80,000/month"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Base Salary (Annual) 
                  </label>
                  <input
                    name="baseSalary"
                    value={form.baseSalary}
                    onChange={handleChange}
                  
                    className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="₹25 LPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Stocks / Bonus 
                  </label>
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
                <p className="text-xs text-slate-500 mt-1">Share your complete interview journey.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Main Experience / Story *</label>
                <textarea
                  name="mainExperience"
                  value={form.mainExperience}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-slate-200 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-y"
                  rows={6}
                  placeholder="Walk us through your interview process, timeline, what went well, challenges faced, and overall experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tips for Future Candidates *</label>
                <textarea
                  name="tips"
                  value={form.tips}
                  onChange={handleChange}
                  required
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
                disabled={submitting || !isFormValid}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-200 transform
                  ${
                    submitting || !isFormValid
                      ? "bg-purple-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:scale-[0.98]"
                  }`}
              >
                {submitting ? "Updating Experience..." : "Save Changes"}
              </button>
              <p className="text-xs text-slate-500 text-center mt-3">
                Your changes will be reflected publicly for other candidates to view.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}