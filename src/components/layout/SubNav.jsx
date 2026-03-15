import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories, subCategories } from '../../data/products';
import styles from './SubNav.module.css';

export default function SubNav() {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  return (
    <div className={styles.subnav}>
      <div className={`container ${styles.inner}`}>
        <nav className={styles.navList}>
          {categories.map(cat => (
            <div
              key={cat.id}
              className={styles.navItem}
              onMouseEnter={() => setActiveMenu(cat.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                to={`/category/${cat.id}`}
                className={`${styles.navLink} ${activeMenu === cat.id ? styles.active : ''}`}
              >
                {cat.label}
              </Link>

              {activeMenu === cat.id && subCategories[cat.id] && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaInner}>
                    <div className={styles.megaHeader}>
                      <span>{cat.icon} Shop {cat.label}</span>
                      <Link to={`/category/${cat.id}`} className={styles.viewAll}>
                        View All →
                      </Link>
                    </div>
                    <div className={styles.subList}>
                      {subCategories[cat.id].map(sub => (
                        <Link
                          key={sub}
                          to={`/category/${cat.id}?sub=${encodeURIComponent(sub)}`}
                          className={styles.subLink}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                    <div className={styles.megaPromo}>
                      <div className={styles.promoCard} onClick={() => navigate(`/category/${cat.id}?sort=newest`)}>
                        <span className="badge badge-primary">NEW</span>
                        <div>New Arrivals</div>
                      </div>
                      <div className={styles.promoCard} onClick={() => navigate(`/category/${cat.id}?sort=discount`)}>
                        <span className="badge badge-accent">SALE</span>
                        <div>Best Offers</div>
                      </div>
                      <div className={styles.promoCard} onClick={() => navigate(`/category/${cat.id}?filter=bestseller`)}>
                        <span className="badge badge-green">⭐</span>
                        <div>Bestsellers</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/offers" className={`${styles.navLink} ${styles.offersLink}`}>
            🔥 Offers
          </Link>
        </nav>
      </div>
    </div>
  );
}
