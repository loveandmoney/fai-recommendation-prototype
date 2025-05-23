import { houses } from '@/data/houses';
import HouseContent from './content';

export interface IPageProps {
  params: {
    id: string;
  };
}

export default function HousePage({ params }: IPageProps) {
  const house = houses.find((h) => h.id === params.id);

  if (!house) {
    return <div>House not found</div>;
  }

  return <HouseContent house={house} />;
}

export async function generateStaticParams() {
  return houses.map((house) => ({
    id: house.id,
  }));
}
