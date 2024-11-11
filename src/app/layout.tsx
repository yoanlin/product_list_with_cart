import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "./context/CartProvider";

const redHat = localFont({
  src: [
    {
      path: "./fonts/static/RedHatText-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/static/RedHatText-SemiBold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/static/RedHatText-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/RedHatText-Italic-VariableFont_wght.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-red-hat",
});

export const metadata: Metadata = {
  title: "Delicate Desserts",
  description: "Here're the best desserts you can find online",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHat.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
