// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: false, minlength: 6 },
//    googleId: { type: String },
//   token: { type: String },
// });

// const User = mongoose.model("User", userSchema);
// export { User };




import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: false, minlength: 6 },

    googleId: { type: String },

    token: { type: String },

  
    followedCompanies: [
      {
        type: String, // example: "google", "microsoft"
      },
    ],

    
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewExperience", // must match your model name
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
