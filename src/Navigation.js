import { useState } from "react";

import Input from "./Input";
import Logo from "./Logo";
import NumberOfResults from "./NumberOfResults";

export default function Navigation({ movies, query, setQuery }) {
  // const [query, setQuery] = useState("");

  const getQuery = function (event) {
    setQuery(() => event.target.value);
  };
  return (
    <nav className="nav-bar">
      <Logo />
      <Input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={getQuery}
      />
      <NumberOfResults movies={movies} />
    </nav>
  );
}
