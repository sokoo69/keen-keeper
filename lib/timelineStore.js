const TIMELINE_KEY = "keenkeeper_timeline";

export function getTimeline() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TIMELINE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTimeline(entries) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIMELINE_KEY, JSON.stringify(entries));
}

export function addTimelineEntry(entry) {
  const current = getTimeline();
  const newEntry = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...entry,
  };
  const updated = [newEntry, ...current];
  saveTimeline(updated);
  return updated;
}

export function initializeTimeline() {
}
