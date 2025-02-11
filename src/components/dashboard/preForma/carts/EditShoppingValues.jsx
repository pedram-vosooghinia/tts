"use client";
import useShoppingStore from "@/store/shoppingStore";
import { Trash2 } from "lucide-react";
const EditShoppingValues = ({ product }) => {
  const { increaseValueCart, decreaseValueCart, deleteValueCart, cart } =
    useShoppingStore();
  const cartItems = cart ? cart.cartItems : [];
  const productInCart = cartItems.find(
    (item) => item.id === product.id
  );
  const quantity = productInCart?.quantity;
  const increaseQuantity = () => {
    const newItem = { ...product };
    increaseValueCart(newItem);
  };

  const decreaseQuantity = () => {
    const newItem = { ...product };
    decreaseValueCart(newItem);
  };
  const deleteQuantity = () => {
    const newItem = { ...product };
    deleteValueCart(newItem);
  };
  return (
    <div className=" flex flex-col ">
      <div className=" flex items-center justify-between my-4">
        <button
          className="bg-pedram-1 font-bold text-l text-white px-3 py-3  rounded-md hover:bg-pedram-2 focus:outline-none"
          onClick={increaseQuantity}
        >
          +
        </button>
        <span className="text-gray-700 text-xl mx-2">{quantity}</span>
        {quantity > 1 && (
          <button
            className="bg-pedram-1  font-bold text-l text-white px-3 py-3  rounded-md hover:bg-pedram-2 focus:outline-none"
            onClick={decreaseQuantity}
          >
            -
          </button>
        )}
        {quantity === 1 && (
          <button
            className="bg-pedram-3 text-white px-3 py-3  rounded-md hover:bg-pedram-2 focus:outline-none"
            onClick={deleteQuantity}
          >
            <Trash2  size="22" />
          </button>
        )}
      </div>

    </div>
  );
};

export default EditShoppingValues;
