// LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styles from './AuthPage.module.css';

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'Password must be 6+ characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    login({ name: form.email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User', email: form.email, id: Date.now() });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h1 className={styles.brandName}>StyleHub</h1>
          <p className={styles.brandTag}>Login & access to millions of products with best deals</p>
        </div>
        <div className={styles.right}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <input type="email" placeholder="Enter Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={errors.email ? styles.inputError : ''} />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.field}>
              <input type="password" placeholder="Enter Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className={errors.password ? styles.inputError : ''} />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>
            <p className={styles.terms}>By continuing, you agree to StyleHub's <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
            <button className={`btn btn-primary btn-block ${styles.submitBtn}`} type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <Link to="/register" className={styles.switchLink}>New to StyleHub? Create an account</Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    login({ name: form.name, email: form.email, phone: form.phone, id: Date.now() });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h1 className={styles.brandName}>StyleHub</h1>
          <p className={styles.brandTag}>Join 2 crore+ happy shoppers across India</p>
          <ul className={styles.perks}>
            <li>✓ Free shipping on ₹999+</li>
            <li>✓ Easy 30-day returns</li>
            <li>✓ Exclusive member deals</li>
            <li>✓ Early sale access</li>
          </ul>
        </div>
        <div className={styles.right}>
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {[
              { key: 'name', placeholder: 'Full Name', type: 'text' },
              { key: 'email', placeholder: 'Email Address', type: 'email' },
              { key: 'phone', placeholder: 'Mobile Number', type: 'tel' },
              { key: 'password', placeholder: 'Create Password (min 6 chars)', type: 'password' },
            ].map(f => (
              <div key={f.key} className={styles.field}>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} required />
              </div>
            ))}
            <button className={`btn btn-primary btn-block ${styles.submitBtn}`} type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <Link to="/login" className={styles.switchLink}>Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
