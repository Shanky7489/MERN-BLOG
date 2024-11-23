import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="border py-10">
        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-500">
                  Flutter
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  React
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  iOS
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Design to code</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  Figma plugin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  Templates
                </a>
              </li>
            </ul>
          </div>

          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Comparison</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  DhiWise vs Anima
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  DhiWise vs Appsmith
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  DhiWise vs FlutterFlow
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  DhiWise vs Monday Hero
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  DhiWise vs Retool
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  DhiWise vs Bubble
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-gray-500">
                  DhiWise vs Figma Dev Mode
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400  hover:text-gray-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400  hover:text-gray-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400  hover:text-gray-500">
                  Career
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400  hover:text-gray-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400  hover:text-gray-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className=" w-[80%] mx-auto  flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold hidden md:flex">
          Hacker<span className="text-blue-500 font-bold">Kernel</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; 2024 DhiWise PVT. LTD. All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#">
            <FaGithub className="h-6" />
          </a>
          <a href="#">
            <BsYoutube className="h-6" />
          </a>

          <a href="#">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
