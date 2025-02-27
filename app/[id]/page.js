"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/app/components/Layout";
import ProductDetail from "@/app/components/ProductDetail";

// Simulated product data
const products = [
  {
    id: 1,
    name: "Luxor Dress Blue",
    images: [
      "/assets/luxor dress blue 1.JPG",
      "/assets/luxor dress blue 2.JPG",
      "/assets/luxor dress blue 3.JPG",
      "/assets/luxor dress blue 4.JPG",
      "/assets/luxor dress blue 5.JPG",
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
      "/assets/luxor dress purple 1.JPG",
      "/assets/luxor dress purple 2.JPG",
      "/assets/luxor dress purple 3.JPG",
      "/assets/luxor dress purple 4.JPG",
      "/assets/luxor dress purple 5.JPG",
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
  // Add more products as needed...
];

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      setProduct(foundProduct || null);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <p>Loading product details...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductDetail product={product} />
    </Layout>
  );
}
