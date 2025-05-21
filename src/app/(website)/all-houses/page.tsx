import { HouseData } from '@/components/HouseData';
import { houses } from '@/data/houses';
import Link from 'next/link';

export default function AllHousesPage() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">All Houses</h1>
      <ul className="grid grid-cols-4 gap-4">
        {houses.map((house) => (
          <li key={house.id}>
            <Link href={`/house/${house.id}`}>
              <HouseData house={house} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
