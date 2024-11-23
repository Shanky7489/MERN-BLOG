import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

// ******** code for Authentocation ********
export const IsAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log("middle", token);
    if (!token) {
      return res.status(401).json({
        message: "User not Authenticated",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded", decoded);
    // const {_id} = decoded

    const user = await User.findById(decoded.userId);
    req.user = user;
    // console.log("shanky", user);
    next();
  } catch (error) {
    console.log("error occuring in authentication", error);
    res.status(400).json({
      message: "User not Authenticated",
    });
  }
};

// ********code for Authorization ********

export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ error: `User with this given ${req.user.rols} not allowed` });
    }
    next();
  };
};
