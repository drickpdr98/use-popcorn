import ListItem from "./ListItem";
export default function List({ movies, onGetMovieId, onCloseMovieId }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <ListItem
          movie={movie}
          key={movie.imdbID}
          onGetMovieId={onGetMovieId}
          onCloseMovieId={onCloseMovieId}
        />
      ))}
    </ul>
  );
}
