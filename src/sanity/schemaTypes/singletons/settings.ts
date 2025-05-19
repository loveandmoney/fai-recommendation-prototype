import { defineField, defineType } from 'sanity';

export const settingsSchema = defineType({
  name: 'settings',
  title: 'Global Settings',
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
    prepare: () => ({ title: 'Site settings' }),
  },
});

export interface ISettings {
  title: string;
  text: string;
}

export const SETTINGS_FRAGMENT = `
  title,
  text
`;
