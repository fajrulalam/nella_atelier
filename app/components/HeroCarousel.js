"use client"; // This file is client-side only
import { useEffect, useState } from "react";

const HeroCarousel = () => {
  const images = [
    "/assets/cover compressed.jpg",
    "/assets/cover 2.jpg",
    // "/assets/cover compressed.jpg",
  ]; // Ensure these image files are in your public/assets folder

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="hero-carousel">
      <div
        className="hero-carousel-inner"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="hero-carousel-item">
            <img src={src} alt={`Carousel ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="hero-carousel-nav-arrow prev" onClick={prevImage}>
        &#8249;
      </div>
      <div className="hero-carousel-nav-arrow next" onClick={nextImage}>
        &#8250;
      </div>
    </div>
  );
};

export default HeroCarousel;
