import { getHouses } from '@/sanity/lib/dataFetchers';
import Image from 'next/image';

export default async function Houses() {
  const houses = await getHouses();

  return (
    <ul className="grid gap-4 grid-cols-4 p-8">
      {houses.map(({ price, title, photo }, i) => (
        <li key={i} className="border rounded-lg p-4">
          <h2 className="font-bold text-lg">{title}</h2>
          <p className="mb-2">${price.toLocaleString()}.00</p>
          <div className="rounded-md overflow-hidden max-w-full aspect-square">
            <Image
              className="w-full h-full"
              width={500}
              height={500}
              src={photo.src}
              alt={photo.alt || ''}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
