import { Box, Pagination} from "@mui/material";
import Header from "../components/header";
import Pokedex from "../components/Pokedex";
import PokemonCard from "../components/PokemonCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList, Pokemon } from "../store/pokemon/pokemonListSlice";
import { AppDispatch } from "../store/store";
import PokemonData from "../components/pokemonData";

function PokemonPage() {
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
            XABLAU
        </Box>
          
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
          <Pagination></Pagination>
      </Box>

      <Footer />

    </>
  );
}

export default PokemonPage;
