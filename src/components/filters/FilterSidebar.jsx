import React, { useState } from 'react';
import { brands, filterOptions } from '../../data/products';
import styles from './FilterSidebar.module.css';

export default function FilterSidebar({ filters, onChange, onClear, productCount }) {
  const [openSections, setOpenSections] = useState(['price', 'discount', 'brand', 'rating']);

  const toggle = (section) => {
    setOpenSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const isOpen = (section) => openSections.includes(section);

  const handlePriceRange = (range) => {
    onChange({ ...filters, priceRange: filters.priceRange?.label === range.label ? null : range });
  };

  const handleDiscount = (d) => {
    onChange({ ...filters, discount: filters.discount === d ? null : d });
  };

  const handleBrand = (brand) => {
    const brands = filters.brands || [];
    const updated = brands.includes(brand) ? brands.filter(b => b !== brand) : [...brands, brand];
    onChange({ ...filters, brands: updated });
  };

  const handleRating = (r) => {
    onChange({ ...filters, rating: filters.rating === r ? null : r });
  };

  const hasFilters = filters.priceRange || filters.discount || (filters.brands?.length > 0) || filters.rating;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.title}>Filters</span>
        {hasFilters && (
          <button className={styles.clearAll} onClick={onClear}>Clear All</button>
        )}
      </div>

      {productCount !== undefined && (
        <div className={styles.count}>{productCount} products</div>
      )}

      {/* Price Range */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('price')}>
          <span>Price Range</span>
          <span className={styles.chevron}>{isOpen('price') ? '▲' : '▼'}</span>
        </button>
        {isOpen('price') && (
          <div className={styles.sectionBody}>
            {filterOptions.priceRanges.map(range => (
              <label key={range.label} className={styles.checkItem}>
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange?.label === range.label}
                  onChange={() => handlePriceRange(range)}
                />
                <span className={styles.checkLabel}>{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Discount */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('discount')}>
          <span>Discount Range</span>
          <span className={styles.chevron}>{isOpen('discount') ? '▲' : '▼'}</span>
        </button>
        {isOpen('discount') && (
          <div className={styles.sectionBody}>
            {filterOptions.discounts.map(d => (
              <label key={d} className={styles.checkItem}>
                <input
                  type="radio"
                  name="discount"
                  checked={filters.discount === d}
                  onChange={() => handleDiscount(d)}
                />
                <span className={styles.checkLabel}>{d}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('rating')}>
          <span>Customer Ratings</span>
          <span className={styles.chevron}>{isOpen('rating') ? '▲' : '▼'}</span>
        </button>
        {isOpen('rating') && (
          <div className={styles.sectionBody}>
            {filterOptions.ratings.map(r => (
              <label key={r} className={styles.checkItem}>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === r}
                  onChange={() => handleRating(r)}
                />
                <span className={`${styles.checkLabel} ${styles.ratingLabel}`}>{r}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('brand')}>
          <span>Brand</span>
          {(filters.brands?.length > 0) && (
            <span className={styles.filterCount}>{filters.brands.length}</span>
          )}
          <span className={styles.chevron}>{isOpen('brand') ? '▲' : '▼'}</span>
        </button>
        {isOpen('brand') && (
          <div className={styles.sectionBody}>
            <input
              type="text"
              placeholder="Search brands..."
              className={styles.brandSearch}
            />
            <div className={styles.brandList}>
              {brands.slice(0, 15).map(brand => (
                <label key={brand} className={styles.checkItem}>
                  <input
                    type="checkbox"
                    checked={(filters.brands || []).includes(brand)}
                    onChange={() => handleBrand(brand)}
                  />
                  <span className={styles.checkLabel}>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('avail')}>
          <span>Availability</span>
          <span className={styles.chevron}>{isOpen('avail') ? '▲' : '▼'}</span>
        </button>
        {isOpen('avail') && (
          <div className={styles.sectionBody}>
            <label className={styles.checkItem}>
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={() => onChange({ ...filters, inStock: !filters.inStock })}
              />
              <span className={styles.checkLabel}>In Stock Only</span>
            </label>
          </div>
        )}
      </div>

      {/* Occasion */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggle('occasion')}>
          <span>Occasion</span>
          <span className={styles.chevron}>{isOpen('occasion') ? '▲' : '▼'}</span>
        </button>
        {isOpen('occasion') && (
          <div className={styles.sectionBody}>
            {['Casual', 'Formal', 'Party', 'Ethnic', 'Sports', 'Beach'].map(o => (
              <label key={o} className={styles.checkItem}>
                <input type="checkbox" />
                <span className={styles.checkLabel}>{o}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
