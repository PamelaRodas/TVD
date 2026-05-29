import { defaultDiaryEntries } from "../data/diaryEntries";
import { defaultPhotoMoments } from "../data/photoMoments";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const DIARY_STORAGE_KEY = 'tdv-diary-entries';
const PHOTO_STORAGE_KEY = 'tdv-photo-moments';

function normalizeAuthor(value) {
  const author = String(value || '').trim();
  return author || 'anonymous soul';
}

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error reading storage for', key, error);
  }
  return fallback;
}

function saveToStorage(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving storage for', key, error);
  }
}

export async function getDiaryEntries() {
  try {
    const response = await fetch(`${API_URL}/diary`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching diary entries:', error);
  }
  return loadFromStorage(DIARY_STORAGE_KEY, defaultDiaryEntries);
}

export async function addDiaryEntry(entry) {
  const savedEntry = {
    id: `diary-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...entry,
    author: normalizeAuthor(entry.author),
  };

  try {
    const response = await fetch(`${API_URL}/diary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(savedEntry),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error adding diary entry:', error);
  }

  const existing = loadFromStorage(DIARY_STORAGE_KEY, defaultDiaryEntries);
  const next = [savedEntry, ...existing];
  saveToStorage(DIARY_STORAGE_KEY, next);
  return savedEntry;
}

export async function resetDiaryEntries() {
  try {
    const response = await fetch(`${API_URL}/diary`, { method: 'DELETE' });
    if (response.ok) {
      localStorage.removeItem(DIARY_STORAGE_KEY);
      return await response.json();
    }
  } catch (error) {
    console.error('Error resetting diary entries:', error);
  }
  localStorage.removeItem(DIARY_STORAGE_KEY);
  return defaultDiaryEntries;
}

export async function getPhotoMoments() {
  try {
    const response = await fetch(`${API_URL}/photos`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching photo moments:', error);
  }
  return loadFromStorage(PHOTO_STORAGE_KEY, defaultPhotoMoments);
}

export async function addPhotoMoment(moment) {
  const savedMoment = {
    id: `photo-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...moment,
    author: normalizeAuthor(moment.author),
  };

  try {
    const response = await fetch(`${API_URL}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(savedMoment),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error adding photo moment:', error);
  }

  const existing = loadFromStorage(PHOTO_STORAGE_KEY, defaultPhotoMoments);
  const next = [savedMoment, ...existing];
  saveToStorage(PHOTO_STORAGE_KEY, next);
  return savedMoment;
}

export async function resetPhotoMoments() {
  try {
    const response = await fetch(`${API_URL}/photos`, { method: 'DELETE' });
    if (response.ok) {
      localStorage.removeItem(PHOTO_STORAGE_KEY);
      return await response.json();
    }
  } catch (error) {
    console.error('Error resetting photo moments:', error);
  }
  localStorage.removeItem(PHOTO_STORAGE_KEY);
  return defaultPhotoMoments;
}

export async function getContentSummary() {
  try {
    const response = await fetch(`${API_URL}/content/summary`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching content summary:', error);
  }
  const diary = await getDiaryEntries();
  const photos = await getPhotoMoments();
  return {
    diaryCount: diary.length,
    photoCount: photos.length,
  };
}
