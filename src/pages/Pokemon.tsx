import { Box, Button, CircularProgress, Pagination, Typography} from "@mui/material";
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
  const state = useSelector((state: any) => state.pokemon);
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

  const pokemon = id !== undefined ? state.data[id] : undefined;
  const pokemonStats = pokemon ? pokemon.stats : undefined;
  const statColors = ['lightgreen', 'yellow', 'orange', 'lightblue', 'violet', 'pink']


  return (
    <>
      <Header />

      <Pokedex />

      {pokemon ? (
        <Box sx={{padding: 5, display:'flex', flexDirection:{
          xs: 'column',
          sm: 'column',
          md: 'row'
        },
        }}>
  
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <PokemonData url={url} bgColor={'lightyellow'} />
            </Box>
  
          <Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            flexWrap: 'wrap', 
            alignItems: {
              xs: 'center',
              sm: 'center',
              md: 'start'
            } 
          }}>
  
            <Box sx={{
              display: 'flex', 
              flexDirection:'column',
              alignItems: {
                xs: 'center',
                sm: 'center',
                md: 'start'
              }
              }} >
              <Typography 
                variant="h2" 
                color={'orange'}
                > 
                
                  { pokemon.name } 
                </Typography>
  
                <Box sx={{
                  display: 'flex', 
                  flexWrap: 'wrap',
                  justifyContent: {
                    sx: 'center',
                    sm: 'center',
                    md: 'start'
                  }
                  }}>
                  {pokemonStats.map((stat: any, index: number) => (
                    <Box 
                    key={index} 
                    sx= {{ 
                      bgcolor: statColors[index % statColors.length], 
                      borderRadius: 25, 
                      padding: 1, 
                      marginX: 1, 
                      marginY:3,
                      }}>
                      <Typography variant="h6" key={index} sx={{color: "black", fontWeight:'bold'}}> {stat.stat.name}: {stat.base_stat} </Typography>
                    </Box>
                  ))}
              </Box>    
  
            </Box>
  
            <Box sx={{marginY: 5}}>
            <Typography variant="h4"> Habilidades </Typography>
              <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {pokemon.abilities.map((ability: any, index: number) => (
                  <Box key={index} sx= {{ bgcolor: 'Salmon', borderRadius: 25, padding: 1, marginX: 1, marginY:3}}>
                    <Typography variant="h6" key={index} sx={{fontWeight:'bold'}}> {ability.ability.name} </Typography>
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
    ) : (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}} >
        <CircularProgress color="error" />
      </Box>
    )}

      <Footer />

    </>
  );
}

export default PokemonPage;
