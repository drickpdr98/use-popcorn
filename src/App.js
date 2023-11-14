import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import ListBoxSearch from "./ListBoxSearch";
import ListBoxWatched from "./ListBoxWatched";
import MovieDetails from "./MovieDetails";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const getMovieIdHandler = function (movieId) {
    setSelectedId((selectedId) => (movieId === selectedId ? null : movieId));
  };

  const closeMovieIdHandler = function () {
    setSelectedId(null);
  };

  const handleWatchedMovie = function (movie) {
    setWatched((watched) => [...watched, movie]);
  };

  useEffect(
    function () {
      async function fetchDataHandler() {
        setLoading(true);
        setError(null);
        try {
          const fetchData = await fetch(
            `http://www.omdbapi.com/?apikey=2d10cf42&s=${query}`
          );

          if (!fetchData.ok) {
            throw new Error("Something went wrong");
          }

          const response = await fetchData.json();

          if (response.Response === "False") {
            throw new Error("Movie not found.");
          }

          setMovies(response.Search);
        } catch (error) {
          console.log(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      if (!query.length) {
        setMovies([]);
        setError(null);

        return;
      }
      fetchDataHandler();
    },
    [query]
  );

  return (
    <React.Fragment>
      <Navigation movies={movies} query={query} setQuery={setQuery} />
      <main className="main">
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !error && (
          <ListBoxSearch
            movies={movies}
            onGetMovieId={getMovieIdHandler}
            onCloseMovieId={closeMovieIdHandler}
          />
        )}
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovieId={closeMovieIdHandler}
            onAddWatched={handleWatchedMovie}
          />
        ) : (
          <ListBoxWatched watched={watched} />
        )}
      </main>
    </React.Fragment>
  );
}
