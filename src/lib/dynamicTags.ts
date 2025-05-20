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

export const NUMBER_BEDS = ['3+', '4+', '5+'] as const;
export type TNumberBeds = (typeof NUMBER_BEDS)[number];

export const NUMBER_BATHS = ['2+', '3+', '4+'] as const;
export type TNumberBaths = (typeof NUMBER_BATHS)[number];

export const NUMBER_STORIES = ['1', '2'] as const;
export type TNumberStories = (typeof NUMBER_STORIES)[number];
