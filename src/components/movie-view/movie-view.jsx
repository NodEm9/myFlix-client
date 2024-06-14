import "./movie-view.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa6";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row md={2} className="movie-view justify-content-center pt-3 mt-5">
      <Col md={4} className="mt-2">
        <Card.Img
          src={movie.ImageUrl}
          key={movie.ImageUrl}
          alt="movie-poster"
          className="w-100 h-80"
        />
      </Col>
      <Col md={8} className="mt-2">
        <Col className="title">
          <h3 className="text-md-lg">Title:</h3>
          <span className="fw-bolder fs-3" key={movie.Title}>{movie.Title}</span>
        </Col>
        <Col className="">
          <h3>Description: </h3>
          <p className="" key={movie.Description}>
            {movie.Description}
          </p>
        </Col>
        <Col className="">
          <h3>Genre: </h3>
          <span className="movie-genre">
            {movie.Genre.map(genre => (
              <div key={genre}>
                <span>{genre.name}</span>
                <p>{genre.description}</p>
              </div>
            ))}</span>
        </Col>
        <Col className="">
          <h3>Director: </h3>
          {movie.Director.map(director => (
            <div key={director.name} className="movie-director">
              <p><span className="fw-bold">Name: </span> {director.name}</p>
              <p className="director-bio">
                <span className="fw-bold">Biblograph: </span>
                <em className="bio">{director.bio}</em>
              </p>
              <p><span className="fw-bold">Birthdate:</span> {director.birthyear}</p>
              <p><span className="fw-bold">Deathyear:</span> {director.deathyear}</p>
            </div>

          ))}
        </Col>
        <Col className="movie-actors">
          <h3>Actors: </h3>
          {movie.Actor.map(actor => (
            <span key={actor._id} className="actor">
              {`${actor}, `}
            </span>
          ))}
        </Col>
        <Col className="">
          <h3>ReleaseDate: </h3>
          <div className="" key={movie.ReleaseDate}>
            {movie.ReleaseDate.slice(0, 10)}
          </div>
        </Col>
        <Col className="">
          <h3>Rating: </h3>
          <div className="movie-rating" key={movie.Rating}>
            {movie.Rating}
          </div>
        </Col>
        <Col className="">
          <h3>Featured: </h3>
          <span className="movie-runtime" key={movie.Featured}>
            {movie.Featured ? `${movie.Featured}` : "No information available."}
          </span>
        </Col>
        <Col className="button-wrapper">
          <Button
            variant="secondary-danger"
            className="float-end fw-bold" onClick={onBackClick}>
            <FaArrowLeft />
            Back
          </Button>
        </Col>
      </Col>
    </Row>
  );
};