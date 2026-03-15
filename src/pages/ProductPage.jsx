import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { useApp } from '../context/AppContext';
import RatingStars from '../components/common/RatingStars';
import ProductCard from '../components/product/ProductCard';
import styles from './ProductPage.module.css';

const mockReviews = [
  { id: 1, name: 'Priya S.', rating: 5, date: '10 Mar 2025', title: 'Excellent quality!', body: 'The fabric is premium and the fit is perfect. Exactly as shown in pictures. Very happy with this purchase!', verified: true, helpful: 42 },
  { id: 2, name: 'Rahul M.', rating: 4, date: '5 Mar 2025', title: 'Good value for money', body: 'Nice product overall. The color is slightly different from the photo but still looks great. Delivery was fast.', verified: true, helpful: 28 },
  { id: 3, name: 'Ananya K.', rating: 5, date: '28 Feb 2025', title: 'Highly recommend!', body: 'Ordered this for a special occasion and got so many compliments. The sizing guide was accurate too.', verified: false, helpful: 19 },
  { id: 4, name: 'Deepak T.', rating: 3, date: '22 Feb 2025', title: 'Okay but could be better', body: 'The product is decent but stitching quality could be improved. The color and design are as advertised.', verified: true, helpful: 11 },
];

const ratingDist = [
  { star: 5, pct: 62 },
  { star: 4, pct: 21 },
  { star: 3, pct: 10 },
  { star: 2, pct: 4 },
  { star: 1, pct: 3 },
];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, toggleWishlist, isInWishlist, dispatch } = useApp();

  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: product });
      setSelectedSize(null);
      setActiveImg(0);
    }
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Go Home</Link>
      </div>
    );
  }

  const wished = isInWishlist(product.id);
  const similar = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 6);

  const handleAddToBag = () => {
    addToCart(product, selectedSize, qty);
  };

  const handleBuyNow = () => {
    if (addToCart(product, selectedSize, qty)) {
      navigate('/checkout');
    }
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryInfo({
        available: true,
        date: new Date(Date.now() + product.deliveryDays * 86400000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }),
        cod: true,
        free: product.price >= 999,
      });
    }
  };

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to={`/category/${product.category}`}>{product.category}</Link> / <span>{product.name}</span>
        </nav>

        <div className={styles.main}>
          {/* Left: Images */}
          <div className={styles.gallerySection}>
            <div className={styles.thumbs}>
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </div>
              ))}
            </div>
            <div className={styles.mainImg}>
              <img src={product.images[activeImg]} alt={product.name} />
              <button
                className={`${styles.wishOverlay} ${wished ? styles.wished : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {wished ? 'Wishlisted' : 'Wishlist'}
              </button>
              {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
            </div>
          </div>

          {/* Right: Details */}
          <div className={styles.details}>
            <div className={styles.brandRow}>
              <span className={styles.brand}>{product.brand}</span>
              {product.isBestseller && <span className="badge badge-accent">Bestseller</span>}
              {product.isNew && <span className="badge badge-primary">New</span>}
            </div>
            <h1 className={styles.name}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <span className={styles.ratingBadge}>{product.rating} ★</span>
              <span className={styles.reviewCount}>{product.reviewCount.toLocaleString()} Ratings & Reviews</span>
            </div>

            {/* Price */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>₹{product.price.toLocaleString()}</span>
              <span className="price-original" style={{ fontSize: 18 }}>₹{product.mrp.toLocaleString()}</span>
              <span className="price-discount" style={{ fontSize: 18 }}>{discount}% OFF</span>
            </div>
            <p className={styles.taxNote}>Inclusive of all taxes</p>

            {/* Offer Highlight */}
            <div className={styles.offerBox}>
              <div className={styles.offerTitle}>💰 Best Offers</div>
              <div className={styles.offerItem}>
                <span className={styles.offerBadge}>Bank Offer</span>
                10% off on HDFC Bank Credit Cards. T&C apply.
              </div>
              <div className={styles.offerItem}>
                <span className={styles.offerBadge}>Special</span>
                Get ₹100 cashback on your first order with Paytm.
              </div>
            </div>

            {/* Sizes */}
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeader}>
                <span className={styles.sizeTitle}>Select Size</span>
                <button className={styles.sizeGuide}>Size Guide →</button>
              </div>
              <div className={styles.sizes}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeSelected : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className={styles.qtySection}>
              <span className={styles.sizeTitle}>Quantity</span>
              <div className={styles.qtyControl}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaRow}>
              <button
                className={`btn btn-outline btn-lg ${styles.ctaBtn}`}
                onClick={() => toggleWishlist(product)}
              >
                {wished ? '❤️ Wishlisted' : '🤍 Wishlist'}
              </button>
              <button
                className={`btn btn-primary btn-lg ${styles.ctaBtn}`}
                onClick={handleAddToBag}
                disabled={!product.inStock}
              >
                🛒 Add to Bag
              </button>
            </div>
            <button
              className={`btn btn-secondary btn-lg btn-block ${styles.buyNow}`}
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              ⚡ Buy Now
            </button>

            {/* Delivery Check */}
            <div className={styles.deliverySection}>
              <div className={styles.deliveryTitle}>🚚 Delivery Options</div>
              <div className={styles.pincodeRow}>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={styles.pincodeInput}
                  maxLength={6}
                />
                <button className={styles.checkBtn} onClick={checkDelivery}>Check</button>
              </div>
              {deliveryInfo && (
                <div className={styles.deliveryResult}>
                  <div className={styles.deliveryRow}>
                    <span>📅</span>
                    <span>Get by <strong>{deliveryInfo.date}</strong></span>
                  </div>
                  {deliveryInfo.cod && <div className={styles.deliveryRow}><span>💵</span><span>Cash on Delivery available</span></div>}
                  <div className={styles.deliveryRow}>
                    <span>🔄</span>
                    <span>Easy 30-day return & exchange</span>
                  </div>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className={styles.sellerRow}>
              <span className={styles.sellerLabel}>Sold by:</span>
              <span className={styles.sellerName}>{product.seller}</span>
              <span className={styles.sellerBadge}>✓ Trusted Seller</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabsSection}>
          <div className={styles.tabs}>
            {['details', 'reviews', 'qa'].map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'details' ? 'Product Details' : tab === 'reviews' ? `Reviews (${product.reviewCount.toLocaleString()})` : 'Q&A'}
              </button>
            ))}
          </div>

          {activeTab === 'details' && (
            <div className={styles.tabContent}>
              <div className={styles.descGrid}>
                <div>
                  <h3>Description</h3>
                  <p className={styles.desc}>{product.description}</p>
                </div>
                <div>
                  <h3>Key Features</h3>
                  <ul className={styles.featureList}>
                    {product.features.map((f, i) => (
                      <li key={i}><span className={styles.featureDot}>✓</span> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.specTable}>
                <h3>Specifications</h3>
                <table>
                  <tbody>
                    <tr><td>Brand</td><td>{product.brand}</td></tr>
                    <tr><td>Category</td><td>{product.category}</td></tr>
                    <tr><td>Available Sizes</td><td>{product.sizes.join(', ')}</td></tr>
                    <tr><td>Available Colors</td><td>{product.colors.join(', ')}</td></tr>
                    <tr><td>In Stock</td><td>{product.inStock ? 'Yes' : 'No'}</td></tr>
                    <tr><td>SKU</td><td>SH-{product.id.toString().padStart(6, '0')}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.tabContent}>
              <div className={styles.reviewSummary}>
                <div className={styles.reviewScore}>
                  <div className={styles.scoreNum}>{product.rating}</div>
                  <RatingStars rating={product.rating} size={20} />
                  <div className={styles.scoreCount}>{product.reviewCount.toLocaleString()} verified ratings</div>
                </div>
                <div className={styles.ratingBars}>
                  {ratingDist.map(r => (
                    <div key={r.star} className={styles.ratingBar}>
                      <span>{r.star}★</span>
                      <div className={styles.barTrack}><div className={styles.barFill} style={{ width: `${r.pct}%`, '--color': r.star >= 4 ? 'var(--accent-green)' : r.star === 3 ? 'var(--accent)' : 'var(--primary)' }} /></div>
                      <span>{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.reviewList}>
                {mockReviews.map(r => (
                  <div key={r.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerAvatar}>{r.name[0]}</div>
                      <div>
                        <div className={styles.reviewerName}>{r.name}</div>
                        {r.verified && <span className={styles.verified}>✓ Verified Purchase</span>}
                      </div>
                      <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 12 }}>{r.date}</div>
                    </div>
                    <div className={styles.reviewRatingRow}>
                      <RatingStars rating={r.rating} size={14} />
                      <span className={styles.reviewTitle}>{r.title}</span>
                    </div>
                    <p className={styles.reviewBody}>{r.body}</p>
                    <div className={styles.reviewFooter}>
                      <span>Helpful? </span>
                      <button className={styles.helpBtn}>👍 {r.helpful}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className={styles.tabContent}>
              <div className={styles.qaPlaceholder}>
                <div style={{ fontSize: 40 }}>💬</div>
                <h3>Have a question?</h3>
                <p>Ask from our seller or community of buyers</p>
                <button className="btn btn-outline" style={{ marginTop: 16 }}>Ask a Question</button>
              </div>
            </div>
          )}
        </div>

        {/* Similar Products */}
        <div className={styles.similar}>
          <h2 className={styles.similarTitle}>Similar Products</h2>
          <div className={styles.similarGrid}>
            {similar.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
