import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  loadCompanyInfo,
  selectCompanyInfo,
  selectCompanyInfoStatus,
} from '../../store/companyInfoSlice';

// Re-export types from the service so existing consumers keep working
export type {
  CompanyInfo,
  ContactRow,
  SocialLink,
} from '../../services/companyInfoService';

/** Returns the correct logo URL for the given theme, falling back to local asset. */
export function resolveLogo(
  info: { logo_url: string; logo_url_dark: string },
  theme: string,
  fallback: string
): string {
  const light = info.logo_url;
  const dark = info.logo_url_dark;
  if (light && dark) return theme === 'dark' ? dark : light;
  return light || dark || fallback;
}

export function useCompanyInfo() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectCompanyInfoStatus);
  const info = useAppSelector(selectCompanyInfo);
  useEffect(() => {
    if (status === 'idle') dispatch(loadCompanyInfo());
  }, [status, dispatch]);
  return info;
}
