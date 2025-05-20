export type TServiceType = 'house' | 'kdrb' | 'house-and-land';
export type TBuyerType = 'first-home' | 'investor';

export interface IUserPreferences {
  serviceType: TServiceType | null;
  budget: number;
  buyerType: TBuyerType | null;
}
