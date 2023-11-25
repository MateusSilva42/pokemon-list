import {IconButton, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material"
import pokeball from '../assets/pokeball.png'
import favoriteIcon from '../assets/favorite-border.png'
import favoritedIcon from '../assets/favorite-full.png'
import { useState } from "react"

export default function PokemonCard() {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <Card sx={{ minWidth: 300, marginX: 5, marginY: 2 }}>
      <CardMedia
        component="img"
        alt="pokeball"
        height="140"
        image={pokeball}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Pokemon maroto
        </Typography>
        <Typography variant="body2" color="text.secondary">
          bla bla bla sobre esse pokémon
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
