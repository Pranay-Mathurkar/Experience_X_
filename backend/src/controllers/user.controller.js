import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

import {InterviewExperience} from "../models/form.model.js";





const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Please fill all required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(httpStatus.CREATED).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (e) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Something went wrong: ${e.message}` });
  }
};





const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        
        email: user.email,
      },
    });

  } catch (e) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Something went wrong: ${e.message}` });
  }
};



/* =========================================================
    1. CREATE INTERVIEW EXPERIENCE (FORM SUBMISSION)
   POST /api/interviews
   LOGIN REQUIRED
========================================================= */
 const createInterviewExperience = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      season,
      interviewType,
      offerStatus,
      overallDifficulty,
      tags,
      stipend,
      baseSalary,
      stocks,
      mainExperience,
      tips,
      rounds,
      codingLinks,
    } = req.body;

    if (!company || !role || !mainExperience) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Company, Role and Main Experience are required",
      });
    }

    const experience = await InterviewExperience.create({
      user: req.user._id, 
      company,
      role,
      location,
      season,
      interviewType,
      offerStatus,
      overallDifficulty,
      tags,
      stipend,
      baseSalary,
      stocks,
      mainExperience,
      tips,
      rounds,
      codingLinks,
    });

    return res.status(httpStatus.CREATED).json({
      message: "Interview experience submitted successfully",
      data: experience,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to submit experience",
      error: error.message,
    });
  }
};

/* =========================================================
    2. GET ALL INTERVIEW EXPERIENCES (COMPANY PAGE)
   GET /api/interviews
   PUBLIC
========================================================= */


 const getAllInterviewExperiences = async (req, res) => {
  try {
    const experiences = await InterviewExperience.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(httpStatus.OK).json(experiences);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch experiences",
    });
  }
};




/* =========================================================
    3. GET SINGLE FULL INTERVIEW (OPEN FULL DATA)
   GET /api/interviews/:id
   PUBLIC
========================================================= */



 const getSingleInterviewExperience = async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id)
      .populate("user", "name email");

    if (!experience) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Experience not found",
      });
    }

    return res.status(httpStatus.OK).json(experience);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch experience",
    });
  }
};



/* =========================================================
    4. UPDATE FULL INTERVIEW EXPERIENCE (EDIT)
   PUT /api/interviews/:id
   LOGIN REQUIRED (OWNER ONLY)
========================================================= */




 const updateInterviewExperience = async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id);

    if (!experience) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Experience not found",
      });
    }

   

    if (experience.user.toString() !== req.user._id.toString()) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "You are not allowed to edit this experience",
      });
    }

    const updatedExperience = await InterviewExperience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(httpStatus.OK).json({
      message: "Interview experience updated successfully",
      data: updatedExperience,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update experience",
      error: error.message,
    });
  }
};

/* =========================================================
    5. GET LOGGED-IN USER'S OWN EXPERIENCES
   GET /api/interviews/my
   LOGIN REQUIRED
========================================================= */


 const getMyInterviewExperiences = async (req, res) => {
  try {
    const experiences = await InterviewExperience.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(httpStatus.OK).json(experiences);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch your experiences",
    });
  }
};


const getCompanyExperiences = async (req, res) => {
  try {
    const { companyName } = req.params;

    const experiences = await InterviewExperience.find({
      company: { $regex: new RegExp(`^${companyName}$`, "i") }, // case-insensitive match
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(httpStatus.OK).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch company experiences",
      error: error.message,
    });
  }
};



// ✅ DELETE MY EXPERIENCE
const deleteInterviewExperience = async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id);

    if (!experience) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Experience not found",
      });
    }

    if (experience.user.toString() !== req.user._id.toString()) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "You are not allowed to delete this experience",
      });
    }

    await experience.deleteOne();

    return res.status(httpStatus.OK).json({
      message: "Experience deleted successfully",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};

// ✅ BOOKMARK / UNBOOKMARK EXPERIENCE
const toggleBookmark = async (req, res) => {
  try {
    const { experienceId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user.bookmarks) user.bookmarks = [];

    if (user.bookmarks.includes(experienceId)) {
      user.bookmarks.pull(experienceId); // Unbookmark
    } else {
      user.bookmarks.push(experienceId); // Bookmark
    }

    await user.save();

    return res.status(httpStatus.OK).json({
      message: "Bookmark updated",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Bookmark failed",
      error: error.message,
    });
  }
};

// ✅ FOLLOW / UNFOLLOW COMPANY
const toggleFollowCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    const user = await User.findById(req.user._id);

    if (!user.followedCompanies) user.followedCompanies = [];

    if (user.followedCompanies.includes(companyName)) {
      user.followedCompanies.pull(companyName); // Unfollow
    } else {
      user.followedCompanies.push(companyName); // Follow
    }

    await user.save();

    return res.status(httpStatus.OK).json({
      message: "Follow list updated",
      followedCompanies: user.followedCompanies,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Follow failed",
      error: error.message,
    });
  }
};




export { 
signup,
login, 
createInterviewExperience,
getAllInterviewExperiences,
getSingleInterviewExperience,
updateInterviewExperience,
getMyInterviewExperiences,
getCompanyExperiences,
 deleteInterviewExperience,
  toggleBookmark,
  toggleFollowCompany,

};


