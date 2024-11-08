"use client";
import { useCart } from "@/app/context/CartProvider";
import { CircleX } from "lucide-react";
import Image from "next/image";

const CartList = () => {
  const { cartItems, setConfirmed, deleteItem, ourTotal } = useCart();

  const totalQuantity = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  if (cartItems.length > 0) {
    return (
      <div className="w-full flex-col mb-5 bg-white rounded-2xl">
        <h2 className="text-2xl font-bold text-theme_red ml-5 pt-5">
          Your Cart ({totalQuantity})
        </h2>

        {cartItems.map((item) => (
          <div key={item.name} className="w-fill text-sm ml-5 mt-5  space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium mb-2">{item.name}</p>
                <p className="font-medium">
                  <span className="text-theme_red ">{item.quantity}x</span>{" "}
                  <span className="text-gray-500 ml-3">
                    {"@"} ${item.price}
                  </span>
                  <span className="ml-3 text-stone-700">
                    ${item.quantity * item.price}
                  </span>
                </p>
              </div>

              <CircleX
                className="mr-5 text-[#888888] cursor-pointer size-5"
                onClick={() => {
                  deleteItem(item.name);
                }}
              />
            </div>
            <hr className="mr-5" />
          </div>
        ))}

        <div className="flex flex-col items-center mt-6 gap-6">
          <p className="w-full px-5 flex justify-between">
            <span className="text-sm">Our total</span>
            <span className="text-xl font-bold">${ourTotal}</span>
          </p>
          <div className="text-xs bg-[#fff8f2] py-4 px-14 rounded-lg flex gap-2">
            <Image
              src="/assets/images/icon-carbon-neutral.svg"
              alt="carbon-neutral"
              width={18}
              height={18}
            />
            <p>
              This is <span className="font-medium">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>

          <button
            className="bg-theme_red rounded-3xl text-white text-xs py-4 w-5/6 mb-5"
            onClick={() => {
              setConfirmed(true);
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-white w-[340px] h-[320px] mx-auto rounded-2xl mb-5 mt-5">
        <div className="w-full h-full flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-theme_red mt-8 ml-5">
            Your Cart (0)
          </h2>
          <Image
            src="/assets/images/illustration-empty-cart.svg"
            alt="empty-cart"
            width={120}
            height={120}
            className="mx-auto"
          />
          <p className="text-stone-500 font-medium mx-auto mb-10">
            Your added items will appear here
          </p>
        </div>
      </div>
    );
  }
};

export default CartList;
