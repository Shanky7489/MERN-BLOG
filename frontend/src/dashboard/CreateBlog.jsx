import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CreateBlog = ({ change }) => {
  console.log(change);

  // const navigate = Navigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const HandleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("BlogImage", blogImage);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/blog/createblog",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      console.log("registerapi", response);
      console.log("registerapi data", data);
      toast.success(data.message || "User register successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
      change("My blog");
    } catch (error) {
      toast.error(error.message || "Please fill required fields");
      console.log("err reg", error);
    }
  };
  return (
    <div>
      <div>
        <div className="min-h-screen  py-10">
          <div className="max-w-4xl mx-auto p-6 border  rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
            <form onSubmit={HandleCreateBlog} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-lg">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="Devotion">Devotion</option>
                  <option value="Sports">Sports</option>
                  <option value="Coding">Coding</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-lg">Title</label>
                <input
                  type="text"
                  placeholder="Enter your blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-lg">Blog Image</label>
                <div className="flex items-center justify-center">
                  <img
                    src={
                      blogImagePreview ? `${blogImagePreview}` : "/imgPL.webp"
                    }
                    alt="Image"
                    className="w-full max-w-sm h-auto rounded-md object-cover"
                  />
                </div>
                <input
                  type="file"
                  onChange={changePhotoHandler}
                  className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-lg">About</label>
                <textarea
                  rows="5"
                  placeholder="Write something about your blog"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full px-3 py-2  border border-gray-400  rounded-md outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                Post Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
