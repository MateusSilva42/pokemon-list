import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { fetchPokemon, Pokemon } from "../store/pokemon/pokemonSlice";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";

function Pokedex() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: any) => state.favorite.favorites);
  const pokemonData = useSelector((state: any) => state.pokemon.data);

  useEffect(() => {
    for(const id of favorites) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`
      dispatch(fetchPokemon(url));
    }
  }, [favorites, dispatch]);

  const favoritePokemons = favorites.map((id: number) => pokemonData[id]).filter(Boolean);

  // console.log('favoritePokemons', favoritePokemons);
  

  return (
    <>
      <Box>
        <Paper elevation={3} sx={{padding:2, display:"flex", justifyContent: 'space-between', bgcolor: "yellow"}}>
          <Box>
          <Typography variant="h5" component="div" gutterBottom>
            POKÉDEX
          </Typography>

            <Box sx={{display: 'flex'}}>

            {favoritePokemons.map((pokemon: Pokemon, index: number) => (
              pokemon && (
                <Tooltip title={pokemon.name} key={pokemon.id}>
                  <Link to={`/pokemon/${pokemon.id}`}> 
                    <Avatar
                      alt={pokemon.name}
                      src={pokemon.picture['official-artwork'].front_default}
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        marginRight: 2, 
                        cursor: 'pointer',
                        transition: 'tranform 1.5s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.2)',
                        }    
                      }}
                    />
                  </Link>
                </Tooltip>
              )
            ))}
        
             
                
            </Box>

          </Box>
          <Box sx={{alignSelf:'center', marginRight:3}}>
          </Box>
        </Paper>
      </Box>

    </>
  );
}

export default Pokedex;
