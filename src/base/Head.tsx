import appData from '../data/app_data';
import { Helmet } from 'react-helmet';
// Define the props for the HeaderHelment component
interface HeaderHelmentProps {
  title: string;
  description?: string;
  keywords?:Array<string>;
  logo?:string;
  og?:{
    title?:string;
    description?:string;
    image?:string;
  },
  twitter?:{
    card?:string;

  }
}
// Define the HeaderHelment component
export default function HeaderHelment({ title,description,keywords,logo,og,twitter }: HeaderHelmentProps) {
  // Merge the keywords from the appData and the keywords passed as props
  const keywordContent = [...(keywords??appData.keywords)].join(",")??"";
  // Return the Helmet component with the title, description and keywords
  return (
    <Helmet>
      <title>{appData.title} | {title}</title>
      {/* desecription */}
      <meta name="description" content={description??appData?.description} />
      <meta name="keywords" content={keywordContent} />
      <meta name="author" content={appData.author} />
      <meta name="theme-color" content="#1245de"/>
      {/* Open Graph */}
      <meta name='og:title' content={og?.title??appData.title} />
      <meta name='og:description' content={og?.description??appData.description} />
      <meta name='og:image' content={og?.image??logo} />
      <meta name='og:type' content='website' />
      <meta name='og:url' content={window.location.href} />
      <meta name='og:site_name' content={appData.title} />
      <meta name='og:locale' content='en_US' />
     <meta name='og:image:width' content='1200' />
     <meta name='og:image:height' content='630' />
     {/* Twitter */}
      <meta name='twitter:card' content={twitter?.card} />
      <meta name='twitter:site' content={appData.title} />
      <meta name='twitter:creator' content={appData.author} />
      <meta name='twitter:title' content={og?.title??appData.title} />
      <meta name='twitter:description' content={og?.description??appData.description} />
      <meta name='twitter:image' content={og?.image??logo} />
      <meta name='twitter:image:alt' content={og?.title??appData.title} />
      <meta name='twitter:image:width' content='1200' />
      <meta name='twitter:image:height' content='630' />
      <meta name='twitter:domain' content=".tec" />
      <meta name='twitter:url' content={window.location.href} />
    </Helmet>
  );
}
