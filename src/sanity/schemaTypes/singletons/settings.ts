import { defineField, defineType } from 'sanity';
import { HOUSE_FRAGMENT, IHouse } from '../documents/house';

export const settingsSchema = defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      title: 'Default Featured House',
      name: 'defaultFeaturedHouse',
      type: 'reference',
      to: [{ type: 'house' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});

export interface ISettings {
  defaultFeaturedHouse: IHouse;
}

export const SETTINGS_FRAGMENT = `
  defaultFeaturedHouse-> {
    ${HOUSE_FRAGMENT}
  },
`;
