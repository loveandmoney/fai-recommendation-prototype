import { DynamicFeaturedHouse } from '@/components/DynamicFeaturedHouse';
import { client } from '@/sanity/lib/client';
import { HOUSE_FRAGMENT, IHouse } from '@/sanity/schemaTypes/documents/house';
import {
  DYNAMIC_PAGE_FRAGMENT,
  IDynamicPage,
} from '@/sanity/schemaTypes/singletons/dynamicPage';
import {
  ISettings,
  SETTINGS_FRAGMENT,
} from '@/sanity/schemaTypes/singletons/settings';
import { DynamicPageContent } from '@/slices/DynamicPageContent';

interface IQueryResponse {
  dynamicPage: IDynamicPage;
  houses: IHouse[];
  settings: ISettings;
}

export default async function HomePage() {
  const query = `{
    "dynamicPage": *[_type == "dynamicPage"][0] {
      ${DYNAMIC_PAGE_FRAGMENT}
    },
    "houses": *[_type == "house"] {
      ${HOUSE_FRAGMENT}
    },
    "settings": *[_type == "settings"][0] {
      ${SETTINGS_FRAGMENT}
    }
  }`;

  const { dynamicPage, houses, settings } = (await client.fetch(
    query
  )) as IQueryResponse;

  return (
    <div className="grid grid-cols-2 gap-4">
      <DynamicFeaturedHouse
        houses={houses}
        featuredHouse={settings.defaultFeaturedHouse}
      />
      <DynamicPageContent sections={dynamicPage.dynamicContent} />
    </div>
  );
}
