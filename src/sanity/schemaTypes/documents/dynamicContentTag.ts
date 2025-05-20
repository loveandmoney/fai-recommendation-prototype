import { Tag } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const dynamicContentTagSchema = defineType({
  name: 'dynamicContentTag',
  title: 'Dynamic Content Tag',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export interface IDynamicContentTag {
  title: string;
  slug: string;
}

export const DYNAMIC_TAG_FRAGMENT = `
  title,
  "slug": slug.current,
`;
