<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# dikara portfolio

Landing portfolio studio **dikara** dengan halaman publik dan panel **admin** untuk mengelola proyek. Frontend memakai **React 19**, **Vite**, dan **Tailwind CSS**; backend lokal **Hono** + **tRPC**, database **SQLite** lewat **Drizzle ORM**, serta **UploadThing** untuk unggah gambar di admin.

Acuan visual dan pola UI ada di [`design.md`](design.md).

## Prasyarat

- **Node.js** 20+ (LTS disarankan)
- **npm**

## Setup & menjalankan lokal

1. **Install dependency**

   ```bash
   npm install
   ```

2. **Environment** — buat berkas `.env` dari [`.env.example`](.env.example) (salin/duplikat), lalu sesuaikan isinya.

   - **`PORT`** — port API (default `3001`). Vite mem-proxy `/trpc` dan `/api` ke sini.
   - **`APP_URL`** — opsional; URL publik deploy (berguna untuk link self-reference atau integrasi tertentu).
   - **`UPLOADTHING_TOKEN`** — diperlukan jika memakai unggah file di `/admin` (lihat [UploadThing](https://uploadthing.com/dashboard)). Tanpa token, halaman lain tetap bisa dibuka.
   - **`SQLITE_PATH`** — opsional; default file DB di `data/app.db`.
   - **`VITE_TRPC_URL`** — biasanya tidak perlu di dev (default `/trpc` lewat proxy). Set jika frontend dan API dipisah di produksi (lihat bagian Produksi).

3. **Migrasi database** — buat folder `data/` (jika belum ada) dan terapkan skema SQLite:

   ```bash
   npm run db:migrate
   ```

   Wajib sebelum memakai **`/admin`** dan agar endpoint tRPC proyek berjalan normal. Tanpa migrasi, bagian studio di beranda bisa masih memakai data statis, tetapi query API dapat gagal.

4. **Seed (opsional)** — jika tabel `projects` masih kosong, isi dari data statis di kode:

   ```bash
   npm run db:seed
   ```

   Jika sudah ada baris di tabel, skrip akan dilewati.

5. **Mode pengembangan** — menjalankan **dua proses** sekaligus (Vite + server API):

   ```bash
   npm run dev
   ```

   - **Frontend:** [http://127.0.0.1:5173](http://127.0.0.1:5173) — rute `/` (beranda), `/admin` (panel).
   - **API:** [http://127.0.0.1:3001](http://127.0.0.1:3001) (atau nilai `PORT`) — `GET /health`, `POST/GET /trpc`, serta `/api/uploadthing` untuk UploadThing.

## Skrip npm

| Skrip | Keterangan |
|--------|------------|
| `npm run dev` | Vite (port 5173) + API watcher (`server/index.ts`) |
| `npm run dev:vite` / `npm run dev:server` | Hanya frontend atau hanya API (jarang dipakai) |
| `npm run build` | Build produksi ke `dist/` |
| `npm run preview` | Preview build statis |
| `npm run lint` | `tsc --noEmit` |
| `npm run db:generate` | Generate migrasi Drizzle dari `db/schema.ts` |
| `npm run db:migrate` | Terapkan migrasi ke SQLite |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:seed` | Seed tabel `projects` (jika kosong) |
| `npm run clean` | Hapus folder `dist/` |
| `npm run clean:cache` | Bersihkan cache Vite |

## Struktur folder (ringkas)

| Path | Isi |
|------|-----|
| `src/` | Aplikasi React (halaman, komponen, klien tRPC, gaya) |
| `server/` | Aplikasi Hono, router tRPC, integrasi UploadThing |
| `db/` | Skema Drizzle dan inisialisasi SQLite |
| `drizzle/` | File migrasi SQL |
| `scripts/` | Skrip CLI (mis. `seed.ts`) |

## Produksi

1. Build frontend: `npm run build` (output di `dist/`).
2. Jalankan API (Node) yang sama seperti di dev, dan host file statis dari `dist/` dengan server atau CDN pilihanmu.
3. Jika origin frontend **bukan** proxy ke API yang sama, set **`VITE_TRPC_URL`** ke URL absolut endpoint tRPC (mis. `https://api.example.com/trpc`) saat build. Lihat komentar di [`.env.example`](.env.example).

Banner di atas bisa diganti dengan screenshot atau aset hero proyek jika perlu.
