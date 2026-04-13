import type { SelectedImage } from '../../types/portfolio';
import { FEATURED_PROJECT_IMAGE } from '../../data/portfolio';

type FeaturedWorkSectionProps = {
  onSelectImage: (item: SelectedImage) => void;
};

export function FeaturedWorkSection({ onSelectImage }: FeaturedWorkSectionProps) {
  return (
    <section className="border-t border-black/5 pt-24">
      <div className="text-center mb-16 px-4">
        <h3 className="text-xs font-medium uppercase tracking-widest mb-6 text-black/60">See Our Work</h3>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight">A glimpse of our craft.</h2>
      </div>

      <div className="px-4 sm:px-6 mb-12">
        <div
          className="w-full aspect-[16/9] sm:aspect-[21/9] relative overflow-hidden bg-[#5eead4] cursor-pointer group"
          onClick={() => onSelectImage(FEATURED_PROJECT_IMAGE)}
        >
          <img
            src={FEATURED_PROJECT_IMAGE.img}
            className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700"
            alt="Featured"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[15vw] sm:text-[12vw] font-black italic text-white leading-none text-center transform -rotate-3 drop-shadow-lg">
              DIKARA
              <br />
              STUDIO
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-black/5">
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-black/5">
          <h3 className="text-xs font-medium uppercase tracking-widest">Featured Project</h3>
        </div>
        <div className="col-span-1 sm:col-span-3 p-6 md:p-12">
          <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-black/80 font-medium">
            Shot a figure walks with quiet confidence. The oversized sweatshirt, the cool reflection of the sunglasses,
            the effortless stance — nothing feels staged, everything feels real. This is not just a portrait,
            it's a statement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-black/5 text-sm">
        <div className="p-6 flex flex-col gap-2 border-r border-b sm:border-b-0 border-black/5">
          <span className="text-black/50 uppercase tracking-widest text-[10px] font-medium">Client</span>
          <span className="font-medium">Emporio Armani</span>
        </div>
        <div className="p-6 flex flex-col gap-2 border-b sm:border-b-0 sm:border-r border-black/5">
          <span className="text-black/50 uppercase tracking-widest text-[10px] font-medium">Date</span>
          <span className="font-medium">August, 10 2025</span>
        </div>
        <div className="hidden sm:block p-6 border-r border-black/5"></div>
        <div className="p-6 flex flex-col gap-2 col-span-2 sm:col-span-1">
          <span className="text-black/50 uppercase tracking-widest text-[10px] font-medium">Photographer</span>
          <span className="font-medium">Justin Wilson</span>
        </div>
      </div>
    </section>
  );
}
