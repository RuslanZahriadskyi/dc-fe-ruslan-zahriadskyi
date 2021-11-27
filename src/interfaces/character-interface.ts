interface Character {
  id: number;
  image: string;
  name: string;
  gender: string;
  species: string;
  episode: string;
  favorite?: boolean;
}

interface CharacterProps {
  characters: Character[];
  pages?: number;
  getPersons: (page: number) => void;
}

export type { Character, CharacterProps };
