import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PustakaKu",
  description: "Aplikasi peminjaman buku perpustakaan SMA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="mx-auto max-w-4xl p-4 sm:p-6">{children}</main>
      </body>
    </html>
  );
}