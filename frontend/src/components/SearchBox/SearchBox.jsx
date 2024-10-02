import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const SearchBox = () => {
  const { food_list, cartItems, addToCart, removeFromCart, url, currency } =
    useContext(StoreContext);

  return (
    <div className="w-[432px] h-[415px] p-4 border rounded-lg overflow-y-auto">
      <div className="w-[100%]">
        <h2 className="text-lg font-bold mb-4 text-center text-blue-500">
          Search Dishes
        </h2>
        <div className="grid gap-3">
          {food_list.length > 0 ? (
            food_list.map((item) => (
              <div
                key={item._id}
                className="flex relative items-center w-[100%] h-24 bg-white rounded-lg p-2"
              >
                <div className="relative w-28 h-20 rounded overflow-hidden">
                  <img
                    className="object-cover w-full h-full rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                  />
                </div>
                <div className="w-full">
                  <div className="absolute flex flex-col">
                    <p className="text-sm mx-3 font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mx-3 mb-1 max-w-44">
                      {item.description
                        ? item.description
                        : "No description available"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end  pb-2">
                    <p className="text-xl text-gray-800 mb-2">
                      {currency} {item.price}
                    </p>
                    {!cartItems[item._id] ? (
                      <button
                        className="font-semibold border border-[#2776B8] hover:bg-[#2777b818] duration-300 text-[#2776B8] py-0.5 px-4 rounded"
                        onClick={() => addToCart(item._id)}
                      >
                        ADD +
                      </button>
                    ) : (
                      <div className="flex items-center justify-center">
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded-md"
                          onClick={() => removeFromCart(item._id)}
                        >
                          -
                        </button>
                        <p className="mx-2 text-sm">{cartItems[item._id]}</p>
                        <button
                          className="bg-green-500 text-white py-1 px-2 rounded-md"
                          onClick={() => addToCart(item._id)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No food items available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
