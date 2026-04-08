import { useState, useEffect } from "react";

export function Slideshow() {
  const images = [
    "https://source.unsplash.com/1600x600/?technology",
    "https://source.unsplash.com/1600x600/?business",
    "https://source.unsplash.com/1600x600/?startup",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <img
        src={images[index]}
        alt="slide"
        style={{ width: "100%", borderRadius: "10px" }}
      />
    </div>
  );
}