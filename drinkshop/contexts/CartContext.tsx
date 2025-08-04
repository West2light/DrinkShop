"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Cart } from "@/types/cart.type";
import { useCart } from "@/hooks/useCart";

const userId = 2; // Sau này lấy từ AuthContext hoặc session...

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cart: fetchedCart, setCart } = useCart(userId);
  const [cart, setCartState] = useState<Cart | null>(null);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if (fetchedCart) {
      setCartState(fetchedCart);
    }
  }, [fetchedCart]);

  return (
    <CartContext.Provider
      value={{ cart, setCart: setCartState, isChange, setIsChange }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
