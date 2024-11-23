import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdMenu } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ setComponent }) => {
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);
  const { profile, isAuthnticated, setIsAuthnticated } = useAuth();

  const handleComponet = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/users/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthnticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <IoMdMenu className="text-2xl text-gray-800" />
      </div>
      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 z-40 transition-transform transform duration-300 ${
          show ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <div
          className="sm:hidden absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <FaArrowLeft />
        </div>

        {/* Profile Section */}
        <div className="text-center py-6 bg-gray-100">
          <img
            className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
            src={profile?.photo?.url || "/default-avatar.png"}
            alt="Profile"
          />
          <p className="text-lg font-semibold text-gray-800">{profile?.name}</p>
        </div>

        {/* Navigation Buttons */}
        <ul className="uppercase space-y-6 mx-4 mt-8">
          <button
            onClick={() => handleComponet("My Blog")}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            My Blog
          </button>
          <button
            onClick={() => handleComponet("Create Blog")}
            className="w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Blog
          </button>
          <button
            onClick={() => handleComponet("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition duration-300"
          >
            My Profile
          </button>
          <button
            onClick={gotoHome}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={handleLogOut}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            Logout
          </button>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
