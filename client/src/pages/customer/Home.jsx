import { Link } from "react-router-dom";
import Hero from "../../components/customer/Hero";
import CategoryCard from "../../components/customer/CategoryCard";
import PopularProducts from "../../components/customer/PopularProducts";

function Home() {
  return (
    <div className="home">
      <Hero />

      <section className="categories-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>Find Your Favorite</h2>
          </div>

          <p>Explore our menu by category.</p>
        </div>

        <div className="categories-grid">
          <CategoryCard
            icon="☕"
            name="Coffee"
            description="Espresso, latte, cappuccino and more."
          />

          <CategoryCard
            icon="🥐"
            name="Bakery"
            description="Freshly baked pastries and treats."
          />

          <CategoryCard
            icon="🍰"
            name="Desserts"
            description="Sweet treats for every craving."
          />

          <CategoryCard
            icon="🥪"
            name="Food"
            description="Delicious bites to complete your meal."
          />
        </div>
      </section>

      <PopularProducts />

      <section className="order-cta">
        <div>
          <span className="section-label">READY TO ORDER?</span>

          <h2>
            Your next favorite
            <br />
            cup is waiting.
          </h2>

          <p>
            Browse our menu and place your order in just a few clicks.
          </p>
        </div>

        <Link to="/menu" className="primary-button">
          View Full Menu →
        </Link>
      </section>
    </div>
  );
}

export default Home;