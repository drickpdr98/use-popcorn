function MovieDetails({ selectedId, onCloseMovieId }) {
  return (
    <div>
      <button className="btn-back" onClick={onCloseMovieId}>
        &larr;
      </button>
      {selectedId}
    </div>
  );
}

export default MovieDetails;
