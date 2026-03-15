import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { offers, getProductsByCategory } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import styles from './OffersPage.module.css';
import toast from 'react-hot-toast';

export default function OffersPage() {
  const [activeOffer, setActiveOffer] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    toast.success(`Code "${code}" copied!`, { icon: '📋' });
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className="badge badge-primary" style={{ fontSize: 13, padding: '4px 12px' }}>🔥 LIMITED TIME</span>
            <h1 className={styles.heroTitle}>Today's Best Deals</h1>
            <p className={styles.heroSub}>Handpicked offers just for you — don't miss out!</p>
          </div>
          <div className={styles.heroStats}>
            {[
              { label: 'Active Offers', value: offers.length },
              { label: 'Max Discount', value: '70%' },
              { label: 'Brands', value: '50+' },
              { label: 'Hours Left', value: '12h' },
            ].map(s => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statVal}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coupon Cards */}
        <div className={styles.couponsGrid}>
          {offers.map(offer => (
            <div
              key={offer.id}
              className={`${styles.couponCard} ${activeOffer === offer.id ? styles.expanded : ''}`}
              style={{ '--c': offer.color }}
            >
              <div className={styles.couponLeft}>
                <div className={styles.couponOff}>
                  {offer.title.match(/\d+%/)?.[0] || '🎁'}
                </div>
              </div>
              <div className={styles.couponBody}>
                <div className={styles.couponTitle}>{offer.title}</div>
                <div className={styles.couponBrand}>Brand: {offer.brand}</div>
                <div className={styles.couponCodeRow}>
                  <span className={styles.couponCode}>{offer.code}</span>
                  <button className={styles.copyBtn} onClick={() => copyCode(offer.code)}>📋 Copy</button>
                </div>
                <div className={styles.couponExpiry}>Valid till: {offer.expiry}</div>
                <Link to={`/category/${offer.category}`} className={styles.shopBtn}>
                  Shop Now →
                </Link>
              </div>
              <div className={styles.couponPerf}>
                {/* Dotted divider */}
              </div>
            </div>
          ))}
        </div>

        {/* Deal of the Day */}
        <div className={styles.dealSection}>
          <div className={styles.dealHeader}>
            <h2 className={styles.sectionTitle}>⚡ Flash Sale — Ends Tonight</h2>
            <div className={styles.countdown}>
              {['12', ':', '34', ':', '57'].map((c, i) => (
                <span key={i} className={c === ':' ? styles.colon : styles.countUnit}>{c}</span>
              ))}
            </div>
          </div>
          <div className={styles.dealGrid}>
            {getProductsByCategory('women').filter(p => p.discount >= 40).slice(0, 8).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Category Deals */}
        {['men', 'footwear', 'accessories'].map(cat => (
          <div key={cat} className={styles.catDealSection}>
            <div className={styles.dealHeader}>
              <h2 className={styles.sectionTitle}>Top Deals in {cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
              <Link to={`/category/${cat}`} className={styles.viewAll}>View All →</Link>
            </div>
            <div className={styles.dealRow}>
              {getProductsByCategory(cat).filter(p => p.discount >= 30).slice(0, 5).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ))}

        {/* Bank Offers */}
        <div className={styles.bankOffers}>
          <h2 className={styles.sectionTitle}>💳 Bank Offers</h2>
          <div className={styles.bankGrid}>
            {[
              { bank: 'HDFC', desc: '10% instant discount on HDFC Credit Cards', code: 'HDFC10', icon: '🏦' },
              { bank: 'SBI', desc: '5% cashback on SBI Debit Cards', code: 'SBI5', icon: '🏛️' },
              { bank: 'ICICI', desc: 'No-cost EMI on orders above ₹3,000', code: 'ICICIEMI', icon: '💳' },
              { bank: 'Paytm', desc: '₹100 cashback on Paytm Wallet payment', code: 'PAYTM100', icon: '📱' },
            ].map(b => (
              <div key={b.bank} className={styles.bankCard}>
                <div className={styles.bankIcon}>{b.icon}</div>
                <div className={styles.bankInfo}>
                  <div className={styles.bankName}>{b.bank} Bank</div>
                  <div className={styles.bankDesc}>{b.desc}</div>
                </div>
                <button className={styles.bankCopy} onClick={() => copyCode(b.code)}>
                  {b.code}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
