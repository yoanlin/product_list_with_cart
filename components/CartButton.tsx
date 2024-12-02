"use client";
import { useCart, useCartDispatch } from "@/app/context/CartProvider";
import Image from "next/image";
import { Product } from "../types/types";

const CartButton = ({ data }: { data: Product }) => {
  const { cartItems } = useCart();
  const { dispatch } = useCartDispatch();
  const existingItem = cartItems.find(
    (cartItem) => cartItem.product.id === data.id
  );
  let count: number;

  if (existingItem) {
    count = existingItem.quantity;
  } else {
    count = 0;
  }

  const handleDecrease = () => {
    if (count > 0) {
      dispatch({
        type: "reduceItemQuantity",
        payload: data.id,
      });
    }
  };

  const handleIncrease = () => {
    dispatch({
      type: "increaseItemQuantity",
      payload: data.id,
    });
  };

  const handleClicked = () => {
    if (!data) {
      console.error("Error: Item is undefined");
      return;
    }
    dispatch({
      type: "addItemToCart",
      payload: data,
    });
  };

  return (
    <div
      className={`w-full h-full rounded-3xl -translate-y-1/2 border-theme_red border
        ${count ? "bg-theme_red" : "bg-white"}`}
    >
      {count ? (
        <div className="flex w-full h-full justify-around items-center">
          <button
            className="w-3 h-3 border rounded-full"
            onClick={handleDecrease}
            disabled={count < 1}
          >
            <Image
              src="/assets/images/icon-decrement-quantity.svg"
              alt="decrement"
              width={12}
              height={12}
              className="z-10"
            />
          </button>

          <p className="text-white text-sm lg:text-base">{count}</p>

          <button
            className="w-3 h-3 border-[1.5px] rounded-full"
            onClick={handleIncrease}
          >
            <Image
              src="/assets/images/icon-increment-quantity.svg"
              alt="increment"
              width={10}
              height={10}
            />
          </button>
        </div>
      ) : (
        <button
          className="flex w-full h-full items-center justify-center gap-2 lg:hover:outline-theme_red"
          onClick={handleClicked}
        >
          <Image
            src="/assets/images/icon-add-to-cart.svg"
            alt="cart"
            width={20}
            height={20}
          />
          <p className="text-sm font-medium lg:text-base lg:hover:text-theme_red">
            Add to Cart
          </p>
        </button>
      )}
    </div>
  );
};
export default CartButton;
