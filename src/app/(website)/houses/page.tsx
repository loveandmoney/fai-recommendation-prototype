import HousesContent from './content';
import { HOUSE_FRAGMENT, IHouse } from '@/sanity/schemaTypes/documents/house';
import {
  ISettings,
  SETTINGS_FRAGMENT,
} from '@/sanity/schemaTypes/singletons/settings';
import { client } from '@/sanity/lib/client';

export default async function HousesPage() {
  interface IQueryResponse {
    houses: IHouse[];
    settings: ISettings;
  }

  const getPageData: () => Promise<IQueryResponse> = async () => {
    const query = `{
      "houses": *[_type == "house"] {
        ${HOUSE_FRAGMENT}
      },
      "settings": *[_type == "settings"][0] {
        ${SETTINGS_FRAGMENT}
      }
    }`;

    const data = (await client.fetch(query)) as IQueryResponse;

    return data;
  };

  const { houses, settings } = await getPageData();

  return (
    <HousesContent
      houses={houses}
      defaultFeatureHouseId={settings.defaultFeaturedHouse._id}
    />
  );
}
