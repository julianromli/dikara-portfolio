import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { GridLines } from './GridLines';

export function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-24 pb-12 relative z-10">
      <GridLines variant="dark" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 mb-24 px-6 gap-12 md:gap-0">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1]">
              Be photogenic
              <br />
              on any camera
            </h2>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-end justify-start md:justify-end">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
              Book Session
            </h2>
          </div>
        </div>

        <div className="border-t border-white/20 py-6 px-6 flex flex-col md:flex-row justify-between items-center text-xs font-medium uppercase tracking-widest gap-8 md:gap-0 relative">
          <div className="flex gap-8 md:gap-12 w-full md:w-auto justify-center md:justify-start">
            <span className="cursor-pointer hover:text-white/70 transition-colors">Home</span>
            <span className="cursor-pointer hover:text-white/70 transition-colors">Our Story</span>
          </div>
          <div className="flex items-center gap-3 md:absolute md:left-1/2 md:-translate-x-1/2">
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-lg font-semibold lowercase tracking-normal">dikara</span>
          </div>
          <div className="flex gap-8 md:gap-12 w-full md:w-auto justify-center md:justify-end">
            <span className="cursor-pointer hover:text-white/70 transition-colors">Services</span>
            <span className="cursor-pointer hover:text-white/70 transition-colors">Photography</span>
          </div>
        </div>

        <div className="border-t border-white/20 grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 flex flex-col justify-between min-h-[250px] border-b md:border-b-0 md:border-r border-white/10">
            <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-xs">
              Storytelling through cinematic photography for weddings, portraits, and brands.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer [&>svg]:size-4">
                <FaFacebook />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer [&>svg]:size-4">
                <FaXTwitter />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer [&>svg]:size-4">
                <FaInstagram />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer [&>svg]:size-4">
                <FaLinkedin />
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 p-6 border-b md:border-b-0 md:border-r border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="flex flex-col gap-12">
                <div>
                  <h4 className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-4">Address</h4>
                  <p className="text-sm leading-relaxed">
                    2457 Maplewood Ave,
                    <br />
                    Sunnyvale, California 94086
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-4">Phone</h4>
                  <p className="text-sm">(555) 123-4567</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-4">Email</h4>
                  <p className="text-sm">hello@dikara.studio</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <img
              src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop"
              className="w-full aspect-square md:aspect-[3/4] object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              alt="Footer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
