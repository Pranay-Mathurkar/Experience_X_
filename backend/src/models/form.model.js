import mongoose, { Schema } from "mongoose";

const roundSchema = new Schema({
  roundType: { type: String },
  mode: { type: String },
  difficulty: { type: String },
  questions: { type: String },
});

const codingLinkSchema = new Schema({
  platform: { type: String },
  url: { type: String },
});

const FormSchema = new Schema(
  {
    // ✅ Optional: If user is logged in
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String },
    season: { type: String },

    interviewType: {
      type: String,
      enum: ["Internship", "Full-time", "PPO"],
      default: "Internship",
    },

    offerStatus: {
      type: String,
      enum: ["Offered", "Rejected", "On Hold", "In Process"],
      default: "Offered",
    },

    overallDifficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    tags: [{ type: String }],

    stipend: { type: String },
    baseSalary: { type: String },
    stocks: { type: String },

    mainExperience: { type: String, required: true },
    tips: { type: String },

    rounds: [roundSchema],
    codingLinks: [codingLinkSchema],

    //  If you later store resume URL (Cloudinary, etc)
    resumeUrl: { type: String },
  },
  { timestamps: true }
);

const InterviewExperience = mongoose.model(  "InterviewExperience", FormSchema );
export {InterviewExperience};
