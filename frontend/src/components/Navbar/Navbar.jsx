import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import Dividebar from "../SmallComp/Dividebar";
import SearchBox from "../SearchBox/SearchBox"; // Import SearchBox

const Navbar = ({ setShowLogin }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false); // Track if search is active
  const { getTotalCartAmount, token, setToken, food_list } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchActive(e.target.value !== ""); // Show SearchBox if input is not empty
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div>
      {/* Background dim overlay */}
      {isSearchActive && (
        <div
          className="overlay"
          onClick={() => setIsSearchActive(false)} // Hide the overlay and search box when clicked
        ></div>
      )}

      <div className="navbar">
        <div className="flex">
          <img src="./images/Logo_1.jpg" alt="Logo" className="w-20" />
          <h1 className="scale-x mx-4 text-2xl">Sambar Sagar</h1>
        </div>

        {/* Search Bar */}
        <div className=" bg-white rounded-md mr-28">
          <span className="relative w-[440px] h-10 bg-white border flex items-center rounded-md">
            <i className="ri-search-line w-7 h-7  bg-white mx-2 mt-0.5"></i>{" "}
            {/* Search icon */}
            <input
              placeholder="Search for products"
              className="bg-slate-10 placeholder:font-normal border-none outline-none flex-1 h-full"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange} // Handle search input changes
              onFocus={() => setIsSearchActive(true)} // Show dropdown on focus
            />
            {isSearchActive && (
              <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg z-50 search-box">
                <SearchBox searchQuery={searchQuery} />
              </div>
            )}
          </span>
        </div>
        <div className=" flex">
          <div className="navbar-right flex">
            {/* Cart */}
            <Link
              to="/cart"
              className="navbar-search-icon text-sm flex items-center m-1 hover:bg-slate-100 rounded-2xl"
            >
              <img className="w-5" src={assets.basket_icon} alt="" />
              <h3 className="scale-x m-2">Cart</h3>
              <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
            </Link>

            {/* Account/Login */}
            {!token ? (
              <div className="flex text-sm items-center hover:bg-slate-100 rounded-2xl">
                <i className="ri-account-circle-line text-2xl"></i>
                <button className="m-2" onClick={() => setShowLogin(true)}>
                  Account
                </button>
              </div>
            ) : (
              <div className="scale-x navbar-profile z-10">
                <img src={assets.profile_icon} alt="" />
                <ul className="navbar-profile-dropdown">
                  <li onClick={() => navigate("/myorders")}>
                    <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                  </li>
                  <hr />
                  <li onClick={logout}>
                    <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dividebar />
    </div>
  );
};

export default Navbar;
