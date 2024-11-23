import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContex = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState();
  console.log("auth", profile);
  const [isAuthnticated, setIsAuthnticated] = useState(false);

  useEffect(() => {
    const FetchMyProfile = async () => {
      try {
        const token = Cookies.get("jwt");
        console.log("Token:", token);

        if (token) {
          const response = await axios.get(
            "http://localhost:4000/api/users/getmyprofile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Response from getmyprofile API:", response);
          setProfile(response.data); // Set profile data
          setIsAuthnticated(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    // Fetch only if the user is authenticated
    if (isAuthnticated) {
      const FetchBlogsApi = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/api/blog/all-blogs",
            { withCredentials: true }
          );
          console.log("Response from allblogs API:", response);
          setBlogs(response.data); // Set blogs data
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };

      FetchBlogsApi();
    }

    FetchMyProfile(); // Always fetch profile first
  }, [isAuthnticated]); // Run when `isAuthnticated` changes

  return (
    <AuthContex.Provider
      value={{ blogs, profile, setProfile, isAuthnticated, setIsAuthnticated }}
    >
      {children}
    </AuthContex.Provider>
  );
};

export const useAuth = () => useContext(AuthContex);
