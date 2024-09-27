import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    return (
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
            <div className="relative w-40 h-40 mb-2">
                <img className="object-cover w-full h-full rounded-lg" src={`${url}/images/${image}`} alt={name} />
                {!cartItems[id] ? (
                    <img
                        className="absolute top-2 right-2 w-8 h-8 cursor-pointer"
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add to Cart"
                    />
                ) : (
                    <div className="absolute top-2 right-2 flex items-center">
                        <img
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove from Cart"
                        />
                        <p className="mx-2">{cartItems[id]}</p>
                        <img
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add More"
                        />
                    </div>
                )}
            </div>
            <div className="text-center">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-gray-600 line-clamp-1 mb-1">{desc}</p>
                <p className="text-xl font-bold">{currency}{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
