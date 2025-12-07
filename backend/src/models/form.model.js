import mongoose, { Schema } from "mongoose";

const roundSchema = new Schema({
  roundType: { type: String, required: true },
  mode: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  questions: { type: String, required: true },
});

const FormSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Basic details (all required in frontend)
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    season: { type: String, required: true },

    interviewType: {
      type: String,
      enum: ["Internship", "Full-time", "PPO"],
      required: true,
      default: "Internship",
    },

    offerStatus: {
      type: String,
      enum: ["Offered", "Rejected", "On Hold", "In Process"],
      required: true,
      default: "Offered",
    },

    overallDifficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
      default: "Medium",
    },

    // New rating field (1–5 as string or number)
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    // Tags from comma-separated input
    tags: [{ type: String, required: true }],

    // Compensation (required in frontend now)
    stipend: { type: String, required: true },
    baseSalary: { type: String, required: true },
    stocks: { type: String, required: true },

    // Experience
    mainExperience: { type: String, required: true },
    tips: { type: String, required: true },

    // Rounds (all fields required above)
    rounds: {
      type: [roundSchema],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one round is required",
      },
      required: true,
    },
  },
  { timestamps: true }
);

const InterviewExperience = mongoose.model("InterviewExperience", FormSchema);

export { InterviewExperience };
