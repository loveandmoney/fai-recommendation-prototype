import { IDynamicPageSection } from '../schemaTypes/objects/dynamicPageSection';
import {
  DYNAMIC_PAGE_FRAGMENT,
  IDynamicPage,
} from '../schemaTypes/singletons/dynamicPage';
import { client } from './client';

export const getDyamicPageContent: () => Promise<
  IDynamicPageSection[]
> = async () => {
  const query = `*[_type == "dynamicPage"]{
    ${DYNAMIC_PAGE_FRAGMENT}
  }`;

  const data = (await client.fetch(query)) as IDynamicPage[];

  return data?.[0]?.dynamicContent || [];
};
