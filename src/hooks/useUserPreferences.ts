import { USER_PREFERENCES_LS_KEY } from '@/constants';
import { IUserPreferences } from '@/types';
import { useEffect, useState } from 'react';

const initialUserPreferences: IUserPreferences = {
  budget: 0,
  isFirstHome: null,
  serviceType: null,
};

export const useUserPreferences = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [userPreferences, setUserPreferences] = useState<IUserPreferences>(
    initialUserPreferences
  );

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

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    localStorage.setItem(
      USER_PREFERENCES_LS_KEY,
      JSON.stringify(userPreferences)
    );
  }, [userPreferences, hasMounted]);

  return {
    userPreferences,
    setUserPreferences,
    hasMounted,
  };
};
