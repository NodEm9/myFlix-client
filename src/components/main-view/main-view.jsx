import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Skeleton from "../loading/skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastNotification } from "../toast/toast";



export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [displaySimilarMovies, setDisplaySimilarMovies] = useState([]);
  const [showSignup, setShowSignup] = useState(false);

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


  if (selectedMovie) {
    // Filter similar movies by genre to get a list of similar movies
    let similarMovies = movies.filter(movie => movie.Genre[0].name === selectedMovie.Genre[0].name && movie.Title !== selectedMovie.Title);
    return (
      <Row>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr /> <br />
        <h2 className="text-center">Similar Movies</h2>
        <Row className="pb-5">
          {displaySimilarMovies ?
            similarMovies.map(movie => (
              <Col md={3} key={movie._id} className="pb-5 pt-4">
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            )) : setDisplaySimilarMovies([]) // If there are no similar movies, display an empty array
          }
        </Row>
      </Row>
    )
  };


  const searchMovies = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    const filteredMovies = movies.filter((movie) => {
      return movie.Title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setMovies(filteredMovies);
  };


  return (
    <Row className="h-100 justify-content-md-center mt-md-5 pt-md-5">
      {token && user ? (
        <ToastNotification message={`Welcome ${user.Username}`} txtColor={"text-success"}/>
      ) : null
        }
      {!user ? (
        <Col md={5} >
          <h1 className="text-center mt-5 pt-5 fs-1-sm text-wrap fs-3" >
            Welcome to myFlix
          </h1>
          {showSignup ? <SignupView /> :
            <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />}
          <Button
            onClick={() => setShowSignup(!showSignup)}
            aria-atomic="true"
            role="button"
            className="bg-transparent fs-5 border-0 lead link-primary mt-md-3 mt-sm-2 mt-xm-1"
          >
            {showSignup ? "Already have an account? Login here." :
              "New to myFlix?, signup here."}
          </Button>
        </Col>
      ) : selectedMovie ? (
        <Col md={8} >
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <Row>
          <Col md={12} className="text-md-center">
            The movie list it empty!,
            <p>Please, be patient the movies are propably loading...</p>
          </Col>
          <Col md={8} className="pb-5 h-100 justify-content-md-center">
                <Skeleton />
          </Col>
        </Row>
      ) : (
        <>
          <Row className="pb-2 h-50">
            <Col className="header">
              <Button
                variant="outline-primary"
                className="float-end mb-1 mt-1 me-3"
                onClick={() => { setUser(null); setToken(null); localStorage.clear(); }
                }>
                logout
              </Button>
            </Col>
          </Row>
          <Row className="pb-5 pt-0 justify-content-md-center">
            <Col md={4} className="header">
              <Form>
                <Form.Control
                  type="text"
                  placeholder="Search for a movie"
                  onChange={searchMovies}
                  className="p-3"
                />              
              </Form>
            </Col>
          </Row>
          <Row className="pb-5">
            {movies.map(movie => (
              <Col md={3} key={movie._id} className="pb-5">
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row>
        </>
      )
      }
    </Row>
  );
};