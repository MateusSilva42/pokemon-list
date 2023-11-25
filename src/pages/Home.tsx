import { Box} from "@mui/material";
import Header from "../components/Header";
import Pokedex from "../components/Pokedex";
import PokemonCard from "../components/PokemonCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function Home() {

  const [pokemon, setPokemon] = useState<String[]>([]);

  useEffect(() => {
    setPokemon(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'])
  })


  return (
    <>
      <Header />

      <Pokedex />

      <Box sx={{padding: 5, display:'flex', flexDirection: 'column' ,alignItems:'center'}}>
        <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>
        {pokemon.map((pokemon, index) => (
          <PokemonCard key={index} />
        ))} 
          
        </Box>
       
      </Box>

      <Footer />

    </>
  );
}

export default Home;
