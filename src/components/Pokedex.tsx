import { Box, Paper, IconButton, Avatar, Tooltip } from "@mui/material"
import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { AppDispatch } from "../store/store"
import { fetchPokemon, Pokemon } from "../store/pokemon/pokemonSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material/'
import pokedexIcon from "../assets/pokedex_icon.png"
import avatarDefault from "../assets/pokeball.png"
import DeleteIcon from '@mui/icons-material/Delete';


function Pokedex() {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: any) => state.favorite.favorites)
  const pokemonData = useSelector((state: any) => state.pokemon.data)
  const favoritePokemons = favorites.map((id: number) => pokemonData[id]).filter(Boolean)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [hoverId, setHoverId] = useState<number | null>(null);

  const startDrag = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    if (scrollContainerRef.current) {
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const drag = (e: TouchEvent) => {
      e.preventDefault();
      const x = e.touches[0].pageX;
      const now = Date.now();
      const elapsed = now - lastTime;
      if (elapsed > 0) {
        const velocity = (lastX - x) / elapsed;
        setVelocity(velocity * 1000);
      }
      setLastX(x);
      setLastTime(now);
      const walk = (startX - x);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollLeft + walk;
      }
    };
  
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('touchmove', drag, { passive: false });
    }
  
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('touchmove', drag);
      }
    };
  }, [lastX, lastTime, startX, scrollLeft]);

  const endDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        if (scrollContainerRef.current && Math.abs(velocity) > 0.01) {
          const delta = velocity / 60; 
          scrollContainerRef.current.scrollLeft += delta;
          setVelocity(velocity * 0.65);
        }
      }, 1000 / 60);
      return () => clearInterval(interval);
    }
  }, [isDragging, velocity]);
  

  useEffect(() => {
    for(const id of favorites) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`
      dispatch(fetchPokemon(url));
    }
  }, [favorites, dispatch])

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };
  
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }
  
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const sortedFavoritePokemons = [...favoritePokemons].sort((a, b) => {
    return favorites.indexOf(b.id) - favorites.indexOf(a.id);
  });

  const removeFromFavorites = (id: number) => {
    dispatch({type: 'favorite/removeFavorite', payload: id})
  }

  return (
    <Box sx={{position: 'sticky', top: 0, zIndex:9 }}>
      <Paper elevation={3} sx={{padding:2, display:"flex", justifyContent: 'space-between', bgcolor: "lightyellow" }}>
        
      <img src={pokedexIcon} alt="pokedex" style={{width: '60px', height: '60px', marginRight: 5}} />

        {canScroll && <IconButton onClick={() => scroll(-200)}> <ArrowBackIos /> </IconButton>}
        <Box 
        ref={scrollContainerRef} 
        onTouchStart={startDrag}
        onTouchEnd={endDrag}
        sx={{
          display: 'flex', 
          overflowX: 'hidden', 
          overflowY:'hidden' , 
          whiteSpace: 'nowrap', 
          flex: '1 1 auto' }}>

          {sortedFavoritePokemons.map((pokemon: Pokemon) => (
            pokemon && (
              <Tooltip title={pokemon.name} key={pokemon.id}>
      <div 
        style={{ position: 'relative', overflow: 'visible' }} 
        onMouseEnter={() => setHoverId(pokemon.id)}
        onMouseLeave={() => setHoverId(null)}
      >
        <IconButton 
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            removeFromFavorites(pokemon.id);
          }} 
          style={{ 
            position: 'absolute', 
            top: '-10px', 
            right: '-10px', 
            opacity: hoverId === pokemon.id ? 1 : 0, 
            transition: 'opacity 0.3s',
            color: 'red', 
            backgroundColor: 'white',
          }}
        >
          <DeleteIcon />
        </IconButton>
        <Link to={`/pokemon/${pokemon.id}`}> 
          <Box 
            component={Avatar}
            alt={pokemon.name}
            src={pokemon.picture['official-artwork'].front_default || avatarDefault}
            sx={{ 
              width: 70, 
              height: 70, 
              marginRight: 2, 
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              }    
            }}
          />
        </Link>
      </div>
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
