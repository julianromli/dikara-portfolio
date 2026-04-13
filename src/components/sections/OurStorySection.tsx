import { storyPillars } from '../../data/portfolio';

export function OurStorySection() {
  return (
    <section className="border-t border-black/5">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-black/5">
          <h3 className="text-xs font-medium uppercase tracking-widest">Our Story</h3>
        </div>
        <div className="col-span-1 sm:col-span-3 p-6 md:p-16 lg:p-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
            We believe photography is more than just pictures — it's about freezing emotions, energy, and atmosphere.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-black/5">
        <div className="hidden sm:block p-6 border-r border-black/5"></div>
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-black/5 flex flex-col gap-8">
          <p className="text-sm text-black/70 leading-relaxed">
            Our team of passionate photographers ensures every shot tells your story.
          </p>
          <img
            src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=400&auto=format&fit=crop"
            className="w-32 h-32 object-cover grayscale"
            alt="Team"
          />
        </div>
        <div className="col-span-1 sm:col-span-2 p-6 flex flex-col">
          {storyPillars.map((item) => (
            <div
              key={item.num}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 border-b border-black/5 py-6 first:pt-0 last:border-0 last:pb-0"
            >
              <div className="flex gap-6 font-medium">
                <span className="text-black/40">{item.num}</span>
                <span>{item.title}</span>
              </div>
              <div className="text-sm text-black/60 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
