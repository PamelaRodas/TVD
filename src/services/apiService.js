const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Helper para hacer requests
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error);
    throw error;
  }
}

// Diary Entries
export async function getDiaryEntries() {
  return apiRequest('/diary');
}

export async function addDiaryEntry(entry) {
  return apiRequest('/diary', {
    method: 'POST',
    body: JSON.stringify(entry),
  });
}

// Photo Moments
export async function getPhotoMoments() {
  return apiRequest('/photos');
}

export async function addPhotoMoment(moment) {
  return apiRequest('/photos', {
    method: 'POST',
    body: JSON.stringify(moment),
  });
}

// Content Summary
export async function getContentSummary() {
  return apiRequest('/content/summary');
}
