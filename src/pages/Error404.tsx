import { Box, Typography, Button, Avatar } from "@mui/material"
import { useNavigate } from "react-router"
import {Header, Footer} from "../components"
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import cry404Image from '../assets/cry404.jpg'
import pokedexIcon from '../assets/pokedex_icon.png'
import pokeballIcon from '../assets/pokeball.png'

function Error404() {
    const navigate = useNavigate()

    const theme = useTheme();   
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const handleButtonClick = () => {
        navigate('/')
    }

  return (
    <>
    <Header />

    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', marginY: 10, padding: 10, height: '64vh'}}>
         <img src={cry404Image} alt="404 error" style={{width: '250px', height: '200px', borderRadius: '50%'}} />
        <Typography variant="h2" sx={{textAlign: 'center', marginBottom: 3}}> OPS... (404) </Typography>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
        <img src={pokedexIcon} alt="404 error" style={{width: '30px', height: '30px', marginRight: 10}} />
            <Typography variant={isSmallScreen ? "subtitle2" : "body1"} sx={{textAlign: 'center'}}>
                A sua Pokédex parece estar com alguma avaria, tente reiniciar o sistema ou procurar por outra página
            </Typography>
        </Box>

        <Button variant="contained" color="warning" startIcon={<Avatar src={pokeballIcon} sx={{ width: 24, height: 24 }} />} onClick={handleButtonClick} sx={{marginTop: 3}}> Retornar ao Centro Pokémon</Button>

    </Box>

    <Footer />
      
    </>
  );
}

export default Error404;
