import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, UserResponse, UserWithoutPassword } from "@/types/user.types";
import { useUser } from "@/contexts/UserContext";
import { removeToken, setToken } from "@/lib/utils";

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "customer";
  receiveNews?: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface UseAuth {
  user: UserWithoutPassword | null;
  loading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuth => {
  const router = useRouter();
  const { user, setUser, clearUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (err: any) {
      const message = err.message || "Registration failed";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      setToken(result.data);
      setUser(result.data);

      // Redirect based on user role
      if (result.data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      const message = err.message || "Login failed";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Logout failed");
      }

      clearUser();
      removeToken();
      router.push("/login");
    } catch (err: any) {
      const message = err.message || "Logout failed";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
  };
};
