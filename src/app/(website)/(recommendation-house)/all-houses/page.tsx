import { HouseLink } from '@/components/HouseLink';
import { houses } from '@/data/houses';

export default function AllHousesPage() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">All Houses</h1>
      <ul className="grid grid-cols-4 gap-4">
        {houses.map((house) => (
          <li key={house.id}>
            <HouseLink house={house} />
          </li>
        ))}
      </ul>
    </>
  );
}
