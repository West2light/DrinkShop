"use client";

import { useMemo } from "react";
import { useOrder } from "@/hooks/useOrder";
import BreadcrumbComponent from "@/components/breadcrumb/BreadcrumbComponent";
import Image from "next/image";
import titleleftdark from "@/public/Image_Rudu/titleleft-dark.png";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrderDetails } from "@/hooks/useOrderDetails";

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  const orderId = parseInt(params.id);
  const order = useOrder(orderId);
  const orderDetailsWithProducts = useOrderDetails(orderId);
  const orderLabels = useMemo(() => {
    if (!order) return [];
    return [
      { label: "MÃ ĐƠN HÀNG", value: order?.id ?? "ID" },
      {
        label: "NGÀY ĐẶT",
        value: order?.orderDate
          ? new Date(order.orderDate).toLocaleDateString()
          : "Time",
      },
      { label: "KHO HÀNG", value: order?.store ?? "Kho hàng" },
      { label: "TRẠNG THÁI", value: order?.status ?? "Trạng thái" },
    ];
  }, [order]);

  const orderDetailsLabel = useMemo(() => {
    return [
      { label: "ẢNH" },
      { label: "TÊN SẢN PHẨM" },
      { label: "GIÁ" },
      { label: "SỐ LƯỢNG" },
      { label: "TỔNG TIỀN" },
    ];
  }, []);

  const orderDetailsFooter = useMemo(() => {
    if (!order) return [];
    return [
      {
        label: "Giá",
        value: order.subtotal.toLocaleString("vi-VN") + " đ" || "0 đ",
        isTotal: false,
      },
      {
        label: "Khuyến mãi",
        value: order.discount * 100 + "%",
        isTotal: false,
      },
      {
        label: "Phí vận chuyển",
        value: order.shippingFee.toLocaleString("vi-VN") + " đ",
        isTotal: false,
      },
      {
        label: "Tổng cộng",
        value: order.totalPrice.toLocaleString("vi-VN") + " đ",
        isTotal: true,
      },
    ];
  }, [order]);

  return (
    <div className="py-6">
      <BreadcrumbComponent
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Danh sách đơn hàng", href: "/account/orders" },
          { label: "Chi tiết đơn hàng" },
        ]}
      />

      <div className="my-6">
        <h1 className="text-2xl font-semibold mb-2">CHI TIẾT ĐƠN HÀNG</h1>
        <Image src={titleleftdark} alt="Underline" width={70} height={20} />
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
        <div className="grid grid-cols-2 gap-y-2 gap-x-6 mb-6">
          {orderLabels.map((item, index) => (
            <div key={index}>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="font-medium">{item.value}</p>
            </div>
          ))}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {orderDetailsLabel.map((item, index) => (
                <TableCell key={index} className="font-semibold text-center">
                  {item.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetailsWithProducts?.map((detail) => {
              const product = detail.product;

              if (!product) {
                return (
                  <TableRow key={detail.id}>
                    <TableCell
                      colSpan={orderDetailsLabel.length}
                      className="text-center text-red-500"
                    >
                      Không tìm thấy thông tin sản phẩm cho ID:{" "}
                      {detail.productId}
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow key={detail.id}>
                  <TableCell className="flex justify-center">
                    <Image
                      src={`/${product.image || "default-product.png"}`}
                      alt={product.name}
                      width={70}
                      height={140}
                      className="w-[70px] h-[140px]"
                    />
                  </TableCell>
                  <TableCell className="text-center">{product.name}</TableCell>
                  <TableCell className="text-center">
                    {product.price.toLocaleString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-center">
                    {detail.quantity}
                  </TableCell>
                  <TableCell className="text-center">
                    {(product.price * detail.quantity).toLocaleString("vi-VN") +
                      " đ"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            {orderDetailsFooter.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  colSpan={orderDetailsLabel.length - 1}
                  className={
                    item.isTotal
                      ? "font-bold text-lg text-right"
                      : "text-right font-normal"
                  }
                >
                  {item.label}
                </TableCell>
                <TableCell
                  className={
                    item.isTotal
                      ? "font-bold text-lg text-right"
                      : "text-right font-normal"
                  }
                >
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default OrderDetailPage;
