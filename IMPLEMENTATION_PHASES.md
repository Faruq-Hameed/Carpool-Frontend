# Carpool Mobile App — Implementation Phases

**Created:** 2026-03-06
**Basis:** STATUS.md analysis + backend endpoint audit

Auth is complete and working. KYC (NIN/DOB via PersonalInfo) is wired. Everything else is either a placeholder or missing entirely. Phases are ordered by dependency — each phase builds on the previous one.

> **Component strategy:** Phase 3 is a dedicated shared component library phase — components used across 2+ features are built there first. Every subsequent feature phase also lists its own screen-specific components at the end of that phase.

---

## Phase 1 — Dependency Cleanup & Foundation

**Goal:** Get the project off deprecated packages before building features on top of them.
**Scope:** Mostly `package.json` changes + find/replace in ~5 files. No new features.

### 1a — Remove `@rneui/base` / `@rneui/themed`

These RC packages (v4.0.0-rc.8) never reached stable and are abandoned.

| File | Current usage | Replace with |
|------|--------------|--------------|
| `src/screens/dashboard/History.tsx` | `<Button>` from RNEUI | `<TouchableOpacity>` + `<Text>` |
| `src/screens/dashboard/Messages.tsx` | `<Text>` from RNEUI | RN `<Text>` |
| `src/screens/auth/VerifyAccountScreen.tsx` | `<Button>` from RNEUI | existing `<GreenButton>` |

```bash
npm uninstall @rneui/base @rneui/themed
```

### 1b — Standardise on `@expo/vector-icons`

The project already uses `Ionicons` from `@expo/vector-icons` in `DashboardNavigator.tsx`.

```bash
npm uninstall react-native-vector-icons
```

Remove its entry from `package.json → expo.doctor.reactNativeDirectoryCheck.exclude`. Replace any remaining `react-native-vector-icons` imports with `@expo/vector-icons`.

### 1c — Move API Base URL to `.env`

Create `.env` at project root:
```
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000
```

Update `src/utils/constants/apiConstants.ts`:
```ts
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL!;
```

Add `.env` to `.gitignore`. Create `.env.example` with a placeholder. Expo SDK 49+ supports `EXPO_PUBLIC_*` natively — no extra package needed.

### 1d — Remove Dead Files & Fix Naming
- Delete `src/contexts/authsContext.js` (replaced by TypeScript `AuthContext/`)
- Rename `useFaceVerificationApi` → `faceVerificationApi` in `src/apis/verifications/index.ts`
- Remove `EnterNIN` and `EntireLicense` from `VerificationNavigator` — dead-end screens not used in the real KYC flow

---

## Phase 2 — API Layer & Services

**Goal:** Build all typed API service functions + TanStack Query hooks before building any screens. No UI work in this phase.

### 2a — Rides API (`src/apis/rides/`)

```ts
// Types: Ride, RideBooking, CreateRideDto, CreateBookingDto, RideSearchQuery

searchRides(query)                       → GET  /rides
getRideById(id)                          → GET  /rides/:id
getMyRides(page, size)                   → GET  /rides/me
getMyBookings(page, size)                → GET  /rides/bookings/me
createRide(dto)                          → POST /rides
updateRide(id, dto)                      → PATCH /rides/:id
cancelRide(id)                           → DELETE /rides/:id
startRide(id)                            → PATCH /rides/:id/start
completeRide(id, dto)                    → PATCH /rides/:id/complete
bookRide(rideId, dto)                    → POST /rides/:id/bookings
getRideBookings(rideId)                  → GET  /rides/:id/bookings
acceptBooking(rideId, bookingId)         → PATCH /rides/:id/bookings/:id/accept
rejectBooking(rideId, bookingId)         → PATCH /rides/:id/bookings/:id/reject
cancelBooking(rideId, bookingId)         → DELETE /rides/:id/bookings/:id
```

### 2b — Wallet API (`src/apis/wallet/`)

```ts
// Types: Wallet, WalletTransaction, WithdrawalRequest, BankDetails

getMyWallet()                            → GET  /wallet/me
getMyTransactions(page, size)            → GET  /wallet/transactions
fundWallet(dto)                          → POST /wallet/fund
requestWithdrawal(dto)                   → POST /wallet/withdraw
cancelWithdrawal(id)                     → DELETE /wallet/withdraw/:id
```

### 2c — Cars API (`src/apis/cars/`)

```ts
// Types: Car, CarImage, CreateCarDto, UpdateCarDto

createCar(dto)                           → POST /cars
addCarImages(carId, files)               → POST /cars/{:id}  (multipart)
getMyCars(page, size)                    → GET  /cars/me
getCarById(id)                           → GET  /cars/:id
updateCar(id, dto)                       → PATCH /cars/:id
deleteCar(id)                            → DELETE /cars/:id
```

### 2d — Notifications API (`src/apis/notifications/`)

```ts
registerDevice(dto)                      → POST /notifications/devices
removeDevice(deviceId)                   → DELETE /notifications/devices/:deviceId
getPreferences()                         → GET  /notifications/preferences
updatePreferences(dto)                   → PATCH /notifications/preferences
```

### 2e — User extras

```ts
// in src/apis/auth/ or src/apis/users/
updateProfilePicture(file)               → PATCH /users/me/profile-picture  (multipart)
getKycStatus(userId)                     → GET  /kyc
changePasscode(dto)                      → PUT  /auths/passcode
verifyPasscode(passcode)                 → POST /auths/verify/passcode
```

### 2f — TanStack Query Hooks (`src/hooks/`)

One file per domain — each exports query + mutation hooks:

| File | Hooks |
|------|-------|
| `useRides.ts` | `useRideSearch`, `useRide`, `useMyRides`, `useMyBookings`, `useCreateRide`, `useUpdateRide`, `useCancelRide`, `useStartRide`, `useCompleteRide`, `useBookRide`, `useRideBookings`, `useAcceptBooking`, `useRejectBooking`, `useCancelBooking` |
| `useWallet.ts` | `useMyWallet`, `useTransactions`, `useFundWallet`, `useRequestWithdrawal`, `useCancelWithdrawal` |
| `useCars.ts` | `useMyCars`, `useCar`, `useCreateCar`, `useAddCarImages`, `useUpdateCar`, `useDeleteCar` |
| `useNotifications.ts` | `useRegisterDevice`, `useRemoveDevice`, `useNotificationPreferences`, `useUpdatePreferences` |
| `useProfile.ts` | `useUpdateProfilePicture`, `useChangePasscode`, `useVerifyPasscode` |

---

## Phase 3 — Shared Component Library

**Goal:** Build all reusable UI components needed across multiple feature phases. These are the building blocks — building them once here avoids duplication in every screen.

> The existing components (`GreenButton`, `FormInput`, `OtpBoxInput`, `ErrorToast`, `NavigationHeader`, etc.) are already good. This phase adds the components the new features require.

### 3a — Display / Data components

| Component | Props | Used in |
|-----------|-------|---------|
| `RideCard` | `ride, onPress, variant: 'search'\|'history'` | RideResults, HistoryScreen |
| `BookingCard` | `booking, onPress` | HistoryScreen, RideDetail |
| `CarCard` | `car, onPress, onDelete?` | MyCarsScreen |
| `TransactionRow` | `transaction` | WalletScreen, TransactionHistoryScreen |
| `StatusBadge` | `status, size?` | All list screens — ride/booking/car/kyc statuses |
| `Avatar` | `uri?, name, size` | ProfileSummary, RideCard, BookingCard |
| `PriceTag` | `amount, size?` | RideCard, RideDetail |

### 3b — Layout / Container components

| Component | Props | Used in |
|-----------|-------|---------|
| `ScreenHeader` | `title, subtitle?, rightAction?` | All new screens (replaces duplicated header patterns) |
| `SectionHeader` | `title, action?: {label, onPress}` | Wallet overview, Profile sections |
| `TabBar` | `tabs: {label}[], activeIndex, onChange` | HistoryScreen (As Passenger / As Driver tabs) |
| `EmptyState` | `icon, title, subtitle, action?: {label, onPress}` | All empty list states |
| `LoadingList` | `count?` | Skeleton placeholder while lists load |
| `PaginatedFlatList` | `data, renderItem, fetchNextPage, hasNextPage, isLoading` | All paginated lists |

### 3c — Form / Input components

| Component | Props | Used in |
|-----------|-------|---------|
| `AmountInput` | `value, onChange, max?, currency?` | FundWallet, WithdrawalRequest |
| `BankDetailsForm` | `value, onChange` | WithdrawalRequest |
| `CarPicker` | `cars, selectedId, onChange` | OfferRide (select which car to use) |
| `SeatCounter` | `value, max, onChange` | OfferRide, RideSearch (seats needed) |
| `ToggleSwitch` | `label, value, onChange, description?` | NotificationPreferences |

### 3d — Feedback / Overlay components

| Component | Props | Used in |
|-----------|-------|---------|
| `BottomSheet` | `visible, onClose, children, title?` | FundWallet sheet, WithdrawalSheet |
| `ActionSheet` | `visible, onClose, options: {label, onPress, destructive?}[]` | Car options, Ride options |
| `SuccessScreen` | `title, message, onContinue` | Post-booking, post-withdrawal, post-ride-create |
| `InlineAlert` | `type: 'info'\|'warning'\|'error', message` | Wallet insufficient balance warning, etc. |

---

## Phase 4 — Push Notifications Bootstrap

**Goal:** Register the device token immediately after login so all backend-triggered pushes work from day one.
**Depends on:** Phase 2d

### Steps
1. Install:
   ```bash
   npx expo install expo-notifications expo-device
   ```
2. Add `expo-notifications` plugin to `app.json`.
3. Create `src/utils/registerPushToken.ts`:
   - Request permissions
   - Get Expo push token
   - Call `POST /notifications/devices` with token + platform
4. Call inside `useAuth.handleLogin()` after saving the token.
5. Call `DELETE /notifications/devices/:id` inside `useAuth.logout()`.

> No new components needed — this is logic only.

---

## Phase 5 — Home Screen: Find a Ride

**Goal:** Make the Home tab functional for passengers searching and booking rides.
**Depends on:** Phase 2a (rides API), Phase 3 (shared components)

### 5a — Wire the existing `RideSearchForm`
- Connect `leavingFrom` / `goingTo` text inputs to state (plain text for now — maps come in Phase 12)
- Wire `DateTimePicker` so it properly updates `selectedDate` / `selectedTime`
- Validate on submit → call `useRideSearch()` → navigate to `RideResults`

### 5b — `RideResults` screen
New screen in `RideStack`:
- Search query params displayed at top with an "Edit" shortcut
- `PaginatedFlatList` of `RideCard` components (variant: `'search'`)
- Pull-to-refresh
- `EmptyState` if no rides found

### 5c — `RideDetail` screen (passenger view)
- Full ride info: origin → destination, departure time, driver `Avatar` + name, car info, price/seat, seats left
- `InlineAlert` if user is not verified (can't book)
- "Book a Seat" → `useBookRide()` → `SuccessScreen`
- If already booked: show booking `StatusBadge` + "Cancel Booking" option

### Navigation changes
- Add `RideStack` to root navigator with routes: `RideResults`, `RideDetail`
- Extend `RootStackParamList`

### Screen-specific components
| Component | Description |
|-----------|-------------|
| `RideSearchSummaryBar` | Compact display of active search params at top of RideResults |
| `RideInfoRow` | Single labelled info line (icon + label + value) used inside RideDetail |
| `DriverInfo` | Driver avatar + name + rating placeholder block in RideDetail |
| `BookingStatusBar` | Shows existing booking status + cancel button at bottom of RideDetail |

---

## Phase 6 — Offer Ride: Cars + Driver Flow

**Goal:** Let verified users register a car and create / manage rides as a driver.
**Depends on:** Phase 2a, Phase 2c, Phase 3

### 6a — Cars: Register & manage (`ProfileStack`)
New screens accessible from Profile → My Cars:

**`MyCarsScreen`**
- `PaginatedFlatList` of `CarCard` components
- "Add Car" button → `AddCarScreen`
- Tap car → `CarDetailScreen`

**`AddCarScreen`**
- Form: plate number, make, model, vehicle category, colour
- Submit → `useCreateCar()` → navigate to `CarDetailScreen`

**`CarDetailScreen`**
- Shows car info + verification status badge
- "Add Photos" button → image picker → `useAddCarImages()`
- Photo grid (existing images)
- Delete car → `ActionSheet` confirm → `useDeleteCar()`

### 6b — Offer Ride screen (replaces placeholder tab)
Full form on the **Offer** tab:
- `CarPicker` — select from registered cars
- Origin / Destination text inputs
- Departure date + time picker (reuse existing `DateTimePicker`)
- `SeatCounter` for total seats
- Price per seat input (`AmountInput`)
- Optional notes field
- Submit → `useCreateRide()` → `SuccessScreen`

### 6c — Driver: Manage Booking Requests (on `RideDetail`, driver view)
When the current user is the ride owner:
- List pending `BookingCard` components with Accept / Reject actions
- `useAcceptBooking()` / `useRejectBooking()`

### 6d — Ride Lifecycle controls (driver, on `RideDetail`)
Conditional action buttons based on ride status:
- `PENDING` → "Start Ride" (`useStartRide()`)
- `ONGOING` → "Complete Ride" (`useCompleteRide()`)
- `PENDING` / `ONGOING` → "Cancel Ride" (`ActionSheet` confirm → `useCancelRide()`)

### Screen-specific components
| Component | Description |
|-----------|-------------|
| `CarImageGrid` | Grid of car images with an "Add" cell at the end |
| `VerificationStatusCard` | Shows car verification status with explanation text |
| `BookingRequestCard` | Booking row with Accept / Reject buttons (driver view only) |
| `RideStatusActions` | Conditional bottom bar showing Start / Complete / Cancel based on ride status |
| `OfferRideFormSection` | Labelled section wrapper used to group fields in the offer form |

---

## Phase 7 — History Tab

**Goal:** Show the user's complete ride and booking history.
**Depends on:** Phase 2a, Phase 3

### 7a — History screen layout
Replace placeholder with a `TabBar` switching between two views:

**As Passenger** (bookings from `GET /rides/bookings/me`):
- `PaginatedFlatList` of `BookingCard`
- Each card: route, date, `StatusBadge`, price paid
- Tap → `RideDetail` (passenger view — cancel if PENDING)

**As Driver** (rides from `GET /rides/me`):
- `PaginatedFlatList` of `RideCard` (variant: `'history'`)
- Each card: route, date, seats taken/total, `StatusBadge`
- Tap → `RideDetail` (driver view — manage bookings / lifecycle)

### 7b — Pull-to-refresh + `EmptyState` for both sub-tabs

### Screen-specific components
| Component | Description |
|-----------|-------------|
| `HistoryTabBar` | The passenger / driver toggle tab at top of History screen |
| `BookingHistoryCard` | Extended `BookingCard` variant with payment amount and cancellation action |
| `RideHistoryCard` | Extended `RideCard` variant showing seat fill and earnings |

---

## Phase 8 — Wallet

**Goal:** Full wallet — balance, transactions, fund, withdraw.
**Depends on:** Phase 2b, Phase 3

### 8a — Wallet screen (Profile → Wallet)
- Balance card with naira symbol and current balance from `GET /wallet/me`
- "Fund Wallet" button → `BottomSheet` (8c)
- "Withdraw" button → navigate to `WithdrawalScreen` (8d)
- Recent transactions section (last 5 `TransactionRow` items)
- "View All Transactions" → `TransactionHistoryScreen` (8b)

### 8b — Transaction History screen
- `PaginatedFlatList` of `TransactionRow`
- Each row: direction icon, reason label, amount (+/-), date
- Pull-to-refresh

### 8c — Fund Wallet bottom sheet
- `AmountInput` + optional reference field
- Submit → `useFundWallet()` → close sheet + refetch wallet
- `InlineAlert`: "This is a temporary top-up method — payment gateway coming soon"

### 8d — Withdrawal screen
- `AmountInput` (max = current balance)
- `BankDetailsForm` (bank name, account number, account name)
- Submit → `useRequestWithdrawal()` → `SuccessScreen`
- If pending withdrawal exists: show its status card with "Cancel" button → `useCancelWithdrawal()`

### Navigation changes
- Wire Profile → "Wallet" `onPress` to navigate to `WalletScreen`
- Add `WalletScreen`, `TransactionHistoryScreen`, `WithdrawalScreen` to `ProfileStack`

### Screen-specific components
| Component | Description |
|-----------|-------------|
| `WalletBalanceCard` | Large balance display with gradient or colour treatment |
| `TransactionSummaryList` | Short list (5 items) with a "See All" footer, used on WalletScreen |
| `PendingWithdrawalCard` | Shows pending withdrawal amount + status + cancel action |
| `FundWalletSheet` | Bottom sheet containing the fund form (wraps `BottomSheet`) |

---

## Phase 9 — Face Capture (KYC Selfie)

**Goal:** Complete the KYC flow with actual camera-based selfie capture.
**Depends on:** Phase 1 (cleanup), Phase 3 (shared components)

### Steps
1. Install:
   ```bash
   npx expo install expo-image-picker
   ```
2. Update `FaceCaptureScreen.tsx`:
   - On button press: request camera permissions
   - Launch front-facing camera via `ImagePicker.launchCameraAsync()`
   - Show captured image preview with "Retake" / "Use this photo" options
   - On confirm: upload as multipart to `POST /kyc/selfie`
   - On success: `setUserKycStatus()` with updated `selfieStatus`
3. Fix `isVerified` in `HomeScreen` — add `selfieStatus === VERIFIED` to the check

### Screen-specific components
| Component | Description |
|-----------|-------------|
| `SelfiePreview` | Shows captured image with Retake / Confirm buttons |
| `CaptureGuideOverlay` | Face outline guide shown before capture (oval frame + instructions) |

---

## Phase 10 — Profile Enhancements

**Goal:** Complete the Profile section — picture upload, passcode change, notification settings, delete account.
**Depends on:** Phase 2e, Phase 3, Phase 6a (cars)

### 10a — Profile picture upload
- Tap avatar in `ProfileSummary` → `ActionSheet` (Camera / Gallery / Remove)
- Upload via `useUpdateProfilePicture()` (multipart)
- Update `currentUser` in context on success

### 10b — Change Passcode screen
New screen in `ProfileStack` from `AccountSettingScreen`:
- Current passcode input (`PassCodeInput` — already exists)
- New passcode input + confirm
- Flow: `useVerifyPasscode()` then `useChangePasscode()`

### 10c — My Cars entry in Profile
- Add "My Cars" `NavigationChildFrame` row to `ProfileScreen`
- Navigate to `MyCarsScreen` (built in Phase 6a)

### 10d — Notification Preferences screen
New screen in `ProfileStack`:
- `ToggleSwitch` for push notifications
- `ToggleSwitch` for email notifications
- `GET/PATCH /notifications/preferences`

### 10e — Delete Account confirmation
- Verify `DeleteAccountScreen` calls `DELETE /users/:id`
- On success: call `logout()` + navigate to `AuthStack`

### Screen-specific components
| Component | Description |
|-----------|-------------|
| `AvatarUploadButton` | Tappable avatar with a camera icon badge |
| `ChangePasscodeForm` | Three `PassCodeInput` fields with labels + submit |
| `PreferencesSection` | Labelled group of `ToggleSwitch` rows |

---

## Phase 11 — Notification Deep Links & In-App Alerts

**Goal:** Make push notification taps navigate to the correct screen.
**Depends on:** Phase 4 (tokens registered), Phases 5–10 (destination screens exist)

### 11a — Notification tap handler
In `App.tsx` / root navigator:
- `Notifications.addNotificationResponseReceivedListener`
- Map notification `data.type` → navigation target:

| Notification type | Navigate to |
|------------------|-------------|
| `BOOKING_ACCEPTED` / `BOOKING_REJECTED` | `RideDetail` (the relevant ride) |
| `WITHDRAWAL_APPROVED` / `WITHDRAWAL_REJECTED` | `WalletScreen` |
| `KYC_STATUS_UPDATED` | `VerificationTypeScreen` |
| `RIDE_STARTED` | `RideDetail` |

### 11b — In-app alert banner
- `InlineAlert` (built in Phase 3) shown inside screens when a relevant push arrives while the app is open
- Example: "Your booking was accepted!" banner on the History tab

---

## Phase 12 — Messages / Chat

**Goal:** Implement in-app messaging between drivers and passengers.

> **Prerequisite:** Audit `C:/Users/HP/Desktop/CARPOOL-STACK/ms-server` first — it appears to be a separate chat microservice. Its API shape (REST / WebSocket), auth mechanism (same JWT?), and data model need to be understood before building the mobile client.

### 12a — Audit ms-server
- Read its routes, entities, and WebSocket events
- Confirm whether the same JWT token works or if a separate handshake is needed

### 12b — Conversations list (`Messages` tab)
- List of conversations, one per ride where user has an accepted booking (as passenger) or is the driver
- Each row: other party's avatar + name, last message preview, timestamp, unread badge

### 12c — `ChatScreen`
- Real-time message thread
- Text input + send button
- WebSocket or polling based on what ms-server exposes
- Show typing indicator if supported

### Screen-specific components
| Component | Description |
|-----------|-------------|
| `ConversationRow` | Conversation list item with avatar, name, preview, unread badge |
| `ChatBubble` | Message bubble — self (right, primary colour) vs other (left, gray) |
| `ChatInput` | Sticky bottom input with send button |
| `UnreadBadge` | Numeric badge used on Messages tab icon and ConversationRow |

---

## Phase 13 — Maps & Location (Enhancement Layer)

**Goal:** Upgrade text-based location inputs to proper map-based pickers. Can be done independently on top of the text-based search already working from Phase 5.

### Steps
1. Install:
   ```bash
   npx expo install react-native-maps expo-location
   ```
2. Replace `LocationInput` text fields in `RideSearchForm` and `OfferRide` with autocomplete + map picker
3. Show ride route polyline on a map in `RideDetail`
4. Show real-time driver pin during ONGOING rides (requires a location broadcasting mechanism)

### Screen-specific components
| Component | Description |
|-----------|-------------|
| `LocationSearchInput` | Text input with autocomplete dropdown using device location or typed query |
| `MapPickerScreen` | Full-screen map with draggable pin for selecting a location |
| `RouteMap` | Static map preview showing origin → destination line inside RideDetail |
| `LiveTrackingMap` | Real-time map with driver pin for ONGOING rides |

---

## Dependency Changes Summary

| Action | Package | Phase |
|--------|---------|-------|
| Remove | `@rneui/base`, `@rneui/themed` | 1a |
| Remove | `react-native-vector-icons` | 1b |
| Add | `expo-notifications`, `expo-device` | 4 |
| Add | `expo-image-picker` | 9 |
| Add (future) | `react-native-maps`, `expo-location` | 13 |
| Consider removing | `react-native-keyboard-aware-scroll-view` | After Phase 5 |
| Consider migrating | `@react-navigation/stack` → `native-stack` | After Phases stable |

---

## Full Build Sequence

```
Phase 1  (cleanup)
    ↓
Phase 2  (API layer — no UI)
    ↓
Phase 3  (shared component library)
    ↓
Phase 4  (push notification bootstrap — logic only)
    ↓
Phase 5  (Home: find & book a ride)
    ↓
Phase 6  (Offer ride: cars + driver flow)
    ↓
Phase 7  (History tab)
    ↓
Phase 8  (Wallet)
    ↓
Phase 9  (KYC selfie / face capture)
    ↓
Phase 10 (Profile enhancements)
    ↓
Phase 11 (Notification deep links)
    ↓
Phase 12 (Chat — after ms-server audit)
    ↓
Phase 13 (Maps — enhancement layer, can run parallel to 12)
```

Phases 1–4 are infrastructure (no visible new screens). Phases 5–8 deliver the complete core app loop that a user needs to actually use the app. Phases 9–11 complete the user lifecycle and safety features. Phases 12–13 are enhancement layers.
