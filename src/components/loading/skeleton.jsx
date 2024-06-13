import Card from "react-bootstrap/Card"

const  Skeleton = () => {
  return (
    <div  className="movie-card">
      <div className="movie-card__header"></div>
      <div className="movie-card__title"></div>
      <div className="movie-card__description"></div>
      <div className="movie-card__genre"></div>
    </div>
  ) 
}

export default Skeleton