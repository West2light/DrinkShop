import { useEffect, useState } from "react";
import axios from "axios";
import { OrderDetail } from "@/types/order.types";

export const useOrderDetails = (orderId: number) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orderDetails?orderId=${orderId}`
        );
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  return orderDetails;
};
