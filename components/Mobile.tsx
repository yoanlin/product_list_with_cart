"use client";

import CartButton from "./CartButton";
import Image from "next/image";
import { Product } from "../types/types";
import { itemData } from "../constants/image";
import CartList from "./CartList";
import { useCart } from "@/app/context/CartProvider";

const Mobile = () => {
  return (
    <div className="grid grid-rows-9 mt-5 gap-5">
      {itemData.map((data) => (
        <div key={data.id} className="flex flex-col items-center">
          <MobileItemCard data={data} />
        </div>
      ))}
      <div className="bg-white w-[340px] mx-auto mt-5 rounded-2xl mb-5">
        <CartList />
      </div>
    </div>
  );
};

const MobileItemCard = ({ data }: { data: Product }) => {
  const { cartItems } = useCart();
  const existingItem = cartItems.find((item) => item.product.id === data.id);

  let itemQuantity;
  if (existingItem) {
    itemQuantity = existingItem.quantity;
  } else {
    itemQuantity = 0;
  }
  return (
    <div className="flex flex-col items-center">
      <Image
        src={data.image.mobile}
        alt={data.name}
        width={340}
        height={300}
        className={`rounded-lg  ${
          itemQuantity > 0 && "border-2 border-theme_red"
        }`}
      />
      <div className="w-36 h-10">
        <CartButton data={data} />
      </div>

      <section className="flex flex-col w-[300px] items-start">
        <p className="text-sm text-rose-500">{data.category}</p>
        <p className="font-medium">{data.name}</p>
        <p className="text-theme_red font-medium">${data.price}</p>
      </section>
    </div>
  );
};

export default Mobile;
