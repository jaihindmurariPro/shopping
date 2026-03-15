import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts, products as allProducts, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { useApp } from '../context/AppContext';
import styles from './SearchPage.module.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchHistory, dispatch } = useApp();
  const [localQuery, setLocalQuery] = useState(query);
  const [sort, setSort] = useState('recommended');

  useEffect(() => {
    setLocalQuery(query);
    if (query) {
      dispatch({ type: 'ADD_SEARCH', payload: query });
    }
  }, [query]);

  const results = useMemo(() => {
    let res = searchProducts(localQuery);
    if (sort === 'price-asc') res = [...res].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') res = [...res].sort((a, b) => b.price - a.price);
    if (sort === 'rating') res = [...res].sort((a, b) => b.rating - a.rating);
    if (sort === 'discount') res = [...res].sort((a, b) => b.discount - a.discount);
    return res;
  }, [localQuery, sort]);

  const trendingSearches = [
    'kurta for women', 'white sneakers', 'summer dress', 'men shirt',
    'yoga pants', 'tote bag', 'sunglasses', 'running shoes'
  ];

  if (!query && !localQuery) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.emptySearch}>
            <div className={styles.searchIcon}>🔍</div>
            <h2>Search StyleHub</h2>
            <p>Find brands, products & more</p>

            {searchHistory.length > 0 && (
              <div className={styles.historySection}>
                <div className={styles.sectionLabel}>
                  <span>Recent Searches</span>
                  <button onClick={() => dispatch({ type: 'CLEAR_SEARCH_HISTORY' })}>Clear</button>
                </div>
                <div className={styles.chips}>
                  {searchHistory.map((q, i) => (
                    <Link key={i} to={`/search?q=${encodeURIComponent(q)}`} className={styles.chip}>
                      🕐 {q}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.historySection}>
              <div className={styles.sectionLabel}><span>Trending Searches</span></div>
              <div className={styles.chips}>
                {trendingSearches.map((q, i) => (
                  <Link key={i} to={`/search?q=${encodeURIComponent(q)}`} className={`${styles.chip} ${styles.trendChip}`}>
                    🔥 {q}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.historySection}>
              <div className={styles.sectionLabel}><span>Shop by Category</span></div>
              <div className={styles.catChips}>
                {categories.map(c => (
                  <Link key={c.id} to={`/category/${c.id}`} className={styles.catChip}>
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.resultInfo}>
            {results.length > 0 ? (
              <>
                <h1 className={styles.title}>Results for "<span className={styles.queryText}>{query}</span>"</h1>
                <p className={styles.count}>{results.length} products found</p>
              </>
            ) : (
              <h1 className={styles.title}>No results for "<span className={styles.queryText}>{query}</span>"</h1>
            )}
          </div>

          {results.length > 0 && (
            <div className={styles.sortRow}>
              <span className={styles.sortLabel}>Sort:</span>
              {[
                { value: 'recommended', label: 'Relevant' },
                { value: 'price-asc', label: 'Price ↑' },
                { value: 'price-desc', label: 'Price ↓' },
                { value: 'rating', label: 'Rating' },
                { value: 'discount', label: 'Discount' },
              ].map(s => (
                <button
                  key={s.value}
                  className={`${styles.sortBtn} ${sort === s.value ? styles.sortActive : ''}`}
                  onClick={() => setSort(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className={styles.noResults}>
            <div style={{ fontSize: 64 }}>🙁</div>
            <h2>No products found</h2>
            <p>Try different keywords or explore categories below</p>
            <div className={styles.suggestions}>
              {trendingSearches.slice(0, 4).map((q, i) => (
                <Link key={i} to={`/search?q=${encodeURIComponent(q)}`} className={styles.chip}>
                  {q}
                </Link>
              ))}
            </div>
            <div className={styles.catLinks}>
              {categories.map(c => (
                <Link key={c.id} to={`/category/${c.id}`} className={styles.catChip}>
                  {c.icon} {c.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
