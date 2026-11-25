"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { KATEGORI } from "@/lib/kategori";

export type FormState = {
  pesan: string;
  galat?: {
    judul?: string;
    penulis?: string;
    kategori?: string;
    tahun?: string;
    stok?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    tahun: string;
    stok: string;
    deskripsi: string;
  };
};

export async function tambahBuku(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Ambil data dari form
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahunTeks = String(formData.get("tahun") ?? "").trim();
  const stokTeks = String(formData.get("stok") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const values = { judul, penulis, kategori, tahun: tahunTeks, stok: stokTeks, deskripsi };

  // 2. Validasi di server
  const galat: NonNullable<FormState["galat"]> = {};
  if (!judul) galat.judul = "Judul wajib diisi";
  if (!penulis) galat.penulis = "Penulis wajib diisi";
  if (!(KATEGORI as readonly string[]).includes(kategori)) {
    galat.kategori = "Kategori wajib dipilih";
  }

  let tahun: number | null = null;
  if (tahunTeks) {
    tahun = Number(tahunTeks);
    if (!Number.isInteger(tahun) || tahun < 1000 || tahun > new Date().getFullYear()) {
      galat.tahun = "Tahun tidak valid";
    }
  }

  const stok = Number(stokTeks);
  if (!stokTeks || !Number.isInteger(stok) || stok < 0) {
    galat.stok = "Jumlah stok wajib berupa bilangan bulat 0 atau lebih";
  }

  if (Object.keys(galat).length > 0) {
    return { pesan: "Periksa kembali isian Anda.", galat, values };
  }

  // 3. Simpan ke database. Buku baru: stok tersedia = stok total,
  //    sehingga data stok selalu konsisten.
  let baru;
  try {
    baru = await prisma.$transaction(async (tx) =>
      tx.buku.create({
        data: {
          judul,
          penulis,
          kategori,
          tahun,
          stokTotal: stok,
          stokTersedia: stok,
          deskripsi: deskripsi || null,
        },
      })
    );
  } catch {
    return { pesan: "Terjadi kesalahan di server.", values };
  }

  // 4. Segarkan daftar lalu pindah ke detail (redirect di luar try/catch)
  revalidatePath("/buku");
  redirect(`/buku/${baru.id}`);
}