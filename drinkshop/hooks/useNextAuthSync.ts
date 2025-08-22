import { useSession } from "next-auth/react";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";

export function useNextAuthSync() {
  const { data: session, status } = useSession();
  const { user, initFromNextAuth, clearUser } = useUserStore();

  useEffect(() => {
    if (status === "loading") return; // Đợi session load xong

    if (status === "authenticated" && session) {
      // Đăng nhập thành công qua NextAuth
      initFromNextAuth(session);
    } else if (status === "unauthenticated" && user && user.role) {
      // Không có NextAuth session nhưng có legacy user
      // Giữ nguyên legacy user
      return;
    } else if (status === "unauthenticated" && !user) {
      // Không có session nào cả
      clearUser();
    }
  }, [session, status, initFromNextAuth, clearUser, user]);

  return { session, status, user };
}