"use client";
import Mobile from "../../components/Mobile";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { useCart, useCartDispatch } from "./context/CartProvider";
import { useMediaQuery } from "./hooks/use-media-query";
import Desktop from "../../components/Desktop";

export default function Home() {
  const { isConfirmed } = useCart();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="font-sans relative lg:ml-16 w-screen overflow-x-hidden">
      <h1 className="text-4xl font-bold mt-5 ml-5 lg:ml-7 lg:mt-24 lg:text-4xl">
        Desserts
      </h1>

      {isDesktop ? (
        <>
          <Desktop />
          {isConfirmed && <OrderConfirmation isDesktop={isDesktop} />}
        </>
      ) : (
        <>
          <Mobile />
          {isConfirmed && <OrderConfirmation isDesktop={isDesktop} />}
        </>
      )}
    </div>
  );
}

const OrderConfirmation = ({ isDesktop }: { isDesktop: boolean }) => {
  const { cartItems, orderTotal } = useCart();
  const { setConfirmed, dispatch } = useCartDispatch();
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 h-full flex justify-center items-center ${
        isDesktop && "w-full"
      }`}
    >
      <div className="bg-white w-full h-fit overflow-y-auto rounded-t-2xl flex fixed left-0 bottom-0 lg:w-2/5 lg:left-auto lg:bottom-auto lg:rounded-2xl">
        <div className="w-5/6 mx-auto mt-8">
          <CircleCheck
            color="#1ea475"
            strokeWidth={1.25}
            className="size-1/6 lg:size-[11%]"
          />
          <h1 className="text-4xl lg:text-6xl mt-5 font-bold">
            Order {isDesktop || <br />}
            Confirmed
          </h1>
          <p className="text-sm lg:text-lg text-rose-500 mt-5">
            We hope you enjoy your food!
          </p>

          <div className="bg-rose-50 mt-5 rounded-lg">
            {cartItems.map((item, index) => (
              <div key={index} className="px-5 pt-5">
                <div className="overflow-hidden flex">
                  <Image
                    src={item.product.image.thumbnail}
                    alt={item.product.name}
                    width={55}
                    height={55}
                    className="object-contain rounded-lg"
                  />

                  <div className="flex justify-between items-center font-medium w-full ml-3 lg:text-xl">
                    <div>
                      <p className="line-clamp-1">{item.product.name}</p>
                      <p className="flex gap-5">
                        <span className="text-theme_red">
                          {item.quantity}x{" "}
                        </span>
                        <span className="text-gray-400">
                          @${item.product.price}
                        </span>
                      </p>
                    </div>
                    <span className="text-end">
                      ${item.quantity * item.product.price}
                    </span>
                  </div>
                </div>
                <hr className="mt-5" />
              </div>
            ))}
            <p className="flex justify-between items-center px-5 py-5">
              <span>Order Total</span>
              <span className="text-xl lg:text-3xl font-bold">
                ${orderTotal}
              </span>
            </p>
          </div>
          <button
            className="bg-theme_red mt-8 mb-8 text-white lg:text-lg mx-auto w-full py-4 rounded-[2rem] lg:hover:bg-red-800"
            onClick={() => {
              dispatch({ type: "resetCart" });
              setConfirmed(false);
            }}
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
};
