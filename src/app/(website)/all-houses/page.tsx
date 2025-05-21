import { houses } from '@/data/houses';
import {
  Bath,
  BedDouble,
  ChartBarIncreasing,
  DollarSign,
  Tv,
} from 'lucide-react';
import Link from 'next/link';

export default function AllHousesPage() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">All Houses</h1>
      <ul className="grid grid-cols-4 gap-4">
        {houses.map(
          ({
            id,
            name,
            bathrooms,
            beds,
            collection,
            cost,
            livingRooms,
            stories,
          }) => (
            <li key={id}>
              <Link
                href={`/houses/${id}`}
                className="border rounded-lg p-4 grid gap-2 grid-cols-2"
              >
                <h2 className="font-bold">{name}</h2>
                <div className="flex gap-2 items-center">
                  {collection.toUpperCase()}
                </div>
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
                  <Bath /> {bathrooms}
                </div>
                <div className="flex gap-2 items-center">
                  <Tv /> {livingRooms}
                </div>
                <div className="flex gap-2 items-center">
                  <BedDouble /> {beds}
                </div>
              </Link>
            </li>
          )
        )}
      </ul>
    </>
  );
}
