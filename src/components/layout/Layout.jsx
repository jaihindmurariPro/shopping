import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import SubNav from './SubNav';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import MobileNav from './MobileNav';
import styles from './Layout.module.css';

export default function Layout() {
  const location = useLocation();
  const hideSubNav = ['/cart', '/checkout', '/order-success', '/login', '/register'].includes(location.pathname);

  return (
    <div className={styles.layout}>
      <ScrollToTop />
      <Navbar />
      {!hideSubNav && <SubNav />}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
