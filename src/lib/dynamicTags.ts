export const BUYER_TAGS = ['first-home-buyer', 'investor'] as const;

export type TBuyerTag = (typeof BUYER_TAGS)[number];

export const SERVICE_TAGS = ['kdrb', 'house', 'house-and-land'] as const;

export type TServiceTag = (typeof SERVICE_TAGS)[number];

export const MISC_TAGS = [
  'luxury',
  'rental',
  'vacation',
  'commercial',
  'pet-friendly',
] as const;

export type TMiscTag = (typeof MISC_TAGS)[number];
