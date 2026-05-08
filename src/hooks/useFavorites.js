import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState({
    quotes: [],
    photos: [],
    tracks: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (type, id) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      const array = updated[type];
      const index = array.indexOf(id);

      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(id);
      }

      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (type, id) => {
    return favorites[type]?.includes(id) || false;
  };

  return { favorites, toggleFavorite, isFavorite };
}
