import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="py-10 text-center">
        <h1 className="mb-3 text-3xl font-bold">Selamat datang di PustakaKu</h1>
        <p className="mx-auto mb-6 max-w-lg text-gray-600">
          Aplikasi web sederhana pengganti pencatatan buku perpustakaan SMA yang
          masih manual. Cari buku, cek ketersediaan stok, dan tambahkan koleksi
          baru dengan mudah.
        </p>
        <Link
          href="/buku"
          className="inline-block rounded bg-gray-900 px-5 py-2 text-white hover:bg-black"
        >
          Lihat Daftar Buku
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded border bg-white p-4">
          <h2 className="font-semibold">Cari buku</h2>
          <p className="text-sm text-gray-600">Temukan buku lewat judul atau nama penulis.</p>
        </div>
        <div className="rounded border bg-white p-4">
          <h2 className="font-semibold">Lihat stok</h2>
          <p className="text-sm text-gray-600">Stok berwarna merah saat buku sedang habis.</p>
        </div>
        <div className="rounded border bg-white p-4">
          <h2 className="font-semibold">Tambah koleksi</h2>
          <p className="text-sm text-gray-600">Daftarkan buku baru lewat formulir sederhana.</p>
        </div>
      </section>
    </div>
  );
}