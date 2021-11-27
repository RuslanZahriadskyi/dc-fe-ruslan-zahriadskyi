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
import { getEpisodeById } from './api/episode-operations';
import { Character } from './interfaces/character-interface';
import './App.css';

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

  async function onSubmit({ filter, filterValue }: SubmitFilter) {
    if (filter === 'Name') {
      const { results: characters, info } = await getCharacterByName(
        filterValue,
      );
    }
    if (filter === 'Identifier') {
      if (filterValue.length > 1) {
        const characters = await getCharactersByIds(filterValue);
        setCharacters(characters);
        return;
      }
      const character = await getCharacterById(filterValue);
      setCharacters([...character]);
    }
    if (filter === 'Episode') {
      const { results: characters, info } = await getEpisodeById(filterValue);
    }
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
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
