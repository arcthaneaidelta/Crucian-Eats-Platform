// Zustand store — the single source of truth for the entire demo (§23.2)
import { create } from 'zustand';
import type { Order, OrderStatus, UserRole, CartItem, MenuItem, Notification, Review, Transaction, Milestone, Fees, Location, Restaurant, Driver } from '../data/types';
import {
  restaurants as seedRestaurants,
  menuItems as seedMenuItems,
  customers,
  drivers as seedDrivers,
  seedOrder,
  pastOrders,
  milestones as seedMilestones,
  sampleNotifications,
  sampleTransactions,
  sampleReviews,
  locations as seedLocations,
  defaultFees,
} from '../data/seed';

const ORDER_FLOW: OrderStatus[] = ['placed', 'accepted', 'preparing', 'ready', 'driver_assigned', 'picked_up', 'on_the_way', 'delivered'];

interface DemoStore {
  // ── Role ──
  role: UserRole;
  setRole: (role: UserRole) => void;

  // ── Session ──
  isLoggedIn: boolean;
  currentUser: { id: string; name: string; email: string } | null;
  login: (name: string, email: string) => void;
  logout: () => void;

  // ── Restaurants ──
  restaurants: Restaurant[];
  toggleAcceptingOrders: (restaurantId: string) => void;

  // ── Menu ──
  menuItems: MenuItem[];
  updateMenuItem: (itemId: string, updates: Partial<MenuItem>) => void;
  addMenuItem: (item: MenuItem) => void;
  toggleSoldOut: (itemId: string) => void;

  // ── Cart ──
  cart: CartItem[];
  cartRestaurantId: string | null;
  addToCart: (item: MenuItem, quantity: number, options: Record<string, string>, notes: string) => void;
  updateCartItem: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;

  // ── Orders ──
  orders: Order[];
  placeOrder: (deliveryAddress: string, deliveryZone: string, tip: number, paymentMethod: string) => Order;
  advanceOrder: (orderId: string, prepTime?: number) => void;
  rejectOrder: (orderId: string, reason: string) => void;
  assignDriver: (orderId: string) => void;
  refundOrder: (orderId: string, amount: number, reason: string) => void;
  setDeliveryPhoto: (orderId: string, photo: string, note: string) => void;
  rateOrder: (orderId: string, rating: number, review: string, tags: string[]) => void;

  // ── Drivers ──
  drivers: Driver[];
  setDriverOnline: (driverId: string, online: boolean) => void;

  // ── Notifications ──
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAllRead: (role: UserRole) => void;

  // ── Reviews ──
  reviews: Review[];

  // ── Transactions ──
  transactions: Transaction[];

  // ── Fees ──
  fees: Fees;
  setFees: (fees: Partial<Fees>) => void;

  // ── Locations ──
  locations: Location[];
  prepareLocation: (locationId: string) => void;

  // ── Milestones ──
  milestones: Milestone[];
  approveMilestone: (milestoneId: number) => void;

  // ── Orchestrator ──
  orchestratorRunning: boolean;
  orchestratorStep: number;
  startOrchestrator: () => void;
  nextOrchestratorStep: () => void;
  stopOrchestrator: () => void;

  // ── Tour ──
  tourDismissed: boolean;
  dismissTour: () => void;

  // ── Reset ──
  resetDemo: () => void;
}

let notifCounter = 100;
let orderCounter = 24818;

function calculateItemPrice(item: MenuItem, quantity: number, options: Record<string, string>): number {
  let price = item.price;
  if (item.options) {
    for (const opt of item.options) {
      const selectedChoiceId = options[opt.id];
      if (selectedChoiceId) {
        const choice = opt.choices.find(c => c.id === selectedChoiceId);
        if (choice) price += choice.price;
      }
    }
  }
  return price * quantity;
}

export const useDemoStore = create<DemoStore>((set, get) => ({
  // ── Role ──
  role: 'customer',
  setRole: (role) => set({ role }),

  // ── Session ──
  isLoggedIn: false,
  currentUser: null,
  login: (name, email) => set({
    isLoggedIn: true,
    currentUser: { id: 'cu1', name, email },
  }),
  logout: () => set({ isLoggedIn: false, currentUser: null }),

  // ── Restaurants ──
  restaurants: [...seedRestaurants],
  toggleAcceptingOrders: (restaurantId) => set(state => ({
    restaurants: state.restaurants.map(r =>
      r.id === restaurantId ? { ...r, acceptingOrders: !r.acceptingOrders } : r
    ),
  })),

  // ── Menu ──
  menuItems: [...seedMenuItems],
  updateMenuItem: (itemId, updates) => set(state => ({
    menuItems: state.menuItems.map(m =>
      m.id === itemId ? { ...m, ...updates } : m
    ),
  })),
  addMenuItem: (item) => set(state => ({
    menuItems: [...state.menuItems, item],
  })),
  toggleSoldOut: (itemId) => set(state => ({
    menuItems: state.menuItems.map(m =>
      m.id === itemId ? { ...m, soldOut: !m.soldOut } : m
    ),
  })),

  // ── Cart ──
  cart: [],
  cartRestaurantId: null,
  addToCart: (item, quantity, options, notes) => set(state => {
    if (state.cartRestaurantId && state.cartRestaurantId !== item.restaurantId) {
      // Different restaurant — clear cart first
      return {
        cart: [{ menuItem: item, quantity, selectedOptions: options, notes, totalPrice: calculateItemPrice(item, quantity, options) }],
        cartRestaurantId: item.restaurantId,
      };
    }
    const existing = state.cart.findIndex(c => c.menuItem.id === item.id && JSON.stringify(c.selectedOptions) === JSON.stringify(options));
    if (existing >= 0) {
      const updated = [...state.cart];
      updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + quantity, totalPrice: calculateItemPrice(item, updated[existing].quantity + quantity, options) };
      return { cart: updated, cartRestaurantId: item.restaurantId };
    }
    return {
      cart: [...state.cart, { menuItem: item, quantity, selectedOptions: options, notes, totalPrice: calculateItemPrice(item, quantity, options) }],
      cartRestaurantId: item.restaurantId,
    };
  }),
  updateCartItem: (index, quantity) => set(state => {
    if (quantity <= 0) {
      return { cart: state.cart.filter((_, i) => i !== index) };
    }
    const updated = [...state.cart];
    updated[index] = { ...updated[index], quantity, totalPrice: calculateItemPrice(updated[index].menuItem, quantity, updated[index].selectedOptions) };
    return { cart: updated };
  }),
  removeFromCart: (index) => set(state => {
    const newCart = state.cart.filter((_, i) => i !== index);
    return { cart: newCart, cartRestaurantId: newCart.length > 0 ? state.cartRestaurantId : null };
  }),
  clearCart: () => set({ cart: [], cartRestaurantId: null }),

  // ── Orders ──
  orders: [seedOrder, ...pastOrders],
  placeOrder: (deliveryAddress, deliveryZone, tip, _paymentMethod) => {
    const state = get();
    const restaurant = state.restaurants.find(r => r.id === state.cartRestaurantId);
    const subtotal = state.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const deliveryFee = restaurant?.deliveryFee ?? 3.99;
    const serviceFee = Math.round(subtotal * (state.fees.serviceFeePercent / 100) * 100) / 100;
    const total = Math.round((subtotal + deliveryFee + serviceFee + tip) * 100) / 100;
    const orderNum = `CE-${orderCounter++}`;

    const order: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerId: state.currentUser?.id ?? 'cu1',
      customerName: state.currentUser?.name ?? 'Marisol Henry',
      restaurantId: state.cartRestaurantId!,
      restaurantName: restaurant?.name ?? '',
      driverId: null,
      driverName: null,
      items: state.cart.map(ci => ({
        menuItemId: ci.menuItem.id,
        name: ci.menuItem.name,
        quantity: ci.quantity,
        price: ci.menuItem.price,
        options: Object.values(ci.selectedOptions),
        notes: ci.notes,
      })),
      subtotal,
      deliveryFee,
      serviceFee,
      tip,
      total,
      status: 'placed',
      statusHistory: [{ status: 'placed', timestamp: Date.now() }],
      prepTime: null,
      rejectionReason: null,
      refundAmount: null,
      refundReason: null,
      rating: null,
      review: null,
      reviewTags: [],
      deliveryAddress,
      deliveryZone,
      deliveryPhoto: null,
      deliveryNote: null,
      estimatedDelivery: Date.now() + 35 * 60 * 1000,
      createdAt: Date.now(),
    };

    set(state => ({
      orders: [order, ...state.orders],
      cart: [],
      cartRestaurantId: null,
      notifications: [
        {
          id: `n${notifCounter++}`,
          role: 'restaurant',
          title: 'New order',
          message: `New order from ${order.customerName} — ${order.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}.`,
          read: false,
          orderId: order.id,
          createdAt: Date.now(),
        },
        ...state.notifications,
      ],
    }));

    return order;
  },

  advanceOrder: (orderId, prepTime) => set(state => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return state;
    const currentIndex = ORDER_FLOW.indexOf(order.status);
    if (currentIndex < 0 || currentIndex >= ORDER_FLOW.length - 1) return state;
    const nextStatus = ORDER_FLOW[currentIndex + 1];

    const newNotifications: Notification[] = [];

    if (nextStatus === 'accepted') {
      newNotifications.push({
        id: `n${notifCounter++}`,
        role: 'customer',
        title: 'Order accepted',
        message: `${order.restaurantName} accepted your order. It'll be ready in ${prepTime ?? 15} minutes.`,
        read: false,
        orderId,
        createdAt: Date.now(),
      });
    } else if (nextStatus === 'driver_assigned') {
      newNotifications.push({
        id: `n${notifCounter++}`,
        role: 'customer',
        title: 'Driver assigned',
        message: 'Jerome Maynard is heading to pick up your order.',
        read: false,
        orderId,
        createdAt: Date.now(),
      });
      newNotifications.push({
        id: `n${notifCounter++}`,
        role: 'driver',
        title: 'Delivery request',
        message: `Delivery from ${order.restaurantName} to ${order.deliveryZone}.`,
        read: false,
        orderId,
        createdAt: Date.now(),
      });
    } else if (nextStatus === 'on_the_way') {
      newNotifications.push({
        id: `n${notifCounter++}`,
        role: 'customer',
        title: 'Order on the way',
        message: 'Your order is on the way.',
        read: false,
        orderId,
        createdAt: Date.now(),
      });
    } else if (nextStatus === 'delivered') {
      newNotifications.push({
        id: `n${notifCounter++}`,
        role: 'customer',
        title: 'Delivered',
        message: `Order ${order.orderNumber} delivered. How was it?`,
        read: false,
        orderId,
        createdAt: Date.now(),
      });
    }

    return {
      orders: state.orders.map(o =>
        o.id === orderId ? {
          ...o,
          status: nextStatus,
          prepTime: prepTime ?? o.prepTime,
          statusHistory: [...o.statusHistory, { status: nextStatus, timestamp: Date.now() }],
          driverId: nextStatus === 'driver_assigned' ? 'd1' : o.driverId,
          driverName: nextStatus === 'driver_assigned' ? 'Jerome Maynard' : o.driverName,
        } : o
      ),
      drivers: nextStatus === 'driver_assigned'
        ? state.drivers.map(d => d.id === 'd1' ? { ...d, currentOrderId: orderId, isOnline: true } : d)
        : nextStatus === 'delivered'
          ? state.drivers.map(d => d.id === 'd1' ? { ...d, currentOrderId: null } : d)
          : state.drivers,
      notifications: [...newNotifications, ...state.notifications],
    };
  }),

  rejectOrder: (orderId, reason) => set(state => ({
    orders: state.orders.map(o =>
      o.id === orderId ? {
        ...o,
        status: 'rejected' as OrderStatus,
        rejectionReason: reason,
        statusHistory: [...o.statusHistory, { status: 'rejected' as OrderStatus, timestamp: Date.now() }],
      } : o
    ),
    notifications: [
      {
        id: `n${notifCounter++}`,
        role: 'customer',
        title: 'Order cancelled',
        message: `${state.orders.find(o => o.id === orderId)?.restaurantName} couldn't fulfil your order. Reason: ${reason}. A refund has been initiated.`,
        read: false,
        orderId,
        createdAt: Date.now(),
      },
      ...state.notifications,
    ],
  })),

  assignDriver: (orderId) => {
    get().advanceOrder(orderId);
  },

  refundOrder: (orderId, amount, reason) => set(state => ({
    orders: state.orders.map(o =>
      o.id === orderId ? {
        ...o,
        status: 'refunded' as OrderStatus,
        refundAmount: amount,
        refundReason: reason,
        statusHistory: [...o.statusHistory, { status: 'refunded' as OrderStatus, timestamp: Date.now() }],
      } : o
    ),
    transactions: [
      {
        id: `t${Date.now()}`,
        orderId,
        type: 'refund',
        amount,
        description: `Refund for ${state.orders.find(o => o.id === orderId)?.orderNumber} — ${reason}`,
        status: 'completed',
        createdAt: Date.now(),
      },
      ...state.transactions,
    ],
    notifications: [
      {
        id: `n${notifCounter++}`,
        role: 'customer',
        title: 'Refund processed',
        message: `$${amount.toFixed(2)} refund for order ${state.orders.find(o => o.id === orderId)?.orderNumber}.`,
        read: false,
        orderId,
        createdAt: Date.now(),
      },
      ...state.notifications,
    ],
  })),

  setDeliveryPhoto: (orderId, photo, note) => set(state => ({
    orders: state.orders.map(o =>
      o.id === orderId ? { ...o, deliveryPhoto: photo, deliveryNote: note } : o
    ),
  })),

  rateOrder: (orderId, rating, review, tags) => {
    const state = get();
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const newReview: Review = {
      id: `rv${Date.now()}`,
      orderId,
      restaurantId: order.restaurantId,
      customerName: order.customerName.split(' ')[0] + ' ' + order.customerName.split(' ')[1]?.[0] + '.',
      rating,
      text: review,
      tags,
      createdAt: Date.now(),
    };

    set(state => ({
      orders: state.orders.map(o =>
        o.id === orderId ? { ...o, rating, review, reviewTags: tags } : o
      ),
      reviews: [newReview, ...state.reviews],
    }));
  },

  // ── Drivers ──
  drivers: [...seedDrivers],
  setDriverOnline: (driverId, online) => set(state => ({
    drivers: state.drivers.map(d =>
      d.id === driverId ? { ...d, isOnline: online } : d
    ),
  })),

  // ── Notifications ──
  notifications: [...sampleNotifications],
  addNotification: (notif) => set(state => ({
    notifications: [{ ...notif, id: `n${notifCounter++}`, createdAt: Date.now() }, ...state.notifications],
  })),
  markAllRead: (role) => set(state => ({
    notifications: state.notifications.map(n =>
      n.role === role ? { ...n, read: true } : n
    ),
  })),

  // ── Reviews ──
  reviews: [...sampleReviews],

  // ── Transactions ──
  transactions: [...sampleTransactions],

  // ── Fees ──
  fees: { ...defaultFees },
  setFees: (updates) => set(state => ({
    fees: { ...state.fees, ...updates },
  })),

  // ── Locations ──
  locations: [...seedLocations],
  prepareLocation: (locationId) => set(state => ({
    locations: state.locations.map(l =>
      l.id === locationId ? { ...l, status: 'draft' as const } : l
    ),
  })),

  // ── Milestones ──
  milestones: [...seedMilestones],
  approveMilestone: (milestoneId) => set(state => ({
    milestones: state.milestones.map(m => {
      if (m.id === milestoneId) return { ...m, status: 'approved' as const };
      if (m.id === milestoneId + 1 && m.status === 'locked') return { ...m, status: 'in_review' as const };
      return m;
    }),
  })),

  // ── Orchestrator ──
  orchestratorRunning: false,
  orchestratorStep: -1,
  startOrchestrator: () => set({ orchestratorRunning: true, orchestratorStep: 0 }),
  nextOrchestratorStep: () => set(state => ({
    orchestratorStep: state.orchestratorStep + 1,
  })),
  stopOrchestrator: () => set({ orchestratorRunning: false, orchestratorStep: -1 }),

  // ── Tour ──
  tourDismissed: (() => {
    try { return sessionStorage.getItem('ce-tour-dismissed') === 'true'; } catch { return false; }
  })(),
  dismissTour: () => {
    try { sessionStorage.setItem('ce-tour-dismissed', 'true'); } catch { /* noop */ }
    set({ tourDismissed: true });
  },

  // ── Reset ──
  resetDemo: () => {
    orderCounter = 24818;
    notifCounter = 100;
    set({
      role: 'customer',
      isLoggedIn: false,
      currentUser: null,
      restaurants: [...seedRestaurants],
      menuItems: [...seedMenuItems],
      cart: [],
      cartRestaurantId: null,
      orders: [
        { ...seedOrder, status: 'placed', statusHistory: [{ status: 'placed', timestamp: Date.now() }] },
        ...pastOrders
      ],
      drivers: [...seedDrivers],
      notifications: [...sampleNotifications],
      reviews: [...sampleReviews],
      transactions: [...sampleTransactions],
      fees: { ...defaultFees },
      locations: [...seedLocations],
      milestones: [...seedMilestones],
      orchestratorRunning: false,
      orchestratorStep: -1,
    });
  },
}));
