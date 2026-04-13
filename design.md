# Design system — dikara

Dokumen ini menjelaskan **arah visual dan pola UI** yang dipakai di portfolio dikara, selaras dengan implementasi di [`src/index.css`](src/index.css) dan [`src/App.tsx`](src/App.tsx). Gunakan sebagai acuan konsistensi saat menambah section atau komponen baru.

## Brand & arah visual

- **Editorial & minimal**: grid kaku, tipografi besar untuk headline, banyak ruang putih (canvas warm off-white).
- **Premium & image-led**: foto sebagai hero; teks mendukung, bukan mendominasi.
- **Motion disiplin**: animasi memperjelas interaksi (hover, modal), tidak mengambil alih halaman.

## Warna

| Token / peran | Nilai | Catatan |
|---------------|-------|---------|
| Canvas (page) | `#f4f4f0` | Background utama; juga `bg-[#f4f4f0]` di root layout. |
| Teks utama | `#1a1a1a` | Default body di `index.css` dan `text-[#1a1a1a]` di app shell. |
| Teks sekunder | `black/60`, `black/70`, `black/80` | Deskripsi, subjudul, quote body. |
| Teks tersier / label | `black/40`, `black/50` | Nomor list, meta, kategori. |
| Garis & grid | `black/5` | Border section, `divide-x`, garis grid vertikal. |
| Border kontrol | `black/10`, `black/20` | Dropdown, tombol outline, chip/tag. |
| Surface putih | `white` | Panel dropdown, kartu hover row. |
| Footer gelap | `bg-[#111]` | Footer penuh lebar. |
| Teks di footer | `white`, `white/40`–`white/70` | Hierarki: label redup, link hover `/70`, body `/60`. |
| Pemisah footer | `white/10`, `white/20` | Grid garis & border horizontal. |
| Aksen spot (blok featured) | `#5eead4` | Background blok hero “See Our Work” (teal). |
| Placeholder kartu | `bg-gray-100` | Latar kotak gambar di grid Studio sebelum gambar dimuat penuh. |
| Overlay / modal | `black/95`, `black/40` | Lightbox; gradient gambar `from-black/40`. |
| Selection | `bg-black` + teks putih | `selection:bg-black selection:text-white` |

Tidak ada palet “brand” terpisah di `@theme`; kebanyakan warna di-inline lewat utility Tailwind. Untuk konsistensi jangka panjang, pertimbangkan memindahkan hex yang sering dipakai ke variabel di `@theme` di [`src/index.css`](src/index.css).

## Tipografi

- **Font**: Inter (Google Fonts), di-register sebagai `--font-sans` di `@theme`; stack fallback: `ui-sans-serif, system-ui, sans-serif`.
- **Smoothing**: `-webkit-font-smoothing: antialiased` pada `body`.

Pola ukuran yang dipakai di halaman:

| Peran | Pola umum |
|-------|-----------|
| Hero nama studio | `text-[14vw]`, `leading-[0.85]`, `font-medium`, `tracking-tighter` |
| Teks besar di strip featured | `text-[15vw] sm:text-[12vw]`, `font-black italic`, `text-white`, `-rotate-3` |
| Judul section besar | `text-3xl` → `text-6xl` (breakpoint), `font-medium`, `leading-[1.1]`, `tracking-tight` |
| Judul section medium | `text-4xl` / `text-5xl`, `font-medium` |
| Overlay / CTA besar footer | `text-5xl` → `text-8xl`, `font-bold`, `uppercase`, `tracking-tighter` |
| Label navigasi & UI | `text-[10px]`–`text-xs`, `font-medium`, `uppercase`, `tracking-widest` |
| Judul kartu / list | `text-xl`, `text-sm` + `uppercase` / `tracking-wider` sesuai konteks |
| Body | `text-sm`, `leading-relaxed`; quote featured `text-xl`–`text-3xl` |

Logo teks **dikara** memakai `lowercase`, `font-semibold`, tracking normal (beda dari label ALL CAPS).

## Layout & grid

- **Lebar konten**: `max-w-[1400px]`, `mx-auto`, relatif untuk overlay grid.
- **Motif 4 kolom**: `grid-cols-4` untuk header, section label/konten, dan garis vertikal dekoratif.
- **Garis vertikal**: wrapper `divide-x divide-black/5` + `border-x border-black/5` (lihat `GridLines`); footer memakai analog putih: `divide-white/10`, `border-white/10`.
- **Breakpoint** yang paling sering: `sm` (nav & grid), `md` / `lg` (padding heading & kolom footer).

## Komponen & pola UI

Implementasi saat ini berada di [`src/App.tsx`](src/App.tsx) (bukan package komponen terpisah).

- **Header**: tinggi `h-20`, border bawah `border-black/5`, navigasi `uppercase` + tracking lebar; logo lingkaran + titik (`border-2 border-black`).
- **NavItem + dropdown**: trigger hover (`group`), panel `bg-white border border-black/10 shadow-xl min-w-[200px]`, item `hover:bg-[#f4f4f0]`, transisi `duration-300`; link tanpa dropdown `hover:text-black/60`.
- **Link teks** (mis. “See All Works”): `border-b border-black`, `hover:text-black/50`.
- **Tombol primer** (“Book Session”): `border border-black/20`, padding `px-6 py-3`, `text-xs font-medium uppercase tracking-widest`, hover `bg-black text-white`, transisi `duration-300`.
- **Chip / tag**: `text-[10px] uppercase tracking-wider`, `px-3 py-1`, `rounded-full`, `border border-black/10`, `text-black/70`.
- **Kartu gambar**: rasio `aspect-[3/4]`, `aspect-square`, atau `aspect-[16/9]` / `aspect-[21/9]`; `object-cover`; hover `scale-105` dengan `duration-700`; overlay gradient `bg-gradient-to-t from-black/40`.
- **Featured strip**: teks besar putih `font-black italic`, `drop-shadow`, rotasi ringan `-rotate-3`.
- **Footer**: background `#111`, grid 4 kolom + garis; ikon sosial lingkaran `border-white/20`, hover invert ke putih.
- **Modal gambar**: overlay `fixed inset-0 z-[100]`, backdrop `bg-black/95 backdrop-blur-sm`; kartu konten spring (`motion`); tombol tutup `text-white/70` hover putih; judul putih, kategori `text-white/60` + `uppercase tracking-widest`.

## Motion

- **Library**: `motion/react` (`AnimatePresence`, `motion.div`) untuk lightbox.
- **Durasi**: UI cepat `duration-300` (nav, dropdown, tombol); gambar & overlay `duration-500`–`duration-700`; modal spring `damping: 25`, `stiffness: 300`.
- **Prinsip**: feedback hover yang jelas; zoom gambar halus; modal muncuk/ hilang tanpa mengganggu fokus.

## Ikon

- **Library**: `lucide-react` (mis. `ArrowRight`, `Menu`, `ChevronDown`, `X`, ikon sosial).
- **Ukuran umum**: `w-4 h-4` di tombol; `w-5 h-5` di header / menu; tutup modal `w-8 h-8`.

## Ekstensi ke `@theme` (opsional)

Jika warna atau radius yang sama diulang banyak kali, tambahkan token di blok `@theme` di [`src/index.css`](src/index.css) (mis. `--color-canvas`, `--color-ink`) lalu pakai di class Tailwind v4. Ini opsional dan tidak wajib untuk perilaku situs saat ini.

## Referensi file

| File | Isi relevan |
|------|----------------|
| [`src/index.css`](src/index.css) | Font Inter, `@theme --font-sans`, warna `body` |
| [`src/App.tsx`](src/App.tsx) | Seluruh pola layout, komponen inline, utility |
| [`vite.config.ts`](vite.config.ts) | Plugin `@tailwindcss/vite` |
| [`AGENTS.md`](AGENTS.md) | Konvensi proyek & quality bar UI |
