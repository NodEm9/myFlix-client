import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MovieView } from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Skeleton from "../loading/skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ToastNotification from "../toast/toast";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/movies/movieSlice";
import MoviesList from "../movie-list/movie-list";


export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);
  const movies = useSelector((state) => state.movies.movies);

  const [showSignup, setShowSignup] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-app-led6.onrender.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map(movie => {
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

        dispatch(setMovies(moviesFromApi));
        setShowToast(true);
      }).catch((e) => {
        console.log(e);

      });
  }, [token]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // This useEffect hook will run when the showSignup state changes
  useEffect(() => {
    setShowSignup(false);
  }, [showSignup]);


  return (
    <BrowserRouter>
      <NavigationBar
        onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); window.location.reload(); }}
      />
      <Row md={12} className="main pt-5 mt-5 mb-5 justify-content-center pb-5">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={8} className="login py-5 mt-1 text-center justify-content-center" >
                    <SignupView />
                    <a
                      type="button"
                      onClick={() => setShowSignup(!showSignup)}
                      className="switch-view bg-transparent mt-2 border-0 lea link-primary mt-1 mt-sm-2 mt-xm-1"
                    >
                      {!showSignup ? "Already have an account? Login here." :
                        <Navigate to="/login" />}
                    </a>
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
                  <Col md={12} className="justify-content-center text-center">
                    <LoginView />
                    <a
                      type="button"
                      onClick={() => setShowSignup(!showSignup)}
                      className="switch-view bg-transparent mt-2 border-0 lea link-primary "
                    >
                      {!showSignup ? "Don't have account? Sign Up here." :
                        <Navigate to="/signup" />}
                    </a>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movie/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col >List is Empty</Col>
                ) : (
                  <MovieView movies={movies} />
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={12} >
                    <ProfileView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <>
                    <Col md={8} className="text-md-center">
                      The movie list it empty!,
                      <p>Please, be patient the movies are propably loading...</p>
                    </Col>
                    <Col md={8} className="pb-5 justify-content-md-center">
                      <Skeleton />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col md={10} sm={3} className="pb-5 movies">
                      <MoviesList />
                    </Col>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
      {showToast && <ToastNotification message={user ? `Welcome back ${user.Username}` : "You are logged out"} />}
    </BrowserRouter>
  );
};