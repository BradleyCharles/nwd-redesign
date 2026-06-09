import React from "react";

function TestimonialCard({ name, role, company, rating, quote }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-text">"{quote}"</p>

      {rating && (
        <div
          className="testimonial-stars"
          aria-label={`${rating} out of 5 stars`}
          role="img"
        >
          {"⭐".repeat(rating)}
        </div>
      )}

      <h4>{name}</h4>
      <p>{role} {company && `- ${company}`}</p>
    </div>
  );
}

export default TestimonialCard;