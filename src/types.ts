export type TServiceType = 'house' | 'kdrb' | 'house-and-land';

export interface IUserPreferences {
  serviceType: TServiceType | null;
  budget: number;
  isFirstHome: boolean | null;
}
