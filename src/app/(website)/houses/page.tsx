import { getHouses } from '@/sanity/lib/dataFetchers';
import HousesContent from './content';

export default async function HousesPage() {
  const houses = await getHouses();

  return <HousesContent houses={houses} />;
}
