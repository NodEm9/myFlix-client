import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';


export const FavoriteMovie = ({ movies, user }) => {
  if (!user || !movies ) return null;

  if (!Array.isArray(movies)) {
    return <div>Invalid movie data.</div>
  };

  let favoriteMovies = movies.filter((movie) => {
    user.favoriteMovies.includes(movie._id);
  });
 
  return (
    <Row className="favorite-movies d-flex mt-4 h-100">
        <Col className='d-flex justify-content-center'>
        {favoriteMovies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
        </Col>
    </Row>
  );
 }