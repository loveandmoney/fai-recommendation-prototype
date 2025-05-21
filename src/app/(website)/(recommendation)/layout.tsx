import { RecommendationDebug } from '@/components/RecommendationDebug';

export default function RecommendationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">{children}</div>

      <RecommendationDebug />
    </div>
  );
}
