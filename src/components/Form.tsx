'use client';

import { Button } from './ui/button';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import posthog from 'posthog-js';
import { useEffect } from 'react';
import { Slider } from './ui/slider';
import { TBuyerTag, TServiceTag } from '@/lib/dynamicTags';

export const Form = () => {
  const { setUserPreferences, userPreferences, hasMounted } =
    useUserPreferences();

  const budget = userPreferences.budget;

  const selectBuyerType = (type: TBuyerTag) => {
    posthog.capture('selected_buyer_type', {
      type,
    });
    posthog.people.set({ buyer_type: type });
    setUserPreferences((prev) => ({
      ...prev,
      buyerType: type,
    }));
  };

  const selectServiceType = (type: TServiceTag) => {
    posthog.capture('selected_service_type', {
      type,
    });
    posthog.people.set({ service_type: type });
    setUserPreferences((prev) => ({
      ...prev,
      serviceType: type,
    }));
  };

  const selectBudget = (budget: number) => {
    setUserPreferences((prev) => ({
      ...prev,
      budget,
    }));
  };

  // Debounce budget posthog update
  useEffect(() => {
    const DEBOUNCE_TIME_MS = 500;

    const timeout = setTimeout(() => {
      posthog.capture('selected_budget', { budget });
      posthog.people.set({ budget });
    }, DEBOUNCE_TIME_MS);

    return () => clearTimeout(timeout);
  }, [budget]);

  return (
    <>
      {!hasMounted && <p>Loading...</p>}
      {hasMounted && (
        <div className="grid gap-4">
          <div>
            <h2>What are you looking for</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => selectServiceType('house')}
                variant={
                  userPreferences.serviceType === 'house'
                    ? 'default'
                    : 'outline'
                }
              >
                House
              </Button>
              <Button
                onClick={() => selectServiceType('kdrb')}
                variant={
                  userPreferences.serviceType === 'kdrb' ? 'default' : 'outline'
                }
              >
                KDRB
              </Button>

              <Button
                onClick={() => selectServiceType('house-and-land')}
                variant={
                  userPreferences.serviceType === 'house-and-land'
                    ? 'default'
                    : 'outline'
                }
              >
                House + Land
              </Button>
            </div>
          </div>

          <div>
            <h2>What type of buyer are you?</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => selectBuyerType('first-home-buyer')}
                variant={
                  userPreferences.buyerType === 'first-home-buyer'
                    ? 'default'
                    : 'outline'
                }
              >
                First Home
              </Button>
              <Button
                onClick={() => selectBuyerType('investor')}
                variant={
                  userPreferences.buyerType === 'investor'
                    ? 'default'
                    : 'outline'
                }
              >
                Investment
              </Button>
            </div>
          </div>

          <div>
            <div className="w-full">
              <label className="block w-full">
                <span className="block mb-2">Budget</span>
                <Slider
                  min={0}
                  max={5000000}
                  value={[userPreferences.budget]}
                  onValueChange={(value) => selectBudget(value[0])}
                  step={10000}
                  className="w-full"
                />
              </label>

              <p>${userPreferences.budget.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
