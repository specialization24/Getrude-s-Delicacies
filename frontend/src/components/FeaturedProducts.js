import React from "react";
import "./FeaturedProducts.css";

const FeaturedProducts = ({ addToCart }) => {
  const meals = [
    {
      id: 1,
      name: "Category 1 Meal",
      image: "images/featured-meals/chocolate-donut.jpg",
      description: "A delicious meal from category 1.",
    },
    {
      id: 2,
      name: "Category 2 Meal",
      image: "images/featured-meals/croissants.jpg",
      description: "A tasty dish from category 2.",
    },
    {
      id: 3,
      name: "Category 3 Meal",
      image: "images/featured-meals/category3-meal.jpg",
      description: "A flavorful meal from category 3.",
    },
  ];

  return (
    <section className="featured-products">
      <h2>Featured Meals</h2>
      <div className="meal-grid">
        {meals.map((meal) => (
          <div key={meal.id} className="meal">
            <img src={meal.image} alt={meal.name} className="meal-image" />
            <p className="meal-name">{meal.name}</p>
            <p className="meal-description">{meal.description}</p>
            <button onClick={() => addToCart(meal)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
