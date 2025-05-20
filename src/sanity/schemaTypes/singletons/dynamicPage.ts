import { defineField, defineType } from 'sanity';
import {
  DYNAMIC_PAGE_SECTION_FRAGMENT,
  IDynamicPageSection,
} from '../objects/dynamicPageSection';

export const dynamicPageSchema = defineType({
  name: 'dynamicPage',
  title: 'Dynamic Page',
  type: 'document',
  fields: [
    defineField({
      name: 'dynamicContent',
      title: 'Dynamic Content',
      type: 'array',
      of: [{ type: 'dynamicPageSection' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Dynamic Page Content' }),
  },
});

export interface IDynamicPage {
  dynamicContent: IDynamicPageSection[];
}

export const DYNAMIC_PAGE_FRAGMENT = `
  dynamicContent[] {
    ${DYNAMIC_PAGE_SECTION_FRAGMENT}
  }
`;
