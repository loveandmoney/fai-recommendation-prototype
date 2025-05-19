import { type SchemaTypeDefinition } from 'sanity';
import { settingsSchema } from './singletons/settings';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    settingsSchema,
  ],
};
