import React from "react";
import Image from "next/image";
import { Item } from "../types/types";
import CartButton from "./CartButton";
import { useItemQuantity } from "@/app/context/ItemQuantityProvider";

const DesktopItemCard = ({ item }: { item: Item }) => {
  const { itemQuantities, handleQuantityChange } = useItemQuantity();
  return (
    <div className="flex flex-col items-center">
      <Image
        src={item.image.desktop}
        alt={item.name}
        width={350}
        height={350}
        className={`rounded-lg ${
          itemQuantities[item.id] > 0 && "border-theme_red border-2"
        }`}
      />
      <div className="w-48 h-12">
        <CartButton
          value={itemQuantities[item.id] || 0}
          onChange={(quantity) => handleQuantityChange(item.id, quantity)}
          itemName={item.name}
          itemPrice={item.price}
          itemImage={item.image.desktop}
          itemIcon={item.image.thumbnail}
        />
      </div>{" "}
      <div className="flex flex-col w-[350px] items-start text-xl mb-10">
        <p className="text-lg text-rose-500">{item.category}</p>
        <p className="font-medium">{item.name}</p>
        <p className="text-theme_red font-medium">${item.price}</p>
      </div>
    </div>
  );
};

export default DesktopItemCard;
