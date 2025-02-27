import HeroCarousel from "../components/HeroCarousel";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";

const products = [
  {
    id: 1,
    name: "Product 1",
    images: ["./assets/luxor dress blue 1.JPG"],
    price: 700000,
    isSoldOut: false,
    valueAdded: ["Includes hijab"],
    color: "Blue",
    size: ["All size"],
    detailSize: { chestWidth: 108, sleeveLength: 57, dressLength: 140 },
    sizeTolerance: "1-4 cm",
    material: "Silk Armani",
  },
  // Add more products here
];

const Home = () => {
  return (
    <Layout>
      <HeroCarousel />
      <section className="container">
        <h2>Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
