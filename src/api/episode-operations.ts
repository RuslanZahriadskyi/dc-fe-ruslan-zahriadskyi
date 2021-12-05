import { Character } from '../interfaces/character-interface';
import { getCharactersByEpisode } from './character-operations';
import { IResponse, ApiError } from '../interfaces/response-interface';

const baseUrlEpisode = 'https://rickandmortyapi.com/api/episode';

interface Response {
  characters: string[];
}

async function getLastEpisode(url: string) {
  try {
    const response = await fetch(url);
    const { episode } = await response.json();

    return episode;
  } catch (error) {
    console.error(error);
  }
}

async function getEpisodeById(id: string) {
  const response = await fetch(`${baseUrlEpisode}/${id}`);
  const episode = await response.json();

  const characterInEpisode: Character[] = await getCharacters(
    episode.characters,
  );

  return characterInEpisode;
}

async function getEpisodes(episodes: string) {
  const response = await fetch(`${baseUrlEpisode}/${episodes}`);
  const data = await response.json();

  const characters: Character[] = await Promise.all(
    data.map(async ({ characters }: Response) => getCharacters(characters)),
  );

  const charactersId: number[] = characters.flat().map(el => el.id);

  const filteredCharacters: Character[] = characters
    .flat()
    .filter((el, index) => !charactersId.includes(el.id, index + 1))
    .sort((a, b) => {
      return a.id - b.id;
    });

  return filteredCharacters;
}

const getCharacters = async (characters: string[]) => {
  return await Promise.all(
    characters.map((url: string) => {
      const character: Promise<Character> = getCharactersByEpisode(url);
      return character;
    }),
  );
};

export { getLastEpisode, getEpisodeById, getEpisodes };
