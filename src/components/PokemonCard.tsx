import {IconButton, Card, CardActions, CardContent, CardMedia, Typography, Box} from "@mui/material"
import pokeball from '../assets/pokeball.png'
import favoriteIcon from '../assets/favorite-border.png'
import favoritedIcon from '../assets/favorite-full.png'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { fetchPokemon, Pokemon } from "../store/pokemon/pokemonSlice"

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard( {pokemon}: PokemonCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  console.log(pokemon);
  

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <Box>
            <Card sx={{  minWidth: {
              xs: 400,
              sm: 300,
             }, 
             marginX: 5, 
             marginY: 2 }}>
              <CardMedia
                component="img"
                alt="pokeball"
                height="140"
                image={pokeball}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  #{pokemon.id}
                </Typography>
              </CardContent>
              <CardActions>
              <IconButton aria-label="favorite" onClick={handleFavorite}>
                <img src={isFavorited? favoriteIcon : favoritedIcon} alt="favorite icon" style={{width: '40px', height: '40px'}} />
              </IconButton>
              </CardActions>
            </Card>
    </Box>
  );
}
