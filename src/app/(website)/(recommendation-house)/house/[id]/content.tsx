import { HouseData } from '@/components/HouseData';
import { IHouse } from '@/data/houses';

export default function HouseContent({ house }: { house: IHouse }) {
  return <HouseData house={house} />;
}
