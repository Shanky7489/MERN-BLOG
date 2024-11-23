import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthProvider";

const Register = () => {
  const { isAuthnticated, setIsAuthnticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const HandlerRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      console.log("registerapi", response);
      console.log("registerapi data", data);
      toast.success(data.message || "User register successfully");
      setIsAuthnticated(true);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Please fill required fields");
      console.log("err reg", error);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md rounded p-8 bg-white shadow-md">
          <form onSubmit={HandlerRegister}>
            <div className="font-semibold text-xl items-center text-center">
              Hacker <span className="text-blue-500">Kernel</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Register</h1>
            <select
              className="w-full p-2 mb-4 rounded-md border"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2  rounded-md border"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2  rounded-md border"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Enter  phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2  rounded-md border"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter  Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2  rounded-md border"
              />
            </div>

            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full mb-4 rounded-md border p-2"
            >
              <option>Select Your Education </option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="B.Tech">B.Tech</option>
            </select>

            <div className="flex items-center mb-4 ">
              <div className="w-20 h-20 mr-4">
                <img
                  src={photoPreview ? `${photoPreview}` : "photo"}
                  alt="image"
                />
              </div>
              <input
                type="file"
                className="w-full mb-4 rounded-md border p-2"
                onChange={changePhotoHandler}
              />
            </div>

            <p className="text-center mb-4">
              Already Register{" "}
              <Link className="text-blue-600" to={"/login"}>
                Login Now
              </Link>
            </p>

            <button
              className="w-full p-2 bg-blue-500 hover:bg-blue-600 divide-neutral-300 rounded-md text-white"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
