import s from './CharacterList.module.css';
import CharacterItem from '../CharacterItem';
import { CharacterProps } from '../../interfaces/character-interface';
import BasicPagination from '../Pagination';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material/';

export default function CharacterList({
  characters,
  pages,
  getPersons,
}: CharacterProps) {
  return (
    <section className={s.characters__section}>
      <TableContainer
        sx={{
          tableLayout: 'fixed',
          boxShadow: 'none',
          color: '#A9B1BD',
          width: '100%',
        }}
        component={Paper}
      >
        <Table
          sx={{
            '& .MuiTableHead-root': {
              backgroundColor: 'rgba(229, 234, 244, 0.25)',
            },
            '& .MuiTableCell-sizeMedium.MuiTableCell-head': {
              borderBottom: 0,
              fontWeight: 500,
            },
            '& .MuiTableCell-root': {
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: 400,
              color: '#A9B1BD',
            },
          }}
          aria-label="caption table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: '8%',
                  padding: '16px 0 16px 140px',
                }}
                align="left"
              >
                Photo
              </TableCell>
              <TableCell
                sx={{ width: '8%', padding: '16px 0 16px 120px' }}
                align="left"
              >
                Character
              </TableCell>
              <TableCell
                sx={{ width: '8%', padding: '16px 0 16px 120px' }}
                align="left"
              >
                Name
              </TableCell>
              <TableCell
                sx={{ width: '8%', padding: '16px 0 16px 153px' }}
                align="left"
              >
                Gender
              </TableCell>
              <TableCell
                sx={{ width: '8%', padding: '16px 0 16px 152px' }}
                align="left"
              >
                Species
              </TableCell>
              <TableCell
                sx={{ width: '14%', padding: '16px 0 16px 149px' }}
                align="left"
              >
                Last Episode
              </TableCell>
              <TableCell
                sx={{
                  width: '134px',
                  padding: '16px 0 16px 116px',
                }}
                align="left"
              >
                Add To Favorites
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map(el => (
              <CharacterItem key={el.id} {...el} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BasicPagination page={pages} getPersons={getPersons} />
    </section>
  );
}
