import { useEffect, useState } from "react";
import axios from "axios";
import { OrderDetail, Order } from "@/types/order.types";
export const useOrderDetails = (order: Order | null) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  useEffect(() => {
    if (!order) {
      setOrderDetails([]);
      return;
    }
    const fetchDetails = async () => {
      try {
        setIsLoadingDetails(true);
        const response = await axios.get<OrderDetail[]>(
          `${process.env.NEXT_PUBLIC_API_BASE}/orderDetails?orderId=${order.id}`
        );
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setOrderDetails([]);
      } finally {
        setIsLoadingDetails(false);
      }
    };
    fetchDetails();
  }, [order]);
  return { orderDetails, isLoadingDetails };
};
