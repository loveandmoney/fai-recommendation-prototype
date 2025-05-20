import { House } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { ALT_IMAGE_FRAGMENT, IAltImage } from '../objects/altImage';
import {
  DYNAMIC_CONTENT_TAGS_FRAGMENT,
  IDynamicContentTags,
} from '../objects/dynamicContentTags';

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
  dynamicContentTags: IDynamicContentTags;
}

export const HOUSE_FRAGMENT = `
  _id,
  title,
  price,
  photo {
    ${ALT_IMAGE_FRAGMENT}
  },
  dynamicContentTags {
    ${DYNAMIC_CONTENT_TAGS_FRAGMENT}
  }
`;
