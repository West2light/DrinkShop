import { create } from "zustand";
import { UserWithoutPassword } from "@/types/user.types";
import { getToken, removeToken, setToken } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

interface UserState {
  user: UserWithoutPassword | null;
  isNextAuthUser: boolean; // Flag để biết user từ NextAuth hay legacy
  setUser: (user: UserWithoutPassword | null) => void;
  clearUser: () => Promise<void>;
  initUser: () => void;
  initFromNextAuth: (session: any) => void;
  isAuthenticated: () => boolean; // Helper method
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isNextAuthUser: false,
  setUser: (user: UserWithoutPassword | null) => {
    set({ user, isNextAuthUser: false });
    if (user) {
      setToken(user);
    }
  },
  clearUser: async () => {
    removeToken();
    set({ user: null, isNextAuthUser: false });
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.log("No NextAuth session to sign out from");
    }
  },
  initUser: () => {
    const userFromToken = getToken();
    if (userFromToken) {
      set({ user: userFromToken, isNextAuthUser: false });
    }
  },
  initFromNextAuth: (session: any) => {
    if (session?.user) {
      const currentUser = get().user;
      // Prevent infinite updates
      if (currentUser && currentUser.id === session.user.id && get().isNextAuthUser) {
        return;
      }
      const nextAuthUser: UserWithoutPassword = {
        id: session.user.id,
        email: session.user.email!,
        firstName: session.user.name?.split(" ")[0] || "OAuth",
        lastName: session.user.name?.split(" ").slice(1).join(" ") || "User",
        avatar: session.user.image || "placeholder/avatar.png",
        role: session.user.role as "admin" | "customer",
        receiveNews: false,
        twoFactorEnabled: false,
      };
      set({ user: nextAuthUser, isNextAuthUser: true });
      // Cũng lưu vào token để cart có thể access
      setToken(nextAuthUser);
    }
  },
  isAuthenticated: () => {
    const state = get();
    return state.user !== null;
  },
}));