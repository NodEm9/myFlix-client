import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SimilarMovies from "./similar-movies";
import "./movie-view.scss";
import AddToFavorite from "./addToFavorite";
import FavoriteProvider from "../../context/FavoriteContext";


export const MovieView = ({ user }) => {
  user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.movies);
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  // Add movie to favorite list
  const handleFavorite = () => {
    return (
      <FavoriteProvider movie={movie}>
        <AddToFavorite movie={movie} isFavorite={false} />
      </FavoriteProvider>
    )
  }

  // Filter similar movies by genre and exclude the current movie
  const similarMovies = movies.filter((m) =>
    m.Genre.some((g) => movie.Genre.some((mg) =>
      mg.name === g.name) && m._id !== movie._id)
  );

  return (
    <Row>
      <Row md={12} className="movie-page pt-4 pb-4">
        <Col md={7} className="movie-view">
          <Col className="title text-md-lg">
            <h3 >Title:</h3>
            <span className="fw-bolder pb-2 fs-5" key={movie._id}>
              {movie.Title}
            </span>
          </Col>
          <Col >
            <h3>Description: </h3>
            <p key={movie._id}>
              {movie.Description}
            </p>
          </Col>
          <Col>
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
                <p><span>Name:</span> {director.name}</p>
                <p className="director-bio">
                  <span>Biblograph: </span>
                  <em className="bio">{director.bio}</em>
                </p>
                <p><span>Birthdate:</span> {director.birthyear}</p>
                <p><span>Deathyear:</span> {director.deathyear}</p>
              </div>
            ))}
          </Col>
          <Col className="movie-actors">
            <h3>Actors: </h3>
            {movie.Actor.map(a => (
              <div key={a.name}>
                <span>{a.name}</span>
              </div>
            ))}
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
          <Col className="d-flex w-100 m-w-100 gap-3 align-items-center">
            <Link to={"/"} className="w-100">
              <Button variant="success" className="d-flex justify-content-center align-items-center float-start text-white">
                <FaArrowLeft />
                Back
              </Button>
            </Link>
            <span className="w-100">{handleFavorite()}</span>
          </Col>
        </Col>
        <Col md={5}>
          <Card.Img
            src={movie.ImageUrl}
            key={movie.ImageUrl}
            alt="movie-poster"
            className="shadow-s movie-view-img"
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="p-5"> <SimilarMovies movies={similarMovies} /></Col>
      </Row>
    </Row>
  );
};

