import { createContext, FC, ReactNode, useContext, useState } from "react";

interface ItemQuantityContext {
  itemQuantities: { [key: number]: number };
  handleQuantityChange: (itemId: number, quantity: number) => void;
  resetAllQuantities: () => void;
}

const ItemQuantityContext = createContext<ItemQuantityContext | null>(null);

export const useItemQuantity = () => {
  const context = useContext(ItemQuantityContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const ItemQuantityProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [itemQuantities, setItemQuantities] = useState<{
    [key: number]: number;
  }>({});

  const handleQuantityChange = (ItemId: number, quantity: number) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ItemId]: quantity,
    }));
  };

  const resetAllQuantities = () => {
    setItemQuantities({});
  };

  return (
    <ItemQuantityContext.Provider
      value={{ itemQuantities, handleQuantityChange, resetAllQuantities }}
    >
      {children}
    </ItemQuantityContext.Provider>
  );
};
