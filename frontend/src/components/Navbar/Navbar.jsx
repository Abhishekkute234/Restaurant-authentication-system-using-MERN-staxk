import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import Dividebar from "../SmallComp/Dividebar";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div>
      <div className="navbar">
        <div className=" flex">
          <img src="./images/Logo_1.jpg" alt="Logo" className="w-20" />

          <h1 className=" mx-4 font-semibold text-2xl">PetPuja</h1>
        </div>
        <span className=" w-[30%] h-12 bg-slate-100 text-gray-400 text-sm flex items-center rounded-md texts">
          <input
            placeholder="Search For Products"
            className="bg-slate-100 ml-2 border-none outline-none"
            type="text"
          />
        </span>
        <div className="navbar-right">
          <Link className="flex text-sm items-center hover:bg-slate-100 rounded-2xl ">
            <img className=" w-5" src="./images/menu-search-fill.png" alt="" />
            <span className=" m-2"> Categories</span>
          </Link>

          {/* cart  */}
          <Link
            to="/cart"
            className="navbar-search-icon  text-sm flex items-center m-1 hover:bg-slate-100 rounded-2xl"
          >
            <img className="w-5" src={assets.basket_icon} alt="" />
            <h3 className="m-2">Cart</h3>
            <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
          </Link>
          {/* cart  */}

          {/* login and Account */}
          {!token ? (
            <div className="flex text-sm items-center hover:bg-slate-100 rounded-2xl">
              <img className="w-5" src={assets.basket_icon} alt="" />
              <button className="m-2" onClick={() => setShowLogin(true)}>
                Account
              </button>
            </div>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  {" "}
                  <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  {" "}
                  <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                </li>
              </ul>
            </div>
          )}

          {/* login and Account */}
        </div>
      </div>
      {/* category Section  */}
      <div className="relative">
        <div className="flex overflow-hidden whitespace-nowrap">
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
            Tiffin Items
          </button>
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
            Rice Varieties
          </button>
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
            Curries & Gravies
          </button>
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
            Breads
          </button>
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
            Snacks & Savories
          </button>
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
            Chutneys & Pickles
          </button>
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
            Beverages
          </button>
          <button className="px-4 py-2 font-semibold hover:bg-slate-100 rounded-2xl">
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

      {/* category Section  */}

      <Dividebar />
    </div>
  );
};

export default Navbar;
