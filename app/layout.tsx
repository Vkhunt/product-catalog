import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ModernCatalog — Premium E-commerce Store",
  description: "Experience the future of online shopping with our curated catalog of high-quality products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-gray-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
