/** ease-out-quart — natural deceleration (matches animate skill) */
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

export const transitionFast = {
  duration: 0.15,
  ease: EASE_OUT_QUART,
} as const;

export const transitionReveal = (reduced: boolean, duration = 0.55) => ({
  duration: reduced ? 0 : duration,
  ease: EASE_OUT_QUART,
});
