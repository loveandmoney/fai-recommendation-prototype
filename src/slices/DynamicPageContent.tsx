'use client';

import { Button } from '@/components/ui/button';
import { LUXURY_BUDGET_THRESHOLD_DOLLARS } from '@/constants';
import { IDynamicPageSection } from '@/sanity/schemaTypes/objects/dynamicPageSection';
import { useUserPreferencesStore } from '@/stores/useUserPreferences';
import Image from 'next/image';

const SECTIONS_TO_DISPLAY = 3;

export const DynamicPageContent = ({
  sections,
}: {
  sections: IDynamicPageSection[];
}) => {
  const { userPreferences } = useUserPreferencesStore();
  const { budget, buyerType, serviceType } = userPreferences;

  const filteredSections = sections
    .filter((section) => {
      if (!section.dynamicContentTags.active) {
        return true;
      }

      const { buyerTags, serviceTags, miscTags } = section.dynamicContentTags;

      if (buyerTags && buyerType && buyerTags.includes(buyerType)) {
        return true;
      }

      if (serviceTags && serviceType && serviceTags.includes(serviceType)) {
        return true;
      }

      if (
        budget >= LUXURY_BUDGET_THRESHOLD_DOLLARS &&
        miscTags.includes('luxury')
      ) {
        return true;
      }

      return false;
    })
    .slice(0, SECTIONS_TO_DISPLAY);

  return (
    <div className="grid gap-4">
      {filteredSections.map(({ header, image, _key }) => (
        <div
          key={_key}
          className="border rounded-md p-4 grid grid-cols-4 gap-4"
        >
          <div>
            <h2 className="mb-4 font-bold text-lg">{header}</h2>
            <Button>Go To Page</Button>
          </div>
          <div className="rounded-md aspect-[5/2] relative col-span-3 overflow-hidden">
            <Image
              fill
              src={image.src}
              alt={image.alt || ''}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
