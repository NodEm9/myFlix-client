import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    filter: "",
    
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setMovies, setFilter } = movieSlice.actions;

export default movieSlice.reducer;