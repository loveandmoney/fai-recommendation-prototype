import { content, IContent } from '@/data/content';

function getFallbackContent(): IContent[] {
  const anchored = content.filter((c) => c.ranking === 'anchored');
  const featured = content.filter(
    (c) => c.ranking === 'featured' && !anchored.some((a) => a.id === c.id)
  );

  const usedIds = new Set([...anchored, ...featured].map((h) => h.id));

  const random = content
    .filter((h) => !usedIds.has(h.id))
    .sort(() => 0.5 - Math.random());

  return [...anchored, ...featured, ...random];
}

export function getRecommendedContent({
  viewed,
  maxNumber,
}: {
  viewed: IContent[];
  maxNumber?: number;
}): IContent[] {
  if (viewed.length === 0) {
    const fallback = getFallbackContent();
    return typeof maxNumber === 'number'
      ? fallback.slice(0, maxNumber)
      : fallback;
  }

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

  const results = [...anchored, ...scored];
  return typeof maxNumber === 'number' ? results.slice(0, maxNumber) : results;
}
