/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Carrega os favoritos do LocalStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("@vflix-favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const addFavorite = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem("@vflix-favorites", JSON.stringify(newFavorites));
  };

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("@vflix-favorites", JSON.stringify(newFavorites));
  };

  const isFavorite = (id) => favorites.some((movie) => movie.id === id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}