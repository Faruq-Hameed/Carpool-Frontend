/**
 * Notification `data.type` values sent by the backend.
 * Used to route tap events to the correct screen.
 */
export const NotifType = {
  // ─── Rides ───────────────────────────────────────────────────────────────
  RIDE_STARTED:   'RIDE_STARTED',
  RIDE_COMPLETED: 'RIDE_COMPLETED',
  RIDE_CANCELLED: 'RIDE_CANCELLED',

  // ─── Bookings ─────────────────────────────────────────────────────────────
  BOOKING_REQUEST:            'BOOKING_REQUEST',
  BOOKING_ACCEPTED:           'BOOKING_ACCEPTED',
  BOOKING_REJECTED:           'BOOKING_REJECTED',
  PASSENGER_CANCELLED:        'PASSENGER_CANCELLED',

  // ─── Wallet ───────────────────────────────────────────────────────────────
  WALLET_FUNDED:       'WALLET_FUNDED',
  WALLET_CREDITED:     'WALLET_CREDITED',
  WALLET_DEBITED:      'WALLET_DEBITED',
  WITHDRAWAL_APPROVED: 'WITHDRAWAL_APPROVED',
  WITHDRAWAL_REJECTED: 'WITHDRAWAL_REJECTED',

  // ─── KYC ──────────────────────────────────────────────────────────────────
  KYC_VERIFIED:    'KYC_VERIFIED',
  KYC_REJECTED:    'KYC_REJECTED',
  SELFIE_VERIFIED: 'SELFIE_VERIFIED',
  SELFIE_REJECTED: 'SELFIE_REJECTED',
} as const;

export type NotifTypeValue = (typeof NotifType)[keyof typeof NotifType];
