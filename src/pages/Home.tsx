import { Box} from "@mui/material";
import Header from "../components/Header";
import Pokedex from "../components/Pokedex";
import PokemonCard from "../components/PokemonCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function Home() {

  const [pokemon, setPokemon] = useState<String[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(data => {
      const results = data.results.map((pokemon: { name: String; }) => pokemon.name)
      setPokemon(results)
    }, )
  }, [])

  return (
    <>
      <Header />

      <Pokedex />

      <Box sx={{padding: 5, display:'flex', flexDirection: 'column' ,alignItems:'center'}}>
        <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>
        {/* {eachPokemon.map((pokemon, index) => (
          
          <PokemonCard key={index} name={pokemon.name} />
        ))} */}
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
        <PokemonCard name="teste"/>
          
        </Box>
       
      </Box>

      <Footer />

    </>
  );
}

export default Home;
