import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, logout, wishlist, cart } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });

  if (!user) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        <h2>Please login to view your profile</h2>
        <Link to="/login" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Login</Link>
      </div>
    );
  }

  const menuItems = [
    { id: 'profile', icon: '👤', label: 'My Profile' },
    { id: 'orders', icon: '📦', label: 'My Orders', link: '/orders' },
    { id: 'wishlist', icon: '❤️', label: 'Wishlist', link: '/wishlist', count: wishlist.length },
    { id: 'addresses', icon: '📍', label: 'Saved Addresses' },
    { id: 'coupons', icon: '🎟️', label: 'My Coupons' },
    { id: 'payments', icon: '💳', label: 'Saved Payments' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.profileCard}>
              <div className={styles.avatar}>{user.name[0].toUpperCase()}</div>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
            <nav className={styles.menu}>
              {menuItems.map(item => (
                item.link ? (
                  <Link key={item.id} to={item.link} className={styles.menuItem}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.count > 0 && <span className={styles.menuCount}>{item.count}</span>}
                    <span className={styles.arrow}>›</span>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    className={`${styles.menuItem} ${activeTab === item.id ? styles.menuActive : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    <span className={styles.arrow}>›</span>
                  </button>
                )
              ))}
              <button className={`${styles.menuItem} ${styles.logoutItem}`} onClick={() => { logout(); navigate('/'); }}>
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <div className={styles.main}>
            {activeTab === 'profile' && (
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Personal Information</h2>
                  <button className={`btn btn-outline btn-sm ${editing ? 'btn-primary' : ''}`} onClick={() => setEditing(v => !v)}>
                    {editing ? 'Save' : '✏️ Edit'}
                  </button>
                </div>
                <div className={styles.profileForm}>
                  {[
                    { key: 'name', label: 'Full Name', icon: '👤' },
                    { key: 'email', label: 'Email Address', icon: '📧' },
                    { key: 'phone', label: 'Mobile Number', icon: '📱' },
                  ].map(f => (
                    <div key={f.key} className={styles.profileField}>
                      <label>{f.icon} {f.label}</label>
                      {editing ? (
                        <input type="text" value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} />
                      ) : (
                        <div className={styles.fieldValue}>{form[f.key] || '—'}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.statsRow}>
                  {[
                    { label: 'Orders', value: '2', link: '/orders' },
                    { label: 'Wishlist', value: wishlist.length, link: '/wishlist' },
                    { label: 'StyleCoins', value: '240', link: '#' },
                    { label: 'Reviews', value: '1', link: '#' },
                  ].map(s => (
                    <Link key={s.label} to={s.link} className={styles.statCard}>
                      <div className={styles.statValue}>{s.value}</div>
                      <div className={styles.statLabel}>{s.label}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className={styles.panel}>
                <div className={styles.panelHeader}><h2>Saved Addresses</h2></div>
                <div className={styles.addrCard}>
                  <div className={styles.addrTop}>
                    <span className={styles.addrTag}>HOME</span>
                    <span className={styles.defaultBadge}>Default</span>
                  </div>
                  <div className={styles.addrText}>
                    <strong>Rahul Sharma</strong><br />
                    42, MG Road, Koramangala<br />
                    Bengaluru, Karnataka — 560034<br />
                    Mobile: 9876543210
                  </div>
                  <div className={styles.addrActions}>
                    <button className={styles.addrBtn}>Edit</button>
                    <button className={styles.addrBtn}>Remove</button>
                  </div>
                </div>
                <button className={styles.addBtn}>+ Add New Address</button>
              </div>
            )}

            {activeTab === 'coupons' && (
              <div className={styles.panel}>
                <div className={styles.panelHeader}><h2>My Coupons</h2></div>
                <div className={styles.couponsList}>
                  {[
                    { code: 'FLAT500', desc: '₹500 off on orders above ₹1,999', expiry: '31 Mar 2025' },
                    { code: 'SAVE20', desc: '20% off on your next order', expiry: '30 Mar 2025' },
                  ].map(c => (
                    <div key={c.code} className={styles.couponItem}>
                      <div className={styles.couponCode}>{c.code}</div>
                      <div className={styles.couponDesc}>{c.desc}</div>
                      <div className={styles.couponExpiry}>Valid till {c.expiry}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className={styles.panel}>
                <div className={styles.panelHeader}><h2>Notification Preferences</h2></div>
                <div className={styles.notifList}>
                  {[
                    { label: 'Order updates', enabled: true },
                    { label: 'Price drops on wishlist', enabled: true },
                    { label: 'New offers & deals', enabled: false },
                    { label: 'Newsletter', enabled: false },
                    { label: 'SMS alerts', enabled: true },
                  ].map(n => (
                    <div key={n.label} className={styles.notifRow}>
                      <span>{n.label}</span>
                      <div className={`${styles.toggle} ${n.enabled ? styles.toggleOn : ''}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className={styles.panel}>
                <div className={styles.panelHeader}><h2>Account Settings</h2></div>
                <div className={styles.settingsList}>
                  {['Change Password', 'Delete Account', 'Privacy Settings', 'Language Preferences'].map(s => (
                    <div key={s} className={styles.settingRow}>
                      <span>{s}</span>
                      <span className={styles.arrow}>›</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
