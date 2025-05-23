import { content, IContent } from '@/data/content';

function getFallbackContent(excludeIds: Set<string> = new Set()): IContent[] {
  const anchored = content.filter(
    (c) => c.ranking === 'anchored' && !excludeIds.has(c.id)
  );

  const featured = content.filter(
    (c) =>
      c.ranking === 'featured' &&
      !anchored.some((a) => a.id === c.id) &&
      !excludeIds.has(c.id)
  );

  const usedIds = new Set(
    [...anchored, ...featured].map((c) => c.id).concat([...excludeIds])
  );

  const random = content
    .filter((c) => !usedIds.has(c.id))
    .sort(() => 0.5 - Math.random());

  return [...anchored, ...featured, ...random];
}

export function getRecommendedContent({
  history,
  entries = 4,
}: {
  history: IContent[];
  entries?: number;
}): IContent[] {
  if (history.length === 0) {
    return getFallbackContent().slice(0, entries);
  }

  const tagFrequency: Record<string, number> = {};
  history.forEach((item) => {
    item.tags.forEach((tag) => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    });
  });

  const viewedIds = new Set(history.map((c) => c.id));
  const anchored = content.filter(
    (item) => item.ranking === 'anchored' && !viewedIds.has(item.id)
  );

  const matching = content.filter(
    (item) => item.ranking !== 'anchored' && !viewedIds.has(item.id)
  );

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
      const aRank = a.item.ranking === 'featured' ? 1 : 0;
      const bRank = b.item.ranking === 'featured' ? 1 : 0;
      if (bRank !== aRank) return bRank - aRank;
      return b.score - a.score;
    })
    .map(({ item }) => item);

  const recommended = [...anchored, ...scored].slice(0, entries);

  if (recommended.length >= entries) return recommended;

  const usedIds = new Set(recommended.map((c) => c.id).concat([...viewedIds]));
  const fallback = getFallbackContent(usedIds);

  return [...recommended, ...fallback].slice(0, entries);
}
