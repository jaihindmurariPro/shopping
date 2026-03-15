import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products, columns = 4, title, subtitle }) {
  if (!products || products.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>😕</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.grid} style={{ '--cols': columns }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
