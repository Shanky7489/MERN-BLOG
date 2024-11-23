import mongoose from "mongoose";
import { Blog } from "../models/BlogModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { BlogImage } = req.files;

    const AllowedFormat = ["image/jpeg", "image/png", "image/webp"];

    // Corrected format check: reject if the file type is not allowed
    if (!AllowedFormat.includes(BlogImage.mimetype)) {
      return res.status(400).json({
        message:
          "Invalid photo format. Only JPG, PNG, and WEBP formats are allowed",
      });
    }

    const { title, category, about } = req.body;

    if (!title || !category || !about) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // console.log(req.user);

    const adminName = req?.user?.name;

    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;
    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(
        BlogImage.tempFilePath
      );
    } catch (error) {
      console.error("Error while uploading an image to Cloudinary:", error);
      return res.status(500).json({ message: "Image upload failed" });
    }

    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      BlogImage: {
        public_id: cloudinaryResponse.public_id, // Ensure this matches your schema
        url: cloudinaryResponse.secure_url,
      },
    };

    const blog = await Blog.create(blogData);
    res.status(201).json({
      message: "blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(401).json({
      message: "Blog not found",
    });
  }
  await blog.deleteOne();
  res.status(200).json({
    message: "Blog deleted Successfully",
  });
};

export const getAllBlog = async (req, res) => {
  const AllBlogs = await Blog.find();
  res.status(200).json(AllBlogs);
};

export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(401).json({
      message: "invalid Blog id",
    });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(401).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

export const getMyBlog = async (req, res) => {
  const createdBy = req.user._id;
  // console.log("get my blog", req);   //it give the login user
  const blogs = await Blog.find({ createdBy });
  // console.log(blogs);

  res.status(200).json(blogs);
};

export const UpdateBlog = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const BlogImage = req?.files?.BlogImage;
  let data = { ...req.body };
  let cloudinaryResponse;

  try {
    // If a new image is uploaded, handle Cloudinary upload
    if (BlogImage) {
      cloudinaryResponse = await cloudinary.uploader.upload(
        BlogImage.tempFilePath
      );
      data.BlogImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    // Update blog in database
    const UpdatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });

    if (!UpdatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog: UpdatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Failed to update the blog" });
  }
};
