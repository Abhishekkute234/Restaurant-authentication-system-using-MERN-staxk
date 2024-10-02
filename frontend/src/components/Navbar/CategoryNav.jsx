import React from "react";

const CategoryNav = () => {
  return (
    <div>
      <div className="relative m-3">
        <div className=" scale-x ml-5 navbar-category flex overflow-hidden text-[#1A181E] whitespace-nowrap">
          <button className="px-4 py-1 hover:bg-[#F2F2F2] rounded-2xl">
            Tiffin Items
          </button>
          <button className="px-4 py-1 hover:bg-[#F2F2F2]  rounded-2xl">
            Rice Varieties
          </button>
          <button className="px-4 py-1 hover:bg-[#F2F2F2]  rounded-2xl">
            Curries & Gravies
          </button>
          <button className="px-4 py-1 hover:bg-[#F2F2F2]  rounded-2xl">
            Breads
          </button>
          <button className="px-4 py-1 hover:bg-[#F2F2F2]  rounded-2xl">
            Snacks & Savories
          </button>
          <button className="px-4 py-1 hover:bg-[#F2F2F2]  rounded-2xl">
            Chutneys & Pickles
          </button>
          <button className="px-4 py-1 hover:bg-[#F2F2F2]  rounded-2xl">
            Beverages
          </button>
          <button className="px-4 py-1 hover:bg-[#F2F2F2]  rounded-2xl">
            Desserts & Sweets
          </button>
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
