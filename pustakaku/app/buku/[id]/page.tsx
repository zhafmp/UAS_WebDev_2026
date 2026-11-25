import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

async function DataBuku({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const nomor = Number(id);
  if (!Number.isInteger(nomor)) notFound();

  const b = await prisma.buku.findUnique({ where: { id: nomor } });
  if (!b) notFound();

  const habis = b.stokTersedia === 0;

  return (
    <div className="mt-4 grid gap-6 rounded border bg-white p-5 sm:grid-cols-[200px_1fr]">
      <div className="flex min-h-40 items-center justify-center rounded bg-gray-200 text-sm text-gray-500 sm:min-h-64">
        Sampul
      </div>
      <div>
        <h1 className="mb-2 text-2xl font-bold">{b.judul}</h1>
        <p>Penulis: {b.penulis}</p>
        <p>
          Kategori: {b.kategori}
          {b.tahun ? ` · Tahun: ${b.tahun}` : ""}
        </p>
        <p className="mt-1">
          Stok:{" "}
          <span
            className={`rounded px-2 py-0.5 text-sm ${
              habis ? "bg-red-100 text-red-700" : "bg-green-100 text-green-800"
            }`}
          >
            {habis ? "Habis" : `${b.stokTersedia} dari ${b.stokTotal} tersedia`}
          </span>
        </p>
        <p className="mt-4 text-gray-700">
          {b.deskripsi ?? "Belum ada deskripsi untuk buku ini."}
        </p>
      </div>
    </div>
  );
}

export default function DetailBukuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <Link href="/buku" className="text-sm text-gray-600 hover:underline">
        &lsaquo; Kembali ke daftar
      </Link>
      <Suspense fallback={<p className="mt-4 text-gray-500">Memuat data...</p>}>
        <DataBuku params={params} />
      </Suspense>
    </div>
  );
}