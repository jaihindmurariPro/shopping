import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <div className={styles.illustration}>👗</div>
        <h1 className={styles.title}>Oops! Page not found</h1>
        <p className={styles.desc}>
          Looks like this page went out of stock. Let's get you back to shopping!
        </p>
        <div className={styles.actions}>
          <Link to="/" className="btn btn-primary btn-lg">Go to Homepage</Link>
          <Link to="/category/women" className="btn btn-outline btn-lg">Browse Women</Link>
          <Link to="/category/men" className="btn btn-outline btn-lg">Browse Men</Link>
        </div>
      </div>
    </div>
  );
}
