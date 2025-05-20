'use client';

import { useUserPreferences } from '@/hooks/useUserPreferences';

export default function DynamicContent() {
  const { hasMounted, userPreferences } = useUserPreferences();

  return (
    <div>
      {!hasMounted && <p>Loading...</p>}
      {hasMounted && (
        <div>
          <p>Service Type: {userPreferences.serviceType}</p>
          <p>Budget: {userPreferences.budget}</p>
          <p>Buyer type: {userPreferences.buyerType}</p>
        </div>
      )}
    </div>
  );
}
