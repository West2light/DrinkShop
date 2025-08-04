import { Product } from "@/types/product.types";
export interface Order {
  id: number;
  userId: number;
  addressId: number;
  status: string;
  store: string;
  totalPrice: number;
  subtotal: number;
  totalItem: number;
  shippingFee: number;
  discount: number;
  paymentMethod: string;
  orderDate: string;
  updatedAt: string;
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}
