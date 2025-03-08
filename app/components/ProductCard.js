"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ProductCard = ({ product, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isLoaded, setIsLoaded] = useState(
    Array(product.images.length).fill(false)
  );
  const imageWrapperRef = useRef(null);

  // Format price from integer (e.g., 599000) to "Rp.599.000,-"
  const formatPrice = (price) => {
    const formattedNumber = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp.${formattedNumber},-`;
  };

  // Swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex =
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1;
      updateImagePosition(newIndex);
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1;
      updateImagePosition(newIndex);
      return newIndex;
    });
  };

  const updateImagePosition = (index) => {
    if (imageWrapperRef.current) {
      imageWrapperRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  useEffect(() => {
    updateImagePosition(currentImageIndex);
  }, []);

  const handleImageLoad = (index) => {
    const newLoadedState = [...isLoaded];
    newLoadedState[index] = true;
    setIsLoaded(newLoadedState);
  };

  return (
    <div className="product-card" onClick={onClick}>
      <div
        className="product-image-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="product-image-wrapper" ref={imageWrapperRef}>
          {product.images.map((image, index) => (
            <div
              key={index}
              style={{ position: "relative", minWidth: "100%", height: "100%" }}
            >
              {!isLoaded[index] && (
                <div className="lazy-image-placeholder"></div>
              )}
              <Image
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index === 0}
                quality={80}
                unoptimized
                style={{
                  objectFit: "cover",
                  opacity: isLoaded[index] ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
                onLoad={() => handleImageLoad(index)}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          ))}
        </div>

        {/* Arrow navigation with event stopping to avoid triggering onClick */}
        <div
          className="carousel-nav-arrow prev"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prevImage();
          }}
        >
          &#8249;
        </div>
        <div
          className="carousel-nav-arrow next"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextImage();
          }}
        >
          &#8250;
        </div>

        {/* Sold Out Overlay */}
        {product.isSoldOut && (
          <div className="sold-out-overlay">
            <div className="sold-out-text"></div>
          </div>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
      </div>

      {product.isSoldOut && <div className="sold-out-badge">Sold Out</div>}
    </div>
  );
};

export default ProductCard;
