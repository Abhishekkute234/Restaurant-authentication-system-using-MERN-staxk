import React from "react";
import { Link } from "react-router-dom";

const categories = [
  "TiffinItems",
  "RiceVarieties",
  "CurriesGravies",
  "Breads",
  "SnacksSavories",
  "ChutneysPickles",
  "Beverages",
  "DessertsSweets",
];

const CategoryNav = () => {
  return (
    <div>
      <div className="relative m-3">
        <div className="scale-x ml-5 navbar-category flex overflow-hidden text-[#1A181E] whitespace-nowrap">
          {categories.map((category) => (
            <Link key={category} to={`/category/${category}`}>
              <button className="px-4 py-1 hover:bg-[#F2F2F2] rounded-2xl">
                {category.replace(/([A-Z])/g, " $1")}{" "}
                {/* Add space before capital letters */}
              </button>
            </Link>
          ))}
        </div>

        {/* More button */}
        <div className="absolute right-5 top-0 bottom-0 flex items-center justify-center bg-white px-4 cursor-pointer">
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
            More...
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
