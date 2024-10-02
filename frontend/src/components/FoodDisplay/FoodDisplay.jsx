import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter the food items based on the selected category
  const filteredItems = food_list.filter((item) => {
    return category === "All" || category === item.category;
  });

  return (
    <div className="m-2">
      <h2 className="text-2xl m-3">{category} Items</h2>{" "}
      {/* Dynamic title based on category */}
      {/* Check if there are any items in the filtered list */}
      {filteredItems.length > 0 ? (
        <div className="food-display-list">
          {filteredItems.map((item) => (
            <FoodItem
              key={item._id}
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ))}
        </div>
      ) : (
        <p>No items available in this category.</p>
      )}
    </div>
  );
};

export default FoodDisplay;
