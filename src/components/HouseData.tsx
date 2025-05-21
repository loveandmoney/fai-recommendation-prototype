import { IHouse } from '@/data/houses';
import {
  Bath,
  BedDouble,
  ChartBarIncreasing,
  DollarSign,
  Tv,
} from 'lucide-react';

export const HouseData = ({ house }: { house: IHouse }) => {
  const { bathrooms, beds, collection, cost, livingRooms, name, stories } =
    house;

  return (
    <div className="border rounded-lg p-4 grid gap-2 grid-cols-2">
      <h2 className="font-bold">{name}</h2>
      <div className="flex gap-2 items-center">{collection.toUpperCase()}</div>
      <div className="flex gap-2 items-center">
        <DollarSign /> {cost.toLocaleString()}
      </div>
      <div className="flex gap-2 items-center">
        <ChartBarIncreasing /> {stories}
      </div>
      <div className="flex gap-2 items-center">
        <Bath /> {bathrooms}
      </div>

      <div className="flex gap-2 items-center">
        <Tv /> {livingRooms}
      </div>
      <div className="flex gap-2 items-center">
        <BedDouble /> {beds}
      </div>
    </div>
  );
};
