import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, showQuickAdd = true }) {
  const { toggleWishlist, isInWishlist, addToCart } = useApp();
  const [imgIdx, setImgIdx] = useState(0);
  const [showSizes, setShowSizes] = useState(false);
  const wished = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes.length === 1) {
      addToCart(product, product.sizes[0]);
    } else {
      setShowSizes(v => !v);
    }
  };

  const handleSizeSelect = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size);
    setShowSizes(false);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.link}>
        {/* Image */}
        <div
          className={styles.imgWrap}
          onMouseEnter={() => product.images[1] && setImgIdx(1)}
          onMouseLeave={() => setImgIdx(0)}
        >
          <img
            src={product.images[imgIdx] || product.images[0]}
            alt={product.name}
            className={styles.img}
            loading="lazy"
          />

          {/* Badges */}
          <div className={styles.badges}>
            {product.isNew && <span className="badge badge-primary">NEW</span>}
            {product.isTrending && !product.isNew && <span className="badge badge-accent">TRENDING</span>}
            {product.discount >= 50 && !product.isNew && !product.isTrending && (
              <span className="badge badge-green">{product.discount}% OFF</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            className={`${styles.wishBtn} ${wished ? styles.wished : ''}`}
            onClick={handleWishlist}
            aria-label="Wishlist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Quick Add */}
          {showQuickAdd && product.inStock && (
            <div className={styles.quickAddWrap}>
              {showSizes ? (
                <div className={styles.sizeQuick}>
                  {product.sizes.map(s => (
                    <button key={s} className={styles.sizeQuickBtn} onClick={(e) => handleSizeSelect(e, s)}>
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <button className={styles.quickAdd} onClick={handleQuickAdd}>
                  + Add to Bag
                </button>
              )}
            </div>
          )}

          {!product.inStock && (
            <div className={styles.outOfStock}>Out of Stock</div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.name}>{product.name.replace(product.brand, '').trim()}</p>

          <div className={styles.pricing}>
            <span className={styles.price}>₹{product.price.toLocaleString()}</span>
            <span className="price-original">₹{product.mrp.toLocaleString()}</span>
            <span className="price-discount">({product.discount}% off)</span>
          </div>

          <div className={styles.meta}>
            <div className={styles.ratingWrap}>
              <span className={styles.ratingBadge}>
                {product.rating} ★
              </span>
              <span className={styles.reviewCount}>({product.reviewCount.toLocaleString()})</span>
            </div>
            {product.isBestseller && (
              <span className={styles.bestseller}>Bestseller</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
