import {IconButton, Card, CardActions, CardContent, CardMedia, Typography, Box} from "@mui/material"
import pokeball from '../assets/pokeball.png'
import favoriteIcon from '../assets/favorite-border.png'
import favoritedIcon from '../assets/favorite-full.png'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { fetchPokemon, Pokemon } from "../store/pokemon/pokemonSlice"
import { Link } from "react-router-dom"
import { red, yellow } from "@mui/material/colors"

interface PokemonCardProps {
  pokemon: Pokemon;
  bgColor?: string;
}

export default function PokemonCard( {pokemon, bgColor}: PokemonCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  console.log(bgColor);
  

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
                <img src={isFavorited? favoriteIcon : favoritedIcon} alt="favorite icon" style={{width: '40px', height: '40px'}} />
              </IconButton>
              </CardActions>
            </Card>
    </Box>
  );
}
