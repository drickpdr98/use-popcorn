import { useState } from "react";

import List from "./List";

export default function ListBoxSearch({
  movies,
  onGetMovieId,
  onCloseMovieId,
}) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <List
          movies={movies}
          onGetMovieId={onGetMovieId}
          onCloseMovieId={onCloseMovieId}
        />
      )}
    </div>
  );
}
