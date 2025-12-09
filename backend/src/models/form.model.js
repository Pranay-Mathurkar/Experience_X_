
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

<<<<<<< HEAD
  
=======
>>>>>>> 5ebfe5a4516b9dfd6f31d2fd207c27b643c22e34
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

<<<<<<< HEAD
  
=======
>>>>>>> 5ebfe5a4516b9dfd6f31d2fd207c27b643c22e34
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    tags: [{ type: String, required: true }],

    stipend: { type: String, default: "" },
    baseSalary: { type: String, default: "" },
    stocks: { type: String, default: "" },

    mainExperience: { type: String, required: true },
    tips: { type: String, required: true },

<<<<<<< HEAD

=======
>>>>>>> 5ebfe5a4516b9dfd6f31d2fd207c27b643c22e34
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

const InterviewExperience = mongoose.model(
  "InterviewExperience",
  FormSchema
);

export { InterviewExperience };
