import { ArrowRight } from 'lucide-react';
import { serviceOfferings } from '../../data/portfolio';

export function ServicesSection() {
  return (
    <section className="border-t border-black/5">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="p-6 md:p-12 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-black/5">
          <div>
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-8">
              Translate your vision into timeless imagery
            </h2>
            <p className="text-sm text-black/60 leading-relaxed mb-12">
              Our mission is to translate your vision into timeless imagery. We offer a range of professional photography
              services, each tailored to tell your unique story.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest border border-black/20 px-6 py-3 hover:bg-black hover:text-white transition-all duration-300 w-fit"
            >
              Book Session <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 border-b sm:border-b-0 sm:border-r border-black/5 p-6">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
            className="w-full h-full object-cover aspect-square sm:aspect-[3/4]"
            alt="Services"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xs font-medium uppercase tracking-widest mb-12">Our Services</h3>

          <div className="flex flex-col gap-12">
            {serviceOfferings.map((svc) => (
              <div key={svc.title} className="flex flex-col gap-3">
                <h4 className="text-xl font-medium">{svc.title}</h4>
                <p className="text-sm text-black/60 leading-relaxed">{svc.desc}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider px-3 py-1 border border-black/10 rounded-full text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
