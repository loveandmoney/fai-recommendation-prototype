import { StructureBuilder } from 'sanity/structure';
import { settings } from './settings';
import { dynamicPage } from './dynamicPage';

export const structure = (S: StructureBuilder) => {
  return S.list()
    .title('Home')
    .items([
      S.documentTypeListItem('house').title('Houses'),
      S.documentTypeListItem('dynamicContentTag').title('Dynamic Content Tags'),
      dynamicPage(S),
      settings(S),
    ]);
};
