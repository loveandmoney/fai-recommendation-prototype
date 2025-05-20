import { getDyamicPageContent } from '@/sanity/lib/dataFetchers';
import { DynamicPageContent } from '@/slices/DynamicPageContent';

export default async function HomePage() {
  const sections = await getDyamicPageContent();

  return <DynamicPageContent sections={sections} />;
}
