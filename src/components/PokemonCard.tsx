import {IconButton, Card, CardActions, CardContent, CardMedia, Typography, Box} from "@mui/material"
import favoriteIcon from '../assets/favorite-border.png'
import favoritedIcon from '../assets/favorite-full.png'
import { Pokemon } from "../store/pokemon/pokemonSlice"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { addFavorite, removeFavorite } from "../store/favorite/favoriteSlice"
import { useDispatch } from "react-redux"
import React from "react"

interface PokemonCardProps {
  pokemon: Pokemon;
  bgColor?: string;
}

export default function PokemonCard( {pokemon, bgColor}: PokemonCardProps) {
  const favorite = useSelector((state: any) => state.favorite);
  const dispatch = useDispatch();

  const isFavorited = favorite.favorites.includes(pokemon.id);

  const handleFavorite = () => {
    if(favorite.favorites.includes(pokemon.id)){
      // dispatch(removeFavorite(pokemon.id))
      console.log('removendo!!!');
      
    } else {
      dispatch(addFavorite(pokemon.id))
    }
  }

  console.log('favorito do card', favorite);
  

  return (
    <Box>
            <Card sx={{  minWidth: {
              xs: 400,
              sm: 300,
             }, 
             marginX: 5, 
             marginY: 2,
             bgcolor: bgColor? bgColor : 'white',}}
             >
                <CardMedia
                  component="img"
                  alt={pokemon.name}
                  height="250"
                  image={pokemon.picture['official-artwork'].front_default}
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
              <CardContent >
                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>

                  <Box>
                  <Typography gutterBottom variant="h5" component="div">
                  <Link to={`/pokemon/${pokemon.id}`}>
                    {pokemon.name}
                  </Link>
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    #{pokemon.id}
                  </Typography>
                  </Box>

                  <Box sx={{marginLeft: 5}}>
                    <Typography variant="subtitle2">Peso: {(pokemon.weight)/10 }Kg</Typography>
                    <Typography variant="subtitle2">Tipo(s): {pokemon.types.map(t => t.type.name).join(',')}</Typography>
                  </Box>

                </Box>
                
              </CardContent>
              <CardActions>
              <IconButton aria-label="favorite" onClick={handleFavorite}>
                <img src={isFavorited? favoritedIcon : favoriteIcon } alt="favorite icon" style={{width: '40px', height: '40px'}} />
              </IconButton>
              </CardActions>
            </Card>
    </Box>
  );
}
