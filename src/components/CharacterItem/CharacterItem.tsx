import s from './CharacterItem.module.css';
import { Character } from '../../interfaces/character-interface';
import { IconButton, TableCell, TableRow } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import StarIcon from '@mui/icons-material/Star';

export default function CharacterItem({
  name,
  image,
  id,
  gender,
  species,
  episode,
  favorite,
}: Character) {
  function addFavoriteCharacter(newFavoriteCharacter: Character) {
    const favorites = JSON.parse(localStorage.getItem('favorite') || '[]');

    const updateFavoriteCharacters = [...favorites, newFavoriteCharacter];

    localStorage.setItem('favorite', JSON.stringify(updateFavoriteCharacters));
  }

  return (
    <TableRow>
      <TableCell
        sx={{
          padding: 0,
          margin: 0,
        }}
        align="left"
      >
        <img className={s.character__image} src={image} alt="character foto" />
      </TableCell>
      <TableCell
        sx={{ padding: 0, paddingLeft: '120px', margin: 0 }}
        align="left"
      >
        {id}
      </TableCell>
      <TableCell
        sx={{ padding: 0, paddingLeft: '120px', margin: 0 }}
        align="left"
      >
        {name}
      </TableCell>
      <TableCell
        sx={{ padding: 0, paddingLeft: '153px', margin: 0 }}
        align="left"
      >
        {{
          Male: (
            <p className={s.character__gender}>
              <MaleIcon />
              {gender}
            </p>
          ),
          Female: (
            <p className={s.character__gender}>
              <FemaleIcon />
              {gender}
            </p>
          ),
          unknown: (
            <p className={s.character__gender}>
              <RemoveIcon />
              {gender}
            </p>
          ),
        }[gender] || (
          <p className={s.character__gender}>
            <CloseIcon />
            {gender}
          </p>
        )}
      </TableCell>
      <TableCell sx={{ padding: 0, paddingLeft: '152px' }} align="left">
        {species}
      </TableCell>
      <TableCell sx={{ padding: 0, paddingLeft: '149px' }} align="left">
        {episode}
      </TableCell>
      <TableCell sx={{ padding: 0, paddingLeft: '116px' }} align="left">
        {favorite ? (
          <IconButton
            className={s.character__button__checked}
            style={{
              width: 43,
              height: 43,
              border: '2px solid #11B0C8',
              borderRadius: 8,
            }}
            onClick={() => {
              addFavoriteCharacter({
                name,
                image,
                id,
                gender,
                species,
                episode,
                favorite: true,
              });
            }}
          >
            <StarIcon />
          </IconButton>
        ) : (
          <IconButton
            className={s.character__button}
            style={{
              width: 43,
              height: 43,
              border: '2px solid #11B0C8',
              borderRadius: 8,
            }}
            onClick={() => {
              addFavoriteCharacter({
                name,
                image,
                id,
                gender,
                species,
                episode,
                favorite: true,
              });
            }}
          >
            <StarIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
