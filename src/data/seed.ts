// Mock data seed — Appendix A
import type { Location, Restaurant, MenuItem, Customer, Driver, Order, Milestone, Notification, Transaction, Review, Fees } from './types';

// ── Locations ──
export const locations: Location[] = [
  {
    id: 'stx',
    name: 'St. Croix',
    status: 'active',
    zones: ['Christiansted', 'Frederiksted', 'Cane Bay', 'Salt River', 'Sunny Isles', 'Estate Whim', 'Kingshill'],
    baseFee: 3.99,
    perMileFee: 1.25,
    serviceFeePercent: 6,
    defaultCommission: 12,
    driverPayBase: 9.25,
  },
  {
    id: 'stt',
    name: 'St. Thomas',
    status: 'coming_soon',
    zones: ['Charlotte Amalie', 'Red Hook', 'Havensight'],
    baseFee: 4.49,
    perMileFee: 1.50,
    serviceFeePercent: 6,
    defaultCommission: 12,
    driverPayBase: 9.75,
  },
  {
    id: 'stj',
    name: 'St. John',
    status: 'coming_soon',
    zones: ['Cruz Bay', 'Coral Bay'],
    baseFee: 4.99,
    perMileFee: 1.75,
    serviceFeePercent: 6,
    defaultCommission: 12,
    driverPayBase: 10.00,
  },
];

// ── Restaurants ──
export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Kallaloo & Co.',
    cuisine: 'Island Classics',
    category: ['Island Classics'],
    zone: 'Christiansted',
    locationId: 'stx',
    rating: 4.8,
    reviewCount: 127,
    deliveryTime: '25–35 min',
    deliveryFee: 3.99,
    coverImage: '/images/restaurant-1.jpg',
    isOpen: true,
    closesAt: '9:00 PM',
    acceptingOrders: true,
    ownerName: 'Dale Frederick',
    description: 'Traditional island cooking made with love. Kallaloo, stewed meats, and the best johnnycakes in Christiansted.',
  },
  {
    id: 'r2',
    name: 'Cane Bay Smokehouse',
    cuisine: 'BBQ & Grill',
    category: ['BBQ & Grill'],
    zone: 'Cane Bay',
    locationId: 'stx',
    rating: 4.7,
    reviewCount: 94,
    deliveryTime: '30–40 min',
    deliveryFee: 4.49,
    coverImage: '/images/restaurant-2.jpg',
    isOpen: true,
    closesAt: '10:00 PM',
    acceptingOrders: true,
    ownerName: 'Tariq Williams',
    description: 'Slow-smoked meats and Caribbean spice on the north shore. Jerk chicken, ribs, and grilled catch of the day.',
  },
  {
    id: 'r3',
    name: 'Sunset Roti House',
    cuisine: 'Roti & Curry',
    category: ['Roti & Curry'],
    zone: 'Frederiksted',
    locationId: 'stx',
    rating: 4.6,
    reviewCount: 83,
    deliveryTime: '25–35 min',
    deliveryFee: 3.99,
    coverImage: '/images/restaurant-3.jpg',
    isOpen: true,
    closesAt: '8:30 PM',
    acceptingOrders: true,
    ownerName: 'Priya Maharaj',
    description: 'Trinidadian-style roti, doubles, and curry brought to the west end of St. Croix.',
  },
  {
    id: 'r4',
    name: 'Frederiksted Pate Shop',
    cuisine: 'Island Classics',
    category: ['Island Classics', 'Late Night'],
    zone: 'Frederiksted',
    locationId: 'stx',
    rating: 4.5,
    reviewCount: 156,
    deliveryTime: '15–25 min',
    deliveryFee: 2.99,
    coverImage: '/images/restaurant-4.jpg',
    isOpen: true,
    closesAt: '11:00 PM',
    acceptingOrders: true,
    ownerName: 'Gloria Petersen',
    description: 'Hot pates, conch fritters, and fresh ginger beer. A Frederiksted institution since 2015.',
  },
  {
    id: 'r5',
    name: 'Mango Tree Bakery',
    cuisine: 'Bakery & Breakfast',
    category: ['Bakery & Breakfast'],
    zone: 'Christiansted',
    locationId: 'stx',
    rating: 4.9,
    reviewCount: 201,
    deliveryTime: '20–30 min',
    deliveryFee: 3.49,
    coverImage: '/images/restaurant-5.jpg',
    isOpen: true,
    closesAt: '3:00 PM',
    acceptingOrders: true,
    ownerName: 'Camille Bastian',
    description: 'Island pastries, fresh bread, and the best guava turnovers you\'ll find. Open early, closed by three.',
  },
  {
    id: 'r6',
    name: 'Salt River Fish Co.',
    cuisine: 'Fish & Seafood',
    category: ['Fish & Seafood'],
    zone: 'Salt River',
    locationId: 'stx',
    rating: 4.7,
    reviewCount: 78,
    deliveryTime: '30–45 min',
    deliveryFee: 4.99,
    coverImage: '/images/restaurant-6.jpg',
    isOpen: true,
    closesAt: '9:00 PM',
    acceptingOrders: true,
    ownerName: 'Edwin Joseph',
    description: 'Fresh catch from local fishermen. Conch in butter sauce, whole fried snapper, and seasonal lobster.',
  },
  {
    id: 'r7',
    name: 'Estate Whim Greens',
    cuisine: 'Vegetarian',
    category: ['Vegetarian'],
    zone: 'Estate Whim',
    locationId: 'stx',
    rating: 4.4,
    reviewCount: 45,
    deliveryTime: '25–35 min',
    deliveryFee: 3.99,
    coverImage: '/images/restaurant-7.jpg',
    isOpen: true,
    closesAt: '8:00 PM',
    acceptingOrders: true,
    ownerName: 'Nadine Thomas',
    description: 'Plant-based Caribbean food. Bean bowls, pumpkin fritters, and cold-pressed tropical juices.',
  },
  {
    id: 'r8',
    name: 'Sunny Isles Grill',
    cuisine: 'BBQ & Grill',
    category: ['BBQ & Grill'],
    zone: 'Sunny Isles',
    locationId: 'stx',
    rating: 4.3,
    reviewCount: 62,
    deliveryTime: '30–40 min',
    deliveryFee: 3.99,
    coverImage: '/images/restaurant-8.jpg',
    isOpen: false,
    opensAt: '11:00 AM',
    closesAt: '10:00 PM',
    acceptingOrders: false,
    ownerName: 'Roy Hendricks',
    description: 'Grilled meats and cold drinks. Perfect after a beach day.',
  },
  {
    id: 'r9',
    name: 'Midnight Roti',
    cuisine: 'Roti & Curry',
    category: ['Roti & Curry', 'Late Night'],
    zone: 'Christiansted',
    locationId: 'stx',
    rating: 4.6,
    reviewCount: 71,
    deliveryTime: '20–30 min',
    deliveryFee: 3.49,
    coverImage: '/images/restaurant-9.jpg',
    isOpen: true,
    opensAt: '5:00 PM',
    closesAt: '2:00 AM',
    acceptingOrders: true,
    ownerName: 'Anil Sharma',
    description: 'Late-night roti, doubles, and curry. Open when everywhere else is closed.',
  },
];

// ── Menu Items ──
export const menuItems: MenuItem[] = [
  // Kallaloo & Co.
  { id: 'm1', restaurantId: 'r1', name: 'Kallaloo & Fungi', description: 'Traditional callaloo greens served with cornmeal fungi. A St. Croix staple.', price: 16.00, category: 'Mains', image: '/images/food-kallaloo.jpg', available: true, soldOut: false, options: [{ id: 'o1', name: 'Choose a side', required: true, choices: [{ id: 'c1', name: 'Rice & peas', price: 0 }, { id: 'c2', name: 'Plantain', price: 1.50 }, { id: 'c3', name: 'Side salad', price: 0 }] }] },
  { id: 'm2', restaurantId: 'r1', name: 'Stewed Goat with Rice & Peas', description: 'Slow-cooked goat in a rich, seasoned gravy over rice and pigeon peas.', price: 19.00, category: 'Mains', image: '/images/food-goat.jpg', available: true, soldOut: false, options: [] },
  { id: 'm3', restaurantId: 'r1', name: 'Johnnycakes (4)', description: 'Golden fried dough, slightly sweet, served warm.', price: 7.00, category: 'Sides', image: '/images/food-johnnycake.jpg', available: true, soldOut: false, options: [] },
  { id: 'm4', restaurantId: 'r1', name: 'Callaloo Soup Cup', description: 'A comforting cup of creamy callaloo soup with okra and herbs.', price: 6.00, category: 'Soups', image: '/images/food-soup.jpg', available: true, soldOut: false, options: [] },

  // Cane Bay Smokehouse
  { id: 'm5', restaurantId: 'r2', name: 'Jerk Chicken Plate', description: 'Marinated and slow-grilled with Scotch bonnet and allspice. Served with festival and coleslaw.', price: 17.00, category: 'Mains', image: '/images/food-jerk.jpg', available: true, soldOut: false, options: [{ id: 'o2', name: 'Spice level', required: true, choices: [{ id: 'c4', name: 'Mild', price: 0 }, { id: 'c5', name: 'Medium', price: 0 }, { id: 'c6', name: 'Hot', price: 0 }] }] },
  { id: 'm6', restaurantId: 'r2', name: 'Smoked Ribs Half Rack', description: 'Eight-hour smoked pork ribs with our house tamarind glaze.', price: 22.00, category: 'Mains', image: '/images/food-ribs.jpg', available: true, soldOut: false, options: [] },
  { id: 'm7', restaurantId: 'r2', name: 'Grilled Fish Sandwich', description: 'Catch of the day grilled and served on a toasted bun with island slaw.', price: 15.00, category: 'Sandwiches', image: '/images/food-fishsandwich.jpg', available: true, soldOut: false, options: [] },
  { id: 'm8', restaurantId: 'r2', name: 'Plantain Side', description: 'Sweet ripe plantains, fried golden.', price: 5.00, category: 'Sides', image: '/images/food-plantain.jpg', available: true, soldOut: false, options: [] },

  // Sunset Roti House
  { id: 'm9', restaurantId: 'r3', name: 'Chicken Roti', description: 'Curried chicken wrapped in a soft, layered paratha-style roti.', price: 15.00, category: 'Roti', image: '/images/food-roti.jpg', available: true, soldOut: false, options: [{ id: 'o3', name: 'Extra', required: false, choices: [{ id: 'c7', name: 'Extra pepper sauce', price: 0.50 }, { id: 'c8', name: 'Add chickpeas', price: 1.00 }] }] },
  { id: 'm10', restaurantId: 'r3', name: 'Shrimp Roti', description: 'Seasoned shrimp curry in a buttery roti wrap.', price: 18.00, category: 'Roti', image: '/images/food-shrimproti.jpg', available: true, soldOut: false, options: [] },
  { id: 'm11', restaurantId: 'r3', name: 'Veggie Roti', description: 'Potato, chickpea, and spinach curry roti. Vegan-friendly.', price: 13.00, category: 'Roti', image: '/images/food-veggieroti.jpg', available: true, soldOut: false, options: [] },
  { id: 'm12', restaurantId: 'r3', name: 'Doubles (2)', description: 'Two bara (fried flatbread) filled with curried chickpeas and chutneys.', price: 8.00, category: 'Snacks', image: '/images/food-doubles.jpg', available: true, soldOut: false, options: [] },

  // Frederiksted Pate Shop
  { id: 'm13', restaurantId: 'r4', name: 'Beef Pate', description: 'Flaky pastry filled with seasoned ground beef.', price: 4.00, category: 'Pates', image: '/images/food-pate.jpg', available: true, soldOut: false, options: [] },
  { id: 'm14', restaurantId: 'r4', name: 'Saltfish Pate', description: 'Salted cod mixed with onion and pepper in a golden crust.', price: 4.50, category: 'Pates', image: '/images/food-saltfishpate.jpg', available: true, soldOut: false, options: [] },
  { id: 'm15', restaurantId: 'r4', name: 'Conch Fritters (6)', description: 'Six crispy fritters made with fresh conch, herbs, and hot pepper.', price: 11.00, category: 'Snacks', image: '/images/food-conch.jpg', available: true, soldOut: false, options: [] },
  { id: 'm16', restaurantId: 'r4', name: 'Ginger Beer', description: 'Homemade spicy ginger beer. Served ice cold.', price: 4.00, category: 'Drinks', image: '/images/food-gingerbeer.jpg', available: true, soldOut: false, options: [] },

  // Mango Tree Bakery
  { id: 'm17', restaurantId: 'r5', name: 'Guava Turnover', description: 'Buttery pastry filled with sweet guava paste.', price: 4.50, category: 'Pastries', image: '/images/food-guava.jpg', available: true, soldOut: false, options: [] },
  { id: 'm18', restaurantId: 'r5', name: 'Coconut Tart', description: 'A crisp tart shell with sweet coconut filling.', price: 4.00, category: 'Pastries', image: '/images/food-coconuttart.jpg', available: true, soldOut: false, options: [] },
  { id: 'm19', restaurantId: 'r5', name: 'Saltfish & Egg Breakfast', description: 'Scrambled eggs with salted codfish, onion, and tomato. Served with johnny cake.', price: 14.00, category: 'Breakfast', image: '/images/food-saltfish.jpg', available: true, soldOut: false, options: [] },
  { id: 'm20', restaurantId: 'r5', name: 'Maubi (Bottle)', description: 'Traditional Crucian tree-bark drink. An acquired taste worth acquiring.', price: 5.00, category: 'Drinks', image: '/images/food-maubi.jpg', available: true, soldOut: false, options: [] },

  // Salt River Fish Co.
  { id: 'm21', restaurantId: 'r6', name: 'Conch in Butter Sauce', description: 'Tender conch sautéed in garlic butter with local seasonings.', price: 24.00, category: 'Mains', image: '/images/food-conchbutter.jpg', available: true, soldOut: false, options: [] },
  { id: 'm22', restaurantId: 'r6', name: 'Whole Fried Snapper', description: 'Whole red snapper, seasoned and fried crisp. Served with fungi and salad.', price: 28.00, category: 'Mains', image: '/images/food-snapper.jpg', available: true, soldOut: false, options: [] },
  { id: 'm23', restaurantId: 'r6', name: 'Fish & Fungi', description: 'Seasoned fish stew served over traditional cornmeal fungi.', price: 22.00, category: 'Mains', image: '/images/food-fishfungi.jpg', available: true, soldOut: false, options: [] },
  { id: 'm24', restaurantId: 'r6', name: 'Lobster Roll (Seasonal)', description: 'Fresh Caribbean lobster on a buttered roll with lemon aioli.', price: 29.00, category: 'Mains', image: '/images/food-lobster.jpg', available: true, soldOut: false, options: [] },

  // Estate Whim Greens
  { id: 'm25', restaurantId: 'r7', name: 'Bean & Plantain Bowl', description: 'Black beans, sweet plantain, avocado, and rice with chimichurri.', price: 14.00, category: 'Bowls', image: '/images/food-beanbowl.jpg', available: true, soldOut: false, options: [] },
  { id: 'm26', restaurantId: 'r7', name: 'Pumpkin Fritters', description: 'Spiced pumpkin fritters served with a tamarind dip.', price: 9.00, category: 'Snacks', image: '/images/food-pumpkin.jpg', available: true, soldOut: false, options: [] },
  { id: 'm27', restaurantId: 'r7', name: 'Soursop Smoothie', description: 'Creamy soursop blended with coconut milk and a touch of lime.', price: 7.00, category: 'Drinks', image: '/images/food-soursop.jpg', available: true, soldOut: false, options: [] },
];

// ── Customers ──
export const customers: Customer[] = [
  { id: 'cu1', name: 'Marisol Henry', email: 'marisol@example.com', phone: '(340) 555-0142', zone: 'Christiansted', addresses: [{ id: 'a1', label: 'Home', address: 'Estate Whim, Frederiksted', landmark: 'Blue gate, 2nd house', zone: 'Estate Whim' }, { id: 'a2', label: 'Work', address: 'Company St, Christiansted', landmark: 'Above the dive shop', zone: 'Christiansted' }] },
  { id: 'cu2', name: 'Andre Charles', email: 'andre@example.com', phone: '(340) 555-0198', zone: 'Frederiksted', addresses: [{ id: 'a3', label: 'Home', address: 'West End, Frederiksted', landmark: 'Yellow house near the pier', zone: 'Frederiksted' }] },
  { id: 'cu3', name: 'Tamika Rawlins', email: 'tamika@example.com', phone: '(340) 555-0217', zone: 'Cane Bay', addresses: [{ id: 'a4', label: 'Home', address: 'Cane Bay Road, North Shore', landmark: 'Behind the dive shop', zone: 'Cane Bay' }] },
  { id: 'cu4', name: 'Elena Brathwaite', email: 'elena@example.com', phone: '(340) 555-0263', zone: 'Salt River', addresses: [{ id: 'a5', label: 'Home', address: 'Salt River, North Shore', landmark: 'White fence by the marina', zone: 'Salt River' }] },
  { id: 'cu5', name: 'Kofi Benjamin', email: 'kofi@example.com', phone: '(340) 555-0301', zone: 'Kingshill', addresses: [{ id: 'a6', label: 'Home', address: 'Kingshill, Central', landmark: 'Near the school', zone: 'Kingshill' }] },
];

// ── Drivers ──
export const drivers: Driver[] = [
  { id: 'd1', name: 'Jerome Maynard', vehicle: 'Honda scooter', rating: 4.9, totalDeliveries: 342, isOnline: false, currentOrderId: null, photoUrl: '' },
  { id: 'd2', name: 'Shanice Peters', vehicle: 'Toyota Tacoma', rating: 4.8, totalDeliveries: 218, isOnline: false, currentOrderId: null, photoUrl: '' },
  { id: 'd3', name: 'Marcus Lake', vehicle: 'Suzuki scooter', rating: 4.7, totalDeliveries: 156, isOnline: false, currentOrderId: null, photoUrl: '' },
];

// ── Seed Order ──
export const seedOrder: Order = {
  id: 'ord-1',
  orderNumber: 'CE-24817',
  customerId: 'cu1',
  customerName: 'Marisol Henry',
  restaurantId: 'r1',
  restaurantName: 'Kallaloo & Co.',
  driverId: null,
  driverName: null,
  items: [
    { menuItemId: 'm1', name: 'Kallaloo & Fungi', quantity: 2, price: 16.00, options: ['Rice & peas'], notes: '' },
    { menuItemId: 'm3', name: 'Johnnycakes (4)', quantity: 1, price: 7.00, options: [], notes: '' },
  ],
  subtotal: 39.00,
  deliveryFee: 3.99,
  serviceFee: 2.34,
  tip: 6.00,
  total: 51.33,
  status: 'placed',
  statusHistory: [{ status: 'placed', timestamp: Date.now() }],
  prepTime: null,
  rejectionReason: null,
  refundAmount: null,
  refundReason: null,
  rating: null,
  review: null,
  reviewTags: [],
  deliveryAddress: 'Company St, Christiansted',
  deliveryZone: 'Christiansted',
  deliveryPhoto: null,
  deliveryNote: null,
  estimatedDelivery: Date.now() + 35 * 60 * 1000,
  createdAt: Date.now(),
};

// ── Additional Past Orders (for history) ──
export const pastOrders: Order[] = [
  {
    id: 'ord-past-1', orderNumber: 'CE-24790', customerId: 'cu1', customerName: 'Marisol Henry',
    restaurantId: 'r3', restaurantName: 'Sunset Roti House', driverId: 'd2', driverName: 'Shanice Peters',
    items: [{ menuItemId: 'm9', name: 'Chicken Roti', quantity: 1, price: 15.00, options: [], notes: '' }, { menuItemId: 'm12', name: 'Doubles (2)', quantity: 2, price: 8.00, options: [], notes: '' }],
    subtotal: 31.00, deliveryFee: 3.99, serviceFee: 1.86, tip: 5.00, total: 41.85,
    status: 'delivered', statusHistory: [{ status: 'placed', timestamp: Date.now() - 86400000 }, { status: 'delivered', timestamp: Date.now() - 82800000 }],
    prepTime: 20, rejectionReason: null, refundAmount: null, refundReason: null,
    rating: 5, review: 'Best roti on the island. Hot and fresh.', reviewTags: ['Hot & fresh', 'Great portions'],
    deliveryAddress: 'Company St, Christiansted', deliveryZone: 'Christiansted', deliveryPhoto: null, deliveryNote: null,
    estimatedDelivery: Date.now() - 82800000, createdAt: Date.now() - 86400000,
  },
  {
    id: 'ord-past-2', orderNumber: 'CE-24761', customerId: 'cu1', customerName: 'Marisol Henry',
    restaurantId: 'r5', restaurantName: 'Mango Tree Bakery', driverId: 'd1', driverName: 'Jerome Maynard',
    items: [{ menuItemId: 'm17', name: 'Guava Turnover', quantity: 3, price: 4.50, options: [], notes: '' }, { menuItemId: 'm19', name: 'Saltfish & Egg Breakfast', quantity: 1, price: 14.00, options: [], notes: '' }],
    subtotal: 27.50, deliveryFee: 3.49, serviceFee: 1.65, tip: 4.00, total: 36.64,
    status: 'delivered', statusHistory: [{ status: 'placed', timestamp: Date.now() - 172800000 }, { status: 'delivered', timestamp: Date.now() - 169200000 }],
    prepTime: 15, rejectionReason: null, refundAmount: null, refundReason: null,
    rating: 4, review: 'Turnovers were great. Delivery was a bit slow.', reviewTags: ['Great portions'],
    deliveryAddress: 'Estate Whim, Frederiksted', deliveryZone: 'Estate Whim', deliveryPhoto: null, deliveryNote: null,
    estimatedDelivery: Date.now() - 169200000, createdAt: Date.now() - 172800000,
  },
];

// ── Milestones ──
export const milestones: Milestone[] = [
  { id: 1, title: 'Foundations & Design System', description: 'Accounts set up in your name, data model, locations architecture, design system.', deliverables: ['Bubble app created in your account', 'Database schema with multi-location support', 'Design system and brand tokens', 'Development environment configured'], status: 'approved' },
  { id: 2, title: 'Customer App: Browse, Menu, Cart', description: 'Customer-facing app with restaurant browsing, menu viewing, and cart functionality.', deliverables: ['Home screen with search and categories', 'Restaurant and menu pages', 'Cart with item editing', 'Customer sign-up and login'], status: 'in_review' },
  { id: 3, title: 'Checkout & Payments', description: 'Payment processing through your accounts, tips, saved payment methods.', deliverables: ['Checkout flow with address selection', 'Payment integration (your account)', 'Tip selection', 'Order confirmation'], status: 'locked' },
  { id: 4, title: 'Restaurant Dashboard & Order Flow', description: 'Restaurant owners can manage orders, menus, and their business.', deliverables: ['Live order board', 'Accept/reject with prep time', 'Menu manager with photo upload', 'Order history and payout summaries'], status: 'locked' },
  { id: 5, title: 'Driver App & Delivery Flow', description: 'Driver mobile experience for accepting and completing deliveries.', deliverables: ['Go online/offline toggle', 'Delivery request with slide-to-accept', 'Step-by-step delivery flow', 'Earnings dashboard'], status: 'locked' },
  { id: 6, title: 'Admin, Payouts, Reports & Multi-Location', description: 'Admin console with full oversight, financial reporting, and expansion support.', deliverables: ['Admin overview with KPIs', 'User and order management', 'Fee and commission configuration', 'Multi-location management with St. Thomas preparation'], status: 'locked' },
  { id: 7, title: 'App Store, Testing, Launch & Handover', description: 'App packaging, testing, launch support, and complete handover of all assets.', deliverables: ['iOS and Android app packaging', 'QA and user acceptance testing', 'Launch support and monitoring', 'Complete asset handover with documentation'], status: 'locked' },
];

// ── Sample Notifications ──
export const sampleNotifications: Notification[] = [
  { id: 'n1', role: 'customer', title: 'Order on the way', message: 'Your order is on the way.', read: false, orderId: 'ord-1', createdAt: Date.now() - 300000 },
  { id: 'n2', role: 'customer', title: 'Driver nearby', message: 'Jerome is 4 minutes from your door.', read: false, orderId: 'ord-1', createdAt: Date.now() - 120000 },
  { id: 'n3', role: 'customer', title: 'Delivered', message: 'Order CE-24790 delivered. How was it?', read: true, orderId: 'ord-past-1', createdAt: Date.now() - 86400000 },
  { id: 'n4', role: 'restaurant', title: 'New order', message: 'New order from Marisol H. — 2× Kallaloo & Fungi, 1× Johnnycakes.', read: false, orderId: 'ord-1', createdAt: Date.now() },
  { id: 'n5', role: 'driver', title: 'Delivery request', message: 'New delivery from Kallaloo & Co. to Christiansted.', read: false, orderId: 'ord-1', createdAt: Date.now() },
];

// ── Sample Transactions ──
export const sampleTransactions: Transaction[] = [
  { id: 't1', orderId: 'ord-past-1', type: 'payment', amount: 41.85, description: 'Order CE-24790 — Sunset Roti House', status: 'completed', createdAt: Date.now() - 86400000 },
  { id: 't2', orderId: 'ord-past-1', type: 'restaurant_payout', amount: 27.28, description: 'Payout to Sunset Roti House (CE-24790)', status: 'completed', createdAt: Date.now() - 86400000 },
  { id: 't3', orderId: 'ord-past-1', type: 'driver_payout', amount: 14.25, description: 'Payout to Shanice Peters (CE-24790)', status: 'completed', createdAt: Date.now() - 86400000 },
  { id: 't4', orderId: 'ord-past-1', type: 'commission', amount: 3.72, description: 'Platform commission (CE-24790)', status: 'completed', createdAt: Date.now() - 86400000 },
  { id: 't5', orderId: 'ord-past-2', type: 'payment', amount: 36.64, description: 'Order CE-24761 — Mango Tree Bakery', status: 'completed', createdAt: Date.now() - 172800000 },
];

// ── Sample Reviews ──
export const sampleReviews: Review[] = [
  { id: 'rv1', orderId: 'ord-past-1', restaurantId: 'r3', customerName: 'Marisol H.', rating: 5, text: 'Best roti on the island. Hot and fresh.', tags: ['Hot & fresh', 'Great portions'], createdAt: Date.now() - 82800000 },
  { id: 'rv2', orderId: 'ord-past-2', restaurantId: 'r5', customerName: 'Marisol H.', rating: 4, text: 'Turnovers were great. Delivery was a bit slow.', tags: ['Great portions'], createdAt: Date.now() - 169200000 },
];

// ── Fees ──
export const defaultFees: Fees = {
  locationId: 'stx',
  baseFee: 3.99,
  perMileFee: 1.25,
  serviceFeePercent: 6,
  defaultCommission: 12,
  driverPayBase: 9.25,
};

// ── Categories ──
export const foodCategories = [
  'Island Classics',
  'Roti & Curry',
  'Fish & Seafood',
  'BBQ & Grill',
  'Bakery & Breakfast',
  'Drinks',
  'Vegetarian',
  'Late Night',
];

// ── Admin KPIs ──
export const adminKPIs = {
  ordersToday: 142,
  gmv: 6184,
  platformRevenue: 742,
  activeDrivers: 11,
  avgDeliveryTime: 31,
  avgRating: 4.7,
};

// ── Orders by Hour (for charts) ──
export const ordersByHour = [
  { hour: '8am', orders: 3 }, { hour: '9am', orders: 7 }, { hour: '10am', orders: 12 },
  { hour: '11am', orders: 18 }, { hour: '12pm', orders: 28 }, { hour: '1pm', orders: 24 },
  { hour: '2pm', orders: 15 }, { hour: '3pm', orders: 10 }, { hour: '4pm', orders: 8 },
  { hour: '5pm', orders: 14 }, { hour: '6pm', orders: 22 }, { hour: '7pm', orders: 26 },
  { hour: '8pm', orders: 19 }, { hour: '9pm', orders: 11 }, { hour: '10pm', orders: 5 },
];

// ── Weekly Earnings (for driver charts) ──
export const weeklyEarnings = [
  { day: 'Mon', earnings: 62 }, { day: 'Tue', earnings: 78 }, { day: 'Wed', earnings: 54 },
  { day: 'Thu', earnings: 91 }, { day: 'Fri', earnings: 103 }, { day: 'Sat', earnings: 118 },
  { day: 'Sun', earnings: 87 },
];
