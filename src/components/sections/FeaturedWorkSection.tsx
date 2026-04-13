import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { SelectedImage } from '../../types/portfolio';
import { FEATURED_PROJECT_IMAGE } from '../../data/portfolio';
import { EASE_OUT_QUART } from '../../lib/motion-easing';
import { Reveal } from '../motion/Reveal';

type FeaturedWorkSectionProps = {
  onSelectImage: (item: SelectedImage) => void;
};

export function FeaturedWorkSection({ onSelectImage }: FeaturedWorkSectionProps) {
  const reduce = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const stripInView = useInView(stripRef, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <section className="border-t border-black/5 pt-24">
      <div className="text-center mb-16 px-4">
        <Reveal>
          <h3 className="text-xs font-medium uppercase tracking-widest mb-6 text-black/60">See Our Work</h3>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">A glimpse of our craft.</h2>
        </Reveal>
      </div>

      <div className="px-4 sm:px-6 mb-12">
        <motion.div
          ref={stripRef}
          className="w-full aspect-[16/9] sm:aspect-[21/9] relative overflow-hidden bg-[#5eead4] cursor-pointer group"
          onClick={() => onSelectImage(FEATURED_PROJECT_IMAGE)}
          initial={reduce ? false : { opacity: 0, scale: 0.985 }}
          animate={
            reduce || stripInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.985 }
          }
          transition={{ duration: reduce ? 0 : 0.65, ease: EASE_OUT_QUART }}
        >
          <img
            src={FEATURED_PROJECT_IMAGE.img}
            className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700"
            alt="Featured"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[15vw] sm:text-[12vw] font-black italic text-white leading-none text-center transform -rotate-3 drop-shadow-lg">
              DIKARA
              <br />
              STUDIO
            </h1>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-black/5">
        <Reveal className="p-6 border-b sm:border-b-0 sm:border-r border-black/5">
          <h3 className="text-xs font-medium uppercase tracking-widest">Featured Project</h3>
        </Reveal>
        <Reveal className="col-span-1 sm:col-span-3 p-6 md:p-12" delay={0.06}>
          <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-black/80 font-medium">
            Shot a figure walks with quiet confidence. The oversized sweatshirt, the cool reflection of the sunglasses,
            the effortless stance — nothing feels staged, everything feels real. This is not just a portrait,
            it&apos;s a statement.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-black/5 text-sm">
        <Reveal className="p-6 flex flex-col gap-2 border-r border-b sm:border-b-0 border-black/5">
          <span className="text-black/50 uppercase tracking-widest text-[10px] font-medium">Client</span>
          <span className="font-medium">Emporio Armani</span>
        </Reveal>
        <Reveal className="p-6 flex flex-col gap-2 border-b sm:border-b-0 sm:border-r border-black/5" delay={0.04}>
          <span className="text-black/50 uppercase tracking-widest text-[10px] font-medium">Date</span>
          <span className="font-medium">August, 10 2025</span>
        </Reveal>
        <div className="max-sm:hidden sm:block p-6 border-r border-black/5" />
        <Reveal className="p-6 flex flex-col gap-2 col-span-2 sm:col-span-1" delay={0.08}>
          <span className="text-black/50 uppercase tracking-widest text-[10px] font-medium">Photographer</span>
          <span className="font-medium">Justin Wilson</span>
        </Reveal>
      </div>
    </section>
  );
}
