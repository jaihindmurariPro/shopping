import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getProductsByCategory, filterOptions, categories } from '../data/products';
import FilterSidebar from '../components/filters/FilterSidebar';
import ProductCard from '../components/product/ProductCard';
import styles from './CategoryPage.module.css';

const PRODUCTS_PER_PAGE = 20;

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const category = categories.find(c => c.id === slug);
  const rawProducts = getProductsByCategory(slug);

  // Apply filters
  const filtered = useMemo(() => {
    let result = [...rawProducts];

    if (filters.priceRange) {
      result = result.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    }
    if (filters.discount) {
      const minDiscount = parseInt(filters.discount);
      result = result.filter(p => p.discount >= minDiscount);
    }
    if (filters.brands?.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.rating) {
      const minRating = parseInt(filters.rating);
      result = result.filter(p => p.rating >= minRating);
    }
    if (filters.inStock) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: break;
    }

    return result;
  }, [rawProducts, filters, sort]);

  const paginated = filtered.slice(0, page * PRODUCTS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const activeFilterCount = [
    filters.priceRange ? 1 : 0,
    filters.discount ? 1 : 0,
    filters.rating ? 1 : 0,
    filters.brands?.length || 0,
    filters.inStock ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  useEffect(() => {
    setPage(1);
  }, [filters, sort, slug]);

  if (!category) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Category not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Go Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <span>{category.label}</span>
        </nav>

        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{category.icon} {category.label}</h1>
          <p className={styles.count}>{filtered.length} Products</p>
        </div>

        {/* Sort + Filter Bar */}
        <div className={styles.toolbar}>
          <button
            className={`${styles.mobileFilterBtn} ${activeFilterCount > 0 ? styles.hasFilters : ''}`}
            onClick={() => setShowMobileFilters(true)}
          >
            ⚙️ Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          <div className={styles.sortWrap}>
            <span className={styles.sortLabel}>Sort by:</span>
            <div className={styles.sortChips}>
              {filterOptions.sortOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`${styles.sortChip} ${sort === opt.value ? styles.sortActive : ''}`}
                  onClick={() => setSort(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewActive : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
            <button className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewActive : ''}`} onClick={() => setViewMode('list')}>☰</button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className={styles.activeFilters}>
            <span className={styles.activeLabel}>Applied:</span>
            {filters.priceRange && (
              <span className={styles.activeChip}>
                {filters.priceRange.label}
                <button onClick={() => setFilters(f => ({ ...f, priceRange: null }))}>✕</button>
              </span>
            )}
            {filters.discount && (
              <span className={styles.activeChip}>
                {filters.discount}
                <button onClick={() => setFilters(f => ({ ...f, discount: null }))}>✕</button>
              </span>
            )}
            {filters.brands?.map(b => (
              <span key={b} className={styles.activeChip}>
                {b}
                <button onClick={() => setFilters(f => ({ ...f, brands: f.brands.filter(x => x !== b) }))}>✕</button>
              </span>
            ))}
            {filters.rating && (
              <span className={styles.activeChip}>
                {filters.rating}
                <button onClick={() => setFilters(f => ({ ...f, rating: null }))}>✕</button>
              </span>
            )}
            <button className={styles.clearAllBtn} onClick={() => setFilters({})}>Clear All</button>
          </div>
        )}

        <div className={styles.layout}>
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters({})}
            productCount={filtered.length}
          />

          {/* Products */}
          <div className={styles.main}>
            {filtered.length === 0 ? (
              <div className={styles.noResults}>
                <div style={{ fontSize: 48 }}>🔍</div>
                <h3>No products match your filters</h3>
                <p>Try adjusting or clearing the filters</p>
                <button className="btn btn-primary" onClick={() => setFilters({})} style={{ marginTop: 16 }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`${styles.grid} ${viewMode === 'list' ? styles.gridList : ''}`}>
                  {paginated.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {hasMore && (
                  <div className={styles.loadMore}>
                    <button className="btn btn-outline" onClick={() => setPage(p => p + 1)}>
                      Load More ({filtered.length - paginated.length} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className={styles.filterDrawerOverlay} onClick={() => setShowMobileFilters(false)}>
          <div className={styles.filterDrawer} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <span>Filters</span>
              <button onClick={() => setShowMobileFilters(false)}>✕</button>
            </div>
            <div className={styles.drawerBody}>
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onClear={() => { setFilters({}); setShowMobileFilters(false); }}
                productCount={filtered.length}
              />
            </div>
            <div className={styles.drawerFooter}>
              <button className="btn btn-outline btn-block" onClick={() => { setFilters({}); setShowMobileFilters(false); }}>Clear</button>
              <button className="btn btn-primary btn-block" onClick={() => setShowMobileFilters(false)}>Apply ({filtered.length})</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
