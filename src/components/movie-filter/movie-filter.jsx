import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/movies/movieSlice";
import Form from "react-bootstrap/Form";
import "./movie-filter.scss";


const MovieFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form className="filter">
      <Form.Group controlId="formFilter" className="filter-group">
        <Form.Label className="formLabel">Search Movies</Form.Label>
        <Form.Control
          type="text"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          placeholder="Search movies..."
          className="border-success p-3 w-75 min-vw-auto mx-auto rounded-pill text-indent-5"
          aria-placeholder="Movie title"
        />
      </Form.Group>
    </Form>
  );
}

export default MovieFilter;