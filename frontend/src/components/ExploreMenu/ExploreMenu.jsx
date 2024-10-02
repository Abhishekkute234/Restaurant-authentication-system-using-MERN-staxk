import React, { useContext, useRef, useState, useEffect } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../Context/StoreContext";
import Dividebar from "../SmallComp/Dividebar";

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext); // Get the menu list from context
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
  }, [menu_list]);

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

  // Debugging function to check category clicks
  const handleCategoryClick = (menu_name) => {
    console.log("Category clicked: ", menu_name);
    setCategory(menu_name);
  };

  return (
    <div className="explore-menu mx-4" id="explore-menu">
      <h1 className="text-xl font-semibold">All categories</h1>
      <Dividebar />
      <div className="relative">
        {isOverflowing && showLeftButton && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl"
            onClick={handleScrollLeft}
          >
            Back..
          </button>
        )}
        <div
          className="explore-menu-list flex overflow-x-auto space-x-4"
          ref={menuRef}
        >
          {menu_list.length > 0 ? (
            menu_list.map((item, index) => (
              <div
                key={index}
                className={`font-semibold text-center flex-shrink-0 cursor-pointer ${
                  category === item.menu_name ? "active-category" : ""
                }`}
                style={{ minWidth: "8rem" }}
              >
                <button
                  onClick={() => handleCategoryClick(item.menu_name)}
                  className="w-32 h-32 rounded-md flex flex-col items-center justify-center overflow-hidden"
                >
                  <img
                    src={item.menu_image}
                    className="h-full w-full object-cover rounded-md"
                    alt={item.menu_name}
                  />
                </button>
                <p className="mt-2">{item.menu_name}</p>
              </div>
            ))
          ) : (
            <p>No menu items available</p>
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
      <hr />
    </div>
  );
};

export default ExploreMenu;
