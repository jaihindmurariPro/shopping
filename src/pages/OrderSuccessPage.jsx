// OrderSuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderSuccessPage.module.css';

export default function OrderSuccessPage() {
  const [orderId] = useState(`ORD-${Date.now().toString().slice(-8)}`);
  const deliveryDate = new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.successIcon}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#03a685" fillOpacity="0.1"/>
            <circle cx="32" cy="32" r="24" fill="#03a685"/>
            <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className={styles.title}>Order Placed Successfully! 🎉</h1>
        <p className={styles.orderId}>Order ID: <strong>{orderId}</strong></p>
        <p className={styles.deliveryInfo}>
          Estimated delivery by <strong>{deliveryDate}</strong>
        </p>

        <div className={styles.trackingBar}>
          {['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((s, i) => (
            <div key={s} className={`${styles.trackStep} ${i === 0 ? styles.trackDone : ''}`}>
              <div className={styles.trackDot} />
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className={styles.infoCards}>
          <div className={styles.infoCard}>
            <span>📧</span>
            <div>
              <div className={styles.infoTitle}>Confirmation Email</div>
              <div className={styles.infoSub}>Sent to your registered email</div>
            </div>
          </div>
          <div className={styles.infoCard}>
            <span>📱</span>
            <div>
              <div className={styles.infoTitle}>SMS Update</div>
              <div className={styles.infoSub}>Tracking link sent to your phone</div>
            </div>
          </div>
          <div className={styles.infoCard}>
            <span>🔄</span>
            <div>
              <div className={styles.infoTitle}>Easy Returns</div>
              <div className={styles.infoSub}>30-day hassle-free return policy</div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/orders" className="btn btn-outline btn-lg">Track Order</Link>
          <Link to="/" className="btn btn-primary btn-lg">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
