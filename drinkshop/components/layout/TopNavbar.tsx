"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

const commonNavItems = [
  { href: "/account", label: "Tài khoản của tôi" },
  { href: "/account/orders", label: "Trạng thái đơn hàng" },
  { href: "/account/wishlist", label: "Danh sách ưa thích" },
  { href: "/cart", label: "Giỏ hàng" },
];

const guestNavItems = [
  { href: "/login", label: "Đăng nhập" },
  { href: "/register", label: "Đăng ký" },
];

const TopNavbar = () => {
  const { user } = useUser();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-white border-b px-72">
      <div className="flex justify-between items-center h-7 text-xs tracking-tight">
        <div className="flex items-center space-x-6 text-black">
          {commonNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <div className="text-gray-700">
                Xin chào, <span className="font-medium">{user.email}</span>
              </div>
              <Button
                variant="link"
                className="text-xs p-0 h-auto cursor-pointer text-red-700"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            guestNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:underline"
              >
                {item.label}
              </Link>
            ))
          )}
        </div>

        <div className="flex items-center space-x-6">
          <Input
            className="placeholder:text-xs placeholder:italic placeholder:text-gray-400 border-none focus-visible:ring-0"
            placeholder="Tìm kiếm ở đây..."
          />
          <Search className="size-4 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
