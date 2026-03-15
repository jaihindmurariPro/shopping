// ======== MOCK DATA ========
// This is designed to be easily swapped for API calls in backend integration

export const categories = [
  { id: 'men', label: 'Men', icon: '👔' },
  { id: 'women', label: 'Women', icon: '👗' },
  { id: 'kids', label: 'Kids', icon: '🧸' },
  { id: 'beauty', label: 'Beauty', icon: '💄' },
  { id: 'home', label: 'Home & Living', icon: '🏠' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'accessories', label: 'Accessories', icon: '👜' },
  { id: 'footwear', label: 'Footwear', icon: '👟' },
];

export const subCategories = {
  men: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Ethnic Wear', 'Jackets', 'Suits', 'Shorts', 'Sweaters'],
  women: ['Kurtas', 'Sarees', 'Dresses', 'Tops', 'Jeans', 'Leggings', 'Lingerie', 'Ethnic Sets', 'Blazers'],
  kids: ['Boys Clothing', 'Girls Clothing', 'Baby Clothes', 'School Wear', 'Party Wear'],
  beauty: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Bath & Body'],
  home: ['Bedding', 'Curtains', 'Decor', 'Kitchen', 'Lighting', 'Furniture'],
  sports: ['Gym Wear', 'Running', 'Yoga', 'Cricket', 'Football', 'Swimming'],
  accessories: ['Bags', 'Wallets', 'Belts', 'Watches', 'Sunglasses', 'Jewelry'],
  footwear: ['Sneakers', 'Heels', 'Flats', 'Sandals', 'Boots', 'Sports Shoes'],
};

export const brands = [
  'H&M', 'Zara', 'Nike', 'Adidas', 'Puma', 'Levi\'s', 'Allen Solly', 'Louis Philippe',
  'W', 'Biba', 'Fabindia', 'UCB', 'Roadster', 'HRX', 'Reebok', 'Skechers',
  'Van Heusen', 'Arrow', 'US Polo', 'Fossil', 'Fastrack', 'Titan', 'Global Desi',
];

const productImages = {
  men: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
    'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=400&q=80',
  ],
  women: [
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
    'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
  ],
  footwear: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80',
    'https://images.unsplash.com/photo-1607522370275-f6fd62301c2c?w=400&q=80',
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
  ],
  sports: [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80',
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80',
  ],
};

const getRandomImages = (category) => {
  const imgs = productImages[category] || productImages.men;
  return imgs;
};

const productNames = {
  men: [
    'Classic Oxford Shirt', 'Slim Fit Chinos', 'Graphic Tee', 'Denim Jacket',
    'Linen Blazer', 'Cargo Shorts', 'Polo T-Shirt', 'Formal Trousers',
    'Striped Kurta', 'Jogger Pants', 'Bomber Jacket', 'Henley Shirt',
  ],
  women: [
    'Floral Maxi Dress', 'Crop Top Set', 'Embroidered Kurta', 'High-Rise Jeans',
    'Off-Shoulder Blouse', 'Palazzo Set', 'Printed Saree', 'Wrap Dress',
    'Asymmetric Top', 'Straight Fit Pants', 'Peplum Kurti', 'Co-ord Set',
  ],
  footwear: [
    'Air Max Sneakers', 'Block Heel Pumps', 'Canvas Loafers', 'Ankle Boots',
    'Sports Running Shoes', 'Strappy Sandals', 'Chelsea Boots', 'Platform Heels',
    'Slip-On Mules', 'Athletic Trainers', 'Mojari Juttis', 'Derby Shoes',
  ],
  accessories: [
    'Leather Tote Bag', 'Aviator Sunglasses', 'Chronograph Watch', 'Crossbody Bag',
    'Minimalist Wallet', 'Silk Scarf', 'Statement Earrings', 'Canvas Backpack',
    'Leather Belt', 'Gold Bracelet', 'Cat-Eye Glasses', 'Coin Pouch',
  ],
  beauty: [
    'Vitamin C Serum', 'HD Foundation', 'Matte Lipstick Set', 'Rose Clay Mask',
    'Retinol Night Cream', 'SPF 50 Sunscreen', 'Micellar Water', 'Eye Cream',
  ],
  sports: [
    'Compression Tights', 'Training Jacket', 'Yoga Pants', 'Gym T-Shirt',
    'Running Shorts', 'Sports Bra', 'Track Suit', 'Cycling Jersey',
  ],
};

let productIdCounter = 1;

const generateProduct = (category, index) => {
  const names = productNames[category] || productNames.men;
  const name = names[index % names.length];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const imgs = getRandomImages(category);
  const mrp = Math.floor(Math.random() * 4000) + 599;
  const discountPct = [10, 20, 30, 40, 50, 60, 70][Math.floor(Math.random() * 7)];
  const price = Math.floor(mrp * (1 - discountPct / 100));
  const rating = (3.2 + Math.random() * 1.8).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 5000) + 100;
  const sizes = category === 'footwear'
    ? ['6', '7', '8', '9', '10', '11']
    : ['XS', 'S', 'M', 'L', 'XL', 'XXL'].slice(Math.floor(Math.random() * 2));

  return {
    id: productIdCounter++,
    name: `${brand} ${name}`,
    brand,
    category,
    subCategory: subCategories[category]?.[index % (subCategories[category]?.length || 1)] || '',
    price,
    mrp,
    discount: discountPct,
    rating: parseFloat(rating),
    reviewCount,
    images: [imgs[index % imgs.length], ...imgs.filter((_, i) => i !== index % imgs.length).slice(0, 2)],
    sizes,
    colors: ['Black', 'White', 'Navy', 'Red', 'Green'].slice(0, Math.floor(Math.random() * 3) + 1),
    description: `Elevate your wardrobe with this ${name} by ${brand}. Crafted for comfort and style, this piece features premium materials and a contemporary fit that works across multiple occasions.`,
    features: [
      'Premium quality fabric',
      'Machine washable',
      'Modern slim fit',
      'Easy care instructions',
      '30-day return policy',
    ],
    inStock: Math.random() > 0.1,
    isTrending: Math.random() > 0.7,
    isNew: Math.random() > 0.75,
    isBestseller: Math.random() > 0.8,
    deliveryDays: Math.floor(Math.random() * 4) + 2,
    seller: `${brand} Official Store`,
    tags: [category, brand.toLowerCase(), name.split(' ')[0].toLowerCase()],
  };
};

// Generate products
const allProducts = [];
Object.keys(productNames).forEach(category => {
  const count = 24;
  for (let i = 0; i < count; i++) {
    allProducts.push(generateProduct(category, i));
  }
});

export const products = allProducts;

export const getProductById = (id) => products.find(p => p.id === parseInt(id));

export const getProductsByCategory = (category) =>
  products.filter(p => p.category === category);

export const getProductsByBrand = (brand) =>
  products.filter(p => p.brand === brand);

export const getTrendingProducts = () =>
  products.filter(p => p.isTrending).slice(0, 12);

export const getNewArrivals = () =>
  products.filter(p => p.isNew).slice(0, 12);

export const getBestsellers = () =>
  products.filter(p => p.isBestseller).slice(0, 12);

export const searchProducts = (query) => {
  if (!query) return [];
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
};

export const banners = [
  {
    id: 1,
    title: 'New Season\nNew Style',
    subtitle: 'Up to 70% off on premium brands',
    cta: 'Shop Now',
    link: '/category/women',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accent: '#ff3f6c',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    badge: 'SEASON SALE',
  },
  {
    id: 2,
    title: 'Men\'s Edit\nSS 2025',
    subtitle: 'Curated styles for the modern man',
    cta: 'Explore Men',
    link: '/category/men',
    bg: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
    accent: '#f5a623',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80',
    badge: 'NEW ARRIVALS',
  },
  {
    id: 3,
    title: 'Footwear\nFever',
    subtitle: 'Step into comfort with top brands',
    cta: 'Shop Footwear',
    link: '/category/footwear',
    bg: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
    accent: '#ffffff',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    badge: 'TRENDING',
  },
  {
    id: 4,
    title: 'Beauty\nEssentials',
    subtitle: 'Glow up with top beauty picks',
    cta: 'Discover Beauty',
    link: '/category/beauty',
    bg: 'linear-gradient(135deg, #fc5c7d 0%, #6a3093 100%)',
    accent: '#ffffff',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    badge: 'BESTSELLERS',
  },
];

export const offers = [
  { id: 1, title: '50% Off on T-Shirts', code: 'TSHIRT50', expiry: '31 Mar 2025', brand: 'All Brands', color: '#ff3f6c', category: 'men' },
  { id: 2, title: 'Buy 2 Get 1 Free', code: 'B2G1FREE', expiry: '28 Mar 2025', brand: 'H&M', color: '#0f3460', category: 'women' },
  { id: 3, title: 'Flat ₹500 Off', code: 'FLAT500', expiry: '30 Mar 2025', brand: 'Nike', color: '#11998e', category: 'sports' },
  { id: 4, title: '70% Off Season Sale', code: 'SEASON70', expiry: '25 Mar 2025', brand: 'Zara', color: '#f5a623', category: 'accessories' },
  { id: 5, title: 'Free Shipping on ₹999+', code: 'FREESHIP', expiry: '31 Mar 2025', brand: 'All Brands', color: '#6a3093', category: 'all' },
  { id: 6, title: '40% Off Footwear', code: 'FOOT40', expiry: '29 Mar 2025', brand: 'Adidas', color: '#2d1b69', category: 'footwear' },
];

export const filterOptions = {
  priceRanges: [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 – ₹1,000', min: 500, max: 1000 },
    { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
    { label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
    { label: 'Above ₹5,000', min: 5000, max: Infinity },
  ],
  discounts: ['10% and above', '20% and above', '30% and above', '40% and above', '50% and above', '60% and above'],
  ratings: ['4★ & above', '3★ & above', '2★ & above'],
  sortOptions: [
    { value: 'recommended', label: 'Recommended' },
    { value: 'newest', label: 'New Arrivals' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'discount', label: 'Discount' },
  ],
};

export const addresses = [
  {
    id: 1,
    name: 'Home',
    fullName: 'Rahul Sharma',
    line1: '42, MG Road, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    phone: '9876543210',
    isDefault: true,
  },
];

export const orders = [
  {
    id: 'ORD-2025-001',
    date: '2025-03-10',
    status: 'Delivered',
    items: [{ productId: 1, quantity: 1, size: 'M' }],
    total: 1299,
    deliveredOn: '2025-03-13',
  },
  {
    id: 'ORD-2025-002',
    date: '2025-03-08',
    status: 'Shipped',
    items: [{ productId: 5, quantity: 2, size: 'L' }],
    total: 2598,
    expectedDelivery: '2025-03-16',
  },
];

export const testimonials = [
  { id: 1, name: 'Priya K.', location: 'Mumbai', rating: 5, text: 'Amazing quality and super fast delivery! The kurta I ordered looks even better in person.', avatar: 'PK' },
  { id: 2, name: 'Arjun M.', location: 'Delhi', rating: 4, text: 'Great range of clothing. The size guide is very accurate. Will definitely shop again!', avatar: 'AM' },
  { id: 3, name: 'Sneha R.', location: 'Bengaluru', rating: 5, text: 'The return process was so smooth. Customer service is excellent. Highly recommend!', avatar: 'SR' },
  { id: 4, name: 'Vikram T.', location: 'Hyderabad', rating: 5, text: 'Fantastic deals on branded items. The app is very user-friendly. Saved so much money!', avatar: 'VT' },
];
