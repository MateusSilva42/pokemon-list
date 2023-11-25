import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import pokeball  from "../assets/pokeball.png";

function Header() {
  return (
    <>
      <Box sx={{bgcolor: red[500], height:"200", padding:2, display: 'flex'}}>
        <Typography variant="h4" component="div" sx={{alignSelf: 'center', color: 'yellow', textShadow: '4px 4px 4px rgba(57, 149, 255, 0.808)'}} gutterBottom>
        <img src={pokeball} alt="my icon" style={{width: '24px', height: '24px'}} /> Listagem de Pokémons
        </Typography>
      </Box>
    </>
  );
}

export default Header;
