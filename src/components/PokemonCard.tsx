import {IconButton, Card, CardActions, CardContent, CardMedia, Typography, Box, Chip, Tooltip} from "@mui/material"
import favoriteIcon from '../assets/favorite-border.png'
import favoritedIcon from '../assets/favorite-full.png'
import { Pokemon } from "../store/pokemon/pokemonSlice"
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addFavorite, removeFavorite } from "../store/favorite/favoriteSlice"
import  pokeball  from "../assets/pokeball.png"
import { useState, useEffect } from "react"
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface PokemonCardProps {
  pokemon: Pokemon;
  bgColor?: string;
}

export default function PokemonCard( {pokemon, bgColor}: PokemonCardProps) {
  const favorite = useSelector((state: any) => state.favorite);
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const location = useLocation()

  const isFavorited = favorite.favorites.includes(pokemon.id)

  type PokemonType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy' | 'shadow' | 'unknown';


  const typeColors: Record<PokemonType, string> = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
      shadow: '#4B0082',
      unknown: '#A9A9A9'
  }

  const handleFavorite = () => {
    if(isFavorited){
      dispatch(removeFavorite(pokemon.id))
    } else {
      dispatch(addFavorite(pokemon.id))
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const pageFromUrl = Number(params.get('page')) || 1
    setPage(pageFromUrl)
  }, [location])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 500 }}>
            <Card sx={{  maxWidth: {
              xs: 400,
              sm: 300,
             }, 
             minWidth: {
              xs: 400,
              sm: 300,
             },
             minHeight: 400,
             marginX: 5, 
             marginY: 2,
             bgcolor: bgColor? bgColor : 'white',}}
             >
                <CardMedia
                  component="img"
                  alt={pokemon.name}
                  height="250"
                  image={pokemon.picture['official-artwork'].front_default || pokeball} 
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>

                  <CardContent sx={{ flexGrow: 1, height: 150}} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>

                      <Box>
                      <Typography gutterBottom variant="h5" component="div">
                        
                      <Tooltip title={pokemon.name} key={pokemon.id}>
                        <MuiLink 
                          component={RouterLink}
                          to={`/pokemon/${pokemon.id}?page=${page}`}
                          sx={{
                              textDecoration: 'none', 
                              fontWeight: 'bold',
                              color: 'orange',
                              '&:hover' : {
                                color: 'red'
                              },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              display: 'block',
                              maxWidth: 150
                            }}
                          >
                            {pokemon.name}

                        </MuiLink>
                      </Tooltip>

                      </Typography>
                        <Chip label={`#${pokemon.id}`} />
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" sx={{marginBottom: 2 }}>Peso: {(pokemon.weight)/10 }Kg</Typography>
                        {pokemon.types.map(t => (
                          <Chip 
                            key={t.type.name}
                            label={t.type.name} 
                            size="small" 
                            sx={{ 
                              backgroundColor: typeColors[t.type.name as PokemonType], 
                              color: 'white', 
                              marginRight: 1, 
                              marginBottom: 1 
                            }} 
                          />
                        ))}
                      </Box>

                    </Box>
                    
                  </CardContent>
                  <CardActions>
                  <IconButton aria-label="favorite" onClick={handleFavorite}>
                    <img src={isFavorited? favoritedIcon : favoriteIcon } alt="favorite icon" style={{width: '40px', height: '40px'}} />
                  </IconButton>
                  </CardActions>

              </Box>
            </Card>
    </Box>
  )
}
