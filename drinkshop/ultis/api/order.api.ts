import axios from "axios";
import { OrderCreate, OrderDetailCreate } from "@/types/order.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export const createOrder = async (data: OrderCreate) => {
  const res = await axios.post(`${BASE_URL}/orders`, data);
  return res.data;
};

export const createOrderDetails = async (orderDetails: OrderDetailCreate[]) => {
  return Promise.all(
    orderDetails.map((detail) => axios.post(`${BASE_URL}/orderDetails`, detail))
  );
};

export const setStatusCancelOrder = async (orderId: string) => {
  await axios.patch(`${BASE_URL}/orders/${orderId}`, { status: "Đã hủy" });
};
