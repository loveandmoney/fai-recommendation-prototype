'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import clsx from 'clsx';

type TWhatAreYouLookingFor = 'house' | 'kdrb' | 'house-and-land';

export const Form = () => {
  const [whatAreYouLookingFor, setWhatAreYouLookingFor] =
    useState<TWhatAreYouLookingFor | null>(null);
  const [budget, setBudget] = useState<number>(0);
  const [isFirstHome, setIsFirstHome] = useState<boolean | null>(null);

  return (
    <div className="grid gap-4">
      <div>
        <h2>What are you looking for</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setWhatAreYouLookingFor('house')}
            className={clsx(
              whatAreYouLookingFor === 'house' &&
                'bg-amber-800 hover:bg-amber-800'
            )}
          >
            House
          </Button>
          <Button
            onClick={() => setWhatAreYouLookingFor('kdrb')}
            className={clsx(
              whatAreYouLookingFor === 'kdrb' &&
                'bg-amber-800 hover:bg-amber-800'
            )}
          >
            KDRB
          </Button>

          <Button
            onClick={() => setWhatAreYouLookingFor('house-and-land')}
            className={clsx(
              whatAreYouLookingFor === 'house-and-land' &&
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
            onClick={() => setIsFirstHome(true)}
            className={clsx(
              isFirstHome === true && 'bg-amber-800 hover:bg-amber-800'
            )}
          >
            First Home
          </Button>
          <Button
            onClick={() => setIsFirstHome(false)}
            className={clsx(
              isFirstHome === false && 'bg-amber-800 hover:bg-amber-800'
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
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              step="1000"
              className="w-full"
            />
          </label>

          <p>${budget}</p>
        </div>
      </div>
    </div>
  );
};
