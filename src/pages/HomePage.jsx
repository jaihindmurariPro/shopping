import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { banners, categories, getTrendingProducts, getNewArrivals, getBestsellers, offers, testimonials, brands } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import styles from './HomePage.module.css';

// ── Hero Banner Slider ──────────────────────────────────────────────
function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  const next = () => setCurrent(c => (c + 1) % banners.length);
  const prev = () => setCurrent(c => (c - 1 + banners.length) % banners.length);

  useEffect(() => {
    timer.current = setInterval(next, 4500);
    return () => clearInterval(timer.current);
  }, []);

  const b = banners[current];

  return (
    <div className={styles.hero} style={{ background: b.bg }}>
      <div className={styles.heroContent}>
        <span className={`badge badge-primary ${styles.heroBadge}`}>{b.badge}</span>
        <h1 className={styles.heroTitle} style={{ color: b.accent }}>
          {b.title.split('\n').map((t, i) => <span key={i}>{t}<br /></span>)}
        </h1>
        <p className={styles.heroSub}>{b.subtitle}</p>
        <Link to={b.link} className={`btn btn-lg ${styles.heroCta}`} style={{ background: b.accent, color: b.bg === banners[0].bg ? '#fff' : '#1a1a1a' }}>
          {b.cta}
        </Link>
      </div>
      <div className={styles.heroImg}>
        <img src={b.image} alt={b.title} />
      </div>

      {/* Controls */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev}>‹</button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next}>›</button>

      <div className={styles.dots}>
        {banners.map((_, i) => (
          <button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}

// ── Category Circles ────────────────────────────────────────────────
function CategoryGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.catGrid}>
          {categories.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className={styles.catItem}>
              <div className={styles.catCircle}>
                <span className={styles.catIcon}>{cat.icon}</span>
              </div>
              <span className={styles.catLabel}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Offer Strip ─────────────────────────────────────────────────────
function OfferStrip() {
  return (
    <div className={styles.offerStrip}>
      {[
        { icon: '🚚', text: 'Free Shipping on orders above ₹999' },
        { icon: '↩️', text: 'Easy 30-day returns & exchanges' },
        { icon: '🔒', text: '100% Secure Payments' },
        { icon: '🎁', text: 'Gift wrapping available' },
        { icon: '⭐', text: '2 Crore+ happy customers' },
      ].map((item, i) => (
        <div key={i} className={styles.offerStripItem}>
          <span>{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

// ── Product Section ─────────────────────────────────────────────────
function ProductSection({ title, subtitle, products, link, linkLabel = 'View All' }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {subtitle && <p className={styles.sectionSub}>{subtitle}</p>}
          </div>
          <Link to={link} className={styles.viewAll}>{linkLabel} →</Link>
        </div>
        <div className={styles.productRow}>
          {products.slice(0, 6).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Offers Cards ────────────────────────────────────────────────────
function OffersSection() {
  const navigate = useNavigate();
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>🔥 Today's Best Deals</h2>
          <Link to="/offers" className={styles.viewAll}>All Offers →</Link>
        </div>
        <div className={styles.offersGrid}>
          {offers.map(offer => (
            <div
              key={offer.id}
              className={styles.offerCard}
              style={{ '--offer-color': offer.color }}
              onClick={() => navigate(`/category/${offer.category}`)}
            >
              <div className={styles.offerTop}>
                <span className={styles.offerTitle}>{offer.title}</span>
                <span className={styles.offerBrand}>{offer.brand}</span>
              </div>
              <div className={styles.offerCode}>
                Code: <strong>{offer.code}</strong>
              </div>
              <div className={styles.offerExpiry}>Expires: {offer.expiry}</div>
              <button className={styles.offerCta}>Shop Now →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Brands Marquee ──────────────────────────────────────────────────
function BrandsMarquee() {
  return (
    <section className={styles.brandsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>Top Brands</h2>
      </div>
      <div className={styles.marqueeWrap}>
        <div className={styles.marquee}>
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className={styles.brandChip}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Promo Banners ───────────────────────────────────────────────────
function PromoBanners() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.promoGrid}>
          <div className={styles.promoBig} style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' }}>
            <div className={styles.promoContent}>
              <span className="badge badge-primary">WOMEN</span>
              <h3>Festive Kurtas<br /><span style={{ color: '#ff3f6c' }}>from ₹299</span></h3>
              <Link to="/category/women" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff', marginTop: 16 }}>Shop Now</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80" alt="Women" className={styles.promoImg} />
          </div>
          <div className={styles.promoSmalls}>
            <div className={styles.promoSmall} style={{ background: 'linear-gradient(135deg, #f12711, #f5af19)' }}>
              <div className={styles.promoContent}>
                <h3 style={{ color: '#fff' }}>Sneakers<br />Up to 60% Off</h3>
                <Link to="/category/footwear" className="btn btn-sm" style={{ background: '#fff', color: '#f12711', marginTop: 12 }}>Explore</Link>
              </div>
            </div>
            <div className={styles.promoSmall} style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)' }}>
              <div className={styles.promoContent}>
                <h3 style={{ color: '#fff' }}>Beauty Must-Haves<br />New Arrivals</h3>
                <Link to="/category/beauty" className="btn btn-sm" style={{ background: '#fff', color: '#11998e', marginTop: 12 }}>Discover</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className={styles.section} style={{ background: 'var(--primary-light)', margin: '0', padding: '48px 0' }}>
      <div className="container">
        <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>What Our Customers Say</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map(t => (
            <div key={t.id} className={styles.testimonialCard}>
              <div className={styles.testTop}>
                <div className={styles.testAvatar}>{t.avatar}</div>
                <div>
                  <div className={styles.testName}>{t.name}</div>
                  <div className={styles.testLocation}>{t.location}</div>
                </div>
                <div className={styles.testRating}>{'★'.repeat(t.rating)}</div>
              </div>
              <p className={styles.testText}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main HomePage ───────────────────────────────────────────────────
export default function HomePage() {
  const trending = getTrendingProducts();
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();

  return (
    <div className={styles.page}>
      <HeroBanner />
      <OfferStrip />
      <CategoryGrid />
      <ProductSection
        title="Trending Now"
        subtitle="The styles everyone's loving right now"
        products={trending}
        link="/category/women"
      />
      <OffersSection />
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh styles just dropped"
        products={newArrivals}
        link="/category/men"
      />
      <PromoBanners />
      <ProductSection
        title="Bestsellers"
        subtitle="Most loved products by our customers"
        products={bestsellers}
        link="/category/footwear"
      />
      <BrandsMarquee />
      <Testimonials />
    </div>
  );
}
