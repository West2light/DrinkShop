import { create } from "zustand";
import { publicApi } from "@/lib/api/axios";
import { Cart } from "@/types/cart.type";
import { useUserStore } from "./user.store";

interface CartState {
  cart: Cart | null;
  isChange: boolean;
  fetchCart: (userId: string) => Promise<void>;
  initCart: () => Promise<void>; // Thêm method này
  setCart: (cart: Cart | null) => void;
  setIsChange: (value: boolean) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isChange: false,

  fetchCart: async (userId) => {
    if (!userId) {
      set({ cart: null });
      return;
    }
    try {
      const res = await publicApi.get(`/carts?userId=${userId}`);
      const carts = res.data || res;
      set({ cart: Array.isArray(carts) ? carts[0] || null : carts || null });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ cart: null });
    }
  },

  // Thêm initCart method
  initCart: async () => {
    const { user } = useUserStore.getState();
    if (!user) {
      console.log("No user found for cart initialization");
      set({ cart: null });
      return;
    }

    try {
      console.log("Initializing cart for user:", user.id);

      // Thử lấy cart hiện tại trước
      const res = await publicApi.get(`/carts?userId=${user.id}`);
      const existingCarts = res.data || res;

      if (Array.isArray(existingCarts) && existingCarts.length > 0) {
        // Đã có cart, sử dụng cart đầu tiên
        set({ cart: existingCarts[0] });
        console.log("Found existing cart:", existingCarts[0].id);
      } else {
        // Chưa có cart, tạo mới
        const newCart: Omit<Cart, 'id'> = {
          userId: user.id,
          items: [],
          totalPrice: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const createRes = await publicApi.post('/carts', newCart);
        const createdCart = createRes.data || createRes;
        set({ cart: createdCart });
        console.log("Created new cart:", createdCart.id);
      }
    } catch (error) {
      console.error("Error initializing cart:", error);
      set({ cart: null });
    }
  },

  setCart: (cart) => set({ cart }),

  setIsChange: (value) => set({ isChange: value }),
}));