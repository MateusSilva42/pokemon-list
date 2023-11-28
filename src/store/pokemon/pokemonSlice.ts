// pokemonSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PokemonType {
  name: string
}

interface PokemonPicture {
  'official-artwork': {
    front_default: string
  }
}
export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  types: { type: PokemonType}[];
  picture: PokemonPicture;
  abilities: string[];
  stats: {};
}

interface PokemonState {
  data:  {[key: number]: Pokemon}
  loading: 'idle' | 'pending' | 'rejected' | 'succeeded';
}

const initialState: PokemonState = {
  data: {},
  loading: 'idle',
};

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      const pokemon = action.payload;
      state.data[pokemon.id] = ({
        id: pokemon.id,
        name: pokemon.name,
        weight: pokemon.weight,
        types: pokemon.types,
        picture: pokemon.sprites.other,
        abilities: pokemon.abilities,
        stats: pokemon.stats,
      }) 
      state.loading = 'succeeded';
    });
    builder.addCase(fetchPokemon.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export const selectPokemon = (state: { pokemon: PokemonState }) => state.pokemon;

export default pokemonSlice.reducer;
