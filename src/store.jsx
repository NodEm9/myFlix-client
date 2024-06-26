import { configureStore } from '@reduxjs/toolkit'
import movieReducer from "./redux/movies/movieSlice"
import userReducer from "./redux/user/userSlice"

export default configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer
  },
})