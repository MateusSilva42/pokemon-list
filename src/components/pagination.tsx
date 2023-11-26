import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  const history = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    // history.push(`/page/${page}`);
    console.log('change page', page);
    
  };

  return (
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handleChange} />
    </Stack>
  );
}