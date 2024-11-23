import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";

const Hero = () => {
  const { blogs } = useAuth();

  console.log("from hero", blogs);
  return (
    <div className="w-[80%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-4 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((e) => {
          return (
            <Link
              to={`/blog/${e._id}`}
              key={e._id}
              className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="group relative">
                <img
                  src={e.BlogImage.url}
                  alt=""
                  className="h-56 object-cover object-center w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform"></div>
                <h1 className="absolute bottom-5 left-4 text-white font-bold group-hover:text-yellow-400 transition-colors duration-300">
                  {e.title}
                </h1>
              </div>
              <div className="p-6 flex items-center">
                <img
                  src={e.adminPhoto}
                  alt=""
                  className="h-12 w-12 rounded-full border-2 border-yellow-400"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {e.adminName}
                  </p>
                  <p className="text-sm text-gray-400">New</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className=" flex h-screen items-center justify-center">
          Loading....
        </div>
      )}
    </div>
  );
};

export default Hero;
