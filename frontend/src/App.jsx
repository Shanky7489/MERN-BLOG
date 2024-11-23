import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import Blogs from "./Pages/Blogs";
import About from "./Pages/About";
import Blogs from "./Pages/Blogs.jsx";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import { useAuth } from "./Context/AuthProvider.jsx";
import Creator from "./Pages/Creator.jsx";
// import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog.jsx";
import Details from "./Pages/Details.jsx";
import NotFound from "./Pages/NotFound.jsx";
// import { IsAuthenticated } from "../../backend/Middleware/authUser.js";
// import { useAuth } from "./Context/AuthProvider";

const App = () => {
  const { pathname } = useLocation();
  const { isAuthnticated } = useAuth();

  // Set isHidden based on both pathname and isAuthnticated
  let isHidden = false;
  if (
    (pathname === "/" && !isAuthnticated) || // Hide navbar/footer on login page
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/dashboard"
  ) {
    isHidden = true;
  }

  return (
    <div>
      {!isHidden && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthnticated ? <Home /> : <Login />} />
        <Route
          path="/blogs"
          element={isAuthnticated ? <Blogs /> : <Navigate to="/" replace />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthnticated ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route path="/blog/:id" element={<Details />} />
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isHidden && <Footer />}
    </div>
  );
};

export default App;
