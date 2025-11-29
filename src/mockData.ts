export type Field = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  pricingDefaultCents: number;
  listingFeeCents: number;
};

export type Match = {
  id: string;
  title: string;
  fieldId: string;
  scheduledAt: string;
  perPlayerFeeCents: number;
  maxPlayers: number;
  confirmedCount: number;
  status: 'pending' | 'confirmed' | 'completed';
};

export type Wallet = {
  fieldId: string;
  balanceCents: number;
  pendingPayoutCents: number;
  totalEarnedCents: number;
  totalFeesCents: number;
};

export type PayoutRequest = {
  id: string;
  fieldId: string;
  managerName: string;
  amountCents: number;
  status: 'requested' | 'processing' | 'paid' | 'rejected';
  requestedAt: string;
};

export type Promotion = {
  id: string;
  fieldId: string;
  title: string;
  description: string;
  discountPercent?: number;
  promoCode?: string;
  isActive: boolean;
};

export type Ad = {
  id: string;
  fieldId?: string;
  title: string;
  description: string;
  isActive: boolean;
};

export const fields: Field[] = [
  {
    id: 'field1',
    name: 'Downtown Arena',
    address: '123 Main St',
    lat: -26.2041,
    lng: 28.0473,
    pricingDefaultCents: 5000,
    listingFeeCents: 1000,
  },
  {
    id: 'field2',
    name: 'Lakeside Pitch',
    address: '456 Lake Rd',
    lat: -26.1,
    lng: 28.05,
    pricingDefaultCents: 6000,
    listingFeeCents: 1200,
  },
];

export const matches: Match[] = [
  {
    id: 'm1',
    title: 'Sunday 7v7',
    fieldId: 'field1',
    scheduledAt: new Date().toISOString(),
    perPlayerFeeCents: 700,
    maxPlayers: 14,
    confirmedCount: 6,
    status: 'pending',
  },
  {
    id: 'm2',
    title: 'Friday Night Game',
    fieldId: 'field2',
    scheduledAt: new Date().toISOString(),
    perPlayerFeeCents: 800,
    maxPlayers: 14,
    confirmedCount: 10,
    status: 'confirmed',
  },
];

export const wallets: Wallet[] = [
  {
    fieldId: 'field1',
    balanceCents: 25000,
    pendingPayoutCents: 5000,
    totalEarnedCents: 80000,
    totalFeesCents: 3000,
  },
  {
    fieldId: 'field2',
    balanceCents: 32000,
    pendingPayoutCents: 0,
    totalEarnedCents: 100000,
    totalFeesCents: 4500,
  },
];

export const payoutRequests: PayoutRequest[] = [
  {
    id: 'p1',
    fieldId: 'field1',
    managerName: 'Alice Manager',
    amountCents: 10000,
    status: 'requested',
    requestedAt: new Date().toISOString(),
  },
];

export const promotions: Promotion[] = [
  {
    id: 'promo1',
    fieldId: 'field1',
    title: 'Early Bird 10% Off',
    description: 'Book before Friday 5pm and get 10% off.',
    discountPercent: 10,
    promoCode: 'EARLY10',
    isActive: true,
  },
];

export const ads: Ad[] = [
  {
    id: 'ad1',
    fieldId: 'field1',
    title: 'Downtown Arena Promo',
    description: 'Prime slots available this week!',
    isActive: true,
  },
  {
    id: 'ad2',
    title: 'Sponsor: Local Sports Shop',
    description: 'Get 15% off gear with code MATCHUP.',
    isActive: true,
  },
];
