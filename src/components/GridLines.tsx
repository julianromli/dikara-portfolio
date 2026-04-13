type GridLinesProps = {
  variant?: 'light' | 'dark';
};

export function GridLines({ variant = 'light' }: GridLinesProps) {
  const lineClass =
    variant === 'dark'
      ? 'divide-footer-line border-x border-footer-line'
      : 'divide-line border-x border-line';

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
