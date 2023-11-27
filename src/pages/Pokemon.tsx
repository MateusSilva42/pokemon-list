import { Box, Pagination} from "@mui/material";
import Header from "../components/header";
import Pokedex from "../components/Pokedex";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pokemon } from "../store/pokemon/pokemonSlice";
import { AppDispatch } from "../store/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchPokemon } from "../store/pokemon/pokemonSlice";

function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate()

  if(!id) {
    navigate('/')
  }

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`))
        .unwrap()
        .then((response) => setPokemon(response))
        .catch((error) => console.error('Failed to fetch pokemon:', error));
    }
  }, [id, dispatch]);

  console.log('pokemon', pokemon);
  
    return (
      <>
        <Header />
  
        <Pokedex />
  
        <Box sx={{padding: 5, display:'flex', flexDirection: 'column' ,alignItems:'center'}}>
          <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>
              XABLAU {pokemon?.name}
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
