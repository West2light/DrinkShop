import { useEffect, useState } from "react";
import axios from "axios";
import { Cart } from "@/types/cart.type";

export const useCart = (userId: number) => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    if (!userId) return;
    const fetchCart = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts?userId=${userId}`
      );
      setCart(res.data[0] || null);
    };
    fetchCart();
  }, [userId]);

  return { cart, setCart };
};
