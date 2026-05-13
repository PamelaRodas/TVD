import { defaultDiaryEntries } from "../data/diaryEntries";
import { defaultPhotoMoments } from "../data/photoMoments";

const STORAGE_KEYS = {
  diary: "tvd:diaryEntries",
  photos: "tvd:photoMoments",
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

export function getDiaryEntries() {
  const saved = readCollection(STORAGE_KEYS.diary, defaultDiaryEntries);
  return mergeWithDefaults(saved, defaultDiaryEntries);
}

export function addDiaryEntry(entry) {
  const current = getDiaryEntries();
  const next = [
    {
      id: `diary-${Date.now()}`,
      ...entry,
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
  return mergeWithDefaults(saved, defaultPhotoMoments);
}

export function addPhotoMoment(moment) {
  const current = getPhotoMoments();
  const next = [
    {
      id: `photo-${Date.now()}`,
      ...moment,
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
