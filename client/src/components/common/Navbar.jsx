import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo/cafeconnect-icon.png";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="CaféConnect home">
          <img
            src={logoIcon}
            alt=""
            className="navbar-logo-icon"
          />
          <span className="navbar-logo-text">CaféConnect</span>
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/track-order">Track Order</Link>
        </nav>

        <Link to="/cart" className="cart-button">
          <span className="cart-icon" aria-hidden="true">🛒</span>
          <span>Cart</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;