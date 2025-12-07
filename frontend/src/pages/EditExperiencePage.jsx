import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import exLogo from "../assets/experience-x-logo.png";
import { useAuth } from "../contexts/AuthContext";

const initialRound = { roundType: "", mode: "", difficulty: "", questions: "" };

export default function EditExperiencePage() {
  const { id } = useParams();          // /edit/:id
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
    form.stipend.trim() !== "" &&
    form.baseSalary.trim() !== "" &&
    form.stocks.trim() !== "" &&
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
          `http://localhost:3000/api/share-experience/${id}`,
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
        `http://localhost:3000/api/share-experience/${id}`,
        {
          method: "PUT", // 👈 UPDATE instead of POST
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-600">Loading experience…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center text-slate-500 mb-8 hover:text-purple-600 transition"
        >
          <span className="mr-2 text-xl group-hover:-translate-x-1 transition">
            ←
          </span>
          Back
        </button>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
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

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Reuse the same form UI as your ShareExperiencePage */}
          {/* You can literally copy your sections (Basic Details, Rounds, Compensation, Experience) here */}
          {/* And just keep handleChange, handleRoundChange, addRound, removeRound, isFormValid, handleSubmit */}

          {/* BASIC DETAILS, ROUNDS, COMPENSATION, EXPERIENCE sections go here – identical to your create form */}

          {/* For brevity, only the submit button is shown */}
          <div className="pt-4 border-t border-slate-200 mt-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}
