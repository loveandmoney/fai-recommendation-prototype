import { Settings } from 'lucide-react';
import { StructureBuilder } from 'sanity/structure';

export const settings = (S: StructureBuilder) =>
  S.listItem()
    .title('Settings')
    .id('settings')
    .icon(Settings)
    .child(
      S.document()
        .title('Settings')
        .schemaType('settings')
        .documentId('settings')
    );
