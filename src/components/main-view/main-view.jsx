import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Skeleton from "../loading/skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ToastNotification from "../toast/toast";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/movies/movieSlice";
import MoviesList from "../movie-list/movie-list";
import { FaArrowUp } from "react-icons/fa6";


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
        onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }}
      />
      <Row className="main h-100 pt-5 mt-5 mb-3 justify-content-center pb-5">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="pb-5 mb-5 mt-1" >
                    <h1 className="text-center mt-4 pb-5 fs-1-sm text-wrap fs-3" >Welcome to myFlix</h1>
                    <SignupView />
                    <button
                      onClick={() => setShowSignup(!showSignup)}
                      className="bg-transparent border-0 lead link-primary mt-1 mt-sm-2 mt-xm-1"
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
                    <LoginView />
                    <button
                      onClick={() => setShowSignup(!showSignup)}
                      className="switch-view bg-transparent border-0 lead link-primary "
                    >
                      {!showSignup ? "Don't have account? Sign Up here." :
                        <Navigate to="/signup" />}
                    </button>
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
                  <Row className="pb-5 mx-auto">
                    <Col md={12} >
                      <MovieView movies={movies} />
                    </Col>
                  </Row>
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
                    <ProfileView />
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
                    <Col md={12} className="text-md-center">
                      The movie list it empty!,
                      <p>Please, be patient the movies are propably loading...</p>
                    </Col>
                    <Col md={12} className="pb-5 justify-content-md-center">
                      <Skeleton />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col className="pb-5 move-list">
                      <MoviesList />
                    </Col>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
      <Row className="p-5">
        <Col>
          <Button
            variant="primary"
            className="fs-4 rounded-circle float-end"
            onClick={scrollTop}>
            <FaArrowUp className="up-arrow" />
          </Button>
        </Col>
      </Row>
      {showToast && <ToastNotification message={user ? `Welcome back ${user.Username}` : "You are logged out"} />}
    </BrowserRouter>
  );
};