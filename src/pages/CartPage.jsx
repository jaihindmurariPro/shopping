import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { offers } from '../data/products';
import styles from './CartPage.module.css';

const COUPONS = [
  { code: 'FLAT500', type: 'flat', value: 500, minOrder: 1999, desc: '₹500 off on orders above ₹1,999' },
  { code: 'SAVE20', type: 'percent', value: 20, minOrder: 999, desc: '20% off on orders above ₹999' },
  { code: 'FREESHIP', type: 'flat', value: 49, minOrder: 0, desc: 'Free shipping on any order' },
];

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart, cartCount, cartSubtotal, cartMRP, cartSavings,
    couponDiscount, shippingFee, cartTotal,
    appliedCoupon, dispatch, removeFromCart,
    applyCoupon
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleCoupon = () => {
    const coupon = COUPONS.find(c => c.code === couponInput.toUpperCase());
    if (!coupon) { setCouponError('Invalid coupon code'); return; }
    if (cartSubtotal < coupon.minOrder) { setCouponError(`Minimum order ₹${coupon.minOrder} required`); return; }
    applyCoupon(coupon);
    setCouponInput('');
    setCouponError('');
  };

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your bag is empty!</h2>
        <p>Add items to it now.</p>
        <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>Shop Now</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>My Bag ({cartCount} items)</h1>

        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.items}>
            {cart.map(item => (
              <div key={item.key} className={styles.cartItem}>
                <Link to={`/product/${item.id}`} className={styles.itemImg}>
                  <img src={item.images[0]} alt={item.name} />
                </Link>
                <div className={styles.itemInfo}>
                  <div className={styles.itemBrand}>{item.brand}</div>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemMeta}>
                    <span>Size: <strong>{item.size}</strong></span>
                    <span>Qty:
                      <select
                        value={item.quantity}
                        onChange={e => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { key: item.key, quantity: parseInt(e.target.value) } })}
                        className={styles.qtySelect}
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}</option>)}
                      </select>
                    </span>
                  </div>
                  <div className={styles.itemPricing}>
                    <span className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</span>
                    <span className="price-original">₹{(item.mrp * item.quantity).toLocaleString()}</span>
                    <span className="price-discount">{item.discount}% off</span>
                  </div>
                  <div className={styles.itemActions}>
                    <button className={styles.actionBtn} onClick={() => { dispatch({ type: 'TOGGLE_WISHLIST', payload: item }); removeFromCart(item.key); }}>
                      Move to Wishlist
                    </button>
                    <button className={`${styles.actionBtn} ${styles.remove}`} onClick={() => removeFromCart(item.key)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.deliveryTag}>
                  🚚 Delivery in {item.deliveryDays} days
                </div>
              </div>
            ))}

            {/* Coupon */}
            <div className={styles.couponBox}>
              <div className={styles.couponTitle}>🎟️ Apply Coupon</div>
              {appliedCoupon ? (
                <div className={styles.appliedCoupon}>
                  <span>✅ <strong>{appliedCoupon.code}</strong> applied — you save ₹{couponDiscount.toLocaleString()}</span>
                  <button onClick={() => dispatch({ type: 'REMOVE_COUPON' })} className={styles.removeCoupon}>Remove</button>
                </div>
              ) : (
                <>
                  <div className={styles.couponInput}>
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                    />
                    <button onClick={handleCoupon}>Apply</button>
                  </div>
                  {couponError && <p className={styles.couponError}>{couponError}</p>}
                  <div className={styles.couponSuggestions}>
                    {COUPONS.map(c => (
                      <div key={c.code} className={styles.couponSug} onClick={() => setCouponInput(c.code)}>
                        <span className={styles.couponCode}>{c.code}</span>
                        <span className={styles.couponDesc}>{c.desc}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.summary}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Price Details</h3>
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Price ({cartCount} items)</span>
                  <span>₹{cartMRP.toLocaleString()}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Discount</span>
                  <span className={styles.saving}>− ₹{cartSavings.toLocaleString()}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className={styles.summaryRow}>
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span className={styles.saving}>− ₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className={styles.summaryRow}>
                  <span>Delivery Charges</span>
                  <span>{shippingFee === 0 ? <span className={styles.saving}>FREE</span> : `₹${shippingFee}`}</span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total Amount</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              {(cartSavings + couponDiscount) > 0 && (
                <div className={styles.savingBanner}>
                  🎉 You will save ₹{(cartSavings + couponDiscount).toLocaleString()} on this order
                </div>
              )}
            </div>

            <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate('/checkout')}>
              Place Order →
            </button>

            <div className={styles.safeShop}>
              <span>🔒 Safe and Secure Payments</span>
              <span>Easy returns. 100% Authentic products.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
