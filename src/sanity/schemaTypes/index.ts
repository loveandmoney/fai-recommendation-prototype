import { type SchemaTypeDefinition } from 'sanity';
import { settingsSchema } from './singletons/settings';
import { dynamicPageSchema } from './singletons/dynamicPage';
import { altImageSchema } from './objects/altImage';
import { houseSchema } from './documents/house';
import { dynamicContentTagSchema } from './documents/dynamicContentTag';
import { dynamicContentTagsSchema } from './objects/dynamicContentTags';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    altImageSchema,
    dynamicContentTagsSchema,
    // Documents
    houseSchema,
    dynamicContentTagSchema,
    // Singletons
    settingsSchema,
    dynamicPageSchema,
  ],
};
