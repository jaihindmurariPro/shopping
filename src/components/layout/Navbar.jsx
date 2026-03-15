import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { searchProducts } from '../../data/products';
import styles from './Navbar.module.css';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function Navbar() {
  const { cartCount, wishlist, user } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const { logout, searchHistory, dispatch } = useApp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.length > 1) {
      setSearchResults(searchProducts(q).slice(0, 6));
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(q.length === 0 && searchHistory.length > 0);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch({ type: 'ADD_SEARCH', payload: searchQuery.trim() });
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleResultClick = (product) => {
    setShowSearch(false);
    setSearchQuery('');
    navigate(`/product/${product.id}`);
  };

  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setShowSearch(false);
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMain}>StyleHub</span>
          <span className={styles.logoSub}>Fashion & Lifestyle</span>
        </Link>

        {/* Search Bar */}
        <div className={styles.searchWrap} ref={searchRef}>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for brands, products & more..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              onFocus={() => setShowSearch(true)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button type="button" className={styles.clearBtn} onClick={() => { setSearchQuery(''); setSearchResults([]); }}>✕</button>
            )}
          </form>

          {showSearch && (
            <div className={styles.searchDropdown}>
              {searchResults.length > 0 ? (
                <>
                  <div className={styles.dropdownLabel}>Products</div>
                  {searchResults.map(p => (
                    <div key={p.id} className={styles.searchResult} onClick={() => handleResultClick(p)}>
                      <img src={p.images[0]} alt={p.name} className={styles.resultImg} />
                      <div>
                        <div className={styles.resultName}>{p.name}</div>
                        <div className={styles.resultPrice}>₹{p.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                  <button className={styles.seeAll} onClick={handleSearchSubmit}>
                    See all results for "{searchQuery}"
                  </button>
                </>
              ) : searchQuery.length === 0 && searchHistory.length > 0 ? (
                <>
                  <div className={styles.dropdownLabelRow}>
                    <span className={styles.dropdownLabel}>Recent Searches</span>
                    <button className={styles.clearHistBtn} onClick={() => dispatch({ type: 'CLEAR_SEARCH_HISTORY' })}>Clear</button>
                  </div>
                  {searchHistory.map((q, i) => (
                    <div key={i} className={styles.historyItem} onClick={() => handleHistoryClick(q)}>
                      <span className={styles.histIcon}>🕐</span> {q}
                    </div>
                  ))}
                </>
              ) : searchQuery.length > 1 ? (
                <div className={styles.noResults}>No results found for "{searchQuery}"</div>
              ) : null}
            </div>
          )}
        </div>

        {/* Nav Actions */}
        <nav className={styles.navActions}>
          {/* User */}
          <div className={styles.navItem} ref={userMenuRef}>
            <button className={styles.navBtn} onClick={() => setShowUserMenu(v => !v)}>
              <UserIcon />
              <span className={styles.navLabel}>{user ? user.name.split(' ')[0] : 'Profile'}</span>
            </button>
            {showUserMenu && (
              <div className={styles.userMenu}>
                {user ? (
                  <>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatar}>{user.name[0]}</div>
                      <div>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.userEmail}>{user.email}</div>
                      </div>
                    </div>
                    <div className={styles.menuDivider} />
                    <Link to="/profile" className={styles.menuItem} onClick={() => setShowUserMenu(false)}>👤 My Profile</Link>
                    <Link to="/orders" className={styles.menuItem} onClick={() => setShowUserMenu(false)}>📦 My Orders</Link>
                    <Link to="/wishlist" className={styles.menuItem} onClick={() => setShowUserMenu(false)}>❤️ Wishlist ({wishlist.length})</Link>
                    <div className={styles.menuDivider} />
                    <button className={`${styles.menuItem} ${styles.menuLogout}`} onClick={() => { logout(); setShowUserMenu(false); }}>🚪 Logout</button>
                  </>
                ) : (
                  <>
                    <div className={styles.menuHeader}>Welcome!</div>
                    <p className={styles.menuSub}>To access account and manage orders</p>
                    <div className={styles.menuAuthBtns}>
                      <Link to="/login" className="btn btn-primary btn-sm btn-block" onClick={() => setShowUserMenu(false)}>Login</Link>
                      <Link to="/register" className={styles.menuRegLink} onClick={() => setShowUserMenu(false)}>New user? Register</Link>
                    </div>
                    <div className={styles.menuDivider} />
                    <Link to="/orders" className={styles.menuItem} onClick={() => setShowUserMenu(false)}>📦 Orders</Link>
                    <Link to="/wishlist" className={styles.menuItem} onClick={() => setShowUserMenu(false)}>❤️ Wishlist</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className={styles.navItem}>
            <button className={styles.navBtn}>
              <div className={styles.iconWrap}>
                <HeartIcon filled={wishlist.length > 0} />
                {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
              </div>
              <span className={styles.navLabel}>Wishlist</span>
            </button>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={styles.navItem}>
            <button className={styles.navBtn}>
              <div className={styles.iconWrap}>
                <CartIcon />
                {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
              </div>
              <span className={styles.navLabel}>Bag</span>
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
