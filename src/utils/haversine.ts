function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Straight-line distance in km between two lat/lng points */
export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const PLATFORM_FEE_PERCENT = 5;

/**
 * Computes proportional fare for passenger's segment, rounded up to nearest ₦50.
 * If full route (isFullRoute = true), returns pricePerSeat * seats exactly.
 */
export function computeFare(
  boardingLat: number,
  boardingLng: number,
  alightingLat: number,
  alightingLng: number,
  totalKm: number,
  pricePerSeat: number,
  seats: number,
  isFullRoute: boolean,
): number {
  if (isFullRoute || totalKm === 0) return pricePerSeat * seats;
  const segmentKm = haversineKm(boardingLat, boardingLng, alightingLat, alightingLng);
  const raw = (segmentKm / totalKm) * pricePerSeat * seats;
  return Math.ceil(raw / 50) * 50;
}

export function computePlatformFee(fareAmount: number): number {
  return Math.round((fareAmount * PLATFORM_FEE_PERCENT) / 100);
}
