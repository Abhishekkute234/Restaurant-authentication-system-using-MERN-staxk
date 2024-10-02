import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductModal = ({ isOpen, onClose, product, addToCart, cartItems }) => {
  const [quantity, setQuantity] = useState(cartItems[product.id] || 0);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    setQuantity((prev) => prev + 1);
    addToCart(product.id);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      addToCart(product.id, true);
    }
  };

  const handleBuyNow = () => {
    addToCart(product.id);
    navigate("/order"); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[80%] max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">{product.name}</h2>

        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded"
            src={product.image}
            alt={product.name}
          />
          <div className="ml-4">
            <p className="text-gray-600">
              ₹{product.price}{" "}
              <span className="line-through">₹{product.oldPrice}</span>
              <span className="text-green-500"> ({product.discount}% OFF)</span>
            </p>
          </div>
        </div>

        <p className="font-semibold mb-2">Select size</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {product.sizes.map((size, index) => (
            <button
              key={index}
              className="border border-gray-300 p-2 rounded-md hover:bg-gray-200"
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center mb-4">
          <button
            className={`bg-red-500 text-white py-1 px-3 rounded-md ${
              quantity === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleRemoveFromCart}
            disabled={quantity === 0}
          >
            -
          </button>
          <p className="mx-4 text-lg font-bold">{quantity}</p>
          <button
            className="bg-green-500 text-white py-1 px-3 rounded-md"
            onClick={handleAddToCart}
          >
            +
          </button>
        </div>

        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={handleBuyNow} // Navigate to checkout on "Buy now" click
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
