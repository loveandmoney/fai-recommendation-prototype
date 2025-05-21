import { HouseData } from '@/components/HouseData';
import { houses } from '@/data/houses';

export interface IPageProps {
  params: {
    id: string;
  };
}

export default async function HousePage({ params }: IPageProps) {
  const idNumber = Number(params.id);

  const house = houses.find((h) => h.id === idNumber);

  if (!house) {
    return <div>House not found</div>;
  }

  return <HouseData house={house} />;
}

export async function generateStaticParams() {
  return houses.map((house) => ({
    id: house.id.toString(),
  }));
}
