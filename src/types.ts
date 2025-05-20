import { TBuyerTag, TServiceTag } from './lib/dynamicTags';

export interface IUserPreferences {
  serviceType: TServiceTag | null;
  budget: number;
  buyerType: TBuyerTag | null;
}

export interface IImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}
