// ─── Carpool Design Tokens ───────────────────────────────────────────────────

export const Colors = {
  // Primary greens (brand)
  primary: "#126415",
  primaryMedium: "#2D7A3E",
  primaryLight: "#E8F5E9",
  primaryBg: "#F0F6EE",
  walletBg: "#3D663F",

  // Neutrals
  white: "#FFFFFF",
  background: "#FFFFFF",
  surface: "#F5F5F5",
  border: "#E0E0E0",
  borderDark: "#595959",

  // Text hierarchy
  text: "#1A1A1A",
  textMuted: "#404040",
  textSecondary: "#666666",
  textTertiary: "#999999",

  // Semantic
  error: "#CE0000",
  errorBg: "#FCF6F6",
  warning: "#D97706",
  warningBg: "#FFF8E7",
  info: "#1D4ED8",
  infoBg: "#EFF6FF",
} as const;

/** Maps any ApiStatus / domain status string to a bg + text color pair. */
export const StatusColors: Record<string, { bg: string; text: string }> = {
  ACTIVE:             { bg: "#E8F5E9", text: "#126415" },
  APPROVED:           { bg: "#E8F5E9", text: "#126415" },
  COMPLETED:          { bg: "#E8F5E9", text: "#126415" },
  ACCEPTED:           { bg: "#E8F5E9", text: "#126415" },
  VERIFIED:           { bg: "#E8F5E9", text: "#126415" },
  SUCCESS:            { bg: "#E8F5E9", text: "#126415" },
  PENDING:            { bg: "#FFF8E7", text: "#D97706" },
  WAITING:            { bg: "#FFF8E7", text: "#D97706" },
  PARTIALLY_VERIFIED: { bg: "#FFF8E7", text: "#D97706" },
  ONGOING:            { bg: "#EFF6FF", text: "#1D4ED8" },
  SUSPENDED:          { bg: "#FFF3CD", text: "#856404" },
  RESTRICTED:         { bg: "#FFF3CD", text: "#856404" },
  CANCELLED:          { bg: "#FCF6F6", text: "#CE0000" },
  REJECTED:           { bg: "#FCF6F6", text: "#CE0000" },
  BLOCKED:            { bg: "#FCF6F6", text: "#CE0000" },
  NOT_VERIFIED:       { bg: "#F5F5F5", text: "#666666" },
  NOT_COMPLETED:      { bg: "#F5F5F5", text: "#666666" },
  INACTIVE:           { bg: "#F5F5F5", text: "#666666" },
};

export const Spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  base: 16,
  lg:   20,
  xl:   24,
  xxl:  32,
} as const;

export const Radius = {
  sm:   4,
  md:   8,
  lg:   12,
  full: 9999,
} as const;

export const FontSize = {
  xs:   11,
  sm:   12,
  base: 14,
  md:   16,
  lg:   18,
  xl:   22,
  xxl:  26,
} as const;

/** Format a number as Nigerian Naira, e.g. 10000 → "₦10,000" */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

/** Format an ISO date string to "Mon, 11 Apr" */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** Format an ISO date string to "9:05 AM" */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
