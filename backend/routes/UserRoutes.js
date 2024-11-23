import express from "express";
import {
  getAllAdmins,
  getMyProfile,
  Login,
  Logout,
  register,
} from "../controllers/userController.js";
import { IsAuthenticated } from "../Middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
// router.get("/logout", IsAuthenticated, Logout);
router.get("/logout", IsAuthenticated, Logout);
router.get("/getmyprofile", IsAuthenticated, getMyProfile);
router.get("/getalladmin", getAllAdmins);

export default router;
