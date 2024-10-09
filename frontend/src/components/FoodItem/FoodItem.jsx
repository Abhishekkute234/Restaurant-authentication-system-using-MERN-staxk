import React, { useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import ProductModal from "./ProductModal";

const FoodItem = ({ image, name, price, desc, id }) => {
  const { cartItems, addToCart, removeFromCart, url, currency } =
    useContext(StoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true); // Open modal when "ADD" button is clicked
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-4">
      <div className="relative w-60 h-60 mb-2 rounded overflow-hidden">
        <img
          className="object-cover w-full h-full rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
          src={`${url}/images/${image}`}
          alt={name}
        />
      </div>
      <div className="w-full">
        <div className="mx-3">
          <p>{name}</p>
          <p className="line-clamp-1 mb-1">
            {desc ? desc : "No description available"}
          </p>
        </div>
        <p className="text-xl mx-3">
          {currency}
          {price}
        </p>
        <div className="flex justify-center">
          {!cartItems[id] ? (
            <button
              className="font-semibold border border-[#2776B8] hover:bg-[#2777b818] duration-300 text-[#2776B8] py-0.5 px-4 rounded"
              onClick={handleAddClick} // Open modal on click
            >
              ADD +
            </button>
          ) : (
            <div className="flex items-center justify-center">
              <button
                className="bg-red-500 text-white py-1 px-2 rounded-md"
                onClick={() => removeFromCart(id)}
              >
                -
              </button>
              <p className="mx-4">{cartItems[id]}</p>
              <button
                className="bg-green-500 text-white py-1 px-2 rounded-md"
                onClick={() => addToCart(id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal function
        product={{
          id,
          name,
          image: `${url}/images/${image}`,
          price,
          oldPrice: 95, // Example old price
          discount: 16, // Example discount percentage
          sizes: ["Small", "Medium", "Large", "Family", "Party", "Feast"], // Example sizes
          desc, // Pass desc to modal
        }}
        addToCart={addToCart}
        cartItems={cartItems}
      />
    </div>
  );
};

export default FoodItem;
