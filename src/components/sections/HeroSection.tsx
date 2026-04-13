import { ArrowRight } from 'lucide-react';
import { heroPortraits } from '../../data/portfolio';

export function HeroSection() {
  return (
    <section className="pt-16 pb-24">
      <h1 className="text-[14vw] leading-[0.85] font-medium tracking-tighter text-center mb-16 px-4">dikara studio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-black/5">
        <div className="p-6 text-sm leading-relaxed border-b sm:border-b-0 sm:border-r border-black/5">
          Capturing Life's Most
          <br />
          Beautiful Chapters
        </div>
        <div className="p-6 text-sm leading-relaxed border-b sm:border-b-0 sm:border-r border-black/5">
          <span className="font-medium">#photography_studio</span>
          <br />
          <span className="text-black/60">
            Storytelling through cinematic photography for weddings, portraits, and brands.
          </span>
        </div>
        <div className="max-sm:hidden sm:block p-6 border-r border-black/5"></div>
        <div className="p-6 flex justify-start sm:justify-end items-start">
          <button
            type="button"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest border border-black/20 px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
          >
            Book Session <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 mt-8">
        {heroPortraits.map((p) => (
          <div key={p.alt + p.overlayTitle} className="aspect-[3/4] relative overflow-hidden group">
            <img
              src={p.img}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              alt={p.alt}
            />
            <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-4xl font-bold text-white">{p.overlayTitle}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
