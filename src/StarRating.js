import { useState } from "react";
import Star from "./Star";

const containerStyle = { display: "flex", alignItems: "center", gap: "16px" };

const starContainerStyle = { display: "flex", gap: "4px" };

export default function StarRating({ color = "#fcc419", size = 48 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i + 1}
            onClick={() => setRating(i + 1)}
            full={tempRating >= i + 1 || rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>

      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}
