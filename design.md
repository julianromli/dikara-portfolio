# Design system — dikara

Dokumen ini menjelaskan **arah visual dan pola UI** yang dipakai di portfolio dikara, selaras dengan implementasi di [`src/index.css`](src/index.css) dan halaman utama [`src/pages/HomePage.tsx`](src/pages/HomePage.tsx). Gunakan sebagai acuan konsistensi saat menambah section atau komponen baru.

## Brand & arah visual

- **Editorial & minimal**: grid kaku, tipografi besar untuk headline, banyak ruang putih (canvas warm off-white).
- **Premium & image-led**: foto sebagai hero; teks mendukung, bukan mendominasi.
- **Motion disiplin**: animasi memperjelas interaksi (hover, modal), tidak mengambil alih halaman.

## Warna

Token didefinisikan di `@theme` pada [`src/index.css`](src/index.css). Utility Tailwind v4 mengikuti nama setelah `--color-*` (mis. `--color-canvas` → `bg-canvas`, `text-canvas`).

| Peran | Nilai | Utility (token) |
|-------|-------|-----------------|
| Canvas (page) | `#f4f4f0` | `bg-canvas` |
| Teks utama | `#1a1a1a` | `text-ink` (juga default `body`) |
| Teks sekunder ~60% | rgba setara `black/60` | `text-muted` |
| Teks ~70% | setara `black/70` | `text-subdued` |
| Teks ~80% | setara `black/80` | `text-emphasis` |
| Teks ~50% | setara `black/50` | `text-muted-2` |
| Teks ~40% | setara `black/40` | `text-faint` |
| Meta / sangat redup ~35% | setara `black/35` | `text-meta` |
| Garis & grid halus | ~5% hitam | `border-line`, `divide-line` |
| Border kontrol | ~10% / ~20% | `border-border`, `border-border-strong` |
| Border chip / sedang | ~15% | `border-border-chip` |
| Border nav / tegas | ~30% | `border-border-nav` |
| Surface putih | `#ffffff` | `bg-surface` |
| Surface panel (form) | `#fafaf8` | `bg-surface-panel` |
| Footer gelap | `#111111` | `bg-footer` |
| Teks di footer (putih penuh) | `#ffffff` | `text-on-footer` |
| Teks footer redup | setara `white/60` | `text-on-footer-muted` |
| Label footer | setara `white/40` | `text-on-footer-label` |
| Garis footer | setara `white/10` | `border-footer-line` |
| Garis footer kuat / pemisah | setara `white/20` | `border-footer-line-strong` |
| Ikon sosial (border) | setara `white/20` | `border-footer-icon-border` |
| Aksen spot (featured strip) | `#5eead4` | `bg-spot` |
| Overlay lightbox | ~95% hitam | `bg-overlay` |
| Teks di atas overlay (muted) | setara `white/70` | `text-on-overlay-muted` |
| Placeholder kartu | `gray-100` (default Tailwind) | `bg-gray-100` di grid Studio |
| Gradient overlay kartu | ~40% hitam | `from-ink/40` |
| Selection | hitam + putih | `selection:bg-black selection:text-white` |

Tombol primer hitam solid (mis. submit admin) tetap memakai `bg-black text-white` di mana kontras penuh dibutuhkan.

## Tipografi

- **Font**: Inter (Google Fonts), di-register sebagai `--font-sans` di `@theme`; stack fallback: `ui-sans-serif, system-ui, sans-serif`.
- **Smoothing**: `-webkit-font-smoothing: antialiased` pada `body`.
- **Letter-spacing**: tidak diatur global untuk body; default browser/Tailwind. Utility `tracking-*` dipakai pada label caps dan judul tertentu.

Pola ukuran yang dipakai di halaman:

| Peran | Pola umum |
|-------|-----------|
| Hero nama studio | `text-[14vw]`, `leading-[0.85]`, `font-medium`, `tracking-tighter` |
| Teks besar di strip featured | `text-[15vw] sm:text-[12vw]`, `font-black italic`, `text-on-footer`, `-rotate-3` |
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
- **Garis vertikal**: [`GridLines`](src/components/GridLines.tsx) memakai `divide-x divide-line` + `border-x border-line`; varian gelap memakai `divide-footer-line` + `border-footer-line`.
- **Breakpoint** yang paling sering: `sm` (nav & grid), `md` / `lg` (padding heading & kolom footer).

## Komponen & pola UI

Implementasi utama di [`src/pages/HomePage.tsx`](src/pages/HomePage.tsx) dan komponen di `src/components/`.

- **Header**: tinggi `h-20`, border bawah `border-line`, navigasi `uppercase` + tracking lebar; logo lingkaran + titik (`border-2 border-ink`).
- **NavItem + dropdown**: trigger hover (`group`), panel `bg-surface border border-border shadow-xl min-w-[200px]`, item `hover:bg-canvas`, transisi `duration-300`; link tanpa dropdown `hover:text-muted`.
- **Link teks** (mis. “See All Works”): `border-b border-ink`, `hover:text-muted-2`.
- **Tombol primer** (“Book Session”): `border border-border-strong`, padding `px-6 py-3`, `text-xs font-medium uppercase tracking-widest`, hover `bg-black text-white`, transisi `duration-300`.
- **Chip / tag**: `text-[10px] uppercase tracking-wider`, `px-3 py-1`, `rounded-full`, `border border-border`, `text-subdued`.
- **Kartu gambar**: rasio `aspect-[3/4]`, `aspect-square`, atau `aspect-[16/9]` / `aspect-[21/9]`; `object-cover`; hover `scale-105` dengan `duration-700`; overlay gradient `bg-gradient-to-t from-ink/40`.
- **Featured strip**: teks besar `text-on-footer` di atas `bg-spot`, `font-black italic`, `drop-shadow`, rotasi ringan `-rotate-3`.
- **Footer**: `bg-footer` + teks `text-on-footer` / `text-on-footer-muted` / `text-on-footer-label`; grid 4 kolom + garis `border-footer-line` / `border-footer-line-strong`; ikon sosial `border-footer-icon-border`, hover `bg-on-footer text-ink`.
- **Modal gambar**: overlay `bg-overlay backdrop-blur-sm`; tombol tutup `text-on-overlay-muted` hover `text-on-footer`; judul `text-on-footer`, deskripsi `text-on-overlay-muted`.

## Motion

- **Library**: `motion/react` (`AnimatePresence`, `motion.div`) untuk lightbox.
- **Durasi**: UI cepat `duration-300` (nav, dropdown, tombol); gambar & overlay `duration-500`–`duration-700`; modal spring `damping: 25`, `stiffness: 300`.
- **Prinsip**: feedback hover yang jelas; zoom gambar halus; modal muncuk/ hilang tanpa mengganggu fokus.

## Ikon

- **Library**: `lucide-react` (mis. `ArrowRight`, `Menu`, `ChevronDown`, `X`, ikon sosial).
- **Ukuran umum**: `w-4 h-4` di tombol; `w-5 h-5` di header / menu; tutup modal `w-8 h-8`.

## Referensi file

| File | Isi relevan |
|------|----------------|
| [`src/index.css`](src/index.css) | `@theme` warna semantic, `--font-sans`, `body` |
| [`src/pages/HomePage.tsx`](src/pages/HomePage.tsx) | Shell layout landing |
| [`src/components/`](src/components/) | Section, header, footer, lightbox |
| [`vite.config.ts`](vite.config.ts) | Plugin `@tailwindcss/vite` |
| [`AGENTS.md`](AGENTS.md) | Konvensi proyek & quality bar UI |
