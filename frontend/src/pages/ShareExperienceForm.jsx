import React, { useState } from "react";

const initialRound = { roundType: "", mode: "", difficulty: "", questions: "" };

const ShareExperienceForm = ({ onSubmitSuccess }) => {
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
    setForm((prev) => ({ ...prev, rounds: [...prev.rounds, initialRound] }));
  };

  const removeRound = (index) => {
    setForm((prev) => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.company || !form.role || !form.mainExperience) {
      setError("Company, Role and Main Experience are required.");
      return;
    }

    try {
      setSubmitting(true);

      // Example: adjust URL to your backend route
      const res = await fetch("https://your-backend-url.com/api/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // add Authorization: `Bearer ${token}` if needed
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit experience");
      }

      setSubmitting(false);
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

      if (onSubmitSuccess) onSubmitSuccess();
      alert("Thanks! Your experience has been submitted.");
    } catch (err) {
      setSubmitting(false);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Share Your Interview Experience</h1>
      <p className="text-sm text-gray-400 mb-6">
        Your submission will be stored anonymously. Please avoid sharing names, emails,
        or any sensitive personal data.
      </p>

      {error && (
        <div className="mb-4 text-sm text-red-400 border border-red-500 rounded px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Company *</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Amazon, Google, etc."
                className="w-full border rounded px-3 py-2 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Role / Position *</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="SDE Intern, Data Analyst, etc."
                className="w-full border rounded px-3 py-2 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Bangalore, Remote, etc."
                className="w-full border rounded px-3 py-2 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Season / Year</label>
              <input
                type="text"
                name="season"
                value={form.season}
                onChange={handleChange}
                placeholder="Summer 2025, Fall 2024, etc."
                className="w-full border rounded px-3 py-2 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Interview Type</label>
              <select
                name="interviewType"
                value={form.interviewType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-transparent"
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="PPO">PPO (Pre-placement Offer)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Offer Status</label>
              <select
                name="offerStatus"
                value={form.offerStatus}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-transparent"
              >
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
                <option value="On Hold">On Hold</option>
                <option value="In Process">In Process</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Overall Difficulty</label>
              <select
                name="overallDifficulty"
                value={form.overallDifficulty}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-transparent"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="DSA, System Design, C++, Onsite"
                className="w-full border rounded px-3 py-2 bg-transparent"
              />
            </div>
          </div>
        </section>

        {/* Rounds */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Interview Rounds</h2>
          <p className="text-xs text-gray-400">
            Add one card per round (Online Assessment, Technical, HR, etc.).
          </p>

          {form.rounds.map((round, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-3 bg-black/20"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Round {index + 1}</h3>
                {form.rounds.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRound(index)}
                    className="text-xs text-red-400"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm mb-1">Round Type</label>
                  <input
                    type="text"
                    name="roundType"
                    value={round.roundType}
                    onChange={(e) => handleRoundChange(index, e)}
                    placeholder="OA, Tech 1, Tech 2, HR"
                    className="w-full border rounded px-3 py-2 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Mode</label>
                  <input
                    type="text"
                    name="mode"
                    value={round.mode}
                    onChange={(e) => handleRoundChange(index, e)}
                    placeholder="Online / Onsite / Phone"
                    className="w-full border rounded px-3 py-2 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Difficulty</label>
                  <select
                    name="difficulty"
                    value={round.difficulty}
                    onChange={(e) => handleRoundChange(index, e)}
                    className="w-full border rounded px-3 py-2 bg-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Questions / Topics covered
                </label>
                <textarea
                  name="questions"
                  value={round.questions}
                  onChange={(e) => handleRoundChange(index, e)}
                  rows={3}
                  placeholder="Mention coding questions, system design problems, HR questions, etc."
                  className="w-full border rounded px-3 py-2 bg-transparent"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addRound}
            className="text-sm border rounded px-3 py-2 mt-1"
          >
            + Add another round
          </button>
        </section>

        {/* Compensation (optional) */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Compensation (Optional & Anonymous)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Stipend</label>
              <input
                type="text"
                name="stipend"
                value={form.stipend}
                onChange={handleChange}
                placeholder="₹80,000/month"
                className="w-full border rounded px-3 py-2 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Base Salary (CTC / year)</label>
              <input
                type="text"
                name="baseSalary"
                value={form.baseSalary}
                onChange={handleChange}
                placeholder="₹25 LPA"
                className="w-full border rounded px-3 py-2 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Stocks / Bonus</label>
              <input
                type="text"
                name="stocks"
                value={form.stocks}
                onChange={handleChange}
                placeholder="$50k RSUs, joining bonus, etc."
                className="w-full border rounded px-3 py-2 bg-transparent"
              />
            </div>
          </div>
        </section>

        {/* Narrative */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Detailed Experience *</h2>
          <div>
            <label className="block text-sm mb-1">
              Main Experience / Story *
            </label>
            <textarea
              name="mainExperience"
              value={form.mainExperience}
              onChange={handleChange}
              rows={6}
              placeholder="Walk us through the process, timeline, what went well, what was hard, etc."
              className="w-full border rounded px-3 py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Tips for future candidates</label>
            <textarea
              name="tips"
              value={form.tips}
              onChange={handleChange}
              rows={4}
              placeholder="Preparation strategy, must-do topics, mistakes to avoid, etc."
              className="w-full border rounded px-3 py-2 bg-transparent"
            />
          </div>
        </section>

        {/* Submit */}
        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Experience"}
          </button>
          <p className="text-xs text-gray-500">
            By submitting, you agree that your post may be shown publicly in an
            anonymous form.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ShareExperienceForm;
