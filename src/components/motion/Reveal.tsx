import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { EASE_OUT_QUART, transitionReveal } from '../../lib/motion-easing';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const reduce = useReducedMotion();

  const shown = reduce || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        ...transitionReveal(reduce, 0.55),
        delay: reduce ? 0 : delay,
        ease: EASE_OUT_QUART,
      }}
    >
      {children}
    </motion.div>
  );
}
