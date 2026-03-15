import React from 'react';

export default function RatingStars({ rating, size = 16, showNumber = false }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return 'full';
    if (i < rating) return 'half';
    return 'empty';
  });

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {stars.map((type, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`half-${i}`}>
              <stop offset="50%" stopColor="#f5a623"/>
              <stop offset="50%" stopColor="#e0e0e0"/>
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={type === 'full' ? '#f5a623' : type === 'half' ? `url(#half-${i})` : '#e0e0e0'}
          />
        </svg>
      ))}
      {showNumber && (
        <span style={{ marginLeft: 4, fontSize: size * 0.85, color: '#535766', fontWeight: 500 }}>
          {rating}
        </span>
      )}
    </span>
  );
}
