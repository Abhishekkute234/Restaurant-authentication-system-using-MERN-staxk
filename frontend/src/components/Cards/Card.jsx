import React from "react";

const Card = ({ name, image }) => {
  return (
    <div>
      <div className="lg:w-[400px] lg:h-[180px] md:w-[205px] md:h-[100px] rounded-md bg-blue-400 flex flex-col items-center justify-center">
        <img src={image} alt={name} className="w-full h-full rounded-md object-cover" />
        <h1 className="text-white"></h1>
      </div>
    </div>
  );
};

export default Card;
