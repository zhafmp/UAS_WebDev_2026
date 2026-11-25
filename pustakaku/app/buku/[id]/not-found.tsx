import Link from "next/link";

export default function BukuTidakDitemukan() {
  return (
    <div className="py-10 text-center">
      <h1 className="mb-2 text-xl font-bold">Buku tidak ditemukan</h1>
      <p className="mb-4 text-gray-600">Buku dengan ID tersebut tidak ada.</p>
      <Link href="/buku" className="text-blue-600 underline">
        Kembali ke daftar buku
      </Link>
    </div>
  );
}
