'use client';

import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { TBuyerTag, TServiceTag } from '@/lib/dynamicTags';
import { useUserPreferencesStore } from '@/stores/useUserPreferences';

export const Form = () => {
  const { setUserPreferences, userPreferences, resetUserPreferences } =
    useUserPreferencesStore();

  const selectBuyerType = (buyerType: TBuyerTag) => {
    setUserPreferences({
      ...userPreferences,
      buyerType,
    });
  };

  const selectServiceType = (serviceType: TServiceTag) => {
    setUserPreferences({
      ...userPreferences,
      serviceType,
    });
  };

  const selectBudget = (budget: number) => {
    setUserPreferences({
      ...userPreferences,
      budget,
    });
  };

  return (
    <div className="grid gap-4">
      <div>
        <h2>What are you looking for</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => selectServiceType('house')}
            variant={
              userPreferences.serviceType === 'house' ? 'default' : 'outline'
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
              userPreferences.buyerType === 'investor' ? 'default' : 'outline'
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

      <Button onClick={resetUserPreferences}>Reset Preferences</Button>
    </div>
  );
};
