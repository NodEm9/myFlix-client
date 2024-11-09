import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import MovieFilter from "../movie-filter/movie-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const MoviesList = () => {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.movies);
  const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();

  const filterMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );

  return (
    <>
      <Row className="p-3">
        <MovieFilter />
      </Row>
      {movies.length === 0 ? (
        <div className="main-view">The list is empty!</div>
      ) : (
        <div className="movie-list">
          {filterMovies.map((movie) => (
            <Col md={12} key={movie._id}>
              <MovieCard
                movie={movie}
                isFavorite={user.favoriteMovies}
              />
            </Col>
          ))}
        </div>
      )}
    </>
  );
}

export default MoviesList;