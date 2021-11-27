import { useEffect, useState } from 'react';
import CharacterList from '../components/CharacterList';
import { Character } from '../interfaces/character-interface';

export default function FavoritesPage() {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favorite') || '[]');

    setFavoriteCharacters(favorite);
  }, []);

  async function getPersons(page: number) {
    try {
      const favorite = JSON.parse(localStorage.getItem('favorite') || '[]');

      setFavoriteCharacters(favorite);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <CharacterList characters={favoriteCharacters} getPersons={getPersons} />
    </>
  );
}
