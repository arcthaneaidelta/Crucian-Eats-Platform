// Types for the entire Crucian Eats demo
export type OrderStatus =
  | 'placed'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'driver_assigned'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'rejected'
  | 'cancelled'
  | 'refunded';

export type UserRole = 'customer' | 'restaurant' | 'driver' | 'admin';

export interface Location {
  id: string;
  name: string;
  status: 'active' | 'coming_soon' | 'draft';
  zones: string[];
  baseFee: number;
  perMileFee: number;
  serviceFeePercent: number;
  defaultCommission: number;
  driverPayBase: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  category: string[];
  zone: string;
  locationId: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  coverImage: string;
  isOpen: boolean;
  opensAt?: string;
  closesAt: string;
  acceptingOrders: boolean;
  ownerName: string;
  description: string;
}

export interface MenuItemOption {
  id: string;
  name: string;
  required: boolean;
  choices: { id: string; name: string; price: number }[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  soldOut: boolean;
  options: MenuItemOption[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: Record<string, string>;
  notes: string;
  totalPrice: number;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  landmark: string;
  zone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  zone: string;
  addresses: Address[];
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  totalDeliveries: number;
  isOnline: boolean;
  currentOrderId: string | null;
  photoUrl: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  options: string[];
  notes: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  driverId: string | null;
  driverName: string | null;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tip: number;
  total: number;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: number }[];
  prepTime: number | null;
  rejectionReason: string | null;
  refundAmount: number | null;
  refundReason: string | null;
  rating: number | null;
  review: string | null;
  reviewTags: string[];
  deliveryAddress: string;
  deliveryZone: string;
  deliveryPhoto: string | null;
  deliveryNote: string | null;
  estimatedDelivery: number;
  createdAt: number;
}

export interface Review {
  id: string;
  orderId: string;
  restaurantId: string;
  customerName: string;
  rating: number;
  text: string;
  tags: string[];
  createdAt: number;
}

export interface Transaction {
  id: string;
  orderId: string;
  type: 'payment' | 'refund' | 'restaurant_payout' | 'driver_payout' | 'commission';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: number;
}

export interface Notification {
  id: string;
  role: UserRole;
  title: string;
  message: string;
  read: boolean;
  orderId?: string;
  createdAt: number;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  deliverables: string[];
  status: 'locked' | 'in_review' | 'approved';
}

export interface Fees {
  locationId: string;
  baseFee: number;
  perMileFee: number;
  serviceFeePercent: number;
  defaultCommission: number;
  driverPayBase: number;
}
