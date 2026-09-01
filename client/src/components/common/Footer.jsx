import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo/cafeconnect-icon-dark.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-brand-logo">
            <img
              src={logoIcon}
              alt=""
              className="footer-logo-icon"
            />
            <span>CaféConnect</span>
          </Link>

          <p>
            Fresh coffee, delicious food, and a better café experience.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/track-order">Track Order</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Visit us at the café</p>
          <p>Open daily</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 CaféConnect. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;