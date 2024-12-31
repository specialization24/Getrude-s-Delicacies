import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: `"If there is an online food ordering site to recommend, it will be Getrude's Delicacies. Do not believe me? Just order one of my specials, the chocolate cupcake, and if I am wrong, please do share!"`,
      name: "Jonathan",
      isVerified: true,
      stars: 5,
      image: "/images/testimonials/jonathan.jpg", // Replace with the actual path
    },
    {
      id: 2,
      text: `"I am a foodist, and as such, I had to try all the variety offered by Getrude's Delicacies. Believe me, you have arrived at the best cake, snacks, and light meal delivering site!"`,
      name: "Josh",
      isVerified: true,
      stars: 5,
      image: "/images/testimonials/josh.jpg", // Replace with the actual path
    },
  ];

  return (
    <section className="testimonials">
      <h2>What our customers say</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="stars">
              {"★".repeat(testimonial.stars)} {/* Display stars */}
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-footer">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
              <div className="testimonial-info">
                <p className="testimonial-name">{testimonial.name}</p>
                {testimonial.isVerified && (
                  <p className="verified-purchase">
                    ✔ Verified Purchase
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
