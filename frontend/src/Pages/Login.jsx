// import { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     role: "",
//     error: "",
//   });
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [role, setRole] = useState("user");
//   // const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Making API call to the backend
//       const response = await axios.post(
//         "http://localhost:4000/api/users/login",
//         { email: data.email, password: data.password, role: data.role },
//         {
//           withCredentials: true, // Important to send cookies
//         }
//       );

//       // If login is successful, you can redirect or handle accordingly
//       console.log(response.data); // 'Login successful'
//       setData({ ...data, error: "" }); // Clear any error message

//       // Optionally, you can handle user state or redirect to another page here
//       // e.g., window.location.href = "/dashboard";
//     } catch (err) {
//       console.error(err);
//       setData({ ...data, error: "Invalid credentials. Please try again." });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <form onSubmit={handleSubmit}>
//           {/* Email Field */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="email"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//               value={data.email}
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//               value={data.password}
//               onChange={(e) => setData({ ...data, password: e.target.value })}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Role Dropdown */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="role"
//             >
//               Role
//             </label>
//             <select
//               id="role"
//               className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//               value={data.role}
//               onChange={(e) => setData({ ...data, role: e.target.value })}
//             >
//               <option value="user">role</option>
//               <option value="admin">Admin</option>
//               <option value="manager">user</option>
//             </select>
//           </div>

//           {/* Error Message */}
//           {data.error && (
//             <div className="text-red-500 text-sm mb-4">{data.error}</div>
//           )}

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../Context/AuthProvider";

const Login = () => {
  const { isAuthnticated, setIsAuthnticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const HandlerRegister = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !role) {
        // toast.error("Please fill all fields");
        console.log("hello");
        // return; // Validation ke baad aapko return karna hoga
      }
      const response = await axios.post(
        "http://localhost:4000/api/users/login",

        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      toast.success(data.message || "User logged in successfully");
      setIsAuthnticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      console.log("err from login", error);
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
            <h1 className="text-xl font-semibold mb-6">Login</h1>
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
                type="email"
                placeholder="Enter Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <p className="text-center mb-4">
              New User{" "}
              <Link className="text-blue-600" to={"/register"}>
                {" "}
                Register Now
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
      <Toaster />
    </div>
  );
};

export default Login;
