export default function NumberOfResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length <= 0 ? 0 : movies.length}</strong> results
    </p>
  );
}
