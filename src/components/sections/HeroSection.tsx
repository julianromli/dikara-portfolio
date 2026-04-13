import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { heroPortraits } from '../../data/portfolio';
import { EASE_OUT_QUART } from '../../lib/motion-easing';
import { PrimaryCTA } from '../PrimaryCTA';
import { trpc } from '../../trpc/client';

export function HeroSection() {
  const reduce = useReducedMotion();
  const { data: dynamicPortraits } = trpc.hero.list.useQuery();
  
  const portraitsToRender = dynamicPortraits && dynamicPortraits.length > 0 
    ? dynamicPortraits.map(p => ({
        alt: p.alt,
        img: p.imageUrl,
        hoverImg: p.hoverImageUrl,
      }))
    : heroPortraits;

  const introRow = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.14,
      },
    },
  };

  const introCell = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.45, ease: EASE_OUT_QUART },
    },
  };

  const portraitRow = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.11,
        delayChildren: reduce ? 0 : 0.22,
      },
    },
  };

  const portraitCell = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.52, ease: EASE_OUT_QUART },
    },
  };

  return (
    <section className="pt-16 pb-24">
      <motion.h1
        className="text-[14vw] leading-[0.85] font-medium tracking-tighter text-center mb-16 px-4 [text-rendering:geometricPrecision]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.58, ease: EASE_OUT_QUART, delay: reduce ? 0 : 0.04 }}
      >
        dikara studio
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-4 border-t border-line"
        variants={introRow}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={introCell}
          className="p-6 text-sm leading-relaxed border-b sm:border-b-0 sm:border-r border-line"
        >
          Capturing Life&apos;s Most
          <br />
          Beautiful Chapters
        </motion.div>
        <motion.div
          variants={introCell}
          className="p-6 text-sm leading-relaxed border-b sm:border-b-0 sm:border-r border-line"
        >
          <span className="font-medium">#photography_studio</span>
          <br />
          <span className="text-muted">
            Storytelling through cinematic photography for weddings, portraits, and brands.
          </span>
        </motion.div>
        <motion.div variants={introCell} className="max-sm:hidden sm:block p-6 border-r border-line" />
        <motion.div
          variants={introCell}
          className="p-6 flex justify-start sm:justify-end items-start"
        >
          <PrimaryCTA className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest border border-border-strong px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300">
            Book Session <ArrowRight className="w-4 h-4" />
          </PrimaryCTA>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 mt-8"
        variants={portraitRow}
        initial="hidden"
        animate="visible"
      >
        {portraitsToRender.map((p) => (
          <motion.div
            key={p.alt}
            variants={portraitCell}
            className="aspect-[3/4] relative overflow-hidden group"
          >
            <img
              src={p.img}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              alt={p.alt}
            />
            <img
              src={p.hoverImg}
              className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              alt={`${p.alt} hover`}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
