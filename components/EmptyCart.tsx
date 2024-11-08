import Image from "next/image";

const EmptyCart = () => {
  return (
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
  );
};

export default EmptyCart;
