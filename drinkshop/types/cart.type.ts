import { Product } from "@/types/product.types";
interface CartItem {
  productId: number;
  product: Product | null;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
