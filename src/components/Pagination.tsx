import {Pagination, Stack} from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface PagingProps {
  page: number
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void
}

export default function Paging({ page: initialPage, onChange }: PagingProps) {
  const navigate = useNavigate()
  const pokemonList = useSelector((state: any) => state.pokemonList)
  const totalPokemons = pokemonList.count
  const totalPages = Math.ceil(totalPokemons / 20)
  
  const [currentPage, setCurrentPage] = React.useState(initialPage)

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage])

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    onChange(event, page)
    navigate(`?page=${page}`)
  };


  return (
    <>
    <Stack spacing={2}>
      <Pagination 
      count={totalPages} 
      page={currentPage} 
      variant="outlined" 
      shape="rounded" 
      onChange={handleChange}
      sx={{
        color: 'black',
        '& .MuiPaginationItem-root': {
          backgroundColor: 'lightyellow',
          borderColor: 'black',
          fontWeight: 'bold',
          // boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.5)',
        },
        '& .MuiPaginationItem-page.Mui-selected': {
          backgroundColor: '#f00',
          color: 'white'
        },
      }}
       />
    </Stack>
    </>
  )
}