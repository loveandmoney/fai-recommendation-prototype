import { defineField, defineType } from 'sanity';
import { Atom } from 'lucide-react';
import { ALT_IMAGE_FRAGMENT, IAltImage } from './altImage';
import {
  DYNAMIC_CONTENT_TAGS_FRAGMENT,
  IDynamicContentTags,
} from './dynamicContentTags';

export const dynamicPageSectionSchema = defineType({
  title: 'Dynamic Page Section',
  name: 'dynamicPageSection',
  type: 'object',
  icon: Atom,
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'altImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dynamicContentTags',
      title: 'Dynamic Content Tags',
      type: 'dynamicContentTags',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export interface IDynamicPageSection {
  _key: string;
  header: string;
  image: IAltImage;
  dynamicContentTags: IDynamicContentTags;
}

export const DYNAMIC_PAGE_SECTION_FRAGMENT = `
  _key,
  header,
  image {
    ${ALT_IMAGE_FRAGMENT}
  },
  dynamicContentTags {
    ${DYNAMIC_CONTENT_TAGS_FRAGMENT}
  }
`;
