import { IHouse } from '@/sanity/schemaTypes/documents/house';
import Image from 'next/image';

export const FeaturedHouse = ({ photo, price, title }: IHouse) => {
  return (
    <div className="border rounded-lg p-4 grid grid-cols-2 gap-4">
      <div className=" h-full flex flex-col justify-between">
        <h1 className="">
          <span className="block font-bold text-lg">Featured House:</span>
          <span className="block font-bold text-2xl">{title}</span>
        </h1>

        <p>Price: ${price.toLocaleString()}</p>
      </div>

      <div className=" flex-1 relative aspect-[4/3] rounded-lg overflow-hidden">
        <Image src={photo.src} alt={photo.alt || ''} fill objectFit="cover" />
      </div>
    </div>
  );
};
