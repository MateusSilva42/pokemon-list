import { Box} from "@mui/material";
import Header from "../components/header";
import Pokedex from "../components/pokedex";
import PokemonCard from "../components/PokemonCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />

      <Pokedex />

      <Box sx={{padding: 5, display:'flex', flexDirection: 'column' ,alignItems:'center'}}>
        <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
          <PokemonCard/>
        </Box>
        
       
      </Box>

      <Footer />


    </>
  );
}

export default Home;
