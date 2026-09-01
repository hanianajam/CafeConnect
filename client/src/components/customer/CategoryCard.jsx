function CategoryCard({ icon, name, description }) {
  return (
    <div className="category-card">

      <div className="category-icon">
        {icon}
      </div>

      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>

    </div>
  );
}

export default CategoryCard;