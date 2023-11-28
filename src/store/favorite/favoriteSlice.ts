import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteState {
    favorites: number[]
}

const favoritesFromLocalStorage = localStorage.getItem('favorites');
const initialState: FavoriteState = {
  favorites: favoritesFromLocalStorage ? JSON.parse(favoritesFromLocalStorage) : [],
};

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<number>) => {
            state.favorites.push(action.payload)
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(favorite => favorite !== action.payload)
        }
    }
})

export const {addFavorite, removeFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer