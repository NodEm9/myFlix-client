import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./movie-view.scss";

const SimilarMovies = ({ movies }) => {
  return (
    <Row className="similar-movies ">
      <h2>Similar Movies</h2>
      <Col md={8} className="similar-movies__list">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Col>
    </Row>
  );
};

export default SimilarMovies;

SimilarMovies.propTypes = {
  movies: PropTypes.array.isRequired,
};