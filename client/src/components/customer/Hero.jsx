import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo/cafeconnect-icon.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">
          Freshly brewed. Made for you.
        </span>

        <h1>
          Your Coffee.
          <br />
          Your Way.
        </h1>

        <p>
          Discover your favorite coffee, freshly prepared food,
          and everything you love from CaféConnect.
        </p>

        <div className="hero-actions">
          <Link to="/menu" className="primary-button">
            Browse Menu
          </Link>

          <Link to="/categories" className="secondary-button">
            Explore Categories
          </Link>
        </div>
      </div>

      <div className="hero-visual">
        <div className="coffee-circle">
          <img
            src={logoIcon}
            alt="CaféConnect coffee cup"
            className="hero-logo"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;