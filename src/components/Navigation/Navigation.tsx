import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={s.navigation__container}>
      <NavLink
        className={s.navigation__link__characters}
        style={({ isActive }) => ({
          color: isActive ? '#11b0c8' : '#a9b1bd',
          borderBottom: isActive ? 'solid 3px #11B0C8' : 0,
        })}
        to="characters"
      >
        All characters
      </NavLink>
      <NavLink
        className={s.navigation__link__favorites}
        to="favorites"
        style={({ isActive }) => ({
          color: isActive ? '#11b0c8' : '#a9b1bd',
          borderBottom: isActive ? 'solid 3px #11B0C8' : 0,
        })}
      >
        Favorites
      </NavLink>
    </nav>
  );
}
