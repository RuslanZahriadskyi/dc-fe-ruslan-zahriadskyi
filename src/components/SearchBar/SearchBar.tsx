import { SetStateAction, useState } from 'react';
import s from './SearchBar.module.css';
import {
  InputAdornment,
  TextField,
  MenuItem,
  Select,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SubmitFilter } from '../../interfaces/filter-interface';

export default function SearchBar({
  onSubmit,
}: {
  onSubmit: ({ filter, filterValue }: SubmitFilter) => void;
}) {
  const [filter, setFilter] = useState<string>('Name');
  const [filterValue, setFilterValue] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('Rick Sanchez');

  function handleChange(event: { target: { value: SetStateAction<string> } }) {
    setFilter(event.target.value);
  }

  function changePlaceholder(event: React.MouseEvent<HTMLElement>) {
    const placeholder =
      (event.target as HTMLButtonElement).getAttribute('data-value') || '';

    if (placeholder.trim() === '') {
      return;
    }

    if (placeholder.trim() === 'Name') {
      return setPlaceholder('Rick Sanchez');
    }
    if (placeholder.trim() === 'Episode' || 'Identifier') {
      return setPlaceholder('correct form 1 or 1,2,15');
    }
  }

  function filterValueChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setFilterValue(event.target.value);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    onSubmit({ filter, filterValue });
    setFilterValue('');
  }

  return (
    <div className={s.searchBar__container}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={s.searchBar__placeholder}
          placeholder="Search By"
          sx={{
            '& .Mui-disabled': {
              borderRadius: 0,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            },
            '& .Mui-disabled .MuiOutlinedInput-input': {
              color: '#A9B1BD',
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: 500,
              borderRadius: 0,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              WebkitTextFillColor: 'rgba(0,0,0,1)',
            },
          }}
          disabled={true}
        />
        <Select
          className={s.searchBar__items}
          id="demo-simple-select"
          value={filter}
          defaultValue={filter}
          onChange={handleChange}
          onClick={changePlaceholder}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: '0px 0px 12px 12px',
                border: '1px solid #A9B1BD',
                color: '#A9B1BD',
                marginTop: '5px',
                '& .MuiList-root': {
                  padding: 0,
                },
                '& .MuiMenuItem-root': {
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: 'solid 1px #A9B1BD',
                  padding: '16px 0 16px 17.63px',
                },
                '& .MuiMenuItem-root .MuiOutlinedInput-input': {
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: 'solid 1px #A9B1BD',
                  padding: '16px 0 16px 17.63px',
                },
              },
            },
          }}
        >
          <MenuItem value={'Name'}>Name</MenuItem>
          <MenuItem value={'Identifier'}>Identifier</MenuItem>
          <MenuItem value={'Episode'}>Episode</MenuItem>
        </Select>
        <TextField
          className={s.searchBar__input}
          id="outlined-basic"
          value={filterValue}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" style={{ paddingRight: '16px' }}>
                  <SearchIcon style={{ color: '#11B0C8' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={filterValueChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingRight: 0,
              borderRadius: 0,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            },
            '& .MuiSvgIcon-root': {
              width: 32,
              height: 32,
            },
          }}
          placeholder={placeholder}
        />
      </form>
    </div>
  );
}
