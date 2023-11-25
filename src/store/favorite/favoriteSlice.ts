import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteState {
    liked: boolean
}

const initialState: FavoriteState = {
    liked: false
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        like: (state) => {
            state.liked = !state.liked
        }
    }
})

export const like = favoriteSlice.actions
export default favoriteSlice.reducer