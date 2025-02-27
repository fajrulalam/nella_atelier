"use client";
import { useState } from "react";
import HeroCarousel from "./components/HeroCarousel";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";

// Define the type for Product
interface Product {
  id: number;
  name: string;
  images: string[];
  price: number;
  isSoldOut: boolean;
  valueAdded: string[];
  color: string;
  size: string[];
  detailSize: { chestWidth: number; sleeveLength: number; dressLength: number };
  sizeTolerance: string;
  material: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Luxor Dress Blue",
    images: [
      "/assets/luxor dress blue 1.jpeg",
      "/assets/luxor dress blue 2.jpeg",
      "/assets/luxor dress blue 3.jpeg",
      "/assets/luxor dress blue 4.jpeg",
      "/assets/luxor dress blue 5.jpeg",
    ],
    price: 599000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Blue",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 2,
    name: "Luxor Dress Purple",
    images: [
      "/assets/luxor dress purple 1.jpeg",
      "/assets/luxor dress purple 4.jpeg",
      "/assets/luxor dress purple 3.jpeg",
      "/assets/luxor dress purple 2.jpeg",
      "/assets/luxor dress purple 5.jpeg",
    ],
    price: 599000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Purple",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 3,
    name: "Goreme Dress Blue",
    images: [
      "/assets/goreme dress blue 1.jpeg",
      "/assets/goreme dress blue 2.jpeg",
      "/assets/goreme dress blue 3.jpeg",
      "/assets/goreme dress blue 4.jpeg",
      "/assets/goreme dress blue 5.jpeg",
    ],
    price: 599000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Blue",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 4,
    name: "Goreme Dress Pink",
    images: [
      "/assets/goreme dress pink 1.jpeg",
      "/assets/goreme dress pink 2.jpeg",
      "/assets/goreme dress pink 3.jpeg",
      "/assets/goreme dress pink 4.jpeg",
      "/assets/goreme dress pink 5.jpeg",
    ],
    price: 599000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Pink",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 5,
    name: "Mecca Dress Grey",
    images: [
      "/assets/mecca dress grey 1.jpeg",
      "/assets/mecca dress grey 2.jpeg",
      "/assets/mecca dress grey 3.jpeg",
      "/assets/mecca dress grey 4.jpeg",
      "/assets/mecca dress grey 5.jpeg",
    ],
    price: 699000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Grey",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 6,
    name: "Mecca Dress Chocolate",
    images: [
      "/assets/mecca dress chocolate 1.jpeg",
      "/assets/mecca dress chocolate 2.jpeg",
      "/assets/mecca dress chocolate 3.jpeg",
      "/assets/mecca dress chocolate 4.jpeg",
      "/assets/mecca dress chocolate 5.jpeg",
    ],
    price: 699000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Chocolate",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 7,
    name: "Medina Dress Grey",
    images: [
      "/assets/medina dress grey 1.jpeg",
      "/assets/medina dress grey 2.jpeg",
      "/assets/medina dress grey 3.jpeg",
      "/assets/medina dress grey 4.jpeg",
      "/assets/medina dress grey 5.jpeg",
    ],
    price: 699000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Chocolate",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 8,
    name: "Medina Dress Black",
    images: [
      "/assets/medina dress black 1.jpeg",
      "/assets/medina dress black 2.jpeg",
      "/assets/medina dress black 3.jpeg",
      "/assets/medina dress black 4.jpeg",
      "/assets/medina dress black 5.jpeg",
    ],
    price: 699000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Black",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 9,
    name: "Istanbul Dress Choco",
    images: [
      "/assets/istanbul dress choco 1.jpeg",
      "/assets/istanbul dress choco 2.jpeg",
      "/assets/istanbul dress choco 3.jpeg",
      "/assets/istanbul dress choco 4.jpeg",
      "/assets/istanbul dress choco 5.jpeg",
    ],
    price: 799000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Chocolate",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 10,
    name: "Istanbul Dress Choco",
    images: [
      "/assets/istanbul dress mint green 1.jpeg",
      "/assets/istanbul dress mint green 2.jpeg",
      "/assets/istanbul dress mint green 3.jpeg",
      "/assets/istanbul dress mint green 4.jpeg",
      "/assets/istanbul dress mint green 5.jpeg",
    ],
    price: 799000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Mint Green",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 11,
    name: "Gyza Dress Burgundy",
    images: [
      "/assets/gyza dress burgundy 1.jpeg",
      "/assets/gyza dress burgundy 2.jpeg",
      "/assets/gyza dress burgundy 3.jpeg",
      "/assets/gyza dress burgundy 4.jpeg",
      "/assets/gyza dress burgundy 5.jpeg",
    ],
    price: 799000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Burgundy",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  {
    id: 12,
    name: "Gyza Dress Pink",
    images: [
      "/assets/gyza dress pink 1.jpeg",
      "/assets/gyza dress pink 2.jpeg",
      "/assets/gyza dress pink 3.jpeg",
      "/assets/gyza dress pink 4.jpeg",
      "/assets/gyza dress pink 5.jpeg",
    ],
    price: 799000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Pink",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  // Other product data remains the same...
];

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openBottomSheet = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeBottomSheet = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <HeroCarousel />
      <section className="container">
        <h2>The Middle East Collection</h2>
        <div className="grid">
          {products.map((product) => (
            <div key={product.id} onClick={() => openBottomSheet(product)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
      {selectedProduct && (
        <div className="bottom-sheet-overlay" onClick={closeBottomSheet}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeBottomSheet}>
              &times;
            </button>
            <ProductDetail product={selectedProduct} />
          </div>
        </div>
      )}
    </>
  );
}
