import React, { useContext, useRef, useState, useEffect } from "react";
import FoodItem from "../../components/FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters
import Dividebar from "../SmallComp/Dividebar";

const Category = () => {
  const { category } = useParams(); // Get the category from URL params
  const { food_list } = useContext(StoreContext);

  // Filters data (mock data for demonstration)
  const filters = {
    sizes: ["1 Litre", "15 Litres", "200 ML", "5 Litres", "500 ML"],
    prices: [
      "₹70 - ₹1,260",
      "₹1,260 - ₹2,450",
      "₹2,450 - ₹3,640",
      "₹3,640 - ₹4,830",
      "₹4,830 - ₹6,020",
    ],
  };

  // Filter the food items based on the selected category
  const filteredItems = food_list.filter((item) => {
    return category === "All" || category === item.category;
  });

  // For horizontal scrolling of filtered items
  const menuRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (menuRef.current) {
        const isOverflowing =
          menuRef.current.scrollWidth > menuRef.current.clientWidth;
        setIsOverflowing(isOverflowing);
        setShowLeftButton(menuRef.current.scrollLeft > 0);
        setShowRightButton(
          menuRef.current.scrollLeft <
            menuRef.current.scrollWidth - menuRef.current.clientWidth
        );
      }
    };

    const handleScroll = () => {
      if (menuRef.current) {
        setShowLeftButton(menuRef.current.scrollLeft > 0);
        setShowRightButton(
          menuRef.current.scrollLeft <
            menuRef.current.scrollWidth - menuRef.current.clientWidth
        );
      }
    };

    checkOverflow();

    if (menuRef.current) {
      menuRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (menuRef.current) {
        menuRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [filteredItems]);

  const handleScrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto flex">
      {/* Filters Section */}
      <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow">
        <div>
          <h2 className="text-lg font-bold">Filters</h2>
          <p className="text-blue-600 cursor-pointer mb-4">Clear all</p>
          {/* Size Filter */}
          <div className="mb-6">
            <h3 className="font-semibold">Size</h3>
            {filters.sizes.map((size, index) => (
              <div key={index} className="flex items-center mb-2">
                <input type="checkbox" id={`size-${index}`} className="mr-2" />
                <label htmlFor={`size-${index}`} className="text-sm">
                  {size}
                </label>
              </div>
            ))}
            <p className="text-blue-600 text-sm cursor-pointer">+1 more</p>
          </div>
          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-semibold">Price</h3>
            {filters.prices.map((price, index) => (
              <div key={index} className="flex items-center mb-2">
                <input type="checkbox" id={`price-${index}`} className="mr-2" />
                <label htmlFor={`price-${index}`} className="text-sm">
                  {price}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold">
          {category ? category.replace(/([A-Z])/g, " ") : "Category Not Found"}{" "}
          Oils ({filteredItems.length} items)
        </h2>
        <Dividebar />

        {/* Horizontal Scrolling for Filtered Items */}
        <div className="relative">
          {isOverflowing && showLeftButton && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl"
              onClick={handleScrollLeft}
            >
              Back..
            </button>
          )}
          <div className="flex overflow-x-auto space-x-4" ref={menuRef}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  desc={item.description}
                  price={item.price}
                />
              ))
            ) : (
              <p>No items available in this category.</p>
            )}
          </div>
          {isOverflowing && showRightButton && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl"
              onClick={handleScrollRight}
            >
              More...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
