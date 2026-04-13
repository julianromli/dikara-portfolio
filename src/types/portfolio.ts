export type SelectedImage = {
  img: string;
  title: string;
  cat: string;
  /** Deskripsi / subtitel (dari API: description) */
  desc: string;
};

export type StoryPillar = {
  num: string;
  title: string;
  desc: string;
};

export type ServiceOffering = {
  title: string;
  desc: string;
  tags: string[];
};

export type HeroPortrait = {
  img: string;
  alt: string;
  overlayTitle: string;
};
