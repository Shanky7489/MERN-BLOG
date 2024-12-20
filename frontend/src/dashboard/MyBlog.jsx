import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const MyBlog = () => {
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);
  console.log("uv", myBlogs);

  useEffect(() => {
    const FetchMyBlog = async () => {
      try {
        const { data } = await axios("http://localhost:4000/api/blog/my-blog", {
          withCredentials: true,
        });
        console.log("Blogs Data:", data);
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchMyBlog();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/blog/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      });
  };

  return (
    <div>
      <div className="w-[88%] ml-auto my-12 p-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {/* Blog Image */}
                {element?.BlogImage?.url ? (
                  <div
                    onClick={() => {
                      navigate(`/blog/${element._id}`);
                    }}
                  >
                    <img
                      src={element.BlogImage.url} // Correctly access the 'url'
                      alt="Blog Image"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    Image not available
                  </p>
                )}

                {/* Blog Content */}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlog;
