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

export default function Home() {
  const { isConfirmed } = useCart();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <ItemQuantityProvider>
      <div className="font-sans relative lg:ml-20">
        <h1 className="text-4xl font-bold mt-5 ml-5 lg:ml-0">Desserts</h1>
        {isDesktop ? (
          <div className="grid grid-cols-[65%_35%] h-screen">
            <section className="grid grid-cols-3">
              {data.map((item) => (
                <div key={item.id}>
                  <Image
                    src={item.image.desktop}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="rounded-lg"
                  ></Image>
                </div>
              ))}
            </section>
            <section className=""></section>
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
                <OrderConfirmation />
              </div>
            )}
          </>
        )}
      </div>
    </ItemQuantityProvider>
  );
}

const OrderConfirmation = () => {
  const { cartItems, setCartItems, ourTotal, setConfirmed } = useCart();
  const { resetAllQuantities } = useItemQuantity();
  return (
    <div className="bg-white w-screen h-3/4 rounded-t-2xl flex fixed left-0 bottom-0">
      <div className="w-5/6 mx-auto">
        <CircleCheck color="#1ea475" strokeWidth={1.25} className="size-1/6" />
        <h1 className="text-4xl font-bold block">
          Order <br />
          Confirmed
        </h1>
        <p className="text-sm text-gray-500">We hope you enjoy your food!</p>

        <div className="bg-[#fff8f2] mt-5">
          {cartItems.map((item, index) => (
            <div key={index} className="px-5 pt-5">
              <div className="overflow-hidden flex">
                <Image src={item.icon} alt={item.name} width={40} height={40} />

                <div className="flex justify-between font-medium w-full ml-3">
                  <div>
                    <p className="text-sm line-clamp-1">{item.name}</p>
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
          <p className="flex justify-between px-5 py-5 ">
            <span>Our Total</span>{" "}
            <span className="text-xl font-bold">${ourTotal}</span>
          </p>
        </div>
        <button
          className="bg-theme_red mt-5 text-white mx-auto w-full p-[10px] rounded-3xl "
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
