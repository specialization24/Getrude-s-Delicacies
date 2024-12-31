import React from "react";
import "./Hero.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Left Content */}
      <div className="hero-left">
        <img src="/images/logo-icon.png" alt="Logo Icon" className="hero-logo" />
        <h1 className="hero-heading">
          All your stomach desires <br />
          <span className="highlight">in one place</span>
        </h1>
        <p className="hero-subtext">
          Not feeling your menu at home or even want to go rogue <br />
          from your strict diet? We won't tell. Please dive in.
        </p>
        <ul className="hero-features">
          <li>
            <span className="pink-tick">✔</span> Quality over Quantity
          </li>
          <li>
            <span className="pink-tick">✔</span> Live your finger licking for more
          </li>
          <li>
            <span className="pink-tick">✔</span> Amazing offers for our esteemed customers
          </li>
        </ul>
        <div className="customer-feedback">
          <div className="customer-icons">
            <img src="/images/customers/user-1.jpg" alt="User 1" className="user-icon" />
            <img src="/images/customers/user-2.png" alt="User 2" className="user-icon" />
            <img src="/images/customers/user-3.png" alt="User 3" className="user-icon" />
            <img src="/images/customers/user-4.jpg" alt="User 4" className="user-icon" />
            <img src="/images/customers/user-5.jpg" alt="User 5" className="user-icon" />
          </div>
          <p className="customer-rating">
            <span className="pink-stars">★★★★★</span> 1,250 happy customers
          </p>
        </div>
      </div>

      {/* Right Content */}
      <div className="hero-right">
        <img src="/images/hero/strawberry-chiffon-cake.jpg" alt="Chiffon Cake" className="hero-image" />
      </div>
    </section>
  );
};

export default HeroSection;
