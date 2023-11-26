import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface Pokemon {
    name: string,
    url: string
}

export interface PokemonListState {
    pokemons: Pokemon[]
    next: string | null
    previous: string | null
    loading: 'idle' | 'pending' | 'rejected' | 'succeeded'
}

const initialState: PokemonListState = {
    pokemons: [],
    next: null,
    previous: null,
    loading: 'idle'
}

const fetchPokemonList = createAsyncThunk(
    'pokemon/fetchPokemonList',
    async (url: string | undefined = 'https://pokeapi.co/api/v2/pokemon') => {
        const response = await fetch(url)
        return response.json()
    }
)

export const favoriteSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonList.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
            state.loading = action.payload.name
            state.pokemons = action.payload.results
            state.next = action.payload.next
            state.previous = action.payload.previous
        })
        builder.addCase(fetchPokemonList.rejected, (state, action) => {
            state.loading = 'rejected'
        })
    }
})

export const like = favoriteSlice.actions
export default favoriteSlice.reducer