import { useState, useMemo } from "react";
import Head from "next/head";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import {
  FaUser,
  FaPlus,
  FaHome,
  FaComment,
  FaShoppingCart,
  FaSync,
} from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { IconType } from "react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiMenuBurger } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/hooks/useDashboard";
import { formatCurrency } from "@/utils/format.currency";
import { RevenueChart } from "./RevenueChart";
import { StatsCard, StatItem } from "./StartsCard";
import { ExportData } from "./ExportData";

interface MenuItem {
  icon: IconType;
  text: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    icon: FaHome,
    text: "Dashboard",
    href: "/admin",
  },
  {
    icon: FaPlus,
    text: "Thêm sản phẩm",
    href: "/admin/add-product",
  },
  {
    icon: FaUser,
    text: "Thêm người dùng",
    href: "/admin/users",
  },
  {
    icon: FaShoppingCart,
    text: "Quản lý đơn hàng",
    href: "/admin/orders",
  },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { stats, chartData, loading, error, refreshData } = useDashboard();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const dashboardStats: StatItem[] = useMemo(
    () => [
      {
        icon: <FaUser className="text-2xl" />,
        value: loading ? "..." : formatNumber(stats?.totalUsers || 0),
        label: "Người dùng",
        loading,
      },
      {
        icon: <FaMoneyBill1Wave className="text-2xl" />,
        value: loading ? "..." : formatCurrency(stats?.totalRevenue || 0),
        label: "Tổng doanh thu",
        loading,
      },
      {
        icon: <FaShoppingCart className="text-2xl" />,
        value: loading ? "..." : formatNumber(stats?.totalOrders || 0),
        label: "Số lượng đơn hàng",
        loading,
      },
      {
        icon: <FaComment className="text-2xl" />,
        value: loading ? "..." : formatNumber(stats?.totalComments || 0),
        label: "Số bình luận",
        loading,
      },
    ],
    [loading, stats]
  );

  const toggleSidebar = useMemo(
    () => () => {
      setIsSidebarOpen(!isSidebarOpen);
    },
    [isSidebarOpen]
  );

  const handleAddProduct = useMemo(
    () => () => {
      router.push("/admin/add-product");
    },
    [router]
  );

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Lỗi tải dữ liệu
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button
            onClick={refreshData}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <FaSync className="mr-2" />
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard - Drinkshop</title>
      </Head>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 z-50
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:static md:translate-x-0`}
      >
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Drinkshop</h2>
          <Button
            variant="ghost"
            className="md:hidden text-white p-2 hover:bg-gray-700 rounded"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <span className="text-red-500">✕</span>
          </Button>
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index} className="mb-2">
                  <Link
                    href={item.href}
                    className="flex items-center p-3 hover:bg-gray-700 rounded transition-colors duration-200"
                  >
                    <Icon className="mr-2" />
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="md:hidden mr-4 text-gray-600 p-2 hover:bg-gray-200 rounded"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <CiMenuBurger className="text-2xl" />
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ExportData loading={loading} />
            <Button
              onClick={refreshData}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <FaSync className={`mr-2 ${loading ? "animate-spin" : ""}`} />
              Làm mới
            </Button>
            <div className="flex items-center">
              <RiAdminLine className="text-2xl text-gray-600 mr-2" />
              <span className="text-gray-700">Admin</span>
              <span className="text-green-500 ml-2">Online</span>
            </div>
          </div>
        </header>

        <main className="p-6 overflow-auto">
          <StatsCard stats={dashboardStats} />
          <RevenueChart chartData={chartData || {}} loading={loading} />
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
