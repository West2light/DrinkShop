import type { Metadata } from "next";
import { Geist, Geist_Mono, Gideon_Roman } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const gideonRoman = Gideon_Roman({
  variable: "--font-gideon-roman",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Drink Shop - Rượu vang và rượu ngoại cao cấp",
  description: "Chuyên cung cấp các loại rượu vang và rượu ngoại cao cấp với chất lượng tuyệt vời",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gideonRoman.variable} antialiased`}
      >
        <div className="font-roman">
          <UserProvider>
            <CartProvider>
              <Header />
              <Toaster position="top-right" richColors />
              <div className="px-72">{children}</div>
              <Footer />
            </CartProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
