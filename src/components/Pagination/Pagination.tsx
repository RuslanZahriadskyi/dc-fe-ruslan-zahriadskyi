import { Pagination, Stack, PaginationItem } from '@mui/material';
import s from './Pagination.module.css';

interface IProps {
  page?: number;
  getPersons: (page: number) => void;
}

export default function BasicPagination({ page, getPersons }: IProps) {
  return (
    <>
      <Stack spacing={4}>
        <Pagination
          className={s.buttons__container}
          count={page}
          defaultPage={1}
          variant="outlined"
          shape="rounded"
          onChange={(e, page) => {
            getPersons(page);
          }}
          renderItem={item => {
            return <PaginationItem className={s.buttons} {...item} />;
          }}
        />
      </Stack>
    </>
  );
}
