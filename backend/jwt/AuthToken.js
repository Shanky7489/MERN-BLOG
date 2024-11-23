import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    // httpOnly: true,
    httpOnly: false,  // for deployement bcz  Fend and Bend both are deploye defernt server or deferent DOMAIN
    secure: true,
    // sameSite: "strict",
    sameSite: "none", // for deployement bcz  Fend and Bend both are deploye defernt server or deferent DOMAIN
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
