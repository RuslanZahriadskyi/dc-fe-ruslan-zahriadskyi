const baseUrlEpisode = 'https://rickandmortyapi.com/api/episode';

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
  try {
    const response = await fetch(`${baseUrlEpisode}/${id}`);
    const episode = await response.json();
    return episode;
  } catch (error) {
    console.error(error);
  }
}

async function getEpisodes(episodes: string) {
  try {
    const response = await fetch(`${baseUrlEpisode}/${episodes}`);
    const { characters } = await response.json();
    return characters;
  } catch (error) {
    console.error(error);
  }
}

export { getLastEpisode, getEpisodeById, getEpisodes };
