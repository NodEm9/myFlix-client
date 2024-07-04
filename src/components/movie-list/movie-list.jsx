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
      <Row className="p-3 mb-5">
        <MovieFilter />
      </Row>
      {movies.length === 0 ? (
        <div className="main-view">The list is empty!</div>
      ) : (
        <Row md={3} sm={12} lg={12}>
          {filterMovies.map((movie) => (
            <Col key={movie._id} sm={6} md={3} lg={3} className="p-3 ">
              <MovieCard
                movie={movie}
                isFavorite={user.favoriteMovies}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default MoviesList;