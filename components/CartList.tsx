"use client";
import { useCart, useCartDispatch } from "@/app/context/CartProvider";
import { CircleX } from "lucide-react";
import Image from "next/image";

const CartList = () => {
  const { cartItems, orderTotal } = useCart();
  const { dispatch, setConfirmed } = useCartDispatch();

  const totalQuantity = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  if (cartItems.length > 0) {
    return (
      <div className="flex-col mb-5 lg:min-w-96 rounded-2xl lg:w-auto">
        <h2 className="text-2xl lg:text-4xl font-bold text-theme_red ml-8 pt-8">
          Your Cart ({totalQuantity})
        </h2>

        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="text-sm lg:text-lg ml-5 mt-8 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium mb-2">{item.product.name}</p>
                <p className="font-medium">
                  <span className="text-theme_red ">{item.quantity}x</span>{" "}
                  <span className="text-gray-400 ml-3">
                    {"@"} ${item.product.price}
                  </span>
                  <span className="ml-3 text-rose-500">
                    ${item.quantity * item.product.price}
                  </span>
                </p>
              </div>

              <CircleX
                className="mr-5 text-rose-400 cursor-pointer size-5"
                onClick={() => {
                  dispatch({
                    type: "removeItemFromCart",
                    payload: item.product.id,
                  });
                }}
              />
            </div>
            <hr className="mr-5" />
          </div>
        ))}

        <div className="flex flex-col items-center mt-6 gap-6">
          <p className="w-full px-5 flex justify-between">
            <span className="text-sm lg:text-base">Order total</span>
            <span className="text-xl font-bold lg:text-3xl">${orderTotal}</span>
          </p>
          <div className="text-xs lg:text-base bg-rose-50 py-4 w-5/6 rounded-lg flex justify-center gap-2">
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
            className="bg-theme_red rounded-[2rem] text-white text-xs lg:text-base font-medium py-4 w-5/6 mb-5 lg:hover:bg-red-800"
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
      <div className="bg-white lg:mx-0 lg:w-[300px] xl:w-[380px] 2xl:w-[500px]rounded-xl mb-5 mx-auto w-full">
        <div className="w-full h-full flex flex-col justify-between">
          <h2 className="text-2xl xl:text-3xl font-bold text-theme_red mt-8 ml-8">
            Your Cart (0)
          </h2>
          <Image
            src="/assets/images/illustration-empty-cart.svg"
            alt="empty-cart"
            width={160}
            height={160}
            className="mx-auto lg:w-32 lg:h-32"
          />
          <p className="text-stone-500 text-base xl:text-xl font-medium mx-auto mb-10">
            Your added items will appear here
          </p>
        </div>
      </div>
    );
  }
};

export default CartList;
