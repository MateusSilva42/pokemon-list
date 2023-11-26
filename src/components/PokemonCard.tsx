import {IconButton, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material"
import pokeball from '../assets/pokeball.png'
import favoriteIcon from '../assets/favorite-border.png'
import favoritedIcon from '../assets/favorite-full.png'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { fetchPokemon } from "../store/pokemon/pokemonSlice"

interface PokemonCardProps {
  url: string;
}

export default function PokemonCard( {url}: PokemonCardProps) {
  const pokemon = useSelector((state: any) => state.pokemon[url]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(fetchPokemon(url));
  }, [url, dispatch])

  console.log('POKEMON', pokemon);
  
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <Card sx={{ 
      minWidth: {
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
          {pokemon?.name}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton aria-label="favorite" onClick={handleFavorite}>
        <img src={isFavorited? favoriteIcon : favoritedIcon} alt="favorite icon" style={{width: '40px', height: '40px'}} />
      </IconButton>
      </CardActions>
    </Card>
  );
}
