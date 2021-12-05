import { useState, useEffect } from 'react';
import CharacterList from '../components/CharacterList';
import {
  Character,
  CharactersPageProps,
} from '../interfaces/character-interface';
import { getCharacters } from '../api/character-operations';
import { getLastEpisode } from '../api/episode-operations';

export default function CharactersPage({
  charactersSearch,
  pagesSearch,
  getCharactersSearchByPage,
}: CharactersPageProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    !charactersSearch?.length && getPersons(1);
  }, [charactersSearch]);

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
      {charactersSearch?.length ? (
        <CharacterList
          characters={charactersSearch}
          pages={pagesSearch}
          getPersons={getCharactersSearchByPage}
        />
      ) : (
        <CharacterList
          characters={characters}
          pages={pages}
          getPersons={getPersons}
        />
      )}
    </>
  );
}
