import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "@/types/order.types";

export const useOrder = (id: number) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders?id=${id}`
        );
        setOrder(response.data[0]);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  return order;
};
