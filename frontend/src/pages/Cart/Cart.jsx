import React, { useContext } from "react";
import "./Cart.css"; // You can modify this file to reflect the new design
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Shopping cart (
          {food_list.filter((item) => cartItems[item._id] > 0).length} Items)
        </h1>
        <div className="flex">
          {/* Left Section */}
          <div className="w-2/3">
            {/* List of Items in the Cart */}
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div
                    key={index}
                    className="bg-white p-4 mb-4 rounded-lg shadow"
                  >
                    <div className="flex">
                      <img
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                        src={url + "/images/" + item.image}
                      />
                      <div className="ml-4 flex-1">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <div className="text-gray-500 line-through">
                          {currency}
                          {item.price}
                        </div>
                        <div className="text-green-600 font-semibold">
                          {currency}
                          {(item.price * (1 - item.discount)).toFixed(2)} (
                          {item.discount * 100}% off)
                        </div>
                        <div className="text-green-500">
                          You saved {currency}
                          {(item.price * item.discount).toFixed(2)}
                        </div>
                        <div className="mt-2 flex items-center">
                          <label className="mr-2">Qty:</label>
                          <select
                            className="border rounded p-1"
                            defaultValue={cartItems[item._id]}
                          >
                            {[...Array(5).keys()].map((qty) => (
                              <option key={qty} value={qty + 1}>
                                {qty + 1}
                              </option>
                            ))}
                          </select>
                          <button
                            className="ml-4 text-red-500"
                            onClick={() => removeFromCart(item._id)}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          {/* Right Section */}
          <div className="w-1/3 ml-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="text-green-600 font-semibold">
                  "STANDARD" applied
                </div>
                <button className="text-red-500">Remove</button>
              </div>
              <div className="text-gray-500">You saved additional ₹30</div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <div>Item total</div>
                  <div>
                    {currency}
                    {getTotalCartAmount()}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Discount (STANDARD)</div>
                  <div className="text-green-600">-₹30</div>
                </div>
                <div className="flex justify-between">
                  <div>Delivery fee</div>
                  <div>
                    {currency}
                    {getTotalCartAmount() === 0 ? 0 : deliveryCharge}
                  </div>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-semibold">
                  <div>Grand total</div>
                  <div>
                    {currency}
                    {getTotalCartAmount() +
                      (getTotalCartAmount() === 0 ? 0 : deliveryCharge)}
                  </div>
                </div>
                <div className="text-gray-500 mt-2">Inclusive of all taxes</div>
                <div className="text-gray-500 mt-2">
                  Average delivery time: 2-5 days
                </div>
                <div className="bg-green-100 text-green-600 p-2 rounded mt-2">
                  18% (₹160) saved so far on this order
                  <br />
                  Save ₹49 on delivery fee by adding ₹196 more to cart
                </div>
                <button
                  className="bg-blue-600 text-white w-full py-2 rounded mt-4"
                  onClick={() => navigate("/order")}
                >
                  Continue
                </button>
                <div className="text-gray-500 mt-2 text-center">
                  You will earn {getTotalCartAmount() / 100} Loyalty Points on
                  this order
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
