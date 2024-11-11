"use client";
import { data } from "../../constants/image";
import MobileItemCard from "../../components/MobileItemCard";
import CartList from "../../components/CartList";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { useCart } from "./context/CartProvider";
import {
  ItemQuantityProvider,
  useItemQuantity,
} from "./context/ItemQuantityProvider";
import { useMediaQuery } from "./hooks/use-media-query";
import DesktopItemCard from "../../components/DesktopItemCard";

export default function Home() {
  const { isConfirmed } = useCart();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <ItemQuantityProvider>
      <div className="font-sans relative lg:ml-32">
        <h1 className="text-4xl font-bold mt-5 ml-5 lg:ml-7 lg:mt-24 lg:text-5xl">
          Desserts
        </h1>

        {isDesktop ? (
          <div className="grid grid-cols-[65%_35%] h-full mt-9 gap-5 mb-10">
            <section className="grid grid-cols-3">
              {data.map((item) => (
                <div key={item.id}>
                  <DesktopItemCard item={item} />
                </div>
              ))}
            </section>
            <section className="h-full">
              <div className="sticky top-20 pr-44 -translate-y-20">
                <CartList />
              </div>
            </section>

            {isConfirmed && (
              <div className="fixed inset-0 bg-black bg-opacity-50 w-full h-full flex justify-center items-center">
                <OrderConfirmation isDesktop={isDesktop} />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-rows-9 mt-5 gap-5">
              {data.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <MobileItemCard item={item} />
                </div>
              ))}
            </div>

            <div className="bg-white w-[340px] mx-auto mt-5 rounded-2xl">
              <CartList />
            </div>

            {isConfirmed && (
              <div className="fixed h-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <OrderConfirmation isDesktop={isDesktop} />
              </div>
            )}
          </>
        )}
      </div>
    </ItemQuantityProvider>
  );
}

const OrderConfirmation = ({ isDesktop }: { isDesktop: boolean }) => {
  const { cartItems, setCartItems, orderTotal, setConfirmed } = useCart();
  const { resetAllQuantities } = useItemQuantity();
  return (
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
                  src={item.icon}
                  alt={item.name}
                  width={55}
                  height={55}
                  className="object-contain rounded-lg"
                />

                <div className="flex justify-between items-center font-medium w-full ml-3 lg:text-xl">
                  <div>
                    <p className="line-clamp-1">{item.name}</p>
                    <p className="flex gap-5">
                      <span className="text-theme_red">{item.quantity}x </span>
                      <span className="text-gray-400">@${item.price}</span>
                    </p>
                  </div>
                  <span className="text-end">
                    ${item.quantity * item.price}
                  </span>
                </div>
              </div>
              <hr className="mt-5" />
            </div>
          ))}
          <p className="flex justify-between items-center px-5 py-5">
            <span>Order Total</span>
            <span className="text-xl lg:text-3xl font-bold">${orderTotal}</span>
          </p>
        </div>
        <button
          className="bg-theme_red mt-8 mb-8 text-white lg:text-lg mx-auto w-full py-4 rounded-[2rem] lg:hover:bg-red-800"
          onClick={() => {
            setCartItems([]);
            setConfirmed(false);
            resetAllQuantities();
          }}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};
