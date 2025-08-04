import { useState } from "react";
import Head from "next/head";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import {
  FaUser,
  FaPlus,
  FaHome,
  FaComment,
  FaShoppingCart,
} from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { IconType } from "react-icons";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CiMenuBurger } from "react-icons/ci";
import { useRouter } from "next/navigation";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface StatItem {
  icon: ReactNode;
  value: string | number;
  label: string;
}

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
];

const stats: StatItem[] = [
  {
    icon: <FaUser className="text-2xl" />,
    value: 2500,
    label: "User",
  },
  {
    icon: <FaMoneyBill1Wave className="text-2xl" />,
    value: "123.50",
    label: "Tổng doanh thu",
  },
  {
    icon: <FaShoppingCart className="text-2xl" />,
    value: "1,805",
    label: "Số lượng đơn hàng",
  },
  {
    icon: <FaComment className="text-2xl" />,
    value: 54,
    label: "Số bình luận",
  },
];
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddProduct = () => {
    router.push("/add-product");
  };

  // chưa có data thực
  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Tổng doanh thu (USD)",
        data: [100.5, 120.75, 110.25, 130.0, 125.5, 140.2, 123.5],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Số lượng đơn hàng",
        data: [250, 300, 280, 320, 310, 350, 305],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Doanh thu và Số lượng đơn hàng (7 ngày gần nhất)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Giá trị",
        },
      },
      x: {
        title: {
          display: true,
          text: "Ngày",
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Head>
        <title>Drinkshop</title>
      </Head>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 w-64 bg-gray-800 text-white p-4 z-50
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen
            ? "translate-x-0 block"
            : "translate-x-full hidden"
          }
                md:static md:translate-x-0 md:block`}
      >
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Drinkshop</h2>
          <Button
            variant="outline"
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
                    className="flex items-center p-3 hover:bg-gray-700 rounded transition-colors duration-200 touch-manipulation"
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
            <div className="flex items-center">
              <RiAdminLine className="text-2xl text-gray-600 mr-2" />
              <span className="text-gray-700">Admin</span>
              <span className="text-green-500 ml-2">Online</span>
            </div>
          </div>
        </header>

        <main className="p-6 overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow flex flex-col items-center justify-center text-center"
              >
                {item.icon}
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">
              Biểu đồ Doanh thu và Đơn hàng
            </h2>
            <div className="h-64 w-full flex justify-center items-center">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}
