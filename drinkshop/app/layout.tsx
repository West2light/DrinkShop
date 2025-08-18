import type { Metadata } from "next";
import { Geist, Geist_Mono, Gideon_Roman } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import ClientLayout from "@/components/layout/ClientLayout";

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
  description:
    "Chuyên cung cấp các loại rượu vang và rượu ngoại cao cấp với chất lượng tuyệt vời",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&family=Gideon+Roman:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        <SessionProvider>
          <div className="font-roman">
            <ClientLayout>{children}</ClientLayout>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
