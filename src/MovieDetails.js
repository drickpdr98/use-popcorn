import { useEffect, useState } from "react";

import StarRating from "./StarRating";

function MovieDetails({ selectedId, onCloseMovieId, onAddWatched }) {
  const [details, setDetails] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const handleAdd = function () {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: details.Title,
      year: details.Year,
      poster: details.Poster,
      imdbRating: Number(details.ImdbRating),
      runtime: Number(details.Runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovieId();
  };

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    async function getMovieDetails() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=2d10cf42&i=${selectedId}`,
        { signal: controller.signal }
      );

      if (response.ok) {
        const data = await response.json();
        setDetails(data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch movie details.");
      }
    }

    getMovieDetails();

    return () => controller.abort();
  }, [selectedId]);

  useEffect(() => {
    if (!details.Title) return;
    document.title = details.Title;

    return () => (document.Title = "Use Popcorn");
  }, [details]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="details">
          <header>
            {userRating > 0 && (
              <button className="btn-back" onClick={onCloseMovieId}>
                &larr;
              </button>
            )}
            <img src={details.Poster} alt={`Poster of ${details.Title}`} />
            <div className="details-overview">
              <h2>{details.Title}</h2>
              <p>
                {details.Released} &bull; {details.Runtime}
              </p>
              <p>{details.Genre}</p>
              <p>
                <span>⭐️</span>
                {details.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              <button className="btn-add" onClick={handleAdd}>
                +Add to list
              </button>
            </div>
            <p>
              <em>{details.Plot}</em>
            </p>
            <p>Starring: {details.Actors}</p>
            <p>Directed by {details.Director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
