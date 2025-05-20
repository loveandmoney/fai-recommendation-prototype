import { defineField, defineType } from 'sanity';

export const dynamicPageSchema = defineType({
  name: 'dynamicPage',
  title: 'Dynamic Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    {
      title: 'Text',
      name: 'text',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare: () => ({ title: 'Dynamic Page Content' }),
  },
});

export interface IDynamicPage {
  title: string;
  text: string;
}

export const DYNAMIC_PAGE_FRAGMENT = `
  title,
  text
`;
