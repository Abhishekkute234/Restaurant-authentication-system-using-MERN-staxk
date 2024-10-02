import React, { useState } from "react";
import "./Add.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(null); // Set initial state to null
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Tiffin Items", // Updated to match select options
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Check if an image is selected
    if (!image) {
      toast.error("Image not selected");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      console.log("API Response:", response.data); // Log the full response
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset data and image state
        setData({
          name: "",
          description: "",
          price: "",
          category: "Tiffin Items", // Reset to default category
        });
        setImage(null); // Reset image state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the item.");
      console.error("Error adding item:", error);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onChangeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      e.target.value = ""; // Clear input after selection
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <input
            onChange={onChangeImageHandler}
            type="file"
            accept="image/*"
            id="image"
            hidden
          />
          <label htmlFor="image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="Upload area"
            />
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Tiffin">Tiffin Items</option>
              <option value="Rice">Rice Varieties</option>
              <option value="Curries & Gravies">Curries & Gravies</option>
              <option value="Chapati">Chapati</option>
              <option value="Snacks">Snacks</option>
              <option value="Chutneys">Chutneys & Pickles</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts & Sweets">Desserts & Sweets</option>
            </select> 
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number" // Change to number for better validation
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="25"
              min="0" // Add this line
              required // Add required validation
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
