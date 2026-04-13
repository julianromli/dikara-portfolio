import { ChevronDown } from 'lucide-react';

type NavItemProps = {
  title: string;
  items?: string[];
  align?: 'left' | 'right' | 'center';
};

export function NavItem({ title, items, align = 'left' }: NavItemProps) {
  if (!items) {
    return (
      <span className="cursor-pointer hover:text-black/60 transition-colors flex items-center h-full">{title}</span>
    );
  }

  const alignClass =
    align === 'right' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';

  return (
    <div className="relative group cursor-pointer h-full flex items-center">
      <span className="flex items-center gap-1 hover:text-black/60 transition-colors">
        {title}{' '}
        <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
      </span>
      <div
        className={`absolute top-full ${alignClass} opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50`}
      >
        <div className="bg-white border border-black/10 shadow-xl min-w-[200px] py-2 flex flex-col">
          {items.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="px-4 py-3 hover:bg-[#f4f4f0] transition-colors text-black/70 hover:text-black whitespace-nowrap text-left"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
