import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

function Pokedex() {
  return (
    <>
      <Box>
        <Paper elevation={3} sx={{padding:2, display:"flex", justifyContent: 'space-between', bgcolor: "yellow"}}>
          <Box>
          <Typography variant="h5" component="div" gutterBottom>
            POKÉDEX
          </Typography>
          <Typography variant="body1" gutterBottom>
            Aqui ficarão os pokémons favoritados =D
          </Typography>
          </Box>
          <Box sx={{alignSelf:'center', marginRight:3}}>
          </Box>
        </Paper>
      </Box>

    </>
  );
}

export default Pokedex;
