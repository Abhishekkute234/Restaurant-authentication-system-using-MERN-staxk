import React, { useContext, useRef, useState, useEffect } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../Context/StoreContext";
import Dividebar from "../SmallComp/Dividebar";

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);
  const menuRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (menuRef.current) {
        const isOverflowing = menuRef.current.scrollWidth > menuRef.current.clientWidth;
        setIsOverflowing(isOverflowing);
        setShowLeftButton(menuRef.current.scrollLeft > 0);
        setShowRightButton(menuRef.current.scrollLeft < menuRef.current.scrollWidth - menuRef.current.clientWidth);
      }
    };

    checkOverflow();

    const handleScroll = () => {
      setShowLeftButton(menuRef.current.scrollLeft > 0);
      setShowRightButton(menuRef.current.scrollLeft < menuRef.current.scrollWidth - menuRef.current.clientWidth);
    };

    menuRef.current.addEventListener("scroll", handleScroll);
    return () => {
      menuRef.current.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="explore-menu mx-4" id="explore-menu">
      <h1 className="text-2xl font-bold">All categories</h1>
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
        <div className="explore-menu-list flex overflow-x-auto space-x-4" ref={menuRef}>
          {menu_list.map((item, index) => (
            <div
              onClick={() => setCategory(item.menu_name)}
              key={index}
              className={`font-semibold text-center flex-shrink-0 cursor-pointer ${category === item.menu_name ? "active-category" : ""}`}
              style={{ minWidth: "8rem" }}
            >
              <button className="w-32 h-32 bg-violet-300 rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src={item.menu_image}
                  className="h-full w-full object-cover rounded-md"
                  alt={item.menu_name}
                />
              </button>
              <p className="mt-2">{item.menu_name}</p>
            </div>
          ))}
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
