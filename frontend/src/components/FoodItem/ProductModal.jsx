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
            className="w-full rounded-t-lg"
            src={product.image}
            alt={product.name}
            width="300"
            height="300"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h2>
          <div className="flex items-center mt-2">
            <span className="text-xl font-bold text-gray-800">
              ₹{product.price}
            </span>
            <span className="text-sm line-through text-gray-500 ml-2">
              ₹{product.oldPrice}
            </span>
            <span className="text-sm text-red-600 ml-2">
              ({product.discount}% OFF)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            className={`bg-red-500 text-white py-1 px-3 rounded-md ${
              quantity === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleRemoveFromCart}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className="px-4 py-1 bg-gray-100 text-gray-800 border-t border-b border-gray-300">
            {quantity}
          </span>
          <button
            className="bg-green-500 text-white py-1 px-3 rounded-md"
            onClick={handleAddToCart}
          >
            +
          </button>
        </div>

        <div className="flex justify-between mt-4">
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
