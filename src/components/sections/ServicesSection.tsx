import { ArrowRight } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { serviceOfferings } from '../../data/portfolio';
import { EASE_OUT_QUART } from '../../lib/motion-easing';
import { PrimaryCTA } from '../PrimaryCTA';
import { Reveal } from '../motion/Reveal';

export function ServicesSection() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, margin: '0px 0px -12% 0px' });

  const svcList = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const svcItem = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.48, ease: EASE_OUT_QUART },
    },
  };

  return (
    <section className="border-t border-black/5">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <Reveal className="p-6 md:p-12 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-black/5">
          <div>
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-8">
              Translate your vision into timeless imagery
            </h2>
            <p className="text-sm text-black/60 leading-relaxed mb-12">
              Our mission is to translate your vision into timeless imagery. We offer a range of professional photography
              services, each tailored to tell your unique story.
            </p>
          </div>
          <div>
            <PrimaryCTA className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest border border-black/20 px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300 w-fit">
              Book Session <ArrowRight className="w-4 h-4" />
            </PrimaryCTA>
          </div>
        </Reveal>

        <Reveal className="col-span-1 sm:col-span-2 border-b sm:border-b-0 sm:border-r border-black/5 p-6" delay={0.08}>
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
            className="w-full h-full object-cover aspect-square sm:aspect-[3/4]"
            alt="Services"
          />
        </Reveal>

        <div className="p-6">
          <Reveal className="mb-12">
            <h3 className="text-xs font-medium uppercase tracking-widest">Our Services</h3>
          </Reveal>

          <motion.div
            ref={listRef}
            className="flex flex-col gap-12"
            variants={svcList}
            initial="hidden"
            animate={reduce || listInView ? 'visible' : 'hidden'}
          >
            {serviceOfferings.map((svc) => (
              <motion.div key={svc.title} variants={svcItem} className="flex flex-col gap-3">
                <h4 className="text-xl font-medium">{svc.title}</h4>
                <p className="text-sm text-black/60 leading-relaxed">{svc.desc}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider px-3 py-1 border border-black/10 rounded-full text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
