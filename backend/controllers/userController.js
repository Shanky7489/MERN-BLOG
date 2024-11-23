import { User } from "../models/UserModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }

    const photo = req.files.photo;
    const AllowedFormat = ["image/jpeg", "image/png", "image/webp"];

    // Corrected format check: reject if the file type is not allowed
    if (!AllowedFormat.includes(photo.mimetype)) {
      return res.status(400).json({
        message:
          "Invalid photo format. Only JPG, PNG, and WEBP formats are allowed",
      });
    }

    const { email, name, password, phone, education, role } = req.body;

    if (!email || !name || !password || !phone || !education || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    } catch (error) {
      console.error("Error while uploading an image to Cloudinary:", error);
      return res.status(500).json({ message: "Image upload failed" });
    }

    // using bcrypt for password secure

    const hashPassword = await bcrypt.hash(password, 10); // here we using the 10 its a salt value for secure purpose
    const newUser = new User({
      email,
      name,
      password: hashPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id, // Ensure this matches your schema
        url: cloudinaryResponse.secure_url,
      },
    });

    await newUser.save();
    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);
      console.log("yoyo", res);
      res.status(201).json({
        message: "User registered successfully",
        newUser,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export const Login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "all filds are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(400).json({ message: "user password is missing" });
    }

    const IsMatch = await bcrypt.compare(password, user.password);
    if (!user || !IsMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: "invalid role" });
    }

    const token = await createTokenAndSaveCookies(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

// here is the profile of the logged in  user

export const getMyProfile = async (req, res) => {
  // console.log("getmyprofile", req);
  const user = await req.user;
  res.status(200).json(user);
};

export const getAllAdmins = async (req, res) => {
  const admin = await User.find({ role: "admin" });
  res.status(200).json(admin);
};
