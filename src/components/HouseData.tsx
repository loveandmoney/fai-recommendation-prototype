import { IHouse } from '@/data/houses';
import clsx from 'clsx';
import {
  Anchor,
  Bath,
  BedDouble,
  ChartBarIncreasing,
  DollarSign,
  Star,
  Tv,
} from 'lucide-react';

export const HouseData = ({ house }: { house: IHouse }) => {
  const {
    bathrooms,
    beds,
    collection,
    cost,
    livingRooms,
    name,
    stories,
    ranking,
  } = house;

  const anchored = ranking === 'anchored';
  const featured = ranking === 'featured';

  return (
    <div
      className={clsx(
        'border rounded-lg p-4 grid gap-2 grid-cols-2',
        featured && 'bg-yellow-200',
        anchored && 'bg-green-200'
      )}
    >
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

      {anchored && (
        <div className="flex gap-2 items-center bg-green-400 rounded-md text-xs p-1">
          <Anchor /> Anchored
        </div>
      )}

      {featured && (
        <div className="flex gap-2 items-center bg-yellow-400 rounded-md text-xs p-1">
          <Star /> Featured
        </div>
      )}
    </div>
  );
};
