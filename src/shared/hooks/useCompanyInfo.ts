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

/** Returns the site logo URL (dark), falling back to the local asset. */
export function resolveLogo(
  info: { logo_url: string; logo_url_dark: string },
  fallback: string
): string {
  return info.logo_url_dark || info.logo_url || fallback;
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
