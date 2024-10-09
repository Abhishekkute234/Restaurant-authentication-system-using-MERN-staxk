import React from "react";

const Card = ({ name, image }) => {
  return (
    <div>
      <div className="lg:w-[400px] lg:h-[180px] md:w-[205px] md:h-[100px] rounded-md bg-blue-400 flex flex-col items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-md object-cover"
        />
        <h1 className="text-white">{name}</h1>
      </div>
    </div>
  );
};

const Gallery = () => {
  const images = [
    {
      name: "Various grocery items including oil, vegetables, and a shopping bag",
      src: "https://storage.googleapis.com/a1aa/image/BlkwIEIACkI6HR1AoRex03Zs7ffz6eqsFUTMhXLenT2X2LjcC.jpg",
    },
    {
      name: "Traditional Millets packaging with a 'Shop Now' button",
      src: "https://storage.googleapis.com/a1aa/image/XbOZ7Kxryd4TK90fM9xs5sk8QWvTe1JqDmTZFoQpYcfT9yInA.jpg",
    },
    {
      name: "Pure Honey jars with a honey dipper",
      src: "https://storage.googleapis.com/a1aa/image/uQq7cbc9nf3f1EPXemKJPkhfWeRCEhzoYNnuDvWm1jEq1LjcC.jpg",
    },
  ];

  return <div className="container mx-auto p-4"></div>;
};

export default Gallery;
