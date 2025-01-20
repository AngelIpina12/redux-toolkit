import { configureStore, createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
    name: 'songs',
    initialState: [],
    reducers: {
        addSong(state, action) {
            state.push(action.payload);
        },
        removeSong(state, action) {

        }
    }
});

const store = configureStore({
    reducer: { songs: songsSlice.reducer }
})

export {store};
export const { addSong, removeSong } = songsSlice.actions;