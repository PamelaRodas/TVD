import { defaultDiaryEntries } from "../data/diaryEntries";
import { defaultPhotoMoments } from "../data/photoMoments";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function normalizeAuthor(value) {
  const author = String(value || '').trim();
  return author || 'anonymous soul';
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
  // Fallback to default entries if API fails
  return defaultDiaryEntries;
}

export async function addDiaryEntry(entry) {
  try {
    const response = await fetch(`${API_URL}/diary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...entry,
        author: normalizeAuthor(entry.author),
      }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error adding diary entry:', error);
  }
  // Return the entry if API fails
  return {
    id: `diary-${Date.now()}`,
    ...entry,
    author: normalizeAuthor(entry.author),
  };
}

export async function resetDiaryEntries() {
  try {
    const response = await fetch(`${API_URL}/diary`, { method: 'DELETE' });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error resetting diary entries:', error);
  }
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
  // Fallback to default photos if API fails
  return defaultPhotoMoments;
}

export async function addPhotoMoment(moment) {
  try {
    const response = await fetch(`${API_URL}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...moment,
        author: normalizeAuthor(moment.author),
      }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error adding photo moment:', error);
  }
  // Return the moment if API fails
  return {
    id: `photo-${Date.now()}`,
    ...moment,
    author: normalizeAuthor(moment.author),
  };
}

export async function resetPhotoMoments() {
  try {
    const response = await fetch(`${API_URL}/photos`, { method: 'DELETE' });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error resetting photo moments:', error);
  }
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
  // Fallback calculation
  const diary = await getDiaryEntries();
  const photos = await getPhotoMoments();
  return {
    diaryCount: diary.length,
    photoCount: photos.length,
  };
}
