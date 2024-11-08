"use client";

import CartButton from "./CartButton";
import Image from "next/image";
import { useItemQuantity } from "@/app/context/ItemQuantityProvider";

type Item = {
  id: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

const MobileItemCard = ({ item }: { item: Item }) => {
  const { itemQuantities, handleQuantityChange } = useItemQuantity();

  return (
    <div className="flex flex-col items-center">
      <Image
        src={item.image.mobile}
        alt={item.name}
        width={340}
        height={300}
        className={`rounded-lg  ${
          itemQuantities[item.id] > 0 && "border-2 border-theme_red"
        }`}
      />
      <div className="w-36 h-10">
        <CartButton
          value={itemQuantities[item.id] || 0}
          onChange={(quantity) => handleQuantityChange(item.id, quantity)}
          itemName={item.name}
          itemPrice={item.price}
          itemImage={item.image.mobile}
          itemIcon={item.image.thumbnail}
        />
      </div>

      <section className="flex flex-col w-[300px] items-start">
        <p className="text-sm text-slate-400">{item.category}</p>
        <p className="font-medium">{item.name}</p>
        <p className="text-theme_red font-medium">${item.price}</p>
      </section>
    </div>
  );
};

export default MobileItemCard;
