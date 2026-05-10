import appData from '../data/app_data';
import { Helmet } from 'react-helmet-async';
import HeaderHelmentProps from './type/HeaderHelmentProps.d';
import { useCompanyInfo } from '../shared/hooks/useCompanyInfo';

export default function HeaderHelment({
  title,
  description,
  keywords,
  logo,
  og,
  twitter,
}: HeaderHelmentProps) {
  const info = useCompanyInfo();
  const siteName = info.name || appData.title;
  const siteDescription = info.description || appData.description;
  const keywordContent = [...(keywords ?? appData.keywords)].join(',') ?? '';

  return (
    <Helmet>
      <title>
        {siteName} | {title}
      </title>
      <meta name="description" content={description ?? siteDescription} />
      <meta name="keywords" content={keywordContent} />
      <meta name="author" content={appData.author} />
      <meta name="theme-color" content="#1245de" />
      {/* Open Graph */}
      <meta name="og:title" content={og?.title ?? siteName} />
      <meta name="og:description" content={og?.description ?? siteDescription} />
      <meta name="og:image" content={og?.image ?? logo} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={window.location.href} />
      <meta name="og:site_name" content={siteName} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:card" content={twitter?.card} />
      <meta name="twitter:site" content={siteName} />
      <meta name="twitter:creator" content={appData.author} />
      <meta name="twitter:title" content={og?.title ?? siteName} />
      <meta name="twitter:description" content={og?.description ?? siteDescription} />
      <meta name="twitter:image" content={og?.image ?? logo} />
      <meta name="twitter:image:alt" content={og?.title ?? siteName} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:domain" content=".tec" />
      <meta name="twitter:url" content={window.location.href} />
    </Helmet>
  );
}
