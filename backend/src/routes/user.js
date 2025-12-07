import { Router } from "express";

import {
  login,
  signup,
  googleLogin,
  createInterviewExperience,
  getAllInterviewExperiences,
  getSingleInterviewExperience, 
  updateInterviewExperience,
  getMyInterviewExperiences,
  getCompanyExperiences,
  deleteInterviewExperience,     
  toggleBookmark,               
  toggleFollowCompany,  
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();




router.post("/signup", signup);
router.post("/login", login);
router.post("/auth/google", googleLogin);



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
router.get("/company/:companyName", getCompanyExperiences);

router.delete("/share-experience/:id",authMiddleware,deleteInterviewExperience);


router.post("/bookmark",authMiddleware,toggleBookmark);


router.post("/follow-company",authMiddleware,toggleFollowCompany);










export default router;
