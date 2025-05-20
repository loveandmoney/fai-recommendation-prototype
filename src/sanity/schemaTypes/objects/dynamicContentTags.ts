import { defineField, defineType } from 'sanity';
import { Tag } from 'lucide-react';
import {
  BUYER_TAGS,
  MISC_TAGS,
  SERVICE_TAGS,
  TBuyerTag,
  TMiscTag,
  TServiceTag,
} from '@/lib/dynamicTags';

export const dynamicContentTagsSchema = defineType({
  title: 'Dynamic Content Tags',
  name: 'dynamicContentTags',
  type: 'object',
  icon: Tag,
  fields: [
    defineField({
      title: 'Buyer Tags',
      name: 'buyerTags',
      type: 'array',
      options: {
        list: BUYER_TAGS as unknown as string[],
      },
      of: [
        {
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      title: 'Service Tags',
      name: 'serviceTags',
      type: 'array',
      options: {
        list: SERVICE_TAGS as unknown as string[],
      },
      of: [
        {
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      title: 'Misc Tags',
      name: 'miscTags',
      type: 'array',
      options: {
        list: MISC_TAGS as unknown as string[],
      },
      of: [
        {
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
});

export interface IDynamicContentTags {
  buyerTags: TBuyerTag[];
  serviceTags: TServiceTag[];
  miscTags: TMiscTag[];
}

export const DYNAMIC_CONTENT_TAGS_FRAGMENT = `
  buyerTags,
  serviceTags,
  miscTags
`;
