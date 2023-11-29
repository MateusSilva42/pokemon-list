import { Box, Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import pokeball  from "../assets/pokeball.png"
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <Box sx={{bgcolor: red[500], height:"200", padding:2, display: 'flex'}}>
        <MuiLink component={RouterLink} to={'/'} sx={{
          textDecoration: 'none',
          marginLeft: 2,
          '&:hover': {
            transform: 'scale(0.95)',
          },
          }}>
        <Typography 
        variant="h4" 
        component="div" 
        sx={{alignSelf: 
        'center', 
        color: 'yellow',
        borderColor: 'black', 
        border: 1, 
        padding: 1, 
        textShadow: '2px 2px 0px #00008B, -2px -2px 0px #6495ED, 2px -2px 0px #4682B4, -2px 2px 0px #00f'
        }} 
        gutterBottom>
          <img src={pokeball} alt="my icon" style={{width: '24px', height: '24px'}} /> Pokédex Online
        </Typography>
        </MuiLink>
      </Box>
    </>
  );
}

export default Header;
