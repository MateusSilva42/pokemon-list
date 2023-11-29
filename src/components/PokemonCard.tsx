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
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: {
        xs: 250,
        sm: 300,
        md: 500
      },
      marginY: {
        xs: 0,
        sm: 2,
        md: 0
      }
       }}>
            <Card sx={{  
              display: 'flex',
              flexDirection: {
                xs: 'row',
                sm: 'row',
                md: 'column'
              },
              maxWidth: {
                xs: 300,
                sm: 600,
                md: 300
              },
              minWidth: {
                xs: 300,
                sm: 600,
                md: 300
              },
              minHeight:  {
                xs: 200,
                sm: 300,
                md: 400
              },
              marginY: {
                xs: 5,
                sm: 5,
                md: 2
              }, 
              marginX: {
                xs: 0,
                sm: 0,
                md: 5
              },
              bgcolor: bgColor? bgColor : 'white',}}
             >
                <CardMedia
                  component="img"
                  alt={pokemon.name}
                  image={pokemon.picture['official-artwork'].front_default || pokeball} 
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                  sx={{
                    height: {
                      xs: 150,
                      sm: 300,
                      md: 250
                    },
                    width: {
                      xs: 150,
                      sm: 300,
                      md: 250
                    },
                  }}
                />
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>

                  <CardContent sx={{ flexGrow: 1, height: 100}} >
                    <Box sx={{ 
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        sm: 'column',
                        md: 'row'
                      },
                      justifyContent: 'space-between'}}>

                      <Box sx={{
                        display: {
                          xs: 'flex',
                          sm: 'flex',
                          md: 'block'
                        },
                        flexDirection: 'column',
                      }}>
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
                              maxWidth: {
                                xs: 120,
                                sm: 250,
                                md: 150
                              },
                              fontSize: {
                                xs: '20px',
                                sm: '33px',
                                md: '24px'
                              },
                            }}
                          >
                            {pokemon.name}

                        </MuiLink>
                      </Tooltip>

                      </Typography>
                      <Box sx={{marginBottom: 2}}>
                        <Chip label={`#${pokemon.id}`} />
                      </Box>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" sx={{marginBottom: 2, display:{
                          xs: 'none',
                          sm: 'block'
                        } }}>Peso: {(pokemon.weight)/10 }Kg</Typography>
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
                  <IconButton aria-label="favorite" onClick={handleFavorite} sx={{display: {
                    xs: 'fixed',
                    sm: 'flex'
                  },
                    left: {
                      xs: 70,
                      sm: 'auto'
                    }
                  }}>
                    <img src={isFavorited? favoritedIcon : favoriteIcon } alt="favorite icon" style={{width: '60px', height: '60px'}} />
                  </IconButton>
                  </CardActions>

              </Box>
            </Card>
    </Box>
  )
}
