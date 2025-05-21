'use client';

import { HouseData } from '@/components/HouseData';
import { IHouse } from '@/data/houses';
import { getRecommendedHouses } from '@/lib/homeRecommendations';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<IHouse[]>([]);

  useEffect(() => {
    setRecommendations(getRecommendedHouses());
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Recommendations</h1>
      <ul className="grid grid-cols-4 gap-4">
        {recommendations.map((house) => (
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
