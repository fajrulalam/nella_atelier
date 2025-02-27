"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductDetail = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isLoaded, setIsLoaded] = useState(
    Array(product.images.length).fill(false)
  );
  const imageWrapperRef = useRef(null);

  // Format price from integer (599000) to "Rp.599.000,-"
  const formatPrice = (price) => {
    const formattedNumber = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp.${formattedNumber},-`;
  };

  // Prepare WhatsApp message
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Halo kakk, saya ingin memasan dress dari Naila Atelier yang tipe ${product.name} yaa`
    );
    return `https://wa.me/+6285748578714?text=${message}`;
  };

  // Handle swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;

    // Threshold for swipe detection
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swipe left, show next image
        nextImage();
      } else {
        // Swipe right, show previous image
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

  // Handle image loading
  const handleImageLoad = (index) => {
    const newLoadedState = [...isLoaded];
    newLoadedState[index] = true;
    setIsLoaded(newLoadedState);
  };

  useEffect(() => {
    // Initialize image position
    updateImagePosition(currentImageIndex);
  }, []);

  return (
    <div className="product-detail-container">
      <div className="product-detail-back">
        <Link href="/" className="back-button">
          ← Back to Products
        </Link>
      </div>

      <div className="product-detail-content">
        {/* Image Gallery */}
        <div className="product-detail-gallery">
          <div
            className="product-image-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="product-image-wrapper" ref={imageWrapperRef}>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    minWidth: "100%",
                    height: "100%",
                  }}
                >
                  {!isLoaded[index] && (
                    <div className="lazy-image-placeholder"></div>
                  )}
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    quality={85}
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

            {/* Elegant arrow navigation */}
            <div className="carousel-nav-arrow prev" onClick={prevImage}>
              &#8249;
            </div>
            <div className="carousel-nav-arrow next" onClick={nextImage}>
              &#8250;
            </div>
          </div>

          {/* Image thumbnails for desktop */}
          <div className="product-detail-thumbnails">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`product-thumbnail ${
                  currentImageIndex === index ? "active" : ""
                }`}
                onClick={() => {
                  setCurrentImageIndex(index);
                  updateImagePosition(index);
                }}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={80}
                  height={100}
                  quality={60}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          {product.valueAdded && product.valueAdded.length > 0 && (
            <div className="product-value-added">
              {product.valueAdded.join(" • ")}
            </div>
          )}

          <h1 className="product-detail-name">{product.name}</h1>

          <div className="product-detail-price-action">
            <span className="product-detail-price">
              {formatPrice(product.price)}
            </span>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              Order via WhatsApp
            </a>
          </div>

          <div className="product-detail-specs">
            {product.color && (
              <div className="spec-group">
                <h3>Color</h3>
                <p>{product.color}</p>
              </div>
            )}

            {product.material && (
              <div className="spec-group">
                <h3>Material</h3>
                <p>{product.material}</p>
              </div>
            )}

            {product.size && product.size.length > 0 && (
              <div className="spec-group">
                <h3>Size</h3>
                <p>{product.size.join(", ")}</p>
              </div>
            )}

            {product.detailSize && (
              <div className="spec-group detailed-size">
                <h3>Detailed Size</h3>
                <div className="size-details">
                  {Object.entries(product.detailSize).map(([key, value]) => (
                    <div key={key} className="size-detail-item">
                      <span className="size-label">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="size-value">{value} cm</span>
                    </div>
                  ))}
                </div>
                {product.sizeTolerance && (
                  <p className="size-tolerance">
                    Size tolerance: {product.sizeTolerance}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
