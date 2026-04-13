import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { storyPillars } from '../../data/portfolio';
import { EASE_OUT_QUART } from '../../lib/motion-easing';
import { Reveal } from '../motion/Reveal';

export function OurStorySection() {
  const reduce = useReducedMotion();
  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '0px 0px -15% 0px' });

  const pillarList = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.06,
      },
    },
  };

  const pillarItem = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.45, ease: EASE_OUT_QUART },
    },
  };

  return (
    <section className="border-t border-line">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <Reveal className="p-6 border-b sm:border-b-0 sm:border-r border-line">
          <h3 className="text-xs font-medium uppercase tracking-widest">Our Story</h3>
        </Reveal>
        <Reveal className="col-span-1 sm:col-span-3 p-6 md:p-16 lg:p-24" delay={0.06}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
            We believe photography is more than just pictures — it&apos;s about freezing emotions, energy, and atmosphere.
          </h2>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-line">
        <div className="max-sm:hidden sm:block p-6 border-r border-line" />
        <Reveal className="p-6 border-b sm:border-b-0 sm:border-r border-line flex flex-col gap-8">
          <p className="text-sm text-subdued leading-relaxed">
            Our team of passionate photographers ensures every shot tells your story.
          </p>
          <img
            src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=400&auto=format&fit=crop"
            className="w-32 h-32 object-cover grayscale"
            alt="Team"
          />
        </Reveal>
        <motion.div
          ref={pillarsRef}
          className="col-span-1 sm:col-span-2 p-6 flex flex-col"
          variants={pillarList}
          initial="hidden"
          animate={reduce || pillarsInView ? 'visible' : 'hidden'}
        >
          {storyPillars.map((item) => (
            <motion.div
              key={item.num}
              variants={pillarItem}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 border-b border-line py-6 first:pt-0 last:border-0 last:pb-0"
            >
              <div className="flex gap-6 font-medium">
                <span className="text-faint">{item.num}</span>
                <span>{item.title}</span>
              </div>
              <div className="text-sm text-muted leading-relaxed">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
