import { StructureBuilder } from 'sanity/structure';
import { settings } from './settings';

export const structure = (S: StructureBuilder) => {
  return S.list()
    .title('Home')
    .items([settings(S)]);
};
