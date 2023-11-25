import { Box} from "@mui/material";
import Header from "../components/header";
import Pokedex from "../components/pokedex";
import PokemonCard from "../components/PokemonCard";

function Home() {
  return (
    <>
      <Header />

      <Pokedex />

      <Box sx={{padding: 5, display:'flex', flexDirection: 'column' ,alignItems:'center'}}>
        <Box sx={{display: "flex"}}>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
        </Box>
        <Box sx={{display: "flex"}}>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
        </Box>
        <Box sx={{display: "flex"}}>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
        </Box>
       
      </Box>


    </>
  );
}

export default Home;
