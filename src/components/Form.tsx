'use client';

import { Button } from './ui/button';
import clsx from 'clsx';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import posthog from 'posthog-js';
import { TBuyerType, TServiceType } from '@/types';
import { useEffect } from 'react';

export const Form = () => {
  const { setUserPreferences, userPreferences, hasMounted } =
    useUserPreferences();

  const budget = userPreferences.budget;

  const selectBuyerType = (type: TBuyerType) => {
    posthog.capture('selected_buyer_type', {
      type,
    });
    posthog.people.set({ buyer_type: type });
    setUserPreferences((prev) => ({
      ...prev,
      buyerType: type,
    }));
  };

  const selectServiceType = (type: TServiceType) => {
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
                className={clsx(
                  userPreferences.serviceType === 'house' &&
                    'bg-amber-800 hover:bg-amber-800'
                )}
              >
                House
              </Button>
              <Button
                onClick={() => selectServiceType('kdrb')}
                className={clsx(
                  userPreferences.serviceType === 'kdrb' &&
                    'bg-amber-800 hover:bg-amber-800'
                )}
              >
                KDRB
              </Button>

              <Button
                onClick={() => selectServiceType('house-and-land')}
                className={clsx(
                  userPreferences.serviceType === 'house-and-land' &&
                    'bg-amber-800 hover:bg-amber-800'
                )}
              >
                House + Land
              </Button>
            </div>
          </div>

          <div>
            <h2>Is this your first house?</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => selectBuyerType('first-home')}
                className={clsx(
                  userPreferences.buyerType === 'first-home' &&
                    'bg-amber-800 hover:bg-amber-800'
                )}
              >
                First Home
              </Button>
              <Button
                onClick={() => selectBuyerType('investor')}
                className={clsx(
                  userPreferences.buyerType === 'investor' &&
                    'bg-amber-800 hover:bg-amber-800'
                )}
              >
                Investment
              </Button>
            </div>
          </div>

          <div>
            <div className="w-full">
              <label className="block w-full">
                <span className="block mb-2">Budget</span>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  value={userPreferences.budget}
                  onChange={(e) => selectBudget(parseInt(e.target.value, 10))}
                  step="10000"
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
