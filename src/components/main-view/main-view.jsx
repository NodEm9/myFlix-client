import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView} from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-api-h54p.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromAPI = data.map(movie => {
          return {
            _id: movie._id,
            ImageUrl: movie.ImageUrl,
            Title: movie.Title,
            Description: movie.Description,
            Genre:[ {
              name: movie.Genre.name,
              description: movie.Genre.description
            }],
            Director:[{
              name: movie.Director.name,
              bio: movie.Director.bio,
              birthyear: movie.Director.birthyear,
              deathyear: movie.Director.deathyear
            }],
            Actor: [{
              name: movie.Actor.name,
              bio: movie.Actor.bio
            }],
            ReleaseDate: movie.ReleaseDate,
            Rating: movie.Rating,
            Featured: movie.Featured
          }
        });
        console.log(data);

        if (moviesFromAPI.length === 0) {
          return <div className="main-view">The list is empty!</div>;
        }
      
        setMovies(moviesFromAPI);
      });
  }, []);
  
  if (selectedMovie) {
    return <MovieView
      movie={selectedMovie}
      onBackClick={() => setSelectedMovie(null)}
    />;
  };

  

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