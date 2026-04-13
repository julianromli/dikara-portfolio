import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT_QUART } from '../lib/motion-easing';

type PrimaryCTAProps = {
  children: ReactNode;
  className?: string;
};

export function PrimaryCTA({ children, className }: PrimaryCTAProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      className={className}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: EASE_OUT_QUART }}
    >
      {children}
    </motion.button>
  );
}
