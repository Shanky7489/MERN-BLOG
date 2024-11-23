import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  // console.log("hello", rishi);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(""); // Holds the file or URL
  const [blogImagePreview, setBlogImagePreview] = useState(""); // For preview

  // Handle file input and preview
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result); // Show preview
      setBlogImage(file); // Set file for upload
    };
  };

  // Fetch existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/blog/Single-blog/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log("500", data);
        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.BlogImage?.url); // Existing image URL
        setBlogImagePreview(data?.BlogImage?.url); // Preview
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch blog data");
      }
    };
    fetchBlog();
  }, [id]);

  // Update the blog
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    // Append new image only if selected
    if (blogImage instanceof File) {
      formData.append("BlogImage", blogImage); // New file
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/blog/updateBlog/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTitle(data.title);
      setCategory(data.category);
      setAbout(data.about);
      setBlogImagePreview(data.BlogImage?.url);
      toast.success(data.message || "Blog updated successfully");
      setTimeout(() => {
        // rishi("My blog");
        navigateTo("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update the blog");
    }
  };

  return (
    <div>
      <div className="w-[80%] mx-auto my-12 p-4">
        <section className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="w-full p-2 mb-4 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 font-semibold">BLOG IMAGE</label>
              <img
                src={
                  blogImagePreview ? blogImagePreview : "/imgPL.webp" // Default image placeholder
                }
                alt="Blog Main"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <input
                type="file"
                className="w-full p-2 border rounded-md"
                onChange={changePhotoHandler}
              />
            </div>
            <textarea
              rows="6"
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Something about your blog at least 200 characters!"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
      <Toaster />
    </div>
  );
}

export default UpdateBlog;
