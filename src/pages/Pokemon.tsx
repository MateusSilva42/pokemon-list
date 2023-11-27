import { Box, Pagination, Typography} from "@mui/material";
import Header from "../components/Header";
import Pokedex from "../components/Pokedex";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import PokemonData from "../components/pokemonData";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchPokemon } from "../store/pokemon/pokemonSlice";

function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id){
    navigate('/');
  }

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: any) => state);
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  useEffect(() => {
    // Substitua 'url' pela URL que você deseja buscar
    dispatch(fetchPokemon(url));
  }, [id, dispatch]);

  const pokemon = id !== undefined ? state.pokemon.data[id] : undefined;
  const pokemonStats = pokemon ? pokemon.stats : undefined;
  const statColors = ['green', 'yellow', 'orange', 'blue', 'purple', 'pink']

  console.log('pokemonStats', pokemonStats);
  

  console.log('pokemon', pokemon);
  

  if(!pokemon) {
    return null
  }
  

  return (
    <>
      <Header />

      <Pokedex />

      <Box sx={{padding: 5, display:'flex'}}>
        <Box>
          <PokemonData url={url} bgColor="orange" />
        </Box>

        <Box>

          <Box >
            <Typography variant="h4"> Stats </Typography>
              <Box sx={{display: 'flex'}}>
                {pokemonStats.map((stat: any, index: number) => (
                  <Box sx= {{ bgcolor: statColors[index % statColors.length], borderRadius: 25, padding: 1, marginX: 1, marginY:3}}>
                    <Typography variant="h6" key={index} sx={{color: "black", fontWeight:'bold'}}> {stat.stat.name}: {stat.base_stat} </Typography>
                  </Box>
                ))}
            </Box>    
          </Box>

          <Box sx={{marginY: 5}}>
          <Typography variant="h4"> Lista de habilidades: </Typography>
            Outro bla bla bla
          </Box>
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
