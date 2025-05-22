import { MAX_BUDGET_DOLLARS, USER_PREFERENCES_LS_KEY } from '@/constants';
import { IUserPreferences } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import posthog from 'posthog-js';

const initialUserPreferences: IUserPreferences = {
  budget: MAX_BUDGET_DOLLARS,
  buyerType: null,
  serviceType: null,
  beds: null,
  baths: null,
  stories: null,
};

interface UserPreferencesState {
  userPreferences: IUserPreferences;
  setUserPreferences: (prefs: Partial<IUserPreferences>) => void;
  resetUserPreferences: () => void;
  isInitialUserPreferences: boolean;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set, get) => ({
      userPreferences: initialUserPreferences,
      isInitialUserPreferences: true,

      setUserPreferences: (prefs) => {
        const updated = { ...get().userPreferences, ...prefs };
        set({
          userPreferences: updated,
          isInitialUserPreferences:
            JSON.stringify(updated) === JSON.stringify(initialUserPreferences),
        });
      },

      resetUserPreferences: () => {
        set({
          userPreferences: initialUserPreferences,
          isInitialUserPreferences: true,
        });
        localStorage.removeItem(USER_PREFERENCES_LS_KEY);
      },
    }),
    {
      name: USER_PREFERENCES_LS_KEY,
    }
  )
);
