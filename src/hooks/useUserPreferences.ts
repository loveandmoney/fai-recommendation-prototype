import { USER_PREFERENCES_LS_KEY } from '@/constants';
import { IUserPreferences } from '@/types';
// import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

const initialUserPreferences: IUserPreferences = {
  budget: 0,
  buyerType: null,
  serviceType: null,
};

export const useUserPreferences = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [userPreferences, setUserPreferences] = useState<IUserPreferences>(
    initialUserPreferences
  );

  const resetUserPreferences = () => {
    setUserPreferences(initialUserPreferences);
    localStorage.removeItem(USER_PREFERENCES_LS_KEY);
  };

  // Get initial user preferences from local storage if available, otherwise use default values
  useEffect(() => {
    const userPreferencesFromStorage = JSON.parse(
      localStorage.getItem(USER_PREFERENCES_LS_KEY) || 'null'
    ) as IUserPreferences | null;

    if (userPreferencesFromStorage) {
      setUserPreferences(userPreferencesFromStorage);
    }

    setHasMounted(true);
  }, []);

  // Sync user preferences to local storage
  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    localStorage.setItem(
      USER_PREFERENCES_LS_KEY,
      JSON.stringify(userPreferences)
    );
  }, [userPreferences, hasMounted]);

  // Sync user preferences to PostHog with debounce
  useEffect(() => {
    const DEBOUNCE_TIME_MS = 500;
    if (!hasMounted) {
      return;
    }

    const timeout = setTimeout(() => {
      // todo - couldn't get this working
      // posthog.setPersonProperties(userPreferences);
    }, DEBOUNCE_TIME_MS);

    return () => clearTimeout(timeout);
  }, [userPreferences, hasMounted]);

  return {
    userPreferences,
    setUserPreferences,
    hasMounted,
    resetUserPreferences,
  };
};
