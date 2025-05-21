import { IContent } from '@/data/content';

const LS_KEY = 'user_viewed_content';
const HISTORY_LIMIT = 3; // 3 is good as avoids ties, if adjusting may need to tweak preferred collections logic e.g. 'max < 2'

export function getViewedContent(): IContent[] {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
}

export function resetViewedContent() {
  localStorage.removeItem(LS_KEY);
}

export function trackContentView(content: IContent) {
  const current = getViewedContent().filter((c) => c.id !== content.id);
  const updated = [...current.slice(-HISTORY_LIMIT + 1), content];
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
}

export function getRecommendedContent(): IContent[] {
  const viewed = getViewedContent();
  if (viewed.length === 0) return [];

  return [];
}
