# PustakaKu

Aplikasi katalog buku perpustakaan sederhana dengan Next.js App Router, TypeScript, Prisma, dan SQLite.

## Menjalankan aplikasi

Gunakan Node.js 20.9 atau lebih baru. Jalankan perintah dari folder `pustakaku`:

```bash
npm install
npm run dev
```

Pastikan file `.env` memiliki URL database berikut. Jika belum ada, buat file `.env` di folder ini:

```env
DATABASE_URL="file:./dev.db"
```

Saat server development dimulai, Prisma menyinkronkan skema ke SQLite dan mengisi data awal jika tabel buku masih kosong. Database dibuat di `prisma/dev.db`.

Buka [http://localhost:3000](http://localhost:3000).

## Fitur dan route

- `/` — halaman beranda.
- `/buku` — daftar buku, pencarian judul/penulis, dan filter kategori.
- `/buku/baru` — formulir validasi untuk menambahkan buku.
- `/buku/[id]` — detail buku berdasarkan ID.
- Route yang tidak ditemukan menampilkan halaman 404 khusus.

## Perintah pemeriksaan

```bash
npm run lint
npm run build
```
