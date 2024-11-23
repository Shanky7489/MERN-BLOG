import express from "express"; // for  morden ja
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/UserRoutes.js";
import blogRoute from "./routes/BlogRoutes.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
// console.log(MONGO_URL);

// to use the midleware for for accepting the json data  bcz data is coming the form of json
app.use(express.json());

// To use the middleware for taking the token from cookie
app.use(cookieParser());

// app.use(cors()); // Yeh sab origins ko allow karega
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow credentials
  })
);

// again use the midleware for file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// code for DB CONNECTION

try {
  mongoose.connect(MONGO_URL);
  console.log("db connection successfully");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("jai shree ram");
});

// Defining ROUTES
app.use("/api/users", userRoute);
app.use("/api/blog", blogRoute);

//CODE FOR CLOUDINARY (IMAGE SAVE)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

app.listen(PORT, () => {
  console.log(`server running on port number ${PORT}`);
});
