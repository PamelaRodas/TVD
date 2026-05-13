import { useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : {
      quotes: [],
      photos: [],
      tracks: [],
    };
  });

  const toggleFavorite = (type, id) => {
    setFavorites((prev) => {
      const current = prev[type] ?? [];
      const updatedList = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      const updated = { ...prev, [type]: updatedList };

      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (type, id) => {
    return favorites[type]?.includes(id) || false;
  };

  return { favorites, toggleFavorite, isFavorite };
}
