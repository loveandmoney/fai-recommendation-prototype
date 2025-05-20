import { Atom } from 'lucide-react';
import { StructureBuilder } from 'sanity/structure';

export const dynamicPage = (S: StructureBuilder) =>
  S.listItem()
    .title('Dynamic Page')
    .id('dynamicPage')
    .icon(Atom)
    .child(
      S.document()
        .title('Dynamic Page')
        .schemaType('dynamicPage')
        .documentId('dynamicPage')
    );
