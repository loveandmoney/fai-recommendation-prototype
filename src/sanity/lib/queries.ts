import { defineQuery } from 'next-sanity';
import { SETTINGS_FRAGMENT } from '../schemaTypes/singletons/settings';

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
  ${SETTINGS_FRAGMENT} 
}`);
