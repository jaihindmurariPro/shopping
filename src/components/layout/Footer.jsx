import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>StyleHub</div>
            <p className={styles.tagline}>India's Fashion Destination</p>
            <p className={styles.desc}>Shop the latest fashion, lifestyle and accessories from top brands. Fast delivery, easy returns.</p>
            <div className={styles.socials}>
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => (
                <a key={s} href="#" className={styles.socialLink}>{s[0]}</a>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <h4>Online Shopping</h4>
            <ul>
              {['Men', 'Women', 'Kids', 'Home & Living', 'Beauty', 'Sports'].map(l => (
                <li key={l}><Link to={`/category/${l.toLowerCase()}`}>{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Customer Policies</h4>
            <ul>
              {['Contact Us', 'FAQ', 'T&C', 'Terms Of Use', 'Track Orders', 'Shipping', 'Cancellation', 'Returns'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Experience StyleHub App</h4>
            <div className={styles.appBtns}>
              <a href="#" className={styles.appBtn}>
                <span>🍎</span> App Store
              </a>
              <a href="#" className={styles.appBtn}>
                <span>🤖</span> Google Play
              </a>
            </div>
            <h4 style={{marginTop: '24px'}}>We Accept</h4>
            <div className={styles.payments}>
              {['Visa', 'Mastercard', 'UPI', 'Paytm', 'COD'].map(p => (
                <span key={p} className={styles.payChip}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.guarantee}>
            {[
              { icon: '🔒', text: '100% Secure Payments' },
              { icon: '✅', text: 'Easy Returns & Exchanges' },
              { icon: '🚚', text: 'Free Shipping on ₹999+' },
              { icon: '💯', text: 'Authentic Products' },
            ].map(g => (
              <div key={g.text} className={styles.guaranteeItem}>
                <span>{g.icon}</span> {g.text}
              </div>
            ))}
          </div>
          <div className={styles.copyright}>
            <p>© 2025 StyleHub. All rights reserved.</p>
            <p>Built with ❤️ for fashion lovers across India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
