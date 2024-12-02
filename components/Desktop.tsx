import React from "react";
import Image from "next/image";
import { Product } from "../types/types";
import CartButton from "./CartButton";

import { itemData } from "../constants/image";
import CartList from "./CartList";
import { useCart } from "@/app/context/CartProvider";

const Desktop = () => {
  return (
    <div className="grid grid-cols-[65%_35%] h-full mt-9 gap-5 mb-10">
      <section className="grid grid-cols-3">
        {itemData.map((data) => (
          <div key={data.id}>
            <DesktopItemCard data={data} />
          </div>
        ))}
      </section>
      <section>
        <div className="bg-white sticky top-20 mr-10 xl:w-fit -translate-y-20">
          <CartList />
        </div>
      </section>
    </div>
  );
};

const DesktopItemCard = ({ data }: { data: Product }) => {
  const { cartItems } = useCart();
  const existingItem = cartItems.find((item) => item.product.id === data.id);

  let itemQuantity;
  if (existingItem) {
    itemQuantity = existingItem.quantity;
  } else {
    itemQuantity = 0;
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col h-fit items-center">
        <Image
          src={data.image.desktop}
          alt={data.name}
          width={250}
          height={250}
          className={`rounded-lg lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] 2xl:w-[300px] 2xl:h-[300px] ${
            itemQuantity > 0 && "border-theme_red border-2"
          }`}
        />
        <div className="w-48 h-12 lg:w-32 lg:h-8 xl:w-40 xl:h-10">
          <CartButton data={data} />
        </div>
      </div>
      <div className="flex flex-col items-start text-xl lg:text-base mb-10">
        <p className="text-lg lg:text-sm text-rose-500">{data.category}</p>
        <p className="font-medium text-wrap max-w-full">{data.name}</p>
        <p className="text-theme_red font-medium">${data.price}</p>
      </div>
    </div>
  );
};

export default Desktop;
