export type CardTemplate = 'retro' | 'dark' | 'glass' | 'train';

export type PhotoFilter = 'normal' | 'vintage' | 'emerald' | 'noir' | 'sepia';

export interface BeachItem {
  icon: string;
  label: string;
}

export interface BuilderBadgeData {
  fullName: string;
  role: string;
  builderClass: string;
  shipping: string;
  builderId: string;
  beachBag: [BeachItem, BeachItem, BeachItem];
  socialHandle: string;
  avatarUrl: string;
  avatarScale: number;
  avatarOffsetX: number;
  avatarOffsetY: number;
  avatarFilter: PhotoFilter;
  template: CardTemplate;
  accentColor: string;
}
