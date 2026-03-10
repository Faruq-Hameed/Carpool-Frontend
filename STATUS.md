# Carpool Mobile App — Current Status

**Last updated:** 2026-03-06

---

## Stack Snapshot

| Item | Version | Notes |
|------|---------|-------|
| Expo SDK | **53.0.25** | Latest stable — no upgrade needed |
| React Native | **0.79.6** | Matches Expo 53 requirement ✅ |
| TypeScript | 5.8.3 | ✅ |
| React Navigation | **v6** (stack 6.4.1, native 6.1.18, tabs 6.6.1) | ⚠️ v7 available — see notes below |
| TanStack Query | 5.90.12 | ✅ latest |
| Axios | 1.13.2 | ✅ |
| Formik + Yup | 2.4.9 + 1.7.1 | ⚠️ Formik is largely inactive (last release 2021) |

---

## Expo SDK 53 — Dependency Compatibility

All Expo-managed packages are at the correct versions for SDK 53:

| Package | Installed | Status |
|---------|-----------|--------|
| `react-native` | 0.79.6 | ✅ ~0.79.0 |
| `react-native-reanimated` | 3.17.5 | ✅ ~3.17.x |
| `react-native-gesture-handler` | 2.24.0 | ✅ ~2.24.0 |
| `react-native-screens` | 4.11.1 | ✅ ~4.11.x |
| `react-native-safe-area-context` | 5.4.0 | ✅ 5.4.x |
| `react-native-svg` | 15.11.2 | ✅ 15.11.x |
| `@react-native-async-storage/async-storage` | 2.1.2 | ✅ 2.1.x |
| `@react-native-community/datetimepicker` | 8.4.1 | ✅ 8.4.x |
| `@react-native-masked-view/masked-view` | 0.3.2 | ✅ 0.3.x |
| `expo-font` | 13.3.2 | ✅ ~13.3.x |
| `expo-splash-screen` | 0.30.10 | ✅ ~0.30.x |
| `expo-status-bar` | 2.2.3 | ✅ ~2.2.x |

**No Expo SDK upgrade needed — the project is on the latest SDK and all native packages are correctly pinned.**

---

## Deprecated / Problematic Dependencies

### 🔴 High — Should Replace

**`@rneui/base` + `@rneui/themed` (v4.0.0-rc.8)**
- These are RC (release candidate) versions from 2022. The RNEUI project stalled and never shipped a stable v4.
- Used in: `History.tsx` (`Button`), `Messages.tsx` (`Text`), `VerifyAccountScreen.tsx` (`Button`)
- **Replacement:** Use Pressable/TouchableOpacity + custom styles, or migrate to a maintained library. The `@rneui/themed` `Text` usage can just be replaced with React Native's own `Text`.

**`react-native-vector-icons` (v10.3.0)**
- Legacy approach for Expo projects. Requires native linking and extra config.
- The app already uses **`@expo/vector-icons`** (comes with Expo SDK) — visible in `DashboardNavigator.tsx` (`Ionicons`).
- **Fix:** Remove `react-native-vector-icons` entirely and standardise on `@expo/vector-icons` for all icon usage.

### 🟡 Medium — Consider Replacing

**`@react-navigation/stack` (v6.4.1)**
- Uses JS-based transitions and depends on `@react-native-masked-view/masked-view`.
- **Recommendation:** Migrate `AuthNavigator`, `VerificationNavigator`, `ProfileStackNavigator` to `@react-navigation/native-stack` (already installed via `react-native-screens`). This gives native iOS/Android transitions and removes the `masked-view` dependency.
- Note: `native-stack` has minor API differences (e.g. fewer `options`), so this requires testing.

**`react-native-keyboard-aware-scroll-view` (v0.9.5)**
- Unmaintained (last npm release 2020). Used in `PersonalInfoScreen.tsx`.
- **Replacement:** React Native's built-in `KeyboardAvoidingView` + `ScrollView`, or `@react-native/keyboard-controller` (v1.x).

**`react-native-modal-datetime-picker` (v18.0.0)**
- Actively maintained, but wraps `@react-native-community/datetimepicker` with a modal. Works fine on Expo 53. No urgent issue.

### 🟢 Fine — Keep

- `formik` (2.4.9) — inactive upstream but fully functional, no breaking issues
- `react-native-reanimated`, `react-native-gesture-handler` — ✅
- `date-fns` (4.1.0) — ✅ latest v4
- `@tanstack/react-query` (5.90.12) — ✅ latest
- `axios` (1.13.2) — ✅

---

## Navigation Structure

```
RootStack
├── AuthStack              ← shown when NOT logged in
│   ├── Splash
│   ├── Welcome
│   ├── SignUp
│   ├── Login
│   ├── VerifyAccount
│   ├── ResetAccount
│   ├── ForgotPasscode
│   ├── EnterOTP           ← shared, purpose-driven (VerifyOtpPurposes enum)
│   └── CreatePasscode
│
└── (logged in)
    ├── DashboardStack  (Bottom Tabs)
    │   ├── Home           ← UI skeleton only — see details below
    │   ├── Offer          ← PLACEHOLDER
    │   ├── History        ← PLACEHOLDER (has dev sign-out button)
    │   ├── Messages       ← PLACEHOLDER
    │   └── Profile  →  ProfileStack
    │           ├── ProfileScreen
    │           ├── AccountSetting
    │           └── DeleteAccount
    │
    ├── AccountVerification  (global overlay stack)
    │   ├── VerificationType
    │   ├── IdentityVerification      (intro screen)
    │   ├── IdentityVerificationTwo   (intro step 2)
    │   ├── PersonalInfo              ← NIN + DOB + names — API wired ✅
    │   ├── ContactInfo
    │   ├── EnterNIN                  ← dead-end, not connected to real flow
    │   ├── EntireLicense             ← placeholder
    │   ├── FaceCapture               ← UI done, NO camera capture
    │   ├── VerificationOtp           (reuses EnterOTPScreen)
    │   └── ChangeContactInfo
    │
    └── ProfileStack  (same navigator as tab Profile)
```

---

## Screen-by-Screen Status

### Auth Screens ✅ All Complete & Working

| Screen | API |
|--------|-----|
| SplashScreen | — |
| WelcomeScreen | — |
| SignUpScreen | `POST /users` |
| LoginScreen | `POST /auths/login` |
| VerifyAccountScreen | `POST /auths/verify/email` |
| ForgotPasscodeScreen | `POST /otps` → `POST /auths/passcode` |
| EnterOTPScreen | shared, purpose-driven |
| CreatePasscodeScreen | `POST /auths/passcode` |
| ResetAccountScreen | — |

### Dashboard Tabs

| Tab | Status | Notes |
|-----|--------|-------|
| **Home** | ⚠️ UI skeleton | ProfileSummary + KYC prompt working. Below that: TabSelector (find/offer) and RideSearchForm are demo UI components — inputs have local state but `handleFindRide` is an empty stub. No API calls anywhere on this screen. |
| **Offer Ride** | ❌ Placeholder | Single `<Text>Offer Ride Screen</Text>` |
| **History** | ❌ Placeholder | Has a dev "Sign Out" button from testing |
| **Messages** | ❌ Placeholder | Single `<Text>` |
| **Profile** | ✅ Functional | Nav to AccountVerification, AccountSetting, Wallet (stub), Support (stub), Privacy (stub) |

### KYC / Verification Screens

| Screen | Status |
|--------|--------|
| VerificationTypeScreen | Exists — not fully audited |
| IdentityVerificationScreen | ✅ Intro/info screen, navigates to next step |
| IdentityVerificationTwo | Exists — not fully audited |
| **PersonalInfoScreen** | ✅ Fully wired: names update + NIN/DOB verify, chained mutations, completion modal |
| ContactInfoScreen | Exists — not audited |
| EnterNINScreen | ⚠️ Dead-end — old screen with local state only, navigates to EntireLicense |
| EntireLicenseScreen | ❌ Placeholder |
| **FaceCaptureScreen** | ⚠️ UI done — no camera integration; button calls stub `initiateApiCall` |
| ChangeContactInfoScreen | Exists — not audited |

### Profile / Settings

| Screen | Status |
|--------|--------|
| ProfileScreen | ✅ Links to sub-screens, Wallet/Support/Privacy stubs |
| AccountSettingScreen | ✅ Sign Out modal + navigate to DeleteAccount |
| DeleteAccountScreen | Exists — API call not confirmed |

---

## Backend API Coverage (Mobile Client Perspective)

### ✅ Implemented in Mobile

| Endpoint | Used In |
|----------|---------|
| `POST /users` | SignUpScreen |
| `POST /auths/login` | LoginScreen |
| `POST /auths/verify/email` | VerifyAccountScreen |
| `POST /auths/passcode` (reset) | ForgotPasscode / CreatePasscode |
| `POST /otps` (public OTP) | ForgotPasscodeScreen |
| `POST /otps/private` | VerificationScreens (phone/email OTP) |
| `GET /users/me` | useAuth (refetchUser) |
| `PUT /users/names` | PersonalInfoScreen |
| `POST /kyc/nin` | PersonalInfoScreen |
| `GET /users/exist` | Contact verification flow |
| `POST /auths/verify/phone` | Phone verification |
| `PUT /auths/verify/email` | Change email flow |
| `PUT /auths/verify/phone` | Change phone flow |

### ❌ Backend Ready — Not Built in Mobile

**Rides (full feature missing)**
| Endpoint | Purpose |
|----------|---------|
| `GET /rides?origin=&destination=&date=&seats=` | Search available rides (Home screen) |
| `GET /rides/:id` | Ride detail screen |
| `POST /rides` | Offer/create a ride |
| `GET /rides/me` | My offered rides (History tab) |
| `POST /rides/:id/bookings` | Book a seat |
| `GET /rides/bookings/me` | My bookings (History tab) |
| `PATCH /rides/:id/bookings/:id/accept` | Accept booking request (driver) |
| `PATCH /rides/:id/bookings/:id/reject` | Reject booking request (driver) |
| `DELETE /rides/:id/bookings/:id` | Cancel booking (passenger) |
| `PATCH /rides/:id/start` | Start a ride (driver) |
| `PATCH /rides/:id/complete` | Complete ride / drop off (driver) |
| `DELETE /rides/:id` | Cancel ride (driver) |

**Wallet (full feature missing)**
| Endpoint | Purpose |
|----------|---------|
| `GET /wallet/me` | Wallet balance screen |
| `POST /wallet/fund` | Fund wallet (temp, before payment provider) |
| `GET /wallet/transactions` | Transaction history |
| `POST /wallet/withdraw` | Withdrawal request |
| `DELETE /wallet/withdraw/:id` | Cancel pending withdrawal |

**Cars (full feature missing)**
| Endpoint | Purpose |
|----------|---------|
| `POST /cars` | Register a car |
| `POST /cars/{:id}` | Upload car images |
| `GET /cars/me` | My registered cars |
| `GET /cars/:id` | Car detail |
| `PATCH /cars/:id` | Update car info |
| `DELETE /cars/:id` | Remove car |

**Notifications (push tokens not wired)**
| Endpoint | Purpose |
|----------|---------|
| `POST /notifications/devices` | Register Expo push token on login/app launch |
| `DELETE /notifications/devices/:id` | Unregister on logout |
| `GET /notifications/preferences` | Notification settings |
| `PATCH /notifications/preferences` | Update notification settings |

**Auth extras not yet used in mobile**
| Endpoint | Purpose |
|----------|---------|
| `PUT /auths/passcode` | Change passcode (while logged in) |
| `POST /auths/verify/passcode` | Validate current passcode before sensitive action |
| `POST /auths/otp-login` | OTP-based login (alternative to passcode) |

**Users extras**
| Endpoint | Purpose |
|----------|---------|
| `PATCH /users/me/profile-picture` | Upload profile picture |
| `GET /kyc` | Fetch KYC status on app load |
| `POST /kyc/selfie` | Selfie/face verification (provider webhook, needs camera) |

---

## Key Technical Issues

1. **Home screen ride search is entirely non-functional** — `LocationInput`, `DateTimePicker`, `TabSelector`, `RideSearchForm` are demo UI only. `handleFindRide` is an empty stub.

2. **Face capture has no camera** — `FaceCaptureScreen` has UI and loading states but no camera permission, no camera preview, no image capture. Needs `expo-camera` or `expo-image-picker`.

3. **Push notification token never registered** — the backend has a full `NotificationsService` ready, but `POST /notifications/devices` is never called. The app will silently receive no push notifications.

4. **`EnterNINScreen` is a dead-end** — it navigates to `EntireLicense` (unused). The real NIN flow uses `PersonalInfoScreen`. This screen should be removed from navigation or repurposed.

5. **`@rneui/themed` RC dependency** — `History.tsx` uses `Button` and `Messages.tsx` uses `Text` from this package. Both are trivially replaceable with React Native primitives.

6. **Dual icon libraries** — `@expo/vector-icons` (correct) and `react-native-vector-icons` (legacy) both exist. Only `@expo/vector-icons` should be used.

7. **Hardcoded API base URL** — `src/utils/constants/apiConstants.ts` has the IP manually swapped per developer. Should use `.env` + `expo-constants` or `babel-plugin-dotenv`.

8. **`useFaceVerificationApi` misnamed** — it's a plain async function returning a Promise, not a hook. Should be `faceVerificationApi`.

9. **Dead file: `src/contexts/authsContext.js`** — JavaScript remnant from early development, coexists with the TypeScript `AuthContext/`. Likely unused, should be deleted.

10. **`@react-navigation/stack` creates `.masked-view` dependency** — If/when migrating to `native-stack`, `@react-native-masked-view/masked-view` can be removed.

---

## What Needs to Be Built

### P0 — Core App Functionality (App is unusable without these)
- [ ] **Home: Wire ride search** — connect `RideSearchForm` to `GET /rides?origin=&destination=&date=&seats=`; create `RideResults` screen
- [ ] **Offer Ride screen** — form to create a ride (`POST /rides`), select a car, set seats/price/route
- [ ] **History tab** — two sections: My Rides (`GET /rides/me`) and My Bookings (`GET /rides/bookings/me`)
- [ ] **Ride detail screen** — show ride info, book seat (`POST /rides/:id/bookings`), or manage bookings (driver view)

### P1 — Financial & Identity
- [ ] **Wallet screen** — balance (`GET /wallet/me`), transactions (`GET /wallet/transactions`), fund, withdraw
- [ ] **Face capture (camera)** — integrate `expo-image-picker` or `expo-camera` for selfie, call `POST /kyc/selfie`
- [ ] **Push token registration** — call `POST /notifications/devices` on login; `DELETE` on logout

### P2 — Profile & Settings
- [ ] **Profile picture upload** — `PATCH /users/me/profile-picture` (multipart)
- [ ] **Car registration flow** — `POST /cars` + image upload `POST /cars/{:id}`
- [ ] **My Cars screen** — `GET /cars/me`, edit/delete
- [ ] **Change passcode** — `PUT /auths/passcode` (authenticated)
- [ ] **Notification preferences** — `GET/PATCH /notifications/preferences`

### P3 — Cleanup
- [ ] Replace `@rneui/base`/`@rneui/themed` with RN primitives or a maintained lib
- [ ] Standardise on `@expo/vector-icons`, remove `react-native-vector-icons`
- [ ] Rename `useFaceVerificationApi` → `faceVerificationApi`
- [ ] Remove `src/contexts/authsContext.js`
- [ ] Move API base URL to `.env`
- [ ] Remove or repurpose `EnterNINScreen`
- [ ] Consider migrating `@react-navigation/stack` → `@react-navigation/native-stack`
