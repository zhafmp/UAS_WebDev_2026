import Link from "next/link";
import FormBuku from "@/components/FormBuku";

export default function TambahBukuPage() {
  return (
    <div>
      <Link href="/buku" className="text-sm text-gray-600 hover:underline">
        &lsaquo; Kembali ke daftar
      </Link>
      <div className="mt-4">
        <FormBuku />
      </div>
    </div>
  );
}