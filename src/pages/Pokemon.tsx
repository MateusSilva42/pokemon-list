import { Box, Button, Pagination, Typography} from "@mui/material";
import {Header, Pokedex, Footer, PokemonData} from "../components"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchPokemon } from "../store/pokemon/pokemonSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    if (!id) {
      navigate('/');
    }
  }, [id, navigate]);

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: any) => state);
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  useEffect(() => {
    dispatch(fetchPokemon(url));
  }, [id, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = Number(params.get('page')) || 1;
    setPage(pageFromUrl);
  }, [location]);

  const handleBack = () => {
    navigate(`/?page=${page}`);
  };

  const pokemon = id !== undefined ? state.pokemon.data[id] : undefined;
  const pokemonStats = pokemon ? pokemon.stats : undefined;
  const statColors = ['lightgreen', 'yellow', 'orange', 'lightblue', 'violet', 'pink']

  if(!pokemon) {
    return null
  }
  

  return (
    <>
      <Header />

      <Pokedex />

      <Box sx={{padding: 5, display:'flex', flexWrap: 'wrap'}}>
        <Box>
          <PokemonData url={url} bgColor="orange" />
        </Box>

        <Box>

          <Box >
            <Typography variant="h4"> Stats </Typography>
              <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {pokemonStats.map((stat: any, index: number) => (
                  <Box sx= {{ bgcolor: statColors[index % statColors.length], borderRadius: 25, padding: 1, marginX: 1, marginY:3}}>
                    <Typography variant="h6" key={index} sx={{color: "black", fontWeight:'bold'}}> {stat.stat.name}: {stat.base_stat} </Typography>
                  </Box>
                ))}
            </Box>    
          </Box>

          <Box sx={{marginY: 5}}>
          <Typography variant="h4"> Lista de habilidades: </Typography>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
              {pokemon.abilities.map((ability: any, index: number) => (
                <Box sx= {{ bgcolor: 'red', borderRadius: 25, padding: 1, marginX: 1, marginY:3}}>
                  <Typography variant="h6" key={index} sx={{color: "white", fontWeight:'bold'}}> {ability.ability.name} </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{marginY: 5}}>
              <Box sx={{display: 'flex'}}>
                <Button variant="contained" color="warning" startIcon={<ArrowBackIcon />}  onClick={handleBack}>Voltar</Button>
              </Box>
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
