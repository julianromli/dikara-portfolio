type GridLinesProps = {
  variant?: 'light' | 'dark';
};

export function GridLines({ variant = 'light' }: GridLinesProps) {
  const lineClass =
    variant === 'dark'
      ? 'divide-white/10 border-x border-white/10'
      : 'divide-black/5 border-x border-black/5';

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
      <div className={`w-full max-w-[1400px] grid grid-cols-4 h-full divide-x ${lineClass}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
