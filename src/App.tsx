import { Suspense, lazy, useState } from 'react';
import Loading from './components/Loader';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Header from './components/Header';
import { SubmitFilter } from './interfaces/filter-interface';
import {
  getCharacterById,
  getCharactersByIds,
  getCharacterByName,
} from './api/character-operations';
import { getEpisodeById, getEpisodes } from './api/episode-operations';
import { Character, TCharacter } from './interfaces/character-interface';
import './App.css';
import { type } from 'os';

const CharactersPage = lazy(
  () =>
    import('./views/CharactersPage' /* webpackChunkName: "characters-page" */),
);

const FavoritesPage = lazy(
  () =>
    import('./views/FavoritesPage' /* webpackChunkName: "favotires-page" */),
);

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [renderCharacters, setRenderCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string>('');

  async function onSubmit({ filter, filterValue }: SubmitFilter) {
    if (filter === 'Name') {
      const { results: characters, info } = await getCharacterByName(
        filterValue,
      );
    }
    if (filter === 'Identifier') {
      if (filterValue.length > 1) {
        const characters: Character[] = await getCharactersByIds(filterValue);
        setCharacters(characters);
        return;
      }
      const character: Character[] = await getCharacterById(filterValue);
      setCharacters([...character]);
    }
    if (filter === 'Episode') {
      try {
        if (filterValue.length > 1) {
          const characters = await getEpisodes(filterValue);
          setCharacters(characters);
          setRenderCharacters(characters.slice(0, 20));
          setPages(Math.ceil(Number(characters.length) / 19));
          return;
        }
        const characters = await getEpisodeById(filterValue);

        setCharacters(characters);
        setRenderCharacters(characters.slice(0, 20));
        characters.length < 20
          ? setPages(1)
          : setPages(Math.ceil(Number(characters.length) / 19));
      } catch (error) {
        setError((error as Error).message);
      }
      return;
    }
  }

  function getCharactersByPage(page: number) {
    const charactersPerPage: number = 20;
    const prevPage: number = page - 1;

    if (page === 1) {
      const renderCharacters = characters.slice(0, charactersPerPage);
      setRenderCharacters(renderCharacters);
      return;
    }

    if (page === pages) {
      const renderCharacters = characters.slice(
        -Number(characters.length) + prevPage * charactersPerPage,
      );
      setRenderCharacters(renderCharacters);
      return;
    }

    const renderCharacters = characters.slice(
      charactersPerPage * page - charactersPerPage,
      charactersPerPage * page,
    );
    setRenderCharacters(renderCharacters);
  }

  return (
    <div className="app-container">
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <Header onSubmit={onSubmit} />
        <Navigation />

        <Routes>
          <Route
            path="/characters"
            element={
              <CharactersPage
                charactersSearch={renderCharacters}
                pagesSearch={pages}
                getCharactersSearchByPage={getCharactersByPage}
              />
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
