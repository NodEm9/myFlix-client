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
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { CustomImage } from "../custom-image/custom-image";
import heroImage from "../../img/John_Wick_TeaserPoster.jpg";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [displaySimilarMovies, setDisplaySimilarMovies] = useState([]);
  const [showSignup, setShowSignup] = useState(false);
  const [lPage, setLPage] = useState("");


  useEffect(() => {
    fetch("https://movie-api-h54p.onrender.com")
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setLPage(data);
      });

  }, [lPage]);

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

  const VideoFrame = ({ src, title, width, height }) => {
    return (
      <div className="videoFrame">
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          allowFullScreen
        />
      </div>
    );
  }

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
        <h2>Similar Movies</h2>
        <Row className="">
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
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} >
                    <h1 className="text-center  mt-4 fs-1-sm text-wrap fs-3" >Welcome to myFlix</h1>
                    <SignupView />
                    <button
                      onClick={() => setShowSignup(!showSignup)}
                      className="bg-light border-0 lead link-primary mt-md-5 mt-sm-2 mt-xm-1 float-end"
                    >
                      {!showSignup ? "Already have an account? Login here." :
                        <Navigate to="/login" />}
                    </button>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} >
                    <h1 className="text-center  mt-4 fs-1-sm text-wrap fs-3" >Welcome to myFlix</h1>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                    <button
                      onClick={() => setShowSignup(!showSignup)}
                      className="bg-light border-0 lead link-primary mt-md-5 mt-sm-2 mt-xm-1 float-end"
                    >
                      {showSignup ? "Don't have account? Sign Up here." :
                        <Navigate to="/signup" />}
                    </button>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:title"
            element={
              <>
                {!user ? (
                  <Row >
                    selectedMovie ? (
                    <Col md={8} >
                      <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                      />
                    </Col>
                    ) : movies.length === 0 ?
                    <div>
                      <Col md={12} className="text-md-center">
                        The movie list it empty!,
                        <p>Please, be patient the movies are propably loading...</p>
                      </Col>

                      <Col md={8} className="pb-5 h-100 justify-content-md-center">
                        {Array(12).fill(0).map((n) => (
                          <Skeleton key={n} />
                        ))}
                      </Col>
                    </div>
                  </Row>
                ) : (
                  <>
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
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Row className="pb-2">
                  <Col>
                    <Button
                      variant="outline-primary"
                      className="float-end mb-1 mt-3 me-3"
                      onClick={() => { setUser(null); setToken(null); localStorage.clear(); }
                      }>
                      logout
                    </Button>
                  </Col>
                </Row>
                <Row className="pb-2 h-100 w-100 mt-md-5 pt-md-5">
                  <Col md={6} className="hero-text">
                    <h1 className="hero-text mt-4 mt-sm-0 text-wrap" >{lPage}</h1>
                    <p>Checkout our exciting recently uploaded movie list and more.</p>
                  </Col>
                  <Col md={6} className="d-md-flex text-md-center">
                    <VideoFrame {
                      ...{
                        src: "https://www.youtube.com/embed/2AUmvWm5ZDQ",
                        title: "myFlix Trailer",
                        width: "100%",
                        height: "100%" // 16:9 aspect ratio
                      }
                    } />
                    <CustomImage src={heroImage} width={368} alt="John Wick Movie" />
                  </Col>
                </Row>
                <Row className="pb-2 justify-content-md-center">
                  <Col md={12} className="ctaButtons pb-5 h-100 ">
                    <Button 
                      variant="primary"
                      className="w-25 mb-1 fs-4 p-3 mt-3 me-3 rounded-5 "
                      role="link"
                      as={Link}
                      to="/movies"
                    >
                      Movies
                    </Button>
                  </Col>
                </Row>
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>
                    <Col md={12} className="text-md-center">
                      The movie list it empty!,
                      <p>Please, be patient the movies are propably loading...</p>
                    </Col>
                    <Col md={8} className="pb-5 h-100 justify-content-md-center">
                      {Array(12).fill(0).map((n) => (
                        <Skeleton key={n} />
                      ))}
                    </Col>
                  </div>
                ) : (
                  <>
                    <Row className="pb-2">
                      <Col>
                        <Button
                          variant="outline-primary"
                          className="float-end mb-1 mt-3 me-3"
                          onClick={() => { setUser(null); setToken(null); localStorage.clear(); }
                          }>
                          logout
                        </Button>
                      </Col>
                    </Row>
                    <Row className="pb-5 justify-content-md-center">
                      <Col md={4}>
                        <Form>
                          <Form.Control
                            type="text"
                            placeholder="Search for a movie"
                            onChange={searchMovies}
                          />
                        </Form>
                      </Col>
                    </Row>
                    {movies.map(movie => (
                      <Col md={3} key={movie._id} className="pb-5">
                        <MovieCard movie={movie}
                          onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};