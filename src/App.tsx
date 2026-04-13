import React, { useState } from 'react';
import { ArrowRight, Menu, Facebook, Twitter, Instagram, Linkedin, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NavItem = ({ title, items, align = 'left' }: { title: string, items?: string[], align?: 'left' | 'right' | 'center' }) => {
  if (!items) return <span className="cursor-pointer hover:text-black/60 transition-colors flex items-center h-full">{title}</span>;
  
  const alignClass = align === 'right' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';
  
  return (
    <div className="relative group cursor-pointer h-full flex items-center">
      <span className="flex items-center gap-1 hover:text-black/60 transition-colors">
        {title} <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
      </span>
      <div className={`absolute top-full ${alignClass} opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50`}>
        <div className="bg-white border border-black/10 shadow-xl min-w-[200px] py-2 flex flex-col">
          {items.map((item, idx) => (
            <a key={idx} href="#" className="px-4 py-3 hover:bg-[#f4f4f0] transition-colors text-black/70 hover:text-black whitespace-nowrap text-left">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const GridLines = () => (
  <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
    <div className="w-full max-w-[1400px] grid grid-cols-4 h-full divide-x divide-black/5 border-x border-black/5">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default function App() {
  const [selectedImage, setSelectedImage] = useState<{img: string, title: string, cat: string} | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-[#f4f4f0] text-[#1a1a1a] font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <div className="relative w-full max-w-[1400px] mx-auto">
        <GridLines />
        
        <div className="relative z-10">
          {/* Header */}
          <header className="grid grid-cols-4 border-b border-black/5 h-20 text-[10px] sm:text-xs font-medium uppercase tracking-widest">
            <div className="px-4 sm:px-6 flex items-center gap-3 h-full">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
              </div>
              <span className="text-base sm:text-lg font-semibold lowercase tracking-normal">dikara</span>
            </div>
            <div className="px-4 sm:px-6 flex justify-between items-center hidden sm:flex h-full">
              <NavItem title="Home" />
              <NavItem title="Our Story" items={['Team', 'Philosophy', 'Careers', 'Press']} />
            </div>
            <div className="px-4 sm:px-6 flex items-center justify-center hidden sm:flex h-full">
              <NavItem title="Services" items={['Portrait Mini', 'Lifestyle Story', 'Brand / Product Day', 'Wedding Packages']} align="center" />
            </div>
            <div className="px-4 sm:px-6 flex justify-end sm:justify-between items-center col-span-3 sm:col-span-1 h-full">
              <div className="hidden sm:block h-full">
                <NavItem title="Photography" items={['Portfolio', 'Client Galleries', 'Print Shop', 'Exhibitions']} align="right" />
              </div>
              <Menu className="w-5 h-5 cursor-pointer" />
            </div>
          </header>

          {/* Hero */}
          <section className="pt-16 pb-24">
            <h1 className="text-[14vw] leading-[0.85] font-medium tracking-tighter text-center mb-16 px-4">
              dikara studio
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-black/5">
              <div className="p-6 text-sm leading-relaxed border-b sm:border-b-0 sm:border-r border-black/5">
                Capturing Life's Most<br/>Beautiful Chapters
              </div>
              <div className="p-6 text-sm leading-relaxed border-b sm:border-b-0 sm:border-r border-black/5">
                <span className="font-medium">#photography_studio</span><br/>
                <span className="text-black/60">Storytelling through cinematic photography for weddings, portraits, and brands.</span>
              </div>
              <div className="hidden sm:block p-6 border-r border-black/5"></div>
              <div className="p-6 flex justify-start sm:justify-end items-start">
                <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest border border-black/20 px-6 py-3 hover:bg-black hover:text-white transition-all duration-300">
                  Book Session <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 mt-8">
              <div className="aspect-[3/4] relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=800&auto=format&fit=crop" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" alt="Portrait 1" />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h2 className="text-4xl font-bold text-white">ordi</h2>
                </div>
              </div>
              <div className="aspect-[3/4] relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1554062402-999332219460?q=80&w=800&auto=format&fit=crop" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" alt="Portrait 2" />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h2 className="text-4xl font-bold text-white">bord</h2>
                </div>
              </div>
              <div className="aspect-[3/4] relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=800&auto=format&fit=crop" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" alt="Portrait 3" />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h2 className="text-4xl font-bold text-white">nnes</h2>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story */}
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
                <img src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=400&auto=format&fit=crop" className="w-32 h-32 object-cover grayscale" alt="Team" />
              </div>
              <div className="col-span-1 sm:col-span-2 p-6 flex flex-col">
                {[
                  { num: '01', title: 'Natural-first lighting', desc: 'True-to-life skin tones and detail without harsh edits.' },
                  { num: '02', title: 'Editorial direction', desc: 'Clear posing, clean compositions, premium retouching.' },
                  { num: '03', title: 'Seamless experience', desc: 'Guided prep, styled sets, and next-day previews.' },
                  { num: '04', title: 'For people & products', desc: 'Portraits, e-comm, lifestyle, and campaigns.' },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 border-b border-black/5 py-6 first:pt-0 last:border-0 last:pb-0">
                    <div className="flex gap-6 font-medium">
                      <span className="text-black/40">{item.num}</span>
                      <span>{item.title}</span>
                    </div>
                    <div className="text-sm text-black/60 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="border-t border-black/5">
            <div className="grid grid-cols-1 sm:grid-cols-4">
              <div className="p-6 md:p-12 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-black/5">
                <div>
                  <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-8">
                    Translate your vision into timeless imagery
                  </h2>
                  <p className="text-sm text-black/60 leading-relaxed mb-12">
                    Our mission is to translate your vision into timeless imagery. We offer a range of professional photography services, each tailored to tell your unique story.
                  </p>
                </div>
                <div>
                  <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest border border-black/20 px-6 py-3 hover:bg-black hover:text-white transition-all duration-300 w-fit">
                    Book Session <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="col-span-1 sm:col-span-2 border-b sm:border-b-0 sm:border-r border-black/5 p-6">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover aspect-square sm:aspect-[3/4]" alt="Services" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xs font-medium uppercase tracking-widest mb-12">Our Services</h3>
                
                <div className="flex flex-col gap-12">
                  {[
                    { title: 'Portrait Mini', desc: 'Best for LinkedIn, bios, quick refreshes.', tags: ['45 min', '1 look', '8 retouched images'] },
                    { title: 'Lifestyle Story', desc: 'Great for creators, couples, and personal branding.', tags: ['2 hrs', '2-3 looks', '20 retouched images'] },
                    { title: 'Brand / Product Day', desc: 'Art direction, lighting kit, tethered capture.', tags: ['Half/Full day', 'Shot list', 'Team on set'] },
                  ].map((svc, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <h4 className="text-xl font-medium">{svc.title}</h4>
                      <p className="text-sm text-black/60 leading-relaxed">{svc.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {svc.tags.map((tag, j) => (
                          <span key={j} className="text-[10px] uppercase tracking-wider px-3 py-1 border border-black/10 rounded-full text-black/70">
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

          {/* See Our Work */}
          <section className="border-t border-black/5 pt-24">
            <div className="text-center mb-16 px-4">
              <h3 className="text-xs font-medium uppercase tracking-widest mb-6 text-black/60">See Our Work</h3>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">A glimpse of our craft.</h2>
            </div>
            
            <div className="px-4 sm:px-6 mb-12">
              <div 
                className="w-full aspect-[16/9] sm:aspect-[21/9] relative overflow-hidden bg-[#5eead4] cursor-pointer group"
                onClick={() => setSelectedImage({ img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop', title: 'Emporio Armani', cat: 'Featured Project' })}
              >
                <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Featured" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-[15vw] sm:text-[12vw] font-black italic text-white leading-none text-center transform -rotate-3 drop-shadow-lg">
                    DIKARA<br/>STUDIO
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
                  Shot a figure walks with quiet confidence. The oversized sweatshirt, the cool reflection of the sunglasses, the effortless stance — nothing feels staged, everything feels real. This is not just a portrait, it's a statement.
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

          {/* Studio Grid */}
          <section className="border-t border-black/5">
            <div className="flex justify-between items-center p-6 border-b border-black/5">
              <h3 className="text-sm font-medium">Studio</h3>
              <a href="#" className="text-xs font-medium uppercase tracking-widest border-b border-black pb-1 hover:text-black/50 transition-colors">
                See All Works (32)
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
              {[
                { img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', title: 'NIKE', cat: 'Product Photography' },
                { img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop', title: 'XIAOMI REDMI', cat: 'Commercial Photography' },
                { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', title: 'JUSTIN KALCER', cat: 'Portrait Photography' },
                { img: 'https://images.unsplash.com/photo-1554062402-999332219460?q=80&w=800&auto=format&fit=crop', title: 'SARAH WILLIAM', cat: 'Commercial Photography' },
                { img: 'https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=800&auto=format&fit=crop', title: 'NOVA LUX COSMETICS', cat: 'Brand Photography' },
                { img: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop', title: 'ASTROLAB R&D', cat: 'Futuristic Photography' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 group cursor-pointer" onClick={() => setSelectedImage(item)}>
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium uppercase tracking-wider mb-1">{item.title}</h4>
                    <p className="text-xs text-black/50">{item.cat}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#111] text-white pt-24 pb-12 relative z-10">
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
          <div className="w-full max-w-[1400px] grid grid-cols-4 h-full divide-x divide-white/10 border-x border-white/10">
            <div></div><div></div><div></div><div></div>
          </div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 mb-24 px-6 gap-12 md:gap-0">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1]">
                Be photogenic<br/>on any camera
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
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <Twitter className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <Linkedin className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 p-6 border-b md:border-b-0 md:border-r border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="flex flex-col gap-12">
                  <div>
                    <h4 className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-4">Address</h4>
                    <p className="text-sm leading-relaxed">2457 Maplewood Ave,<br/>Sunnyvale, California 94086</p>
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
              <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop" className="w-full aspect-square md:aspect-[3/4] object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" alt="Footer" />
            </div>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-6xl w-full max-h-full flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.img} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[75vh] object-contain shadow-2xl" 
              />
              <div className="mt-8 text-center text-white">
                <h3 className="text-2xl sm:text-3xl font-medium tracking-wider uppercase mb-3">{selectedImage.title}</h3>
                <p className="text-sm text-white/60 uppercase tracking-widest">{selectedImage.cat}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
