import { Menu } from 'lucide-react';
import { NavItem } from './NavItem';

export function Header() {
  return (
    <header className="grid grid-cols-4 border-b border-black/5 h-20 text-[10px] sm:text-xs font-medium uppercase tracking-widest">
      <div className="px-4 sm:px-6 flex items-center gap-3 h-full">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black flex items-center justify-center">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
        </div>
        <span className="text-base sm:text-lg font-semibold lowercase tracking-normal">dikara</span>
      </div>
      <div className="h-full max-sm:hidden sm:flex sm:items-center sm:justify-between px-4 sm:px-6">
        <NavItem title="Home" />
        <NavItem title="Our Story" items={['Team', 'Philosophy', 'Careers', 'Press']} />
      </div>
      <div className="h-full max-sm:hidden sm:flex sm:items-center sm:justify-center px-4 sm:px-6">
        <NavItem
          title="Services"
          items={['Portrait Mini', 'Lifestyle Story', 'Brand / Product Day', 'Wedding Packages']}
          align="center"
        />
      </div>
      <div className="px-4 sm:px-6 flex justify-end sm:justify-between items-center col-span-3 sm:col-span-1 h-full">
        <div className="h-full max-sm:hidden sm:block">
          <NavItem
            title="Photography"
            items={['Portfolio', 'Client Galleries', 'Print Shop', 'Exhibitions']}
            align="right"
          />
        </div>
        <Menu className="w-5 h-5 cursor-pointer" />
      </div>
    </header>
  );
}
