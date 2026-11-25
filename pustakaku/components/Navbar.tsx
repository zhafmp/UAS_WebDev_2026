import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-bold">
          📚 PustakaKu
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">Beranda</Link>
          <Link href="/buku" className="hover:underline">Daftar Buku</Link>
          <Link href="/buku/baru" className="hover:underline">Tambah Buku</Link>
        </div>
      </nav>
    </header>
  );
}