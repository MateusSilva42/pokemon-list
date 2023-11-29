import { Box, Paper, IconButton, Avatar, Tooltip } from "@mui/material"
import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { AppDispatch } from "../store/store"
import { fetchPokemon, Pokemon } from "../store/pokemon/pokemonSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material/'
import pokedexIcon from "../assets/pokedex_icon.png"


function Pokedex() {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: any) => state.favorite.favorites)
  const pokemonData = useSelector((state: any) => state.pokemon.data)

  useEffect(() => {
    for(const id of favorites) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`
      dispatch(fetchPokemon(url));
    }
  }, [favorites, dispatch])

  const favoritePokemons = favorites.map((id: number) => pokemonData[id]).filter(Boolean)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)

  useEffect(() => {
    const checkCanScroll = () => {
      if(scrollContainerRef.current) setCanScroll(scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth )
    }

    checkCanScroll()

    window.addEventListener('resize', checkCanScroll)

    return () => {
      window.removeEventListener('resize', checkCanScroll)
    }
  }, [favoritePokemons])

  const scroll = (scrollOffset: number) => {
    if(scrollContainerRef.current){
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollOffset,
        behavior: 'smooth'
      })

    } 
  }

  return (
    <Box>
      <Paper elevation={3} sx={{padding:2, display:"flex", justifyContent: 'space-between', bgcolor: "lightyellow"}}>
        
      <img src={pokedexIcon} alt="pokedex" style={{width: '60px', height: '60px', marginRight: 5}} />

        {canScroll && <IconButton onClick={() => scroll(-200)}> <ArrowBackIos /> </IconButton>}
        <Box ref={scrollContainerRef} sx={{display: 'flex', overflowX: 'hidden', overflowY:'hidden' , whiteSpace: 'nowrap', flex: '1 1 auto' }}>
          {favoritePokemons.map((pokemon: Pokemon) => (
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
        {canScroll && <IconButton onClick={() => scroll(200)}> <ArrowForwardIos /> </IconButton>}
      </Paper>
    </Box>
  );
}

export default Pokedex;
