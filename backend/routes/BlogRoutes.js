import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getMyBlog,
  getSingleBlog,
  UpdateBlog,
} from "../controllers/blogController.js";
import { isAdmin, IsAuthenticated } from "../Middleware/authUser.js";

const router = express.Router();

router.post("/createblog", IsAuthenticated, isAdmin("admin"), createBlog);
router.delete("/delete/:id", IsAuthenticated, isAdmin("admin"), deleteBlog);
// router.get("/all-blogs", getAllBlog);
router.get("/all-blogs", IsAuthenticated, getAllBlog);
router.get("/Single-blog/:id", IsAuthenticated, getSingleBlog);
router.get("/my-blog", IsAuthenticated, isAdmin("admin"), getMyBlog);
router.put("/updateBlog/:id", IsAuthenticated, isAdmin("admin"), UpdateBlog);

export default router;
