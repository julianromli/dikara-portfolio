import {useState} from 'react';
import type {SelectedImage} from '../types/portfolio';
import {GridLines} from '../components/GridLines';
import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import {ImageLightbox} from '../components/ImageLightbox';
import {HeroSection} from '../components/sections/HeroSection';
import {OurStorySection} from '../components/sections/OurStorySection';
import {ServicesSection} from '../components/sections/ServicesSection';
import {FeaturedWorkSection} from '../components/sections/FeaturedWorkSection';
import {StudioGridSection} from '../components/sections/StudioGridSection';

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-canvas text-ink font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <div className="relative w-full max-w-[1400px] mx-auto">
        <GridLines />

        <div className="relative z-10">
          <Header />
          <HeroSection />
          <OurStorySection />
          <ServicesSection />
          <FeaturedWorkSection onSelectImage={setSelectedImage} />
          <StudioGridSection onSelectImage={setSelectedImage} />
        </div>
      </div>

      <Footer />

      <ImageLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
