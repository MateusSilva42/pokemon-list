import { Box} from "@mui/material";
import Header from "../components/Header";
import Pokedex from "../components/Pokedex";
import PokemonCard from "../components/PokemonCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList, Pokemon } from "../store/pokemon/pokemonListSlice";
import { AppDispatch } from "../store/store";

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
            <PokemonCard key={index} name={pokemon.name} />
          ))}
        </Box>
          
       
      </Box>

      <Footer />

    </>
  );
}

export default Home;
