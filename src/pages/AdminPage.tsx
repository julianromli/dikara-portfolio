import {useState, type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import type {inferRouterOutputs} from '@trpc/server';
import {trpc} from '../trpc/client';
import {UploadButton} from '../uploadthing/components';
import type {AppRouter} from '../../server/trpc/router';

type ProjectRow = inferRouterOutputs<AppRouter>['project']['list'][number];

export default function AdminPage() {
  const utils = trpc.useUtils();
  const {data: projects, isLoading} = trpc.project.list.useQuery();
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

  return (
    <div className="min-h-screen bg-[#f4f4f0] text-[#1a1a1a] p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-wrap justify-between items-center gap-4 mb-10 border-b border-black/10 pb-6">
          <h1 className="text-xl font-medium tracking-tight">Kelola proyek Studio</h1>
          <Link to="/" className="text-sm border-b border-black/30 hover:text-black/60 pb-0.5">
            Kembali ke situs
          </Link>
        </header>

        <p className="text-xs text-black/50 mb-6">
          Unggah gambar lewat UploadThing atau tempel URL gambar. Tanpa auth — jangan dipublikasikan ke produksi tanpa proteksi.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-12 p-6 bg-white border border-black/5 rounded-sm shadow-sm"
        >
          <h2 className="text-xs font-medium uppercase tracking-widest text-black/40">
            {editingId != null ? 'Edit proyek' : 'Proyek baru'}
          </h2>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-black/50 mb-1">Judul</label>
            <input
              className="w-full border border-black/10 px-3 py-2 text-sm bg-[#fafaf8]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-black/50 mb-1">Deskripsi</label>
            <textarea
              className="w-full border border-black/10 px-3 py-2 text-sm bg-[#fafaf8] min-h-[88px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-black/50 mb-1">
              URL gambar
            </label>
            <input
              className="w-full border border-black/10 px-3 py-2 text-sm bg-[#fafaf8] mb-2"
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
                  className="h-14 w-14 object-cover border border-black/10 rounded-sm"
                />
              ) : null}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-black/50 mb-1">Urutan</label>
            <input
              type="number"
              className="w-32 border border-black/10 px-3 py-2 text-sm bg-[#fafaf8]"
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
                className="text-xs font-medium uppercase tracking-widest px-4 py-2 border border-black/20 hover:bg-black/5"
              >
                Batal edit
              </button>
            ) : null}
          </div>
        </form>

        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-black/40 mb-4">Daftar proyek</h2>
          {isLoading ? (
            <p className="text-sm text-black/50">Memuat…</p>
          ) : !projects?.length ? (
            <p className="text-sm text-black/50">Belum ada data.</p>
          ) : (
            <ul className="divide-y divide-black/10 border border-black/10 rounded-sm bg-white">
              {projects.map((p) => (
                <li key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="w-full sm:w-20 h-20 object-cover border border-black/5 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{p.title}</p>
                    <p className="text-xs text-black/50 line-clamp-2">{p.description || '—'}</p>
                    <p className="text-[10px] text-black/35 mt-1">sort: {p.sortOrder} · id: {p.id}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="text-xs font-medium uppercase tracking-wider px-3 py-1.5 border border-black/15 hover:bg-black/5"
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
    </div>
  );
}
