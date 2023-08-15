import { useState } from "react";

import Input from "./Input";
import Logo from "./Logo";
import NumberOfResults from "./NumberOfResults";

export default function Navigation({ movies }) {
  const [query, setQuery] = useState("");

  return (
    <nav className="nav-bar">
      <Logo />
      <Input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <NumberOfResults movies={movies} />
    </nav>
  );
}
