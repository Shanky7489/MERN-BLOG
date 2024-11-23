import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthProvider";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  // const { blogs } = useAuth();

  const [show, setShow] = useState(false);

  const { profile, isAuthnticated, setIsAuthnticated } = useAuth();
  // console.log("navbar", profile);

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
      navigate("/login");
    } catch (error) {
      alert(error.response.message || "Failed to logout");
      console.log("00000", error);
      toast.error(error.data.message);
    }
  };
  // console.log("navbar", blogs);
  return (
    <div>
      <nav className="shadow-lg py-3 px-4">
        <div className="flex justify-between items-center md:w-[80%] m-auto ">
          <Link to={"/"}>
            {" "}
            <div className="md:font-semibold md:text-xl text-sm ">
              Hacker<span className="text-blue-500">Kernel</span>
            </div>
          </Link>

          {/* ******** desktop menu ************ */}
          <div className="">
            <ul className="uppercase  gap-x-6 hidden md:flex ">
              {/* <Link to={"/"}>Home</Link> */}
              <Link to={"/blogs"} className="hover:text-blue-500">
                Blogs
              </Link>
              <Link to={"/creator"} className="hover:text-blue-500">
                creator
              </Link>
              <Link to={"/about"} className="hover:text-blue-500">
                about
              </Link>
              <Link to={"/contact"} className="hover:text-blue-500">
                contact
              </Link>
            </ul>
            <div onClick={() => setShow(!show)} className="md:hidden">
              {show ? <IoCloseSharp size={24} /> : <IoMdMenu size={24} />}
            </div>
          </div>
          <div className="space-x-3 flex">
            {isAuthnticated && profile?.role === "admin" ? (
              <Link
                to={"/dashboard"}
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 py-2 px-4 rounded-md"
              >
                Dashboard
              </Link>
            ) : (
              ""
            )}

            {!isAuthnticated ? (
              <Link
                to={"/login"}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 py-2 px-4 rounded-md"
              >
                Login
              </Link>
            ) : (
              <div>
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 py-2 px-4 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
            {/* <Link
              to={"/dashboard"}
              className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 py-2 px-4 rounded-md"
            >
              log
            </Link> */}
          </div>
        </div>
        {/* ****** here we start a menu for mobile screen  */}
        {show && (
          <div className="bg-white">
            <ul className="uppercase flex h-screen items-center justify-center space-y-3  flex-col text-xl">
              {/* <Link to={"/"}>Home</Link> */}
              <Link
                to={"/blogs"}
                className="hover:text-blue-500"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
              >
                Blogs
              </Link>
              <Link
                to={"/creator"}
                className="hover:text-blue-500"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
              >
                creator
              </Link>
              <Link
                to={"/about"}
                className="hover:text-blue-500"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
              >
                about
              </Link>
              <Link
                to={"/contact"}
                className="hover:text-blue-500"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
              >
                contact
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
