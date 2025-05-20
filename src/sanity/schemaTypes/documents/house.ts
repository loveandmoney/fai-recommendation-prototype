import { House } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { ALT_IMAGE_FRAGMENT, IAltImage } from '../objects/altImage';
import {
  DYNAMIC_CONTENT_TAGS_FRAGMENT,
  IDynamicContentTags,
} from '../objects/dynamicContentTags';
import {
  NUMBER_BATHS,
  NUMBER_BEDS,
  NUMBER_STORIES,
  TNumberBaths,
  TNumberBeds,
  TNumberStories,
} from '@/lib/dynamicTags';

export const houseSchema = defineType({
  name: 'house',
  title: 'House',
  type: 'document',
  icon: House,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'altImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Beds',
      name: 'beds',
      type: 'string',
      options: {
        list: NUMBER_BEDS as unknown as string[],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: NUMBER_BEDS[0],
    }),
    defineField({
      title: 'Baths',
      name: 'baths',
      type: 'string',
      options: {
        list: NUMBER_BATHS as unknown as string[],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: NUMBER_BATHS[0],
    }),
    defineField({
      title: 'Stories',
      name: 'stories',
      type: 'string',
      options: {
        list: NUMBER_STORIES as unknown as string[],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: NUMBER_STORIES[0],
    }),
    defineField({
      name: 'dynamicContentTags',
      title: 'Dynamic Content Tags',
      type: 'dynamicContentTags',
    }),
  ],
});

export interface IHouse {
  _id: string;
  title: string;
  price: number;
  photo: IAltImage;
  beds: TNumberBeds;
  baths: TNumberBaths;
  stories: TNumberStories;
  dynamicContentTags: IDynamicContentTags;
}

export const HOUSE_FRAGMENT = `
  _id,
  title,
  price,
  photo {
    ${ALT_IMAGE_FRAGMENT}
  },
  beds,
  baths,
  stories,
  dynamicContentTags {
    ${DYNAMIC_CONTENT_TAGS_FRAGMENT}
  }
`;
