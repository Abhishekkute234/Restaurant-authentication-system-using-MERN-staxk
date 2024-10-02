import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "axios";

const ParentNav = ({ setShowLogin }) => {
  const base_url = import.meta.env.VITE_API_URL;

  const [obj, setObj] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const url = `${base_url}?page=${page}&search=${search}`;
        const response = await axios.get(url);
        setObj(response.data); // Ensure this matches your API response structure
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    getAllItems();
  }, [page, search]);

  return (
    <div>
      <Navbar setShowLogin={setShowLogin} setSearch={setSearch} />
      {/* Render the filtered items */}
      <div>
        {obj.length > 0 ? (
          obj.map((item) => (
            <div key={item._id} className="item">
              <h3>{item.name}</h3>
              {/* Render more item details as needed */}
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default ParentNav;
