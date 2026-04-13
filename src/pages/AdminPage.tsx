import {useState, type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import type {inferRouterOutputs} from '@trpc/server';
import {trpc} from '../trpc/client';
import {UploadButton} from '../uploadthing/components';
import type {AppRouter} from '../../server/trpc/router';

type ProjectRow = inferRouterOutputs<AppRouter>['project']['list'][number];
type HeroRow = inferRouterOutputs<AppRouter>['hero']['list'][number];

export default function AdminPage() {
  const utils = trpc.useUtils();
  const [activeTab, setActiveTab] = useState<'studio' | 'hero'>('hero');

  // --- STUDIO PROJECTS STATE ---
  const {data: projects, isLoading: projectsLoading} = trpc.project.list.useQuery();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);

  const createMutation = trpc.project.create.useMutation({
    onSuccess: () => {
      void utils.project.list.invalidate();
      resetForm();
    },
  });
  const updateMutation = trpc.project.update.useMutation({
    onSuccess: () => {
      void utils.project.list.invalidate();
      resetForm();
    },
  });
  const deleteMutation = trpc.project.delete.useMutation({
    onSuccess: () => void utils.project.list.invalidate(),
  });

  function resetForm() {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setSortOrder(0);
  }

  function startEdit(p: ProjectRow) {
    setEditingId(p.id);
    setTitle(p.title);
    setDescription(p.description);
    setImageUrl(p.imageUrl);
    setSortOrder(p.sortOrder);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    const payload = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      category: '',
      sortOrder,
    };
    if (editingId != null) {
      updateMutation.mutate({id: editingId, data: payload});
    } else {
      createMutation.mutate(payload);
    }
  }
  const busy = createMutation.isPending || updateMutation.isPending;

  // --- HERO PORTRAITS STATE ---
  const {data: heroes, isLoading: heroesLoading} = trpc.hero.list.useQuery();
  const [heroEditingId, setHeroEditingId] = useState<number | null>(null);
  const [heroAlt, setHeroAlt] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [heroHoverImageUrl, setHeroHoverImageUrl] = useState('');
  const [heroSortOrder, setHeroSortOrder] = useState(0);

  const createHeroMutation = trpc.hero.create.useMutation({
    onSuccess: () => {
      void utils.hero.list.invalidate();
      resetHeroForm();
    },
  });
  const updateHeroMutation = trpc.hero.update.useMutation({
    onSuccess: () => {
      void utils.hero.list.invalidate();
      resetHeroForm();
    },
  });
  const deleteHeroMutation = trpc.hero.delete.useMutation({
    onSuccess: () => void utils.hero.list.invalidate(),
  });

  function resetHeroForm() {
    setHeroEditingId(null);
    setHeroAlt('');
    setHeroImageUrl('');
    setHeroHoverImageUrl('');
    setHeroSortOrder(0);
  }

  function startHeroEdit(h: HeroRow) {
    setHeroEditingId(h.id);
    setHeroAlt(h.alt);
    setHeroImageUrl(h.imageUrl);
    setHeroHoverImageUrl(h.hoverImageUrl);
    setHeroSortOrder(h.sortOrder);
  }

  function handleHeroSubmit(e: FormEvent) {
    e.preventDefault();
    if (!heroImageUrl.trim() || !heroHoverImageUrl.trim()) return;
    const payload = {
      alt: heroAlt.trim(),
      imageUrl: heroImageUrl.trim(),
      hoverImageUrl: heroHoverImageUrl.trim(),
      sortOrder: heroSortOrder,
    };
    if (heroEditingId != null) {
      updateHeroMutation.mutate({id: heroEditingId, data: payload});
    } else {
      createHeroMutation.mutate(payload);
    }
  }
  const heroBusy = createHeroMutation.isPending || updateHeroMutation.isPending;

  return (
    <div className="min-h-screen bg-canvas text-ink p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-border pb-6">
          <h1 className="text-xl font-medium tracking-tight">Admin Dashboard</h1>
          <Link to="/" className="text-sm border-b border-border-nav hover:text-muted pb-0.5">
            Kembali ke situs
          </Link>
        </header>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('hero')}
            className={`text-sm font-medium uppercase tracking-widest pb-1 border-b-2 transition-colors ${
              activeTab === 'hero' ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            Hero Portraits
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`text-sm font-medium uppercase tracking-widest pb-1 border-b-2 transition-colors ${
              activeTab === 'studio' ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            Studio Projects
          </button>
        </div>

        <p className="text-xs text-muted-2 mb-6">
          Unggah gambar lewat UploadThing atau tempel URL gambar. Tanpa auth — jangan dipublikasikan ke produksi tanpa proteksi.
        </p>

        {activeTab === 'studio' && (
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 mb-12 p-6 bg-surface border border-line rounded-sm shadow-sm"
            >
              <h2 className="text-xs font-medium uppercase tracking-widest text-faint">
                {editingId != null ? 'Edit proyek' : 'Proyek baru'}
              </h2>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-2 mb-1">Judul</label>
                <input
                  className="w-full border border-border px-3 py-2 text-sm bg-surface-panel"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-2 mb-1">Deskripsi</label>
                <textarea
                  className="w-full border border-border px-3 py-2 text-sm bg-surface-panel min-h-[88px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-2 mb-1">
                  URL gambar
                </label>
                <input
                  className="w-full border border-border px-3 py-2 text-sm bg-surface-panel mb-2"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://…"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      const file = res[0] as {ufsUrl?: string; url?: string} | undefined;
                      const url = file?.ufsUrl ?? file?.url;
                      if (typeof url === 'string') setImageUrl(url);
                    }}
                    onUploadError={(err: Error) => {
                      console.error(err);
                      alert(err.message);
                    }}
                  />
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="h-14 w-14 object-cover border border-border rounded-sm"
                    />
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-2 mb-1">Urutan</label>
                <input
                  type="number"
                  className="w-32 border border-border px-3 py-2 text-sm bg-surface-panel"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={busy || !imageUrl.trim()}
                  className="text-xs font-medium uppercase tracking-widest px-4 py-2 bg-black text-white hover:bg-black/85 disabled:opacity-40"
                >
                  {editingId != null ? 'Simpan perubahan' : 'Tambah proyek'}
                </button>
                {editingId != null ? (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-medium uppercase tracking-widest px-4 py-2 border border-border-strong hover:bg-ink/5"
                  >
                    Batal edit
                  </button>
                ) : null}
              </div>
            </form>

            <section>
              <h2 className="text-xs font-medium uppercase tracking-widest text-faint mb-4">Daftar proyek</h2>
              {projectsLoading ? (
                <p className="text-sm text-muted-2">Memuat…</p>
              ) : !projects?.length ? (
                <p className="text-sm text-muted-2">Belum ada data.</p>
              ) : (
                <ul className="divide-y divide-border border border-border rounded-sm bg-surface">
                  {projects.map((p) => (
                    <li key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                      <img
                        src={p.imageUrl}
                        alt=""
                        className="w-full sm:w-20 h-20 object-cover border border-line shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{p.title}</p>
                        <p className="text-xs text-muted-2 line-clamp-2">{p.description || '—'}</p>
                        <p className="text-[10px] text-meta mt-1">sort: {p.sortOrder} · id: {p.id}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => startEdit(p)}
                          className="text-xs font-medium uppercase tracking-wider px-3 py-1.5 border border-border-chip hover:bg-ink/5"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Hapus proyek ini?')) deleteMutation.mutate({id: p.id});
                          }}
                          className="text-xs font-medium uppercase tracking-wider px-3 py-1.5 border border-red-200 text-red-800 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}

        {activeTab === 'hero' && (
          <div>
            <form
              onSubmit={handleHeroSubmit}
              className="space-y-4 mb-12 p-6 bg-surface border border-line rounded-sm shadow-sm"
            >
              <h2 className="text-xs font-medium uppercase tracking-widest text-faint">
                {heroEditingId != null ? 'Edit Hero Portrait' : 'Hero Portrait Baru'}
              </h2>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-2 mb-1">Alt Text / Nama</label>
                <input
                  className="w-full border border-border px-3 py-2 text-sm bg-surface-panel"
                  value={heroAlt}
                  onChange={(e) => setHeroAlt(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-2 mb-1">
                  URL Gambar Utama
                </label>
                <input
                  className="w-full border border-border px-3 py-2 text-sm bg-surface-panel mb-2"
                  value={heroImageUrl}
                  onChange={(e) => setHeroImageUrl(e.target.value)}
                  placeholder="https://…"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      const file = res[0] as {ufsUrl?: string; url?: string} | undefined;
                      const url = file?.ufsUrl ?? file?.url;
                      if (typeof url === 'string') setHeroImageUrl(url);
                    }}
                    onUploadError={(err: Error) => {
                      console.error(err);
                      alert(err.message);
                    }}
                  />
                  {heroImageUrl ? (
                    <img
                      src={heroImageUrl}
                      alt="Preview"
                      className="h-14 w-14 object-cover border border-border rounded-sm"
                    />
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-2 mb-1">
                  URL Gambar Hover (Kedua)
                </label>
                <input
                  className="w-full border border-border px-3 py-2 text-sm bg-surface-panel mb-2"
                  value={heroHoverImageUrl}
                  onChange={(e) => setHeroHoverImageUrl(e.target.value)}
                  placeholder="https://…"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      const file = res[0] as {ufsUrl?: string; url?: string} | undefined;
                      const url = file?.ufsUrl ?? file?.url;
                      if (typeof url === 'string') setHeroHoverImageUrl(url);
                    }}
                    onUploadError={(err: Error) => {
                      console.error(err);
                      alert(err.message);
                    }}
                  />
                  {heroHoverImageUrl ? (
                    <img
                      src={heroHoverImageUrl}
                      alt="Preview Hover"
                      className="h-14 w-14 object-cover border border-border rounded-sm"
                    />
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-2 mb-1">Urutan</label>
                <input
                  type="number"
                  className="w-32 border border-border px-3 py-2 text-sm bg-surface-panel"
                  value={heroSortOrder}
                  onChange={(e) => setHeroSortOrder(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={heroBusy || !heroImageUrl.trim() || !heroHoverImageUrl.trim()}
                  className="text-xs font-medium uppercase tracking-widest px-4 py-2 bg-black text-white hover:bg-black/85 disabled:opacity-40"
                >
                  {heroEditingId != null ? 'Simpan perubahan' : 'Tambah Portrait'}
                </button>
                {heroEditingId != null ? (
                  <button
                    type="button"
                    onClick={resetHeroForm}
                    className="text-xs font-medium uppercase tracking-widest px-4 py-2 border border-border-strong hover:bg-ink/5"
                  >
                    Batal edit
                  </button>
                ) : null}
              </div>
            </form>

            <section>
              <h2 className="text-xs font-medium uppercase tracking-widest text-faint mb-4">Daftar Hero Portraits</h2>
              {heroesLoading ? (
                <p className="text-sm text-muted-2">Memuat…</p>
              ) : !heroes?.length ? (
                <p className="text-sm text-muted-2">Belum ada data.</p>
              ) : (
                <ul className="divide-y divide-border border border-border rounded-sm bg-surface">
                  {heroes.map((h) => (
                    <li key={h.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex gap-2 shrink-0">
                        <img
                          src={h.imageUrl}
                          alt="Main"
                          className="w-full sm:w-20 h-20 object-cover border border-line shrink-0"
                          title="Main Image"
                        />
                        <img
                          src={h.hoverImageUrl}
                          alt="Hover"
                          className="w-full sm:w-20 h-20 object-cover border border-line shrink-0"
                          title="Hover Image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{h.alt}</p>
                        <p className="text-[10px] text-meta mt-1">sort: {h.sortOrder} · id: {h.id}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => startHeroEdit(h)}
                          className="text-xs font-medium uppercase tracking-wider px-3 py-1.5 border border-border-chip hover:bg-ink/5"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Hapus portrait ini?')) deleteHeroMutation.mutate({id: h.id});
                          }}
                          className="text-xs font-medium uppercase tracking-wider px-3 py-1.5 border border-red-200 text-red-800 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}