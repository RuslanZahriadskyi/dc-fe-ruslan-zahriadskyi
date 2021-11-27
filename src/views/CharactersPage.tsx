import { useState, useEffect } from 'react';
import CharacterList from '../components/CharacterList';
import { Character } from '../interfaces/character-interface';
import { getCharacters } from '../api/character-operations';
import { getLastEpisode } from '../api/episode-operations';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    getPersons(1);
  }, []);

  async function getPersons(page: number) {
    try {
      const { results: characters, info } = await getCharacters(page);

      setPages(info.pages);

      const newCharacters: Character[] = await Promise.all(
        characters.map(
          async ({ name, image, id, gender, species, episode }: Character) => {
            const scene: string = episode.slice(episode.length - 1).toString();

            const lastEpisode: string = await getLastEpisode(scene);

            return {
              name,
              image,
              id,
              gender,
              species,
              episode: lastEpisode,
            };
          },
        ),
      );

      setCharacters(newCharacters);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <CharacterList
        characters={characters}
        pages={pages}
        getPersons={getPersons}
      />
    </>
  );
}
