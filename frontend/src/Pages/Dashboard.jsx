import { useState } from "react"; // Added to manage the 'component' state
import { useAuth } from "../Context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import MyBlog from "../dashboard/MyBlog";

const Dashboard = () => {
  const { profile, isAuthnticated } = useAuth();
  // console.log("dashboard", profile);
  const [component, setComponent] = useState("My blog"); // State to manage current component

  console.log("Profile:", profile);
  console.log("Authenticated:", isAuthnticated);

  if (!isAuthnticated) {
    return;
  }
  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog change={setComponent} />
      ) : component === "Update Blog" ? (
        <UpdateBlog rishi={setComponent} />
      ) : (
        <MyBlog />
      )}
    </div>
  );
};

export default Dashboard;
