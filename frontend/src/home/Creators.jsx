import axios from "axios";
import { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/getalladmin",
          {
            withCredentials: true,
          }
        );

        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="w-[90%] sm:w-[80%] mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Popular Creators
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-lg my-6">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div
              key={element._id}
              className="relative group transform transition-all hover:scale-105"
            >
              <div className="bg-white shadow-xl rounded-lg p-4 flex flex-col items-center justify-center space-y-4">
                <img
                  src={element.photo?.url || "placeholder.jpg"}
                  alt="Creator"
                  className="w-32 h-32 object-cover border-4 border-gray-300 rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-300"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {element.name || "No Name"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {element.role || "Unknown Role"}
                  </p>
                </div>
              </div>
              {/* Hover Effect Overlay */}
              {/* <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-bold text-xl">
                  View Profile
                </span>
              </div> */}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Creator;
