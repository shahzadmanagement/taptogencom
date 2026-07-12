import { getEventsLog } from './search-analytics';
import { tools } from '../data/tools';

export interface TrendingItem {
  query: string;
  count: number;
  score: number; // weight boost score
}

function getQueryFrequencyInTimeRange(hoursLimit: number): Map<string, number> {
  const events = getEventsLog();
  const limitMs = hoursLimit * 60 * 60 * 1000;
  const cutoffTime = Date.now() - limitMs;

  const frequency = new Map<string, number>();

  events.forEach(e => {
    if (new Date(e.timestamp).getTime() >= cutoffTime && e.query) {
      const qNorm = e.normalizedQuery;
      frequency.set(qNorm, (frequency.get(qNorm) || 0) + 1);
    }
  });

  return frequency;
}

export function getTrendingToday(): TrendingItem[] {
  const freq = getQueryFrequencyInTimeRange(24);
  return Array.from(freq.entries()).map(([query, count]) => {
    return {
      query,
      count,
      score: count * 1.5
    };
  }).sort((a, b) => b.score - a.score).slice(0, 5);
}

export function getTrendingWeek(): TrendingItem[] {
  const freq = getQueryFrequencyInTimeRange(168);
  return Array.from(freq.entries()).map(([query, count]) => {
    return {
      query,
      count,
      score: count * 1.2
    };
  }).sort((a, b) => b.score - a.score).slice(0, 5);
}

export function getTrendingMonth(): TrendingItem[] {
  const freq = getQueryFrequencyInTimeRange(720);
  return Array.from(freq.entries()).map(([query, count]) => {
    return {
      query,
      count,
      score: count * 1.0
    };
  }).sort((a, b) => b.score - a.score).slice(0, 5);
}

export function getFastRisingQueries(): TrendingItem[] {
  // Fast rising calculation: comparing today's frequency vs yesterday's
  const freqToday = getQueryFrequencyInTimeRange(24);
  const freqYesterday = getQueryFrequencyInTimeRange(48);

  const rising: TrendingItem[] = [];

  freqToday.forEach((todayCount, query) => {
    const totalCount = freqYesterday.get(query) || 1;
    const yesterdayCount = totalCount - todayCount;

    // Spike ratio formula
    const ratio = yesterdayCount > 0 ? (todayCount - yesterdayCount) / yesterdayCount : todayCount;
    if (ratio > 0.5) {
      rising.push({
        query,
        count: todayCount,
        score: ratio * 10
      });
    }
  });

  return rising.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function getMostPopularTools(): { slug: string; name: string; clicks: number }[] {
  const events = getEventsLog();
  const clickedEvents = events.filter(e => e.eventType === 'ResultClicked');
  const toolClicks = new Map<string, number>();

  clickedEvents.forEach(e => {
    if (e.clickedTool) {
      toolClicks.set(e.clickedTool, (toolClicks.get(e.clickedTool) || 0) + 1);
    }
  });

  return Array.from(toolClicks.entries()).map(([slug, clicks]) => {
    const tool = tools.find(t => t.slug === slug);
    return {
      slug,
      name: tool ? tool.name : slug,
      clicks
    };
  }).sort((a, b) => b.clicks - a.clicks);
}
