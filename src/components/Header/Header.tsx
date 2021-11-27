import SearchBar from '../SearchBar';
import s from './Header.module.css';
import Logo from '../../image/Logo.svg';
import { SubmitFilter } from '../../interfaces/filter-interface';

export default function Header({
  onSubmit,
}: {
  onSubmit: ({ filter, filterValue }: SubmitFilter) => void;
}) {
  return (
    <div className={s.header__container}>
      <img className={s.header__logo} src={Logo} alt="logo" />
      <SearchBar onSubmit={onSubmit} />
    </div>
  );
}
