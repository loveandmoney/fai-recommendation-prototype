import { sanityFetch } from '@/sanity/lib/live';
import {
  ISettings,
  SETTINGS_FRAGMENT,
} from '@/sanity/schemaTypes/singletons/settings';

export default async function Home() {
  const getHomePage: () => Promise<ISettings> = async () => {
    const query = `*[_type == "settings"][0]{
      ${SETTINGS_FRAGMENT}
    }`;

    const result = await sanityFetch({ query });
    const data = result?.data as ISettings;

    return data;
  };
  const { text, title } = await getHomePage();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>{title}</h1>
        <p>{text}</p>
      </main>
    </div>
  );
}
