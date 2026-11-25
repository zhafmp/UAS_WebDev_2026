"use client";

import Link from "next/link";
import { useActionState } from "react";
import { tambahBuku, type FormState } from "@/app/buku/action";
import { KATEGORI } from "@/lib/kategori";

const awal: FormState = { pesan: "" };
const input = "mt-1 w-full rounded border border-gray-300 p-2";

export default function FormBuku() {
  const [state, formAction, pending] = useActionState(tambahBuku, awal);
  const { galat, values } = state;

  return (
    <form action={formAction} className="mx-auto max-w-xl space-y-4 rounded border bg-white p-5">
      <h1 className="text-xl font-bold">Tambah buku baru</h1>

      <div>
        <label htmlFor="judul" className="block text-sm font-medium">Judul *</label>
        <input id="judul" name="judul" placeholder="Judul buku" defaultValue={values?.judul} className={input} />
        {galat?.judul && <p className="mt-1 text-sm text-red-600">{galat.judul}</p>}
      </div>

      <div>
        <label htmlFor="penulis" className="block text-sm font-medium">Penulis *</label>
        <input id="penulis" name="penulis" placeholder="Nama penulis" defaultValue={values?.penulis} className={input} />
        {galat?.penulis && <p className="mt-1 text-sm text-red-600">{galat.penulis}</p>}
      </div>

      <div>
        <label htmlFor="kategori" className="block text-sm font-medium">Kategori *</label>
        <select id="kategori" name="kategori" defaultValue={values?.kategori ?? ""} className={input}>
          <option value="" disabled>Pilih kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        {galat?.kategori && <p className="mt-1 text-sm text-red-600">{galat.kategori}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tahun" className="block text-sm font-medium">Tahun terbit</label>
          <input id="tahun" name="tahun" type="number" placeholder="2005" defaultValue={values?.tahun} className={input} />
          {galat?.tahun && <p className="mt-1 text-sm text-red-600">{galat.tahun}</p>}
        </div>
        <div>
          <label htmlFor="stok" className="block text-sm font-medium">Jumlah stok *</label>
          <input id="stok" name="stok" type="number" min={0} placeholder="5" defaultValue={values?.stok} className={input} />
          {galat?.stok && <p className="mt-1 text-sm text-red-600">{galat.stok}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium">Deskripsi</label>
        <textarea id="deskripsi" name="deskripsi" rows={3} placeholder="Deskripsi buku" defaultValue={values?.deskripsi} className={input} />
      </div>

      {state.pesan && <p className="text-red-600">{state.pesan}</p>}

      <div className="flex justify-between">
        <Link href="/buku" className="rounded border px-4 py-2 hover:bg-gray-100">
          Batal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}