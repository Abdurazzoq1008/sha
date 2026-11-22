import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ShopContext = createContext(null);
const FAVORITES_KEY = 'bloom-favorites';

function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error('Unable to read BLOOM favorites from localStorage.', error);
    return [];
  }
}

export function ShopProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Unable to save BLOOM favorites to localStorage.', error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }, []);

  return (
    <ShopContext.Provider
      value={{
        favorites,
        toggleFavorite,
        searchQuery,
        setSearchQuery,
        favoritesOnly,
        setFavoritesOnly,
        category,
        setCategory,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
}
