import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PagingProps {
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function Paging({ page: initialPage, onChange }: PagingProps) {
  const navigate = useNavigate();
  const pokemonList = useSelector((state: any) => state.pokemonList)
  const totalPokemons = pokemonList.count
  const totalPages = Math.ceil(totalPokemons / 20);
  
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    onChange(event, page);
    navigate(`?page=${page}`)
  };


  return (
    <>
    <Stack spacing={2}>
      <Pagination count={totalPages} page={currentPage} variant="outlined" shape="rounded" onChange={handleChange} />
    </Stack>
    </>
  );
}