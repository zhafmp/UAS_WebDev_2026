import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-10 text-center">
      <h1 className="mb-2 text-xl font-bold">404: Halaman tidak ditemukan</h1>
      <Link href="/" className="text-blue-600 underline">
        Kembali ke beranda
      </Link>
    </div>
  );
}
