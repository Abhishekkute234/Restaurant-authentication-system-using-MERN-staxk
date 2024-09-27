import React from "react";
import Card from "../Cards/Card";

const Header = () => {
  const cardsData = [
    { id: 1, name: "One", image: "./images/Banner_3.png" },
    { id: 2, name: "Two", image: "./images/Banner_2.jpg" },
    { id: 3, name: "Three", image: "./images/Banner_1.jpg" },
  ];

  return (
    <div className="m-4 flex justify-between">
      {cardsData.map(card => (
        <Card key={card.id} name={card.name} image={card.image} />
      ))}
    </div>
  );
};

export default Header;
