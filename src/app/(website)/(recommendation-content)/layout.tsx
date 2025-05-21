import { ContentRecommendationDebug } from '@/components/ContentRecommendationDebug';

export default function RecommendationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">{children}</div>

      <ContentRecommendationDebug />
    </div>
  );
}
