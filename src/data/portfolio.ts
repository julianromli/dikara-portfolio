import type { HeroPortrait, ServiceOffering, SelectedImage, StoryPillar } from '../types/portfolio';

export const FEATURED_PROJECT_IMAGE: SelectedImage = {
  img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop',
  title: 'Emporio Armani',
  cat: 'Featured Project',
  desc: 'Featured campaign highlight.',
};

export const heroPortraits: HeroPortrait[] = [
  {
    img: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=800&auto=format&fit=crop',
    alt: 'Portrait 1',
    hoverImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
  {
    img: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=800&auto=format&fit=crop',
    alt: 'Portrait 2',
    hoverImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  },
  {
    img: 'https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=800&auto=format&fit=crop',
    alt: 'Portrait 3',
    hoverImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
  },
];

export const storyPillars: StoryPillar[] = [
  { num: '01', title: 'Natural-first lighting', desc: 'True-to-life skin tones and detail without harsh edits.' },
  { num: '02', title: 'Editorial direction', desc: 'Clear posing, clean compositions, premium retouching.' },
  { num: '03', title: 'Seamless experience', desc: 'Guided prep, styled sets, and next-day previews.' },
  { num: '04', title: 'For people & products', desc: 'Portraits, e-comm, lifestyle, and campaigns.' },
];

export const serviceOfferings: ServiceOffering[] = [
  {
    title: 'Portrait Mini',
    desc: 'Best for LinkedIn, bios, quick refreshes.',
    tags: ['45 min', '1 look', '8 retouched images'],
  },
  {
    title: 'Lifestyle Story',
    desc: 'Great for creators, couples, and personal branding.',
    tags: ['2 hrs', '2-3 looks', '20 retouched images'],
  },
  {
    title: 'Brand / Product Day',
    desc: 'Art direction, lighting kit, tethered capture.',
    tags: ['Half/Full day', 'Shot list', 'Team on set'],
  },
];

export const studioGridItems: SelectedImage[] = [
  { img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', title: 'NIKE', cat: 'Product Photography', desc: 'Product Photography' },
  { img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop', title: 'XIAOMI REDMI', cat: 'Commercial Photography', desc: 'Commercial Photography' },
  { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', title: 'JUSTIN KALCER', cat: 'Portrait Photography', desc: 'Portrait Photography' },
  { img: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=800&auto=format&fit=crop', title: 'SARAH WILLIAM', cat: 'Commercial Photography', desc: 'Commercial Photography' },
  { img: 'https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=800&auto=format&fit=crop', title: 'NOVA LUX COSMETICS', cat: 'Brand Photography', desc: 'Brand Photography' },
  { img: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop', title: 'ASTROLAB R&D', cat: 'Futuristic Photography', desc: 'Futuristic Photography' },
];
