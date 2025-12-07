import { Router } from "express";

import {
  login,
  signup,
  createInterviewExperience,
  getAllInterviewExperiences,
  getSingleInterviewExperience,
  updateInterviewExperience,
  getMyInterviewExperiences,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();




router.post("/signup", signup);
router.post("/login", login);


router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});


router.post("/share-experience", authMiddleware, createInterviewExperience);
router.get("/share-experience", getAllInterviewExperiences);
router.get("/share-experience/:id", getSingleInterviewExperience);
router.put("/share-experience/:id", authMiddleware, updateInterviewExperience);
router.get("/my-experiences",authMiddleware,getMyInterviewExperiences);



export default router;
