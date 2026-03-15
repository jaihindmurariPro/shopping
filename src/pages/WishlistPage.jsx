import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>❤️</div>
        <h2>Your Wishlist is empty</h2>
        <p>Save items you love here and review them anytime.</p>
        <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>My Wishlist ({wishlist.length})</h1>
          <p className={styles.subtitle}>Items you've saved for later</p>
        </div>

        <div className={styles.grid}>
          {wishlist.map(item => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imgWrap} onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.images[0]} alt={item.name} className={styles.img} />
                {!item.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
                <button
                  className={styles.removeBtn}
                  onClick={e => { e.stopPropagation(); toggleWishlist(item); }}
                  title="Remove from wishlist"
                >
                  ✕
                </button>
                <span className={styles.discountBadge}>{item.discount}% OFF</span>
              </div>

              <div className={styles.info}>
                <div className={styles.brand}>{item.brand}</div>
                <div className={styles.name}>{item.name.replace(item.brand, '').trim()}</div>
                <div className={styles.pricing}>
                  <span className={styles.price}>₹{item.price.toLocaleString()}</span>
                  <span className="price-original">₹{item.mrp.toLocaleString()}</span>
                </div>
                <div className={styles.ratingRow}>
                  <span className={styles.ratingBadge}>{item.rating} ★</span>
                  <span className={styles.reviewCount}>({item.reviewCount.toLocaleString()})</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={`btn btn-primary btn-block ${styles.addBtn}`}
                  onClick={() => {
                    if (item.sizes.length === 1) {
                      addToCart(item, item.sizes[0]);
                    } else {
                      navigate(`/product/${item.id}`);
                    }
                  }}
                  disabled={!item.inStock}
                >
                  {item.inStock ? '🛒 Move to Bag' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
