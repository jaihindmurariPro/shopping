import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { addresses } from '../data/products';
import styles from './CheckoutPage.module.css';

const STEPS = ['Address', 'Order Summary', 'Payment'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, cartSubtotal, cartSavings, couponDiscount, shippingFee, appliedCoupon, dispatch } = useApp();
  const [step, setStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);
  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
  const [payMethod, setPayMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [placing, setPlacing] = useState(false);

  if (cart.length === 0) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Shop Now</Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await new Promise(r => setTimeout(r, 2000));
    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-success');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Checkout Header */}
        <div className={styles.checkoutHeader}>
          <Link to="/" className={styles.logo}>StyleHub</Link>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`${styles.step} ${i === step ? styles.stepActive : ''} ${i < step ? styles.stepDone : ''}`}>
                  <div className={styles.stepNum}>{i < step ? '✓' : i + 1}</div>
                  <span className={styles.stepLabel}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={styles.layout}>
          {/* Left panel */}
          <div className={styles.main}>
            {/* STEP 0: Address */}
            {step === 0 && (
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Select Delivery Address</h2>
                <div className={styles.addressList}>
                  {addresses.map(addr => (
                    <label key={addr.id} className={`${styles.addrCard} ${selectedAddress === addr.id ? styles.addrSelected : ''}`}>
                      <input type="radio" name="address" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} />
                      <div className={styles.addrInfo}>
                        <div className={styles.addrName}>{addr.fullName} <span className={styles.addrTag}>{addr.name}</span></div>
                        <div className={styles.addrLine}>{addr.line1}</div>
                        <div className={styles.addrLine}>{addr.city}, {addr.state} — {addr.pincode}</div>
                        <div className={styles.addrPhone}>Mobile: {addr.phone}</div>
                        {addr.isDefault && <span className={styles.defaultTag}>Default</span>}
                      </div>
                    </label>
                  ))}

                  {addingAddress ? (
                    <div className={styles.newAddrForm}>
                      <h3 className={styles.newAddrTitle}>Add New Address</h3>
                      <div className={styles.formGrid}>
                        {[
                          { key: 'name', label: 'Full Name', span: 1 },
                          { key: 'phone', label: 'Phone', span: 1 },
                          { key: 'line1', label: 'Address (House No, Street)', span: 2 },
                          { key: 'city', label: 'City', span: 1 },
                          { key: 'state', label: 'State', span: 1 },
                          { key: 'pincode', label: 'Pincode', span: 1 },
                        ].map(f => (
                          <div key={f.key} className={styles.formField} style={{ gridColumn: `span ${f.span}` }}>
                            <label>{f.label}</label>
                            <input
                              type="text"
                              value={newAddr[f.key]}
                              onChange={e => setNewAddr(v => ({ ...v, [f.key]: e.target.value }))}
                              placeholder={f.label}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                        <button className="btn btn-primary" onClick={() => setAddingAddress(false)}>Save Address</button>
                        <button className="btn btn-ghost" onClick={() => setAddingAddress(false)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button className={styles.addAddrBtn} onClick={() => setAddingAddress(true)}>
                      + Add New Address
                    </button>
                  )}
                </div>
                <button className={`btn btn-primary ${styles.nextBtn}`} onClick={() => setStep(1)}>
                  Deliver Here →
                </button>
              </div>
            )}

            {/* STEP 1: Order Summary */}
            {step === 1 && (
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Order Summary ({cart.length} items)</h2>
                <div className={styles.orderItems}>
                  {cart.map(item => (
                    <div key={item.key} className={styles.orderItem}>
                      <img src={item.images[0]} alt={item.name} className={styles.orderImg} />
                      <div className={styles.orderInfo}>
                        <div className={styles.orderBrand}>{item.brand}</div>
                        <div className={styles.orderName}>{item.name}</div>
                        <div className={styles.orderMeta}>
                          <span>Size: {item.size}</span>
                          <span>Qty: {item.quantity}</span>
                          <span>🚚 {item.deliveryDays} days</span>
                        </div>
                      </div>
                      <div className={styles.orderPrice}>₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
                  <button className={`btn btn-primary ${styles.nextBtn}`} onClick={() => setStep(2)}>
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Payment Options</h2>
                <div className={styles.payMethods}>
                  {[
                    { id: 'upi', label: 'UPI', icon: '📱', desc: 'Pay using UPI ID or QR code' },
                    { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                    { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay at your door' },
                    { id: 'wallet', label: 'Paytm / PhonePe', icon: '📲', desc: 'Digital wallets' },
                  ].map(m => (
                    <label key={m.id} className={`${styles.payMethod} ${payMethod === m.id ? styles.paySelected : ''}`}>
                      <input type="radio" name="pay" checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} />
                      <span className={styles.payIcon}>{m.icon}</span>
                      <div>
                        <div className={styles.payLabel}>{m.label}</div>
                        <div className={styles.payDesc}>{m.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {payMethod === 'upi' && (
                  <div className={styles.payDetail}>
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. name@upi)"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className={styles.upiInput}
                    />
                    <button className={styles.verifyBtn}>Verify</button>
                  </div>
                )}

                {payMethod === 'card' && (
                  <div className={styles.cardForm}>
                    <input type="text" placeholder="Card Number" className={styles.cardInput} maxLength={19} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <input type="text" placeholder="MM/YY" className={styles.cardInput} />
                      <input type="text" placeholder="CVV" className={styles.cardInput} maxLength={3} />
                    </div>
                    <input type="text" placeholder="Cardholder Name" className={styles.cardInput} />
                  </div>
                )}

                <div className={styles.secureNote}>
                  🔒 Your payment information is encrypted and secure
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button
                    className={`btn btn-primary ${styles.nextBtn}`}
                    onClick={handlePlaceOrder}
                    disabled={placing}
                  >
                    {placing ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className={styles.spinner} /> Placing Order...
                      </span>
                    ) : (
                      `Pay ₹${cartTotal.toLocaleString()} →`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Price Details</h3>
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}><span>MRP ({cart.length} items)</span><span>₹{(cartSubtotal + cartSavings).toLocaleString()}</span></div>
                <div className={styles.summaryRow}><span>Discount</span><span style={{ color: 'var(--accent-green)' }}>− ₹{cartSavings.toLocaleString()}</span></div>
                {couponDiscount > 0 && <div className={styles.summaryRow}><span>Coupon ({appliedCoupon?.code})</span><span style={{ color: 'var(--accent-green)' }}>− ₹{couponDiscount.toLocaleString()}</span></div>}
                <div className={styles.summaryRow}><span>Delivery</span><span>{shippingFee === 0 ? <span style={{ color: 'var(--accent-green)' }}>FREE</span> : `₹${shippingFee}`}</span></div>
                <div className={styles.summaryDivider} />
                <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>₹{cartTotal.toLocaleString()}</span></div>
              </div>
              <div className={styles.saveBanner}>
                You save ₹{(cartSavings + couponDiscount).toLocaleString()} on this order
              </div>
            </div>

            <div className={styles.safeNote}>
              <div>🔒 Safe and Secure Payments</div>
              <div>🔄 Easy Returns & Exchanges</div>
              <div>📦 100% Authentic Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
