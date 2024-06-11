import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Skeleton from "../loading/skeleton";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [displaySimilarMovies, setDisplaySimilarMovies] = useState([]);


  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-h54p.onrender.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
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
  }, [token]);

 
  if (!user) {
    return (
      <div className="forms-view">
         <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
          }} />
       <p>or</p>
        <SignupView />
      </div>
    
    )
  }

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
          {displaySimilarMovies ?
            similarMovies.map(movie => (
              <MovieCard
                key={movie.Title}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            )) : setDisplaySimilarMovies([]) // If there are no similar movies, display an empty array
          }
        </div>
      </>
    )
  };

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>; // If there are no movies, display a message

  return (
    <div className="main-view">
      <header>
        <button
          onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
          logout
        </button>
      </header>
      <div className="search-container">
        <input type="text" placeholder="Search" className="search" /> {/*Add a temporal search bar **/}
      </div>
      {movies.length === 0 ? (
        <div className="card-container" >
          {Array(12).fill(0).map((n) => (
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