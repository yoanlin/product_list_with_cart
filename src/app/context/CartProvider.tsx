"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useReducer,
  useState,
} from "react";
import { CartItem, Product } from "../../../types/types";

type CartAction =
  | { type: "addItemToCart"; payload: Product }
  | { type: "increaseItemQuantity"; payload: number }
  | { type: "reduceItemQuantity"; payload: number }
  | { type: "removeItemFromCart"; payload: number }
  | { type: "resetCart" };

type CartContextType = {
  cartItems: CartItem[];
  isConfirmed: boolean;
  orderTotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) throw new Error("useCart must be used within a CartProvider");

  return context;
}

type CartDispatchContextType = {
  dispatch: Dispatch<CartAction>;
  setConfirmed: Dispatch<SetStateAction<boolean>>;
};

const CartDispatchContext = createContext<CartDispatchContextType | null>(null);

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);

  if (!context)
    throw new Error("useCartDispatch must be used within a CartProvider");

  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems);
  const [isConfirmed, setConfirmed] = useState(false);
  const orderTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  return (
    <CartContext.Provider value={{ cartItems, isConfirmed, orderTotal }}>
      <CartDispatchContext.Provider value={{ dispatch, setConfirmed }}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

function cartReducer(cartItems: CartItem[], action: CartAction) {
  switch (action.type) {
    case "addItemToCart": {
      const existingItem = cartItems.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        return cartItems;
      } else {
        return [...cartItems, { product: action.payload, quantity: 1 }];
      }
    }

    case "increaseItemQuantity": {
      return cartItems.map((item) =>
        item.product.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case "reduceItemQuantity": {
      return cartItems
        .map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    }

    case "removeItemFromCart": {
      return cartItems.filter((item) => item.product.id !== action.payload);
    }

    case "resetCart": {
      return [];
    }

    default: {
      throw new Error("Unknown action type");
    }
  }
}

const initialCartItems: CartItem[] = [];
