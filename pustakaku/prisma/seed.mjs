import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  { judul: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Novel", tahun: 2005, stokTotal: 5, stokTersedia: 3, deskripsi: "Kisah sepuluh anak di Belitung yang berjuang mengejar pendidikan." },
  { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", kategori: "Novel", tahun: 1980, stokTotal: 2, stokTersedia: 0, deskripsi: "Roman sejarah tentang Minke di masa kolonial." },
  { judul: "Fisika Dasar", penulis: "Halliday", kategori: "Sains", tahun: 2010, stokTotal: 2, stokTersedia: 2, deskripsi: "Buku teks fisika dasar untuk SMA." },
  { judul: "Sapiens", penulis: "Yuval Noah Harari", kategori: "Sejarah", tahun: 2011, stokTotal: 4, stokTersedia: 1, deskripsi: "Sejarah singkat umat manusia." },
  { judul: "Clean Code", penulis: "Robert C. Martin", kategori: "Teknologi", tahun: 2008, stokTotal: 3, stokTersedia: 3, deskripsi: "Panduan menulis kode yang bersih." },
  { judul: "Dilan 1990", penulis: "Pidi Baiq", kategori: "Novel", tahun: 2014, stokTotal: 6, stokTersedia: 0, deskripsi: "Kisah cinta remaja SMA di Bandung." },
  { judul: "Habibie & Ainun", penulis: "B.J. Habibie", kategori: "Biografi", tahun: 2010, stokTotal: 3, stokTersedia: 2, deskripsi: null },
];

async function main() {
  // Hanya isi kalau tabel masih kosong, jadi aman dijalankan berulang kali
  if ((await prisma.buku.count()) > 0) {
    console.log("Seed dilewati: data sudah ada.");
    return;
  }
  await prisma.buku.createMany({ data });
  console.log(`Seed selesai: ${data.length} buku ditambahkan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());