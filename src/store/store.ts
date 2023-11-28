import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from './favorite/favoriteSlice'
import pokemonListReducer from './pokemon/pokemonListSlice'
import pokemonReducer from './pokemon/pokemonSlice'
import { localStorageMiddleware } from './localStorageMiddleware';

export const store = configureStore({
    reducer: {
        favorite: favoriteReducer,
        pokemonList: pokemonListReducer,
        pokemon: pokemonReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch