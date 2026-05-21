import { defaultDiaryEntries } from "../data/diaryEntries";
import { defaultPhotoMoments } from "../data/photoMoments";

const STORAGE_KEYS = {
  diary: "manifestation:diaryEntries",
  photos: "manifestation:photoMoments",
};

function readCollection(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

function mergeWithDefaults(savedItems, defaultItems) {
  const defaultIds = new Set(defaultItems.map((item) => item.id));
  const customItems = savedItems.filter((item) => !defaultIds.has(item.id));
  return [...defaultItems, ...customItems];
}

function writeCollection(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function normalizeAuthor(value) {
  const author = String(value || '').trim();
  return author || 'anonymous soul';
}

export function getDiaryEntries() {
  const saved = readCollection(STORAGE_KEYS.diary, defaultDiaryEntries);
  return mergeWithDefaults(saved, defaultDiaryEntries).map((entry) => ({
    ...entry,
    author: normalizeAuthor(entry.author),
  }));
}

export function addDiaryEntry(entry) {
  const current = getDiaryEntries();
  const next = [
    {
      id: `diary-${Date.now()}`,
      ...entry,
      author: normalizeAuthor(entry.author),
    },
    ...current,
  ];

  return writeCollection(STORAGE_KEYS.diary, next);
}

export function resetDiaryEntries() {
  localStorage.removeItem(STORAGE_KEYS.diary);
  return defaultDiaryEntries;
}

export function getPhotoMoments() {
  const saved = readCollection(STORAGE_KEYS.photos, defaultPhotoMoments);
  return mergeWithDefaults(saved, defaultPhotoMoments).map((moment) => ({
    ...moment,
    author: normalizeAuthor(moment.author),
  }));
}

export function addPhotoMoment(moment) {
  const current = getPhotoMoments();
  const next = [
    {
      id: `photo-${Date.now()}`,
      ...moment,
      author: normalizeAuthor(moment.author),
    },
    ...current,
  ];

  return writeCollection(STORAGE_KEYS.photos, next);
}

export function resetPhotoMoments() {
  localStorage.removeItem(STORAGE_KEYS.photos);
  return defaultPhotoMoments;
}

export function getContentSummary() {
  return {
    diaryCount: getDiaryEntries().length,
    photoCount: getPhotoMoments().length,
  };
}
