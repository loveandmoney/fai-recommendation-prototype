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
  description:
    'If you activate these tags, content will only be shown to users deemed relevant.',
  icon: Tag,
  fields: [
    defineField({
      title: 'Active',
      name: 'active',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Buyer Tags',
      name: 'buyerTags',
      type: 'array',
      hidden: ({ parent }) => {
        return !parent?.active;
      },
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
      hidden: ({ parent }) => {
        return !parent?.active;
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
      hidden: ({ parent }) => {
        return !parent?.active;
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
  active: boolean;
  buyerTags: TBuyerTag[];
  serviceTags: TServiceTag[];
  miscTags: TMiscTag[];
}

export const DYNAMIC_CONTENT_TAGS_FRAGMENT = `
  active,  
  "buyerTags": coalesce(buyerTags[], []),  
  "serviceTags": coalesce(serviceTags[], []),  
  "miscTags": coalesce(miscTags[], []),  
`;
