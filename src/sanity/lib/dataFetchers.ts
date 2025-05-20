import { HOUSE_FRAGMENT, IHouse } from '../schemaTypes/documents/house';
import { client } from './client';

export const getHouses: () => Promise<IHouse[]> = async () => {
  const query = `*[_type == "house"]{
    ${HOUSE_FRAGMENT}
  }`;

  const data = (await client.fetch(query)) as IHouse[];

  return data;
};
