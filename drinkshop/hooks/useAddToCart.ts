"use client";

import axios from "axios";
import { Product } from "@/types/product.types";
import { useCartStore } from "@/stores/cart.store";
import { useUserStore } from "@/stores/user.store";
import { CartItem } from "@/types/cart.type";
import { toast } from "sonner";

export const useAddToCart = () => {
  const { cart, setCart, setIsChange, initCart } = useCartStore();
  const { user, isAuthenticated } = useUserStore();

  const addToCart = async (product: Product | null) => {
    if (!product) {
      toast.error("Sản phẩm không hợp lệ!");
      return;
    }

    // Kiểm tra user đăng nhập
    if (!isAuthenticated() || !user) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      return;
    }

    // Nếu chưa có cart, thử khởi tạo cart
    if (!cart) {
      console.log("No cart found, trying to initialize cart for user:", user.id);
      await initCart();

      // Sau khi init, kiểm tra lại
      const { cart: newCart } = useCartStore.getState();
      if (!newCart) {
        toast.error("Không thể khởi tạo giỏ hàng! Vui lòng thử lại");
        return;
      }
    }

    const currentCart = cart || useCartStore.getState().cart;
    if (!currentCart) {
      toast.error("Không tìm thấy giỏ hàng! Vui lòng đăng nhập");
      return;
    }

    const existingItem = currentCart.items.find(
      (item) => item.productId === product.id
    );

    let updatedCart;

    if (existingItem) {
      const updatedItems = currentCart.items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      updatedCart = {
        ...currentCart,
        items: updatedItems,
        totalPrice: currentCart.totalPrice + product.price,
        updatedAt: new Date().toISOString(),
      };
    } else {
      const newItem: CartItem = {
        productId: product.id,
        product: product,
        quantity: 1,
      };

      updatedCart = {
        ...currentCart,
        items: [...currentCart.items, newItem],
        totalPrice: currentCart.totalPrice + product.price,
        updatedAt: new Date().toISOString(),
      };
    }

    try {
      console.log("Updating cart:", updatedCart.id, "for user:", user.id);

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE}/carts/${updatedCart.id}`,
        updatedCart
      );

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