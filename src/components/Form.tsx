'use client';

import { Button } from './ui/button';
import clsx from 'clsx';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export const Form = () => {
  const { setUserPreferences, userPreferences, hasMounted } =
    useUserPreferences();

  return (
    <>
      {!hasMounted && <p>Loading...</p>}
      {hasMounted && (
        <div className="grid gap-4">
          <div>
            <h2>What are you looking for</h2>
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  setUserPreferences((prev) => ({
                    ...prev,
                    serviceType: 'house',
                  }))
                }
                className={clsx(
                  userPreferences.serviceType === 'house' &&
                    'bg-amber-800 hover:bg-amber-800'
                )}
              >
                House
              </Button>
              <Button
                onClick={() =>
                  setUserPreferences((prev) => ({
                    ...prev,
                    serviceType: 'kdrb',
                  }))
                }
                className={clsx(
                  userPreferences.serviceType === 'kdrb' &&
                    'bg-amber-800 hover:bg-amber-800'
                )}
              >
                KDRB
              </Button>

              <Button
                onClick={() =>
                  setUserPreferences((prev) => ({
                    ...prev,
                    serviceType: 'house-and-land',
                  }))
                }
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
                onClick={() =>
                  setUserPreferences((prev) => ({ ...prev, isFirstHome: true }))
                }
                className={clsx(
                  userPreferences.isFirstHome === true &&
                    'bg-amber-800 hover:bg-amber-800'
                )}
              >
                First Home
              </Button>
              <Button
                onClick={() =>
                  setUserPreferences((prev) => ({
                    ...prev,
                    isFirstHome: false,
                  }))
                }
                className={clsx(
                  userPreferences.isFirstHome === false &&
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
                  onChange={(e) =>
                    setUserPreferences((prev) => ({
                      ...prev,
                      budget: parseInt(e.target.value, 10),
                    }))
                  }
                  step="1000"
                  className="w-full"
                />
              </label>

              <p>${userPreferences.budget}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
