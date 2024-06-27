import "./movie-view.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export const MovieView = () => {
  const movies = useSelector((state) => state.movies.movies);
  const { movieId } = useParams();
  
  const movie = movies.find((m) => m._id === movieId);

  return (
    <Row md={2} className="movie-view flex-md-row flex-column-reverse">
      <Col md={8}> 
        <Col className="title text-md-lg">
          <h3 >Title:</h3>
          <span className="fw-bolder pb-2 fs-3" key={movie._id}>
            {movie.Title}
          </span>
        </Col>
        <Col className="">
          <h3>Description: </h3>
          <p className="" key={movie._id}>
            {movie.Description}
          </p>
        </Col>
        <Col className="">
          <h3>Genre: </h3>
          <span className="movie-genre">
            {movie.Genre.map(genre => (
              <div key={genre.name}>
                <span>{genre.name}</span>
                <p>{genre.description}</p>
              </div>
            ))}
          </span>
        </Col>
        <Col>
          <h3>Director: </h3>
          {movie.Director.map(director => (
            <div key={director.name} className="movie-director">
              <p><span className="fw-bold">Name:</span> {director.name}</p>
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
          <h3>Actors: </h3> {movie.Actor}
        </Col>
        <Col className="d-flex align-items-center gap-3">
          <h3>ReleaseDate: </h3>
          <div className="" key={movie._id}>
            {movie.ReleaseDate.slice(0, 10)}
          </div>
        </Col>
        <Col className="d-flex align-items-center gap-3">
          <h3>Rating: </h3>
          <div key={movie._id}>
            {movie.Rating}
          </div>
        </Col>
        <Col className="d-flex align-items-center gap-3">
          <h3>Featured: </h3>
          <span key={movie._id}>
            {movie.Featured ? `${movie.Featured}` : "No information available."}
          </span>
        </Col>
        <Col className="button-wrapper">
          <Link to={"/"}>
            <Button variant="link" className="back-button">
              <FaArrowLeft />
              Back
            </Button>
          </Link>
        </Col>
      </Col>
      <Col md={4}>
        <Card.Img
          src={movie.ImageUrl}
          key={movie.ImageUrl}
          alt="movie-poster"
          className="w-100 h-75 rounded-3 shadow-sm"
        />
      </Col>
    </Row>
  );
};

