// pokemonSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Pokemon {
  id: number;
  name: string;
  // outras propriedades do Pokémon
}

interface PokemonState {
  data: { [key: string]: Pokemon };
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
      state.data[pokemon.name] = {
        id: pokemon.id,
        name: pokemon.name,
        // adicione outras propriedades conforme necessário
      };
      state.loading = 'succeeded';
    });
    builder.addCase(fetchPokemon.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export const selectPokemon = (state: { pokemon: PokemonState }) => state.pokemon;

export default pokemonSlice.reducer;
