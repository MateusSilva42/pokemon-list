import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface Pokemon {
    id: number,
    image: string,
    name: string,
    size: number,
    types: string[],
    species: string[],
    weight: number,
    skills: string[],
    stats: {
        hp: number,
        attack: number,
        defense: number,
        specialAttack: number,
        specialDefense: number,
        speed: number
    },
    generation: string,
    loading: 'idle' | 'pending' | 'rejected' | 'succeeded'
}

const initialState: Pokemon = {
    id: 0,
    image: '',
    name: '',
    size: 0,
    types: [],
    species: [],
    weight: 0,
    skills: [],
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0
    },
    generation: '',
    loading: 'idle' 
}

const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemon',
    async (url: string) => {
        const response = await fetch(url)
        return response.json()
    }
)

export const favoriteSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemon.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPokemon.fulfilled, (state, action) => {
            state.loading = action.payload.name
            state.id = action.payload.id
            state.image = action.payload.sprites.front_default
            state.name = action.payload.name
            state.size = action.payload.height
            state.types = action.payload.types.map((type: any) => type.type.name)
            state.species = action.payload.species.name
            state.weight = action.payload.weight
            state.skills = action.payload.moves.map((move: any) => move.move.name)
            state.stats.hp = action.payload.stats[0].base_stat
            state.stats.attack = action.payload.stats[1].base_stat
            state.stats.defense = action.payload.stats[2].base_stat
            state.stats.specialAttack = action.payload.stats[3].base_stat
            state.stats.specialDefense = action.payload.stats[4].base_stat
            state.stats.speed = action.payload.stats[5].base_stat
            state.generation = action.payload.species.url.split('/')[6]
        })
        builder.addCase(fetchPokemon.rejected, (state, action) => {
            state.loading = 'rejected'
        })
    }
})

export const like = favoriteSlice.actions
export default favoriteSlice.reducer