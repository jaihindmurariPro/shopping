import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { orders, getProductById } from '../data/products';
import styles from './OrdersPage.module.css';

const statusColors = {
  Delivered: 'var(--accent-green)',
  Shipped: '#2196f3',
  Processing: 'var(--accent)',
  Cancelled: 'var(--primary)',
};

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'delivered', 'shipped', 'processing', 'cancelled'];

  const filtered = orders.filter(o =>
    activeFilter === 'all' || o.status.toLowerCase() === activeFilter
  );

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>My Orders</h1>
          <div className={styles.filters}>
            {filters.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📦</div>
            <h2>No orders found</h2>
            <p>Your {activeFilter !== 'all' ? activeFilter : ''} orders will appear here</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>Shop Now</Link>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {filtered.map(order => {
              const firstItem = getProductById(order.items[0]?.productId);
              return (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div>
                      <div className={styles.orderId}>Order #{order.id}</div>
                      <div className={styles.orderDate}>Placed on {order.date}</div>
                    </div>
                    <div className={styles.orderStatus} style={{ color: statusColors[order.status] || 'var(--text-secondary)' }}>
                      <span className={styles.statusDot} style={{ background: statusColors[order.status] }} />
                      {order.status}
                    </div>
                  </div>

                  {firstItem && (
                    <div className={styles.orderItem}>
                      <img src={firstItem.images[0]} alt={firstItem.name} className={styles.orderImg} />
                      <div className={styles.orderInfo}>
                        <div className={styles.orderBrand}>{firstItem.brand}</div>
                        <div className={styles.orderName}>{firstItem.name}</div>
                        <div className={styles.orderMeta}>
                          Size: {order.items[0].size} | Qty: {order.items[0].quantity}
                        </div>
                        {order.items.length > 1 && (
                          <div className={styles.moreItems}>+{order.items.length - 1} more items</div>
                        )}
                      </div>
                      <div className={styles.orderTotal}>₹{order.total.toLocaleString()}</div>
                    </div>
                  )}

                  <div className={styles.orderFooter}>
                    <div className={styles.deliveryInfo}>
                      {order.status === 'Delivered' && order.deliveredOn && (
                        <span>✅ Delivered on {order.deliveredOn}</span>
                      )}
                      {order.status === 'Shipped' && order.expectedDelivery && (
                        <span>🚚 Expected by {order.expectedDelivery}</span>
                      )}
                    </div>
                    <div className={styles.orderActions}>
                      <button className={styles.actionBtn}>View Details</button>
                      {order.status === 'Delivered' && (
                        <>
                          <button className={styles.actionBtn}>Rate & Review</button>
                          <button className={styles.actionBtn}>Return</button>
                        </>
                      )}
                      {order.status === 'Shipped' && (
                        <button className={styles.actionBtn}>Track Package</button>
                      )}
                      {order.status === 'Processing' && (
                        <button className={`${styles.actionBtn} ${styles.cancelBtn}`}>Cancel Order</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
