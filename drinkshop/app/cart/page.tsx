"use client";

import BreadcrumbComponent from "@/components/breadcrumb/BreadcrumbComponent";
import Image from "next/image";
import titleleftdark from "@/public/Image_Rudu/titleleft-dark.png";
import Link from "next/link";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useCartContext } from "@/contexts/CartContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { ConfirmDialog } from "@/components/confirmdialog/ConfirmDialog";

const CartPage = () => {
  const userId = 2; // Sau này lấy từ AuthContext
  const { cart, setCart, isChange, setIsChange } = useCartContext();
  //nếu người dùng thay đổi giỏ hàng mà không ấn cập nhật thì sẽ có cảnh báo khi chuyển tab
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isChange) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isChange]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (!cart) return;
    const updatedItems = cart.items.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCart({ ...cart, items: updatedItems });
    setIsChange(true);
  };

  const handleRemoveItem = (index: number) => {
    if (!cart) return;
    const updatedItems = cart.items.filter((_, i) => i !== index);
    setCart({ ...cart, items: updatedItems });
    setIsChange(true);
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  const handleClearCart = () => {
    if (!cart) {
      toast.error("Không tìm thấy giỏ hàng để xóa");
      return;
    }
    setCart({ ...cart, items: [] });
    setIsChange(true);
    toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng");
  };

  const handleSaveCart = async () => {
    if (!cart) {
      toast.error("Không tìm thấy giỏ hàng để cập nhật");
      return;
    }

    const totalPrice = cart.items.reduce((sum, item) => {
      if (!item.product) return sum;
      return sum + item.quantity * item.product.price;
    }, 0);

    const updatedCart = {
      ...cart,
      userId,
      totalPrice,
      updatedAt: new Date().toISOString(),
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${cart.id}`,
        updatedCart
      );
      toast.success("Cập nhật giỏ hàng thành công");
      setIsChange(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật giỏ hàng");
      console.error(error);
    }
  };

  const cartLabel = useMemo(
    () => [
      { label: "ẢNH" },
      { label: "TÊN SẢN PHẨM" },
      { label: "GIÁ" },
      { label: "SỐ LƯỢNG" },
      { label: "TỔNG TIỀN" },
      { label: "XÓA" },
    ],
    []
  );
  return (
    <div className="py-6">
      <Toaster position="top-right" richColors />
      <BreadcrumbComponent
        items={[{ label: "Trang chủ", href: "/" }, { label: "Giỏ hàng" }]}
      />
      <div className="my-6">
        <h1 className="text-2xl font-semibold mb-2">GIỎ HÀNG</h1>
        <Image src={titleleftdark} alt="Underline" width={70} height={20} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {cartLabel.map((item, index) => (
              <TableCell key={index} className="font-semibold text-center">
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart?.items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={cartLabel.length} className="text-center">
                Giỏ hàng của bạn đang trống
              </TableCell>
            </TableRow>
          ) : (
            cart?.items.map((cartItem, index) => (
              <TableRow key={index}>
                <TableCell className="flex justify-center">
                  <Image
                    src={`/${cartItem.product?.image}`}
                    alt={cartItem.product?.name || "Product Image"}
                    width={70}
                    height={140}
                    className="w-[70px] h-[140px]"
                  />
                </TableCell>
                <TableCell className="text-center uppercase">
                  {cartItem.product?.name}
                </TableCell>
                <TableCell className="text-center">
                  {cartItem.product?.price.toLocaleString("vi-VN") + "đ"}
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={cartItem.quantity}
                    min={1}
                    className="w-20 text-center flex justify-self-center"
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity > 0) {
                        handleQuantityChange(index, newQuantity);
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="text-center">
                  {cartItem.product?.price
                    ? (
                        cartItem.product.price * cartItem.quantity
                      ).toLocaleString("vi-VN") + "đ"
                    : 0}
                </TableCell>
                <TableCell className="text-center">
                  <ConfirmDialog
                    trigger={
                      <Button className="cursor-pointer bg-black hover:bg-gray-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    title="Xóa sản phẩm"
                    description="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
                    confirmText="Xóa"
                    cancelText="Hủy"
                    onConfirm={() => handleRemoveItem(index)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end items-center gap-4 mt-6">
        <Button className="cursor-pointer bg-black hover:bg-gray-800">
          <Link href="/">Tiếp tục mua hàng</Link>
        </Button>
        <ConfirmDialog
          trigger={
            <Button
              disabled={cart?.items.length === 0}
              className="cursor-pointer bg-black hover:bg-gray-800"
            >
              Xóa
            </Button>
          }
          title="Xóa giỏ hàng"
          description="Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?"
          confirmText="Xóa"
          cancelText="Hủy"
          onConfirm={handleClearCart}
        />
        <Button
          disabled={!isChange}
          className="cursor-pointer bg-black hover:bg-gray-800"
          onClick={handleSaveCart}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
