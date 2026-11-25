import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KATEGORI } from "@/lib/kategori";

type Param = string | string[] | undefined;
const pertama = (v: Param) => (Array.isArray(v) ? v[0] : v);

async function TabelBuku({ cari, kategori }: { cari?: string; kategori?: string }) {
  const daftar = await prisma.buku.findMany({
    where: {
      ...(kategori ? { kategori } : {}),
      ...(cari
        ? { OR: [{ judul: { contains: cari } }, { penulis: { contains: cari } }] }
        : {}),
    },
    orderBy: { id: "asc" },
  });

  if (daftar.length === 0) {
    return <p className="mt-6 text-gray-500">Tidak ada buku yang ditemukan.</p>;
  }

  return (
    <div className="mt-4 overflow-x-auto rounded border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Judul</th>
            <th className="p-3">Penulis</th>
            <th className="p-3">Kategori</th>
            <th className="p-3">Stok</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {daftar.map((b, i) => (
            <tr key={b.id}>
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{b.judul}</td>
              <td className="p-3">{b.penulis}</td>
              <td className="p-3">{b.kategori}</td>
              <td className="p-3">
                {b.stokTersedia === 0 ? (
                  <span className="rounded bg-red-100 px-2 py-0.5 text-red-700">
                    {b.stokTersedia}/{b.stokTotal}
                  </span>
                ) : (
                  `${b.stokTersedia}/${b.stokTotal}`
                )}
              </td>
              <td className="p-3">
                <Link
                  href={`/buku/${b.id}`}
                  className="rounded border px-3 py-1 hover:bg-gray-100"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function PencarianBuku({
  searchParams,
}: {
  searchParams: Promise<{ cari?: Param; kategori?: Param }>;
}) {
  const sp = await searchParams;
  const cari = pertama(sp.cari)?.trim();
  const kategori = pertama(sp.kategori);

  return (
    <>
      <form action="/buku" method="get" className="mt-4 flex flex-wrap gap-2">
        <input
          name="cari"
          defaultValue={cari}
          placeholder="Cari judul atau penulis"
          className="min-w-48 flex-1 rounded border border-gray-300 p-2"
        />
        <select
          name="kategori"
          defaultValue={kategori ?? ""}
          className="rounded border border-gray-300 p-2"
        >
          <option value="">Semua kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <button className="rounded bg-gray-900 px-4 text-white">Cari</button>
      </form>

      <Suspense
        key={`${cari}-${kategori}`}
        fallback={<p className="mt-6 text-gray-500">Memuat data...</p>}
      >
        <TabelBuku cari={cari} kategori={kategori} />
      </Suspense>
    </>
  );
}

export default function DaftarBukuPage({
  searchParams,
}: {
  searchParams: Promise<{ cari?: Param; kategori?: Param }>;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Buku</h1>
        <Link href="/buku/baru" className="rounded bg-gray-900 px-4 py-2 text-sm text-white">
          + Tambah buku
        </Link>
      </div>
      <Suspense fallback={<p className="mt-6 text-gray-500">Memuat data...</p>}>
        <PencarianBuku searchParams={searchParams} />
      </Suspense>
    </div>
  );
}