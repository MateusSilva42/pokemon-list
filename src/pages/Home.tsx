import { Box, Pagination} from "@mui/material";
import Header from "../components/Header";
import Pokedex from "../components/Pokedex";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList, Pokemon } from "../store/pokemon/pokemonListSlice";
import { AppDispatch } from "../store/store";
import PokemonData from "../components/pokemonData";
import { removeFavorite, addFavorite } from "../store/favorite/favoriteSlice"


function Home() {
  const favorite = useSelector((state: any) => state.favorite);
  const pokemonList = useSelector((state: any) => state.pokemonList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(fetchPokemonList());
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorite.favorites));
  }, [favorite.favorites]);


  console.log('lISTA DE POKEMONS', pokemonList);
  console.log('favorito da home', favorite);
  
  

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
