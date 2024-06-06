import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView} from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Jurassic Park",
      ImageURL: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg"
    },
    {
      id: 2,
      Title: "The Shawshank Redemption",
      ImageURL: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
    },
    {
      id: 3,
      Title: "Matrix",
      ImageURL: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
    }
  
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  if (selectedMovie) {
    return <MovieView
      movie={selectedMovie}
      onBackClick={() => setSelectedMovie(null)}
    />;
  };

  if (movies.length === 0) {
    return <div className="main-view">The list is empty!</div>;
  }

  return (
    <div className="main-view">
      <h1>Movie List</h1>
        {movies.map(movie => (
          <MovieCard
            key={movie.Title}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
             }}
          />
        ))} 
    </div>
  );
};