# Design System — dikara

Dokumen ini mendeskripsikan sistem desain portfolio **dikara studio**: editorial minimal, **image-led**, dan motion yang disiplin. Implementasi teknis: token warna di [`src/index.css`](src/index.css) (`@theme` Tailwind v4), komponen di [`src/pages/HomePage.tsx`](src/pages/HomePage.tsx) dan [`src/components/`](src/components/).

---

## 1. Visual Theme & Atmosphere

Situs ini dibangun di atas **canvas warm off-white** (`#f4f4f0`) — bukan putih klinis, tapi permukaan netral hangat yang menyerupai kertas cetak. Teks utama memakai **near-black** (`#1a1a1a`), bukan hitam pekat, sehingga kontras tetap tegas tanpa keras seperti dokumen teknis.

**Aksen spot** memakai **teal** (`#5eead4`) pada blok featured “See Our Work”: satu momen warna solid (bukan gradien dekoratif) yang menandai karya tanpa mengalahkan fotografi.

**Footer gelap** (`#111`) membalik skema: permukaan dalam, teks putih dan hierarki opacity (`on-footer`, `on-footer-muted`, `on-footer-label`) untuk nuansa editorial dan premium.

Tipografi memakai **Inter** saja (Google Fonts) sebagai satu suara sans-serif: hierarki dari **ukuran**, **weight**, dan **tracking** — bukan banyak keluarga font. Ini selaras arah “modern, elegan, clean” di [`.impeccable.md`](.impeccable.md).

**Karakter utama:**

- Satu stack sans (**Inter**) untuk UI, headline, dan body; tidak ada trio display/serif/mono seperti situs marketing dev tools.
- Canvas hangat + ink netral; aksen teal terkontrol pada satu blok featured.
- Garis grid halus (`line`, `footer-line`) membingkai konten tanpa kartu generik di mana-mana.
- Fotografi dan grid **memimpin**; teks mendukung penemuan dan penilaian karya.

---

## 2. Color Palette & Roles

Token didefinisikan sebagai `--color-*` di `@theme`; utility Tailwind mengikuti nama token (mis. `bg-canvas`, `text-muted`).

### Primary (light shell)

| Nama | Nilai / bentuk | Utility | Peran |
|------|----------------|---------|--------|
| **Canvas** | `#f4f4f0` | `bg-canvas` | Latar halaman, hover dropdown (`hover:bg-canvas`) |
| **Ink** | `#1a1a1a` | `text-ink`, `border-ink`, `bg-ink` | Teks utama, logo titik, border logo; default `body` |
| **Surface** | `#ffffff` | `bg-surface` | Panel dropdown, kartu admin |
| **Surface panel** | `#fafaf8` | `bg-surface-panel` | Input form admin |

### Teks hierarki (foreground pada canvas)

Semua berbasis alpha di atas hitam untuk parity dengan pola lama `black/xx`:

| Nama | Perkiraan setara | Utility |
|------|------------------|---------|
| Muted | ~60% | `text-muted` |
| Subdued | ~70% | `text-subdued` |
| Emphasis | ~80% | `text-emphasis` |
| Muted-2 | ~50% | `text-muted-2` |
| Faint | ~40% | `text-faint` |
| Meta | ~35% | `text-meta` |

### Accent

| Nama | Nilai | Utility | Peran |
|------|-------|---------|--------|
| **Spot (teal)** | `#5eead4` | `bg-spot` | Strip featured besar |

### Footer (dark)

| Nama | Utility | Peran |
|------|---------|--------|
| Footer bg | `bg-footer` (`#111`) | Footer penuh lebar |
| On-footer | `text-on-footer` | Headline putih penuh |
| On-footer muted | `text-on-footer-muted` | Body sekunder |
| On-footer label | `text-on-footer-label` | Label ALL CAPS kecil |
| Garis / pemisah | `border-footer-line`, `border-footer-line-strong` | Grid, border horizontal |
| Ikon sosial | `border-footer-icon-border` | Lingkaran ikon |

### Overlay & modal

| Nama | Utility | Peran |
|------|---------|--------|
| Overlay | `bg-overlay` (~95% hitam) | Lightbox backdrop |
| Teks muted di atas gelap | `text-on-overlay-muted` | Tombol tutup, deskripsi |
| Gradient kartu | `from-ink/40` | Overlay hover pada gambar hero/grid |

### Border & garis (ringan)

| Utility | Peran |
|---------|--------|
| `border-line`, `divide-line` | Section, grid dekoratif, `GridLines` varian terang |
| `border-border` | Dropdown, chip, input (~10%) |
| `border-border-strong` | Tombol outline (~20%) |
| `border-border-chip` | Tombol sekunder admin (~15%) |
| `border-border-nav` | Link admin (~30%) |

### Semantic (luar token utama)

- **Error / hapus (admin):** tetap utilitas Tailwind (`text-red-700`, `border-red-200`, dll.) untuk aksi destruktif.
- **Selection:** `selection:bg-black selection:text-white`.

### Tombol hitam penuh

- **Submit admin**, **CTA hover** “Book Session”: `bg-black` + `text-white` di mana kontras penuh dibutuhkan (bukan token `ink`).

---

## 3. Typography Rules

### Font family

- **Sans tunggal:** `Inter` — dideklarasikan sebagai `--font-sans` di `@theme`, fallback `ui-sans-serif, system-ui, sans-serif`.
- **Loading:** [`index.html`](index.html) (preconnect + stylesheet Google Fonts); subset Latin di-preload sebagai WOFF2.
- **Rendering:** `-webkit-font-smoothing: antialiased` pada `body`.

Tidak ada font display terpisah atau monospace untuk marketing — fokus pada **satu suara** yang konsisten.

### Hierarchy (implementasi saat ini)

Ukuran memakai **skala Tailwind** + beberapa nilai **fluid** (`vw`) untuk hero. Letter-spacing tidak di-set global; **`tracking-*`** dipakai pada label caps dan judul tertentu.

| Peran | Pola class (indikatif) | Catatan |
|-------|-------------------------|---------|
| Hero nama studio | `text-[14vw]`, `leading-[0.85]`, `font-medium`, `tracking-tighter` | Fluid, tekan vertikal kuat |
| Strip featured (DIKARA STUDIO) | `text-[15vw] sm:text-[12vw]`, `font-black italic`, `text-on-footer`, `-rotate-3` | Di atas `bg-spot` |
| Judul section besar | `text-3xl` → `text-6xl` responsive, `leading-[1.1]`, `tracking-tight` | Our Story, dll. |
| Judul section medium | `text-4xl` / `text-5xl`, `font-medium` | Featured intro |
| CTA / headline footer | `text-5xl` → `text-8xl`, `font-bold`, `uppercase`, `tracking-tighter` | “Book Session” |
| Label nav & UI | `text-[10px]`–`text-xs`, `uppercase`, `tracking-widest` | Header, section label |
| Judul kartu / list | `text-xl` atau `text-sm` + `uppercase` / `tracking-wider` | Studio grid |
| Body | `text-sm`, `leading-relaxed`; quote featured `text-xl`–`text-3xl` + `text-emphasis` | |
| Logo wordmark | `lowercase`, `font-semibold`, `tracking-normal` | Berbeda dari label ALL CAPS |

### Prinsip

- **Hierarki lewat skala dan tracking**, bukan banyak weight ekstrem (banyak konten `font-medium`).
- **Tidak ada gradient text** sebagai jalan pintas emphasis (selaras `.impeccable.md`).
- **Panjang baris:** konten editorial tetap nyaman (~65–75ch implisit lewat layout grid).

---

## 4. Component Stylings

### Tombol

**Outline “Book Session” (landing)**

- Border: `border-border-strong`; padding `px-6 py-3`.
- Teks: `text-xs font-medium uppercase tracking-widest`.
- Hover: `hover:bg-black hover:text-white`, transisi `duration-300`.
- Di-wrap `motion` sebagai `PrimaryCTA` (micro scale hover/tap; hormati `prefers-reduced-motion`).

**Submit admin**

- `bg-black text-white`, `hover:bg-black/85`, `disabled:opacity-40`.
- **Batal edit:** `border-border-strong`, `hover:bg-ink/5`.

### Navigasi & dropdown

- Header: tinggi `h-20`, `border-b border-line`, label `tracking-widest`.
- **NavItem** tanpa submenu: `hover:text-muted`.
- **Dropdown:** `bg-surface border border-border shadow-xl`; item `hover:bg-canvas`, teks `text-subdued hover:text-ink`.
- **Link “See All Works”:** `border-b border-ink`, `hover:text-muted-2`.

### Chip / tag

- `text-[10px] uppercase tracking-wider`, `px-3 py-1`, `rounded-full`, `border-border`, `text-subdued`.

### Kartu gambar

- Rasio: `aspect-[3/4]`, `aspect-square`, `aspect-[16/9]`, `aspect-[21/9]` sesuai blok.
- Hover gambar: `scale-105`, `duration-700`.
- Overlay: `bg-gradient-to-t from-ink/40`; judul overlay putih (`text-white` pada foto gelap).

### Featured strip

- `bg-spot`, gambar dengan `mix-blend-overlay opacity-60`.
- Tipografi besar putih via `text-on-footer` (kontras di atas teal).

### Footer

- `bg-footer`; teks hierarki `text-on-footer` / `text-on-footer-muted` / `text-on-footer-label`.
- Ikon: lingkaran `border-footer-icon-border`, hover `bg-on-footer text-ink`.

### Form admin

- Panel: `bg-surface border-line rounded-sm shadow-sm`.
- Input: `bg-surface-panel border-border`.
- Daftar proyek: `divide-border border-border`, baris dengan gambar thumb `border-line`.

### Lightbox

- Backdrop: `bg-overlay backdrop-blur-sm`.
- Konten: `motion` spring; gambar `shadow-2xl`.
- Tombol tutup: `text-on-overlay-muted hover:text-on-footer`.

---

## 5. Layout Principles

### Lebar & grid

- **Max width konten:** `max-w-[1400px]`, `mx-auto`.
- **Motif 4 kolom:** header, label section, dan [`GridLines`](src/components/GridLines.tsx) (garis vertikal dekoratif).
- **GridLines:** `divide-x divide-line` + `border-x border-line`; varian `dark` memakai token footer untuk footer.

### Spacing

- Proyek memakai **utility Tailwind** (`p-6`, `gap-4`, `md:p-16`, dll.) — tidak ada dokumen skala 8px eksplisit di repo; secara prinsip ikuti ritme konsisten (lihat juga panduan spacing di `.impeccable` / referensi proyek).

### Whitespace

- Banyak ruang putih di canvas; **asimetri editorial** (tidak semua pusat); foto memimpin section.

### Radius

- Mayoritas **subtle** (`rounded-sm` admin); tag **pill** (`rounded-full`); logo **lingkaran** di header.

---

## 6. Depth & Elevation

| Level | Perlakuan | Pemakaian |
|-------|-----------|-----------|
| Flat | Tanpa shadow | Mayoritas halaman |
| Ring halus | `border-line` / `border-border` | Section, kartu admin |
| Dropdown | `shadow-xl` | Panel NavItem |
| Gambar lightbox | `shadow-2xl` | Foto di modal |

Tidak ada sistem shadow multi-layer seperti contoh situs marketing berat; kedalaman **tipis** dan fungsional.

---

## 7. Interaction & Motion

### Library

- **`motion/react`:** hero stagger, scroll reveal (`Reveal`), footer stagger, lightbox `AnimatePresence` + spring.

### Prinsip

- **Ease:** `cubic-bezier(0.25, 1, 0.5, 1)` (`--ease-out-quart` di `@theme`) untuk gerakan halus.
- **Durasi:** UI cepat ~300ms; gambar/modal ~500–700ms; hero headline fade tanpa `translateY` besar pada teks `vw` (menghindari jank).
- **Aksesibilitas:** `prefers-reduced-motion` — global di `index.css` memangkas transisi CSS; animasi JS memakai `useReducedMotion()` di komponen.

### Hover (UI)

- Nav, link, tombol outline: perubahan warna token / hitam seperti di section Komponen.

---

## 8. Responsive Behavior

### Breakpoints (Tailwind, yang paling dipakai)

| Nama | Perilaku khas |
|------|----------------|
| `sm` | Nav desktop, grid multi-kolom, padding horizontal section |
| `md` / `lg` | Padding heading besar, kolom footer |

### Pola

- Header: menu full di `sm+`, ikon menu di mobile (layout tetap 4 kolom di `sm+`).
- Typography hero: `text-[14vw]` menyesuaikan viewport; strip featured `text-[15vw] sm:text-[12vw]`.
- Grid studio: 1 → 2 → 3 kolom (`sm` / `md`).

---

## 9. Agent Prompt Guide

### Referensi token cepat

- **Halaman:** `bg-canvas text-ink font-sans`
- **Teks sekunder:** `text-muted`, `text-subdued`, `text-muted-2`, `text-faint`, `text-meta`
- **Garis:** `border-line`, `divide-line`; footer: `border-footer-line`
- **Tombol outline:** `border-border-strong`; hover kuat: `bg-black text-white`
- **Aksen blok:** `bg-spot`; teks di atasnya: `text-on-footer`
- **Footer:** `bg-footer`, `text-on-footer`, `text-on-footer-muted`, `text-on-footer-label`
- **Modal:** `bg-overlay`, `text-on-overlay-muted`, judul `text-on-footer`

### Contoh prompt (untuk agen / desain)

1. *“Section baru di landing: background `bg-canvas`, judul `text-3xl md:text-5xl font-medium tracking-tight`, body `text-sm text-muted leading-relaxed`, border atas `border-t border-line`.”*

2. *“Kartu proyek: gambar `aspect-square`, placeholder `bg-gray-100`, judul `text-sm font-medium uppercase tracking-wider`, meta `text-xs text-muted-2`, hover gambar `scale-105 duration-700`.”*

3. *“Tombol sekunder selaras Book Session: `border border-border-strong px-6 py-3 text-xs font-medium uppercase tracking-widest`, hover `bg-black text-white transition-colors duration-300`.”*

4. *“Footer tidak diubah skema: tetap `bg-footer` dan hierarki `text-on-footer` / `text-on-footer-muted`.”*

### Iterasi

1. **Selalu cek token** di [`src/index.css`](src/index.css) sebelum menambah hex baru.
2. **Jangan** mengandalkan gradien teks atau kartu template untuk emphasis — pakai skala tipografi, kontras, dan foto.
3. **Motion:** satu koreografi hero + reveal scroll; jangan membanjiri micro-animation.
4. **Konsistensi admin:** gunakan `bg-canvas`, `bg-surface`, `border-border`, `text-muted-2` agar selaras landing.

---

## Referensi file

| File | Isi relevan |
|------|----------------|
| [`src/index.css`](src/index.css) | `@theme` warna, `--font-sans`, `--ease-out-quart`, reduced motion |
| [`index.html`](index.html) | Preconnect & font Inter |
| [`src/pages/HomePage.tsx`](src/pages/HomePage.tsx) | Shell landing |
| [`src/components/`](src/components/) | Section, header, footer, lightbox |
| [`vite.config.ts`](vite.config.ts) | `@tailwindcss/vite` |
| [`.impeccable.md`](.impeccable.md) | Konteks brand & prinsip desain |
| [`AGENTS.md`](AGENTS.md) | Konvensi proyek |
