// Em um componente pai
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchPokemon } from "../store/pokemon/pokemonSlice";
import PokemonCard from "./PokemonCard";

interface PokemonDataProps {
  url: string;
}

export default function PokemonList( {url}: PokemonDataProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPokemon(url));
  }, []);

  const id = url.split('/')[6];
  const pokemon = useSelector((state: any) => state.pokemon.data[id]);

  console.log('pokemon', pokemon);
  

  if(!pokemon) {
    return null
  }

  return (
    <div>
        <PokemonCard pokemon={pokemon} />
    </div>
  );
}