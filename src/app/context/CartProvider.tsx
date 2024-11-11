"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
  icon: string;
};

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  isConfirmed: boolean;
  setConfirmed: Dispatch<SetStateAction<boolean>>;
  addItemToCart: (
    itemName: string,
    price: number,
    image: string,
    icon: string
  ) => void;
  removeItemFromCart: (itemName: string) => void;
  deleteItem: (itemName: string) => void;
  orderTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isConfirmed, setConfirmed] = useState(false);

  const addItemToCart = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (itemName: string, price: number, image: string, icon: string) => {
      setCartItems((prevItems) => {
        console.log("Item added:", itemName);
        const updatedCart = [...prevItems];
        const itemIndex = prevItems.findIndex((item) => item.name === itemName);

        if (itemIndex >= 0) {
          updatedCart[itemIndex].quantity += 1;
        } else {
          updatedCart.push({
            name: itemName,
            price,
            quantity: 1,
            image: image,
            icon: icon,
          });
        }

        return updatedCart;
      });
    },
    []
  );

  const removeItemFromCart = useCallback((itemName: string) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  }, []);

  const deleteItem = useCallback((itemName: string) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.name !== itemName);
    });
  }, []);

  const orderTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        isConfirmed,
        setConfirmed,
        addItemToCart,
        removeItemFromCart,
        deleteItem,
        orderTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
