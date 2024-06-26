import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/movies/movieSlice";
import Form from "react-bootstrap/Form";
import "./movie-filter.scss";


const MovieFilter = () => { 
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form>
      <Form.Group controlId="formFilter">
        <Form.Label className="formLabel">Search Movies</Form.Label>
        <Form.Control
          type="text"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          placeholder="Search movies..."
          className="p-3 w-50 mx-auto"
        />
      </Form.Group>
    </Form>
  );
}

export default MovieFilter;