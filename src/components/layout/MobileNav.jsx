import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import styles from './MobileNav.module.css';

export default function MobileNav() {
  const location = useLocation();
  const { cartCount, wishlist } = useApp();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.mobileNav}>
      <Link to="/" className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Home</span>
      </Link>

      <Link to="/category/women" className={`${styles.navItem} ${location.pathname.startsWith('/category') ? styles.active : ''}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <span>Categories</span>
      </Link>

      <Link to="/search" className={`${styles.navItem} ${isActive('/search') ? styles.active : ''}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Search</span>
      </Link>

      <Link to="/wishlist" className={`${styles.navItem} ${isActive('/wishlist') ? styles.active : ''}`}>
        <div style={{position:'relative'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlist.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
        </div>
        <span>Wishlist</span>
      </Link>

      <Link to="/cart" className={`${styles.navItem} ${isActive('/cart') ? styles.active : ''}`}>
        <div style={{position:'relative'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </div>
        <span>Bag</span>
      </Link>
    </nav>
  );
}
