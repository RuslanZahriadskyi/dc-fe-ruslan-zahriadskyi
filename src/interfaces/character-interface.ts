interface Character {
  id: number;
  image: string;
  name: string;
  gender: string;
  species: string;
  episode: string;
  favorite?: boolean;
}

type TCharacter = Character[];

interface CharactersPageProps {
  charactersSearch?: Character[];
  pagesSearch?: number;
  getCharactersSearchByPage: (page: number) => void;
}

interface CharacterProps {
  characters: Character[];
  pages?: number;
  getPersons: (page: number) => void;
}

export type { Character, CharacterProps, CharactersPageProps, TCharacter };
