"use client";
import { useCart } from "@/app/context/CartProvider";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartButton = ({
  value,
  onChange,
  itemName,
  itemPrice,
  itemImage,
  itemIcon,
}: {
  value: number;
  onChange: (quantity: number) => void;
  itemName: string;
  itemPrice: number;
  itemImage: string;
  itemIcon: string;
}) => {
  const [count, setCount] = useState(value);
  const { addItemToCart, removeItemFromCart } = useCart();

  useEffect(() => {
    setCount(value);
  }, [value]);

  const handleDecrease = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onChange(newCount);
      removeItemFromCart(itemName);
    }
  };

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
    addItemToCart(itemName, itemPrice, itemImage, itemIcon);
  };

  const handleClicked = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
    addItemToCart(itemName, itemPrice, itemImage, itemIcon);
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
          <p className="text-sm font-medium lg:text-lg lg:hover:text-theme_red">
            Add to Cart
          </p>
        </button>
      )}
    </div>
  );
};
export default CartButton;
