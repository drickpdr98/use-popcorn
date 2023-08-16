export default function StarRating() {
  return (
    <div>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <span>{i + 1}</span>
        ))}
      </div>
      <div>
        <p>10</p>
      </div>
    </div>
  );
}
