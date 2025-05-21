import {
  TBuyerTag,
  TNumberBaths,
  TNumberBeds,
  TNumberStories,
  TServiceTag,
} from './lib/dynamicTags';

export interface IUserPreferences {
  serviceType: TServiceTag | null;
  budget: number;
  buyerType: TBuyerTag | null;
  beds: TNumberBeds | null;
  baths: TNumberBaths | null;
  stories: TNumberStories | null;
}

export type TRanking = 'anchored' | 'featured';

export interface IImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}
