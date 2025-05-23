import { content, IContent } from '@/data/content';

export function getRecommendedContent({
  viewed,
}: {
  viewed: IContent[];
}): IContent[] {
  if (viewed.length === 0) return [];

  const tagFrequency: Record<string, number> = {};
  viewed.forEach((item) => {
    item.tags.forEach((tag) => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    });
  });

  const viewedIds = new Set(viewed.map((c) => c.id));

  const anchored = content.filter((item) => item.ranking === 'anchored');

  const matching = content.filter((item) => {
    if (item.ranking === 'anchored') return false; // already included
    return !viewedIds.has(item.id);
  });

  const scored = matching
    .map((item) => {
      const score = item.tags.reduce(
        (sum, tag) => sum + (tagFrequency[tag] || 0),
        0
      );
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      // featured first
      const aRank = a.item.ranking === 'featured' ? 1 : 0;
      const bRank = b.item.ranking === 'featured' ? 1 : 0;
      if (bRank !== aRank) return bRank - aRank;

      return b.score - a.score; // fallback to tag score
    })
    .map(({ item }) => item);

  return [...anchored, ...scored];
}
