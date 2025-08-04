"use client";

import axios from "axios";
import { Product } from "@/types/product.types";
import { useCartContext } from "@/contexts/CartContext";
import { CartItem } from "@/types/cart.type";
import { toast } from "sonner";

export const useAddToCart = () => {
  const { cart, setCart, setIsChange } = useCartContext();

  const addToCart = async (product: Product) => {
    if (!cart) {
      toast.error("Không tìm thấy giỏ hàng!");
      return;
    }

    const existingItem = cart.items.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      toast.info("Sản phẩm đã có trong giỏ hàng.");
      return;
    }

    const newItem: CartItem = {
      productId: product.id,
      product: product,
      quantity: 1,
    };

    const updatedCart = {
      ...cart,
      items: [...cart.items, newItem],
      totalPrice: cart.totalPrice + product.price,
      updatedAt: new Date().toISOString(),
    };

    try {
      // Cập nhật DB
      await axios.patch(`/api/carts/${cart.id}`, updatedCart);

      // Cập nhật context
      setCart(updatedCart);
      setIsChange(true);

      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Thêm vào giỏ hàng thất bại.");
    }
  };

  return addToCart;
};
