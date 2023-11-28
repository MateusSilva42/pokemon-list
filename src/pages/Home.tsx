import { Box, Pagination} from "@mui/material";
import Header from "../components/Header";
import Pokedex from "../components/Pokedex";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList, Pokemon } from "../store/pokemon/pokemonListSlice";
import { AppDispatch } from "../store/store";
import PokemonData from "../components/pokemonData";

function Home() {
  const pokemonList = useSelector((state: any) => state.pokemonList);
  const dispatch = useDispatch<AppDispatch>();
  // const loading = useSelector((state: any) => state.pokemonList.loading);

  useEffect(() => {
      dispatch(fetchPokemonList());
  }, [])

  console.log('lISTA DE POKEMONS', pokemonList);
  

  return (
    <>
      <Header />

      <Pokedex />

      <Box sx={{padding: 5, display:'flex', flexDirection: 'column' ,alignItems:'center'}}>
        <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>
          {pokemonList.pokemons.map((pokemon: Pokemon, index: number) => (
            // <PokemonCard key={index} url={pokemon.url} />
            <PokemonData key={index} url={pokemon.url} />
          ))}
        </Box>
          
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
          <Pagination></Pagination>
      </Box>

      <Footer />

    </>
  );
}

export default Home;
