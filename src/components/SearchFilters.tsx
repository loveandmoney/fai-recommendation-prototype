'use client';

import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { TNumberBaths, TNumberBeds, TNumberStories } from '@/lib/dynamicTags';
import { useUserPreferencesStore } from '@/stores/useUserPreferences';

export const SearchFilters = () => {
  const {
    setUserPreferences,
    userPreferences,
    resetUserPreferences,
    isInitialUserPreferences,
  } = useUserPreferencesStore();

  const updateBeds = (beds: TNumberBeds) => {
    setUserPreferences({
      ...userPreferences,
      beds,
    });
  };

  const updateBaths = (baths: TNumberBaths) => {
    setUserPreferences({
      ...userPreferences,
      baths,
    });
  };

  const updateStories = (stories: TNumberStories) => {
    setUserPreferences({
      ...userPreferences,
      stories,
    });
  };

  const updateBudget = (budget: number) => {
    setUserPreferences({
      ...userPreferences,
      budget,
    });
  };

  return (
    <div className="">
      <h2 className="font-bold mb-6">Search filters</h2>

      <div className="w-full grid gap-8">
        <label className="block w-full">
          <span className="block mb-2">Budget</span>
          <Slider
            min={0}
            max={5000000}
            value={[userPreferences.budget]}
            onValueChange={(value) => updateBudget(value[0])}
            step={10000}
            className="w-full"
          />
        </label>

        <p>${userPreferences.budget.toLocaleString()}</p>

        <div>
          <h2>Beds</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => updateBeds('3+')}
              variant={userPreferences.beds === '3+' ? 'default' : 'outline'}
            >
              3+
            </Button>
            <Button
              onClick={() => updateBeds('4+')}
              variant={userPreferences.beds === '4+' ? 'default' : 'outline'}
            >
              4+
            </Button>
            <Button
              onClick={() => updateBeds('5+')}
              variant={userPreferences.beds === '5+' ? 'default' : 'outline'}
            >
              5+
            </Button>
          </div>
        </div>

        <div>
          <h2>Baths</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => updateBaths('2+')}
              variant={userPreferences.baths === '2+' ? 'default' : 'outline'}
            >
              2+
            </Button>
            <Button
              onClick={() => updateBaths('3+')}
              variant={userPreferences.baths === '3+' ? 'default' : 'outline'}
            >
              3+
            </Button>
            <Button
              onClick={() => updateBaths('4+')}
              variant={userPreferences.baths === '4+' ? 'default' : 'outline'}
            >
              4+
            </Button>
          </div>
        </div>

        <div>
          <h2>Stories</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => updateStories('1')}
              variant={userPreferences.stories === '1' ? 'default' : 'outline'}
            >
              1
            </Button>
            <Button
              onClick={() => updateStories('2')}
              variant={userPreferences.stories === '2' ? 'default' : 'outline'}
            >
              2
            </Button>
          </div>
        </div>

        <Button
          disabled={isInitialUserPreferences}
          onClick={resetUserPreferences}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
