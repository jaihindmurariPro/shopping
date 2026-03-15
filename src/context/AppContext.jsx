import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext(null);

const initialState = {
  cart: JSON.parse(localStorage.getItem('stylehub_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('stylehub_wishlist') || '[]'),
  user: JSON.parse(localStorage.getItem('stylehub_user') || 'null'),
  recentlyViewed: JSON.parse(localStorage.getItem('stylehub_recent') || '[]'),
  appliedCoupon: null,
  searchHistory: JSON.parse(localStorage.getItem('stylehub_searches') || '[]'),
  compareList: [],
};

function appReducer(state, action) {
  switch (action.type) {

    // ---- CART ----
    case 'ADD_TO_CART': {
      const { product, size, quantity = 1 } = action.payload;
      const key = `${product.id}-${size}`;
      const existing = state.cart.find(i => i.key === key);
      let newCart;
      if (existing) {
        newCart = state.cart.map(i =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        newCart = [...state.cart, { ...product, size, quantity, key, addedAt: Date.now() }];
      }
      return { ...state, cart: newCart };
    }

    case 'REMOVE_FROM_CART': {
      return { ...state, cart: state.cart.filter(i => i.key !== action.payload) };
    }

    case 'UPDATE_CART_QUANTITY': {
      const { key, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, cart: state.cart.filter(i => i.key !== key) };
      }
      return {
        ...state,
        cart: state.cart.map(i => i.key === key ? { ...i, quantity } : i),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, cart: [], appliedCoupon: null };
    }

    // ---- WISHLIST ----
    case 'TOGGLE_WISHLIST': {
      const product = action.payload;
      const exists = state.wishlist.find(i => i.id === product.id);
      const newWishlist = exists
        ? state.wishlist.filter(i => i.id !== product.id)
        : [...state.wishlist, { ...product, savedAt: Date.now() }];
      return { ...state, wishlist: newWishlist };
    }

    case 'MOVE_TO_CART': {
      return { ...state, wishlist: state.wishlist.filter(i => i.id !== action.payload) };
    }

    // ---- AUTH ----
    case 'SET_USER': {
      return { ...state, user: action.payload };
    }

    case 'LOGOUT': {
      return { ...state, user: null, cart: [], wishlist: [], appliedCoupon: null };
    }

    // ---- COUPON ----
    case 'APPLY_COUPON': {
      return { ...state, appliedCoupon: action.payload };
    }

    case 'REMOVE_COUPON': {
      return { ...state, appliedCoupon: null };
    }

    // ---- RECENTLY VIEWED ----
    case 'ADD_RECENTLY_VIEWED': {
      const product = action.payload;
      const filtered = state.recentlyViewed.filter(p => p.id !== product.id);
      return { ...state, recentlyViewed: [product, ...filtered].slice(0, 10) };
    }

    // ---- SEARCH HISTORY ----
    case 'ADD_SEARCH': {
      const query = action.payload;
      const filtered = state.searchHistory.filter(q => q !== query);
      return { ...state, searchHistory: [query, ...filtered].slice(0, 8) };
    }

    case 'CLEAR_SEARCH_HISTORY': {
      return { ...state, searchHistory: [] };
    }

    // ---- COMPARE ----
    case 'TOGGLE_COMPARE': {
      const product = action.payload;
      const exists = state.compareList.find(p => p.id === product.id);
      if (exists) {
        return { ...state, compareList: state.compareList.filter(p => p.id !== product.id) };
      }
      if (state.compareList.length >= 4) {
        toast.error('You can compare up to 4 products');
        return state;
      }
      return { ...state, compareList: [...state.compareList, product] };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('stylehub_cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('stylehub_wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    localStorage.setItem('stylehub_user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('stylehub_recent', JSON.stringify(state.recentlyViewed));
  }, [state.recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('stylehub_searches', JSON.stringify(state.searchHistory));
  }, [state.searchHistory]);

  // Helper derived values
  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartMRP = state.cart.reduce((sum, i) => sum + i.mrp * i.quantity, 0);
  const cartSavings = cartMRP - cartSubtotal;

  const couponDiscount = state.appliedCoupon
    ? state.appliedCoupon.type === 'percent'
      ? Math.floor(cartSubtotal * state.appliedCoupon.value / 100)
      : state.appliedCoupon.value
    : 0;

  const shippingFee = cartSubtotal >= 999 ? 0 : 49;
  const cartTotal = cartSubtotal - couponDiscount + shippingFee;

  const isInWishlist = (productId) => state.wishlist.some(i => i.id === productId);
  const isInCart = (productId, size) => state.cart.some(i => i.id === productId && i.size === size);
  const isInCompare = (productId) => state.compareList.some(p => p.id === productId);

  const addToCart = (product, size, quantity = 1) => {
    if (!size) {
      toast.error('Please select a size');
      return false;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, quantity } });
    toast.success(`Added to cart!`, { icon: '🛒' });
    return true;
  };

  const removeFromCart = (key) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: key });
    toast.success('Removed from cart');
  };

  const toggleWishlist = (product) => {
    const isWished = isInWishlist(product.id);
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    toast.success(isWished ? 'Removed from wishlist' : 'Added to wishlist ❤️');
  };

  const login = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const applyCoupon = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
    toast.success(`Coupon "${coupon.code}" applied!`, { icon: '🎉' });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      cartCount,
      cartSubtotal,
      cartMRP,
      cartSavings,
      couponDiscount,
      shippingFee,
      cartTotal,
      isInWishlist,
      isInCart,
      isInCompare,
      dispatch,
      addToCart,
      removeFromCart,
      toggleWishlist,
      login,
      logout,
      applyCoupon,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
