import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function AddReviewPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    basic: {
      company: "",
      role: "",
      location: "",
      season: "",
      type: "Internship",
      status: "Offered",
      difficulty: "Medium",
      tags: ""
    },
    rounds: [
      { id: 1, type: "", mode: "", difficulty: "Select", questions: "" }
    ],
    compensation: {
      stipend: "",
      base: "",
      stocks: ""
    },
    details: {
      experience: "",
      tips: ""
    }
  });

  const handleBasicChange = (e) => {
    setFormData({
      ...formData,
      basic: { ...formData.basic, [e.target.name]: e.target.value }
    });
  };

  const handleCompChange = (e) => {
    setFormData({
      ...formData,
      compensation: { ...formData.compensation, [e.target.name]: e.target.value }
    });
  };

  const handleDetailsChange = (e) => {
    setFormData({
      ...formData,
      details: { ...formData.details, [e.target.name]: e.target.value }
    });
  };

  const handleRoundChange = (index, e) => {
    const updated = [...formData.rounds];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, rounds: updated });
  };

  const addRound = () => {
    setFormData({
      ...formData,
      rounds: [
        ...formData.rounds,
        {
          id: formData.rounds.length + 1,
          type: "",
          mode: "",
          difficulty: "Select",
          questions: ""
        }
      ]
    });
  };

  const removeRound = (index) => {
    if (formData.rounds.length > 1) {
      const filtered = formData.rounds.filter((_, i) => i !== index);
      setFormData({ ...formData, rounds: filtered });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.basic.company || !formData.basic.role || !formData.details.experience) {
      alert("Please fill required fields");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(formData);
      alert("Review submitted successfully!");
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans"
      >
        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ x: -4 }}
            className="group flex items-center text-slate-500 mb-8 hover:text-purple-600 transition-colors duration-200"
          >
            <span className="mr-2 text-xl">&larr;</span>
            Back to Home
          </motion.button>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 70 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100"
          >
            <div className="mb-8 border-b border-slate-100 pb-6">
              <h1 className="text-3xl font-bold text-slate-900">
                Share Your Interview Experience
              </h1>
              <p className="text-slate-500 mt-2 text-sm">
                Your submission will be stored anonymously.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-purple-500 pl-3">
                  Basic Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.basic.company}
                      onChange={handleBasicChange}
                      placeholder="Amazon, Google"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.basic.role}
                      onChange={handleBasicChange}
                      placeholder="SDE Intern"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.basic.location}
                      onChange={handleBasicChange}
                      placeholder="Bangalore, Remote"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Season
                    </label>
                    <input
                      type="text"
                      name="season"
                      value={formData.basic.season}
                      onChange={handleBasicChange}
                      placeholder="Summer 2025"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Interview Type
                    </label>
                    <select
                      name="type"
                      value={formData.basic.type}
                      onChange={handleBasicChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    >
                      <option>Internship</option>
                      <option>Full Time (New Grad)</option>
                      <option>Full Time (Experienced)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Offer Status
                    </label>
                    <select
                      name="status"
                      value={formData.basic.status}
                      onChange={handleBasicChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    >
                      <option>Offered</option>
                      <option>Rejected</option>
                      <option>Pending</option>
                      <option>Withdrawn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      name="difficulty"
                      value={formData.basic.difficulty}
                      onChange={handleBasicChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.basic.tags}
                      onChange={handleBasicChange}
                      placeholder="DSA, C++, Onsite"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-purple-500 pl-3">
                  Interview Rounds
                </h2>
                <p className="text-slate-500 text-sm mb-6 pl-4">
                  Add one card per round.
                </p>

                <AnimatePresence>
                  {formData.rounds.map((round, index) => (
                    <motion.div
                      key={round.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-6"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700">Round {index + 1}</h3>
                        {formData.rounds.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRound(index)}
                            className="text-red-400 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input
                          type="text"
                          name="type"
                          value={round.type}
                          onChange={(e) => handleRoundChange(index, e)}
                          placeholder="OA, Tech 1"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-100"
                        />

                        <input
                          type="text"
                          name="mode"
                          value={round.mode}
                          onChange={(e) => handleRoundChange(index, e)}
                          placeholder="Online, Onsite"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-100"
                        />

                        <select
                          name="difficulty"
                          value={round.difficulty}
                          onChange={(e) => handleRoundChange(index, e)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-100"
                        >
                          <option>Select</option>
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </div>

                      <textarea
                        name="questions"
                        rows="3"
                        value={round.questions}
                        onChange={(e) => handleRoundChange(index, e)}
                        placeholder="Mention coding/system design questions"
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-100 resize-none"
                      ></textarea>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={addRound}
                  className="mt-4 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:text-purple-600 transition-colors flex items-center gap-2 text-sm shadow-sm"
                >
                  +
                  Add another round
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-purple-500 pl-3">
                  Compensation
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    name="stipend"
                    value={formData.compensation.stipend}
                    onChange={handleCompChange}
                    placeholder="₹80,000/month"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />

                  <input
                    type="text"
                    name="base"
                    value={formData.compensation.base}
                    onChange={handleCompChange}
                    placeholder="₹25 LPA"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />

                  <input
                    type="text"
                    name="stocks"
                    value={formData.compensation.stocks}
                    onChange={handleCompChange}
                    placeholder="$50k RSUs"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-purple-500 pl-3">
                  Detailed Experience
                </h2>

                <div className="space-y-6">
                  <textarea
                    name="experience"
                    rows="6"
                    value={formData.details.experience}
                    onChange={handleDetailsChange}
                    placeholder="Explain the full process"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 resize-y"
                  ></textarea>

                  <textarea
                    name="tips"
                    rows="4"
                    value={formData.details.tips}
                    onChange={handleDetailsChange}
                    placeholder="Useful tips"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 resize-y"
                  ></textarea>
                </div>
              </motion.div>

              <div className="pt-6 border-t border-slate-100">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { y: -3 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg shadow-purple-500/30 transition-all ${
                    isSubmitting
                      ? "bg-purple-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
