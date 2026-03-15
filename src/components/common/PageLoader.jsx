import React from 'react';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  return (
    <div className={styles.loader}>
      <div className={styles.logo}>StyleHub</div>
      <div className={styles.spinner}>
        <div></div><div></div><div></div>
      </div>
    </div>
  );
}
