import { Box, CircularProgress } from "@mui/material"
import {Header, Pokedex, Footer, Paging, PokemonData} from "../components"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemonList, Pokemon } from "../store/pokemon/pokemonListSlice"
import { AppDispatch } from "../store/store"
import { useLocation } from "react-router-dom"

function Home() {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const pokemonList = useSelector((state: any) => state.pokemonList);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: any) => state.pokemonList.loading);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = Number(params.get('page')) || 1;
    setPage(pageFromUrl);
  
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(pageFromUrl - 1) * 20}`;
    dispatch(fetchPokemonList(url));
  }, [location, dispatch]);
  
  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
    <Header />

    <Pokedex />
    {loading === 'succeded' ? (
      <>

      <Box sx={{padding: 5, display:'flex', flexDirection: 'column' ,alignItems:'center'}}>
        <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>

          {pokemonList.pokemons.map((pokemon: Pokemon, index: number) => (
            <PokemonData key={index} url={pokemon.url} />
          ))}
        </Box>
          
      </Box>

      </>
    ) : (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}} >
        <CircularProgress color="error" />
      </Box>
    )}
      <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
          <Paging page={page} onChange={handlePageChange}></Paging>
      </Box>

      <Footer />
      
    </>
  );
}

export default Home;
