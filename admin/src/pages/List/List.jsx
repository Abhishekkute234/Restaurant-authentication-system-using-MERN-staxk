import React, { useEffect, useState } from "react";
import "./List.css";
import { url, currency } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Track the search input
  const [suggestions, setSuggestions] = useState([]); // Track suggestions

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      // Filter the list to generate suggestions
      const filtered = list.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered); // Update suggestions list
    } else {
      setSuggestions([]); // Clear suggestions when search is empty
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (foodId) => {
    const element = document.getElementById(foodId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Scroll to the selected item
      setSearchTerm(""); // Clear search input
      setSuggestions([]); // Clear suggestions list
    }
  };

  // Filter the list based on search term
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      {/* Search input */}
      <input
        placeholder="Search For Products"
        className="bg-slate-100 ml-2 border-none outline-none"
        type="text"
        value={searchTerm} // Bind input value to state
        onChange={handleSearch} // Update search term on change
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="suggestions-box">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(item._id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Render filtered list */}
        {filteredList.map((item, index) => {
          return (
            <div id={item._id} key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
