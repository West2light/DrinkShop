"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/stores/cart.store";

const menuItems = [
  {
    label: "TRANG CHỦ",
    href: "/",
  },
  {
    label: "RƯỢU VANG ĐỎ",
    href: "/products?category=Rượu Vang Đỏ",
    submenu: [
      {
        label: "Rượu Vang Đỏ Pháp",
        href: "/products?category=Rượu Vang Đỏ",
      },
      {
        label: "Rượu Vang Đỏ Ý",
        href: "/products?category=Rượu Vang Đỏ",
      },
      {
        label: "Rượu Vang Đỏ Tây Ban Nha",
        href: "/products?category=Rượu Vang Đỏ",
      },
      {
        label: "Rượu Vang Đỏ Chile",
        href: "/products?category=Rượu Vang Đỏ",
      },
    ],
  },
  {
    label: "RƯỢU VANG TRẮNG",
    href: "/products?category=Rượu Vang Trắng",
    submenu: [
      {
        label: "Rượu Vang Trắng Pháp",
        href: "/products?category=Rượu Vang Trắng",
      },
      {
        label: "Rượu Vang Trắng Ý",
        href: "/products?category=Rượu Vang Trắng",
      },
      {
        label: "Rượu Vang Trắng Đức",
        href: "/products?category=Rượu Vang Trắng",
      },
    ],
  },
  {
    label: "CHAMPAGNE",
    href: "/products?category=Champagne",
  },
  {
    label: "GIỚI THIỆU",
    href: "/gioi-thieu",
  },
  {
    label: "BLOG",
    href: "/blog",
  },
  {
    label: "LIÊN HỆ",
    href: "/lien-he",
  },
];

const MainNavbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCartStore();
  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              width={130}
              height={80}
              alt="Wine House Logo"
              src="/Image_Rudu/logo2.jpg"
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.submenu ? (
                  <div className="relative">
                    <button className="flex items-center space-x-1 hover:text-yellow-500 transition-colors text-sm 2xl:text-base">
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-yellow-600 text-sm"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-yellow-500 transition-colors text-sm 2xl:text-base"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-yellow-500 hidden sm:flex"
            >
              <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-yellow-500 hidden sm:flex"
              >
                <User className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-yellow-500"
              >
                <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs">
                {cart?.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                ) || 0}
              </Badge>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="xl:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="xl:hidden bg-black border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 max-h-96 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.label} className="py-2">
                <Link
                  href={item.href}
                  className="block text-white hover:text-yellow-500 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-gray-300 hover:text-yellow-500 text-sm py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile-only links */}
            <div className="border-t border-gray-800 mt-4 pt-4 sm:hidden">
              <Link
                href="/login"
                className="flex items-center space-x-3 py-2 text-white hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Đăng nhập</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center space-x-3 py-2 text-white hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span>Yêu thích</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
