import { defineField, defineType } from 'sanity';
import { Tag } from 'lucide-react';

export const dynamicContentTagsSchema = defineType({
  title: 'Dynamic Content Tags',
  name: 'dynamicContentTags',
  type: 'object',
  icon: Tag,
  fields: [
    defineField({
      title: 'Tags',
      name: 'tags',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [{ type: 'reference', to: [{ type: 'dynamicContentTag' }] }],
      validation: (Rule) => Rule.required().unique(),
    }),
  ],
});
