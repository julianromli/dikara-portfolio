import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { SelectedImage } from '../../types/portfolio';
import { studioGridItems } from '../../data/portfolio';
import { trpc } from '../../trpc/client';
import { EASE_OUT_QUART } from '../../lib/motion-easing';

type StudioGridSectionProps = {
  onSelectImage: (item: SelectedImage) => void;
};

export function StudioGridSection({ onSelectImage }: StudioGridSectionProps) {
  const reduce = useReducedMotion();
  const { data, isLoading, isError, refetch } = trpc.project.list.useQuery();

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '0px 0px -10% 0px' });

  const entries =
    data && data.length > 0
      ? data.map((row) => ({
          key: `project-${row.id}`,
          item: {
            img: row.imageUrl,
            title: row.title,
            cat: row.category,
            desc: row.description,
          } satisfies SelectedImage,
        }))
      : studioGridItems.map((item) => ({ key: item.img, item }));

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.04,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: EASE_OUT_QUART },
    },
  };

  return (
    <section className="border-t border-line">
      <div className="flex justify-between items-center p-6 border-b border-line">
        <h3 className="text-sm font-medium">Studio</h3>
        <a
          href="#"
          className="text-xs font-medium uppercase tracking-widest border-b border-ink pb-1 hover:text-muted-2 transition-colors"
        >
          See All Works (32)
        </a>
      </div>

      {isLoading && (
        <p className="px-6 py-4 text-xs text-muted-2">Memuat proyek dari server…</p>
      )}
      {isError && (
        <div className="px-6 py-4 flex flex-col gap-2 text-xs text-red-700">
          <span>Gagal memuat data dari API (pastikan `npm run dev` menjalankan server).</span>
          <button type="button" className="underline w-fit" onClick={() => void refetch()}>
            Coba lagi
          </button>
        </div>
      )}

      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6"
        variants={container}
        initial="hidden"
        animate={reduce || gridInView ? 'visible' : 'hidden'}
      >
        {entries.map(({ key, item }) => (
          <motion.div
            key={key}
            variants={itemVariant}
            className="group cursor-pointer"
            onClick={() => onSelectImage(item)}
          >
            <div className="aspect-square overflow-hidden bg-gray-100 relative">
              <img
                src={item.img}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={item.title}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h4 className="text-base font-semibold uppercase tracking-normal mb-1 text-white">{item.title}</h4>
                <p className="text-xs text-white/80">{item.desc || item.cat}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
