import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  loadSiteSettings,
  selectSiteSettings,
  selectSiteSettingsStatus,
} from '../../store/siteSettingsSlice';

export function useSiteSettings() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectSiteSettingsStatus);
  const settings = useAppSelector(selectSiteSettings);

  useEffect(() => {
    if (status === 'idle') dispatch(loadSiteSettings());
  }, [status, dispatch]);

  function get(key: string, fallback = ''): string {
    return settings[key] !== undefined ? settings[key] : fallback;
  }

  const isLoading = status === 'idle' || status === 'loading';

  return { settings, get, isLoading };
}
