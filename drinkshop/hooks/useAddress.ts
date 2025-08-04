import { useEffect, useState } from "react";
import axios from "axios";

export const useAddress = (userId: number) => {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/addresses?userId=${userId}&isDefault=true`
        );
        if (response.data.length > 0) {
          const addressData = response.data[0];
          setAddress(
            `${addressData.address}, ${addressData.city}, ${addressData.country}`
          );
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [userId]);

  return address;
};
