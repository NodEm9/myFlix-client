import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Skeleton from "../loading/skeleton";


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

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
            Genre: [{
              name: movie.Genre.name,
              description: movie.Genre.description
            }],
            Director: [{
              name: movie.Director.name,
              bio: movie.Director.bio,
              birthyear: movie.Director.birthyear,
              deathyear: movie.Director.deathyear
            }],
            Actor: movie.Actor,
            ReleaseDate: movie.ReleaseDate,
            Rating: movie.Rating,
            Featured: movie.Featured
          }
        });
        if (moviesFromAPI.length === 0) {
          return <div className="main-view">The list is empty!</div>;
        }

        setMovies(moviesFromAPI);
      });
  }, []);

  if (selectedMovie) {
    // Filter similar movies by genre to get a list of similar movies
    let similarMovies = movies.filter(movie => movie.Genre[0].name === selectedMovie.Genre[0].name && movie.Title !== selectedMovie.Title);
    return (
      <>
       <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr /> <br />
        <h2>Similar Movies</h2>
        <div className="card-container">
          {similarMovies ? 
            similarMovies.map(movie => (
              <MovieCard
                key={movie.Title}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            )) : <div>No similar movies found</div>
          }
        </div>
      </>
    )
  };

  return (
    <div className="main-view">
      <div className="search-container">
        <input type="text" placeholder="Search" className="search" /> {/*Add a temporal search bar **/}
      </div>
      {movies.length === 0 ? (
        <div  className="card-container" >
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
            <Skeleton key={n} />
            ))}
        </div>
      ) : (
        <div className="card-container"> 
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
      )}
    </div>
  );
};