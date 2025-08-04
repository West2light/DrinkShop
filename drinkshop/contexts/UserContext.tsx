"use client";

import { User, UserWithoutPassword } from "@/types/user.types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { getToken, removeToken } from "@/lib/utils";

interface UserContextType {
  user: UserWithoutPassword | null;
  setUser: (user: UserWithoutPassword | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);

  useEffect(() => {
    const userFromToken = getToken();
    if (userFromToken) {
      setUser(userFromToken);
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    removeToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
