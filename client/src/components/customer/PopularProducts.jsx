import ProductCard from "./ProductCard";

const popularProducts = [
  {
    id: 1,
    name: "Cappuccino",
    category: "Coffee",
    description: "Rich espresso with steamed milk and smooth foam.",
    price: 450,
  },
  {
    id: 2,
    name: "Caramel Latte",
    category: "Coffee",
    description: "Smooth espresso blended with creamy caramel.",
    price: 520,
  },
  {
    id: 3,
    name: "Chocolate Croissant",
    category: "Bakery",
    description: "Buttery pastry filled with rich chocolate.",
    price: 350,
  },
];

function PopularProducts() {
  return (
    <section className="popular-section">

      <div className="section-heading">
        <div>
          <span className="section-label">CUSTOMER FAVORITES</span>
          <h2>Popular Today</h2>
        </div>

        <p>
          Some of the favorites our customers keep coming back for.
        </p>
      </div>

      <div className="products-grid">
        {popularProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

export default PopularProducts;