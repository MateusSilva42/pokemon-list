import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface Pokemon {
    name: string,
    url: string
}

export interface PokemonListState {
    pokemons: Pokemon[]
    next: string | null
    previous: string | null
    loading: 'idle' | 'pending' | 'rejected' | 'succeded'
}

const initialState: PokemonListState = {
    pokemons: [],
    next: null,
    previous: null,
    loading: 'idle'
}

export const fetchPokemonList = createAsyncThunk(
    'pokemon/fetchPokemonList',
    async (url: string | undefined = 'https://pokeapi.co/api/v2/pokemon') => {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
)

export const pokemonListSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonList.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
            state.loading = 'succeded';
            state.pokemons = action.payload.results.map((pokemon: any) => ({
                name: pokemon.name,
                url: pokemon.url
            }));
            state.next = action.payload.next;
            state.previous = action.payload.previous;
        });
        builder.addCase(fetchPokemonList.rejected, (state, action) => {
            state.loading = 'rejected'
        })
    }
})

export const like = pokemonListSlice.actions
export default pokemonListSlice.reducer