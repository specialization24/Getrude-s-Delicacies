import React from "react";
import "./CustomSection.css";

const CustomSection = () => {
  return (
    <section className="custom-section">
      <div className="container">
        {/* Heading */}
        <div className="heading-container">
          <h2 className="main-heading">
            Order and enjoy{" "}
            <span className="highlight">fresh delicacies</span> now!
          </h2>
        </div>

        {/* Image and Content Section */}
        <div className="content-container">
          {/* First Image */}
          <div className="image-box">
            <img
              src="/images/delicacies/featured-dish.jpg"
              alt="Featured Dish"
              className="image-large"
            />
          </div>

          {/* Mobile Mockup */}
          <div className="phone-mockup">
            <img
              src="/images/delicacies/featured-mobile.jpg"
              alt="Order on Mobile"
              className="image-phone"
            />
          </div>
        </div>

        {/* Features List */}
        <ul className="features-list">
          <li>
            <span className="check-icon">✔</span> Premium ingredients used
          </li>
          <li>
            <span className="check-icon">✔</span> Finger-licking taste guaranteed
          </li>
          <li>
            <span className="check-icon">✔</span> Variety of snacks and meals
          </li>
          <li>
            <span className="check-icon">✔</span> Fast delivery at your doorstep
          </li>
        </ul>

        {/* Call-to-Action */}
        <div className="cta-container">
          <a href="/login" className="cta-button">
            Place Your Order Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomSection;
