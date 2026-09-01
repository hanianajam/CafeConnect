function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span>☕</span>
        )}
      </div>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-bottom">

          <span className="product-price">
            Rs. {product.price}
          </span>

          <button className="add-button">
            +
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;