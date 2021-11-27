const baseUrlCharacter = 'https://rickandmortyapi.com/api/character';

async function getCharacters(page?: number) {
  try {
    const response = await fetch(`${baseUrlCharacter}/?page=${page}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getCharacterById(id: string) {
  try {
    const response = fetch(`${baseUrlCharacter}/${id}`);
    const character = (await response).json();

    return character;
  } catch (error) {
    console.log(error);
  }
}

async function getCharactersByIds(charactersId: string) {
  try {
    const response = fetch(`${baseUrlCharacter}/${charactersId}`);
    const characters = (await response).json();
    return characters;
  } catch (error) {
    console.log(error);
  }
}

async function getCharacterByName(name: string) {
  try {
    const response = fetch(`${baseUrlCharacter}/?name=${name}`);
    const character = (await response).json();

    return character;
  } catch (error) {
    console.log(error);
  }
}

export {
  getCharacters,
  getCharacterById,
  getCharactersByIds,
  getCharacterByName,
};
