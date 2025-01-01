import React, { useEffect, useRef, useState } from "react";
import "./SlideShowSection.css";

const images = [
  "/images/featured-meals/chocolate-donut.jpg",
  "/images/featured-meals/brownie-chocolate-bites.jpg",
  "/images/featured-meals/pink-coctail.jpg",
  "/images/featured-meals/fluffy-pancake.jpg",
  "/images/featured-meals/orange-juice.jpg",
  "/images/featured-meals/oreo-chocolate-cupcake.jpg",
  "/images/featured-meals/croissants.jpg",
  "/images/featured-meals/marble-cake.jpg",
  "/images/featured-meals/chocolate-glazed-donut.jpg",
];

const splitArray = (array, numParts) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) result[index] = [];
    result[index].push(array[i]);
  }
  return result;
};

const SlideShowSection = () => {
  const containerRef = useRef(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(splitArray(images, 3));
  }, []);

  const scrollColumn = (columnIndex) => {
    const column = containerRef.current.children[columnIndex];
    const firstChild = column.children[0];
    column.appendChild(firstChild.cloneNode(true));
    column.removeChild(firstChild);
  };

  useEffect(() => {
    const intervalIds = columns.map((_, index) =>
      setInterval(() => scrollColumn(index), 2000)
    );

    return () => intervalIds.forEach((id) => clearInterval(id));
  }, [columns]);

  return (
    <section className="slideshow-section">
      <div className="slideshow-container" ref={containerRef}>
        {columns.map((colImages, index) => (
          <div key={index} className="slideshow-column">
            {colImages.map((img, imgIndex) => (
              <div key={imgIndex} className="slideshow-item">
                <img src={img} alt={`Slide ${imgIndex + 1}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SlideShowSection;
