# Carpool App — AI Feature Opportunities

**Created:** 2026-03-06

This document maps out where AI can meaningfully improve the carpool app — both user-facing features and backend intelligence. Grouped by what can realistically be built now vs later.

---

## 1. Natural Language Ride Search

**What it does:**
Instead of filling separate "Leaving from" and "Going to" fields, a user types or speaks naturally:
> *"I need a ride from Ikeja to Victoria Island tomorrow morning around 8"*

The AI parses this into structured query params (`origin`, `destination`, `date`, `time`, `seats`) and fills the search form automatically.

**Where it fits:** Home screen → `RideSearchForm`
**How to build:**
- Send the user's raw text to Claude API with a system prompt defining the extraction schema
- Claude returns structured JSON: `{ origin, destination, date, time, seats }`
- Pre-fill the form fields with the result, let the user confirm before searching

**Backend changes:** None — the existing `GET /rides` already accepts these params.
**Value:** Dramatically lowers friction, especially useful in a market where many users prefer voice/chat-style interaction over form filling.

---

## 2. Ride Matching by Route Proximity (Smart Search)

**What it does:**
The current backend does exact text matching on `origin` and `destination`. AI-powered matching finds rides even when the user's text doesn't match exactly — e.g. "Oshodi" matches a ride listed as "Oshodi Bus Stop" or "Oshodi Overbridge", or a ride from "Ikorodu" to "CMS" also shows up for a search from "Ikorodu" to "Marina".

**Where it fits:** Backend — `GET /rides` search logic
**How to build:**
- Option A (simpler): Use text embedding similarity (e.g. OpenAI embeddings or a local model) to match location strings, store embeddings on ride creation
- Option B (cheaper): Feed the search query + nearby ride list to Claude: *"Which of these rides is a reasonable match for a passenger going from X to Y?"* and return a ranked shortlist
- Option C (no AI): Integrate with a geocoding API (Google Maps / Mapbox) to convert locations to coordinates and do radius-based matching — this is the production-ready version

**Backend changes:** New matching logic in `RidesService.findAvailable()`
**Value:** Core to the product working in a real Nigerian city where location names are inconsistent.

---

## 3. In-App Support Chatbot

**What it does:**
A chat interface (accessible from Profile → Support) where users ask questions and an AI assistant responds:
- "How do I cancel a booking?"
- "My driver hasn't started the ride, what do I do?"
- "When will my withdrawal be processed?"
- "How does verification work?"

For complex or account-specific issues (e.g. "I was charged but my booking failed"), it escalates to a human or creates a support ticket.

**Where it fits:** Profile → Support (currently a `onPress={() => {}}` stub)
**How to build:**
- Backend: New `POST /support/chat` endpoint — takes `{ message, conversationHistory }`, calls Claude API with a system prompt describing the app's rules, policies, and FAQ, returns the response
- Mobile: `SupportChatScreen` with a chat UI (reuses `ChatBubble` + `ChatInput` from Phase 12 component library)
- System prompt includes: refund policy, booking rules, verification requirements, common error resolutions

**Backend changes:** New `support` module with a single chat endpoint.
**Value:** Reduces support overhead massively. Most user questions are repetitive and answerable by AI.

---

## 4. Driver Price Suggestion

**What it does:**
When a driver is creating a ride offer, instead of guessing the price per seat, they get an AI-suggested price:
> *"Based on this route (Ikeja → VI, ~24 km), current demand, and similar recent rides, we suggest ₦1,200–₦1,500 per seat."*

**Where it fits:** Offer Ride screen → `AmountInput` for price per seat
**How to build:**
- Backend: New `GET /rides/price-suggestion?origin=&destination=&date=` endpoint
- Logic: Query recent completed rides on the same/similar route, compute median price, optionally factor in time-of-day or day-of-week patterns
- AI layer (optional enhancement): Pass the route + historical data to Claude to generate a human-readable explanation alongside the number
- Mobile: Show a suggested range below the price input with a "Use suggested price" tap

**Backend changes:** New query in `RidesService` + new endpoint.
**Value:** Helps new drivers price competitively. Reduces both overpricing (no bookings) and underpricing (lost earnings).

---

## 5. Automated Safety & Fraud Flags

**What it does:**
The backend silently monitors for suspicious patterns and flags them for admin review:
- A new account that immediately tries to offer 10 rides in 24 hours
- A user whose withdrawal bank account name doesn't match their profile name
- A driver who repeatedly accepts bookings and then cancels before starting
- Sudden surge of the same IP registering multiple accounts

**Where it fits:** Backend — event-driven hooks in existing services (rides, wallet, auth)
**How to build:**
- After each mutating action (create ride, request withdrawal, create booking), emit an event to a lightweight rules engine
- For complex pattern detection, periodically batch-send activity summaries to Claude with a prompt: *"Review this user's activity for the past 7 days. Flag anything that looks like abuse or fraud."*
- Flagged events create `AdminNote` records (the model already exists) with `noteType: GENERAL` and a `referenceId` to the suspicious action
- Admin dashboard already has the Notes UI to surface these

**Backend changes:** New `FraudDetectionService` that hooks into existing audit log events.
**Value:** Protects the platform without manual admin monitoring.

---

## 6. KYC Document Assist (NIN Validation Hints)

**What it does:**
During `PersonalInfoScreen`, before the user submits their NIN, AI pre-checks the form data for common mistakes:
- NIN is wrong length or contains letters
- Date of birth seems inconsistent with the name (e.g. age < 18)
- Name fields are likely swapped (surname in first name field)

Provides inline hints: *"Your NIN should be 11 digits — you entered 10."* or *"Double-check: is 'Okafor' your surname or first name?"*

**Where it fits:** `PersonalInfoScreen` — pre-submission validation layer
**How to build:**
- Client-side: Rule-based checks for format errors (no AI needed)
- AI layer: If data passes format rules but the NIN verification API returns an error, send the error message to Claude to generate a plain-English explanation of what likely went wrong and what the user should do
- Backend: Enhance the NIN verification error response to include a `hint` field generated by Claude

**Backend changes:** Wrap the NIN verification provider response in `KycService.verifyNIN()` to generate a user-friendly hint on failure.
**Value:** Reduces KYC drop-off significantly — NIN errors are currently cryptic provider messages.

---

## 7. Ride Review / Rating Summary (Driver Profiles)

**What it does:**
Once ratings are implemented, rather than showing a raw list of 40 text reviews on a driver's profile, AI generates a 2-sentence summary:
> *"Passengers consistently praise this driver for punctuality and a clean car. A few noted that the route sometimes takes longer than expected."*

**Where it fits:** Driver profile section inside `RideDetail` screen
**How to build:**
- Backend: `GET /users/:id/review-summary` endpoint — fetches all reviews for that driver, sends them to Claude with a summarisation prompt, caches the result (regenerate weekly or when new reviews come in)
- Mobile: Show the summary paragraph below the star rating in `DriverInfo` component

**Backend changes:** New `reviews` table + `ReviewsService` + summary endpoint. Requires ratings to be built first.
**Value:** Makes driver profiles feel richer and more trustworthy at a glance.

---

## 8. Smart Notifications (Predicted Ride Demand)

**What it does:**
Proactively notify users before they need a ride:
- *"Good morning! Rides from Ikeja to VI are filling up fast for 8 AM — book now."*
- *"You usually ride on Friday evenings. 3 rides match your typical route — see them now."*

**Where it fits:** Backend scheduled job + push notification system (Phase 4)
**How to build:**
- Backend: `@nestjs/schedule` cron job that analyses booking history per user, identifies patterns (day of week, time of day, common routes)
- Use Claude to generate personalised notification copy given the user's pattern + available rides: *"Write a friendly push notification for a user who usually rides from X to Y on Friday evenings. There are 2 available rides for tomorrow."*
- Sends via existing `NotificationsService`

**Backend changes:** New `InsightsService` + cron job. Low complexity.
**Value:** Increases engagement and DAU without requiring users to open the app first.

---

## 9. Chat Moderation (Messages Feature)

**What it does:**
When the chat feature (Phase 12) is live, AI scans messages for:
- Attempts to take payment off-platform ("send me money on Opay")
- Harassment or abusive language
- Phone number / contact sharing (which bypasses the platform)

Flagged messages are either blocked with a warning or sent to admin review.

**Where it fits:** `ms-server` (the chat microservice) — message processing pipeline
**How to build:**
- Before persisting a message, send it to a moderation endpoint (Claude with a safety-focused prompt, or a dedicated moderation model)
- If flagged: block the message, send a warning to the sender, log the incident to `audit_logs`
- Repeat offenders get flagged for admin action

**Backend changes:** In `ms-server`, not the monolith. Webhook or middleware on message save.
**Value:** Protects users and keeps transactions on-platform (protecting revenue).

---

## 10. Personalised Onboarding Flow

**What it does:**
After a new user signs up and verifies their email, a short conversational onboarding asks:
> *"Are you looking to find rides, offer rides, or both?"*
> *"What area do you usually travel from?"*

The AI uses the answers to pre-configure the home screen experience (defaulting to the relevant tab), send a targeted first notification, and optionally pre-populate search defaults.

**Where it fits:** Post-signup flow — new `OnboardingScreen` between `VerifyAccount` and `HomeScreen`
**How to build:**
- 2–3 step in-app questionnaire (no AI needed for the questions themselves)
- Store preferences in user profile via `PATCH /users/me` (requires adding a `preferences` JSON field to the User entity)
- Use Claude to generate the first personalised push: *"Welcome, [name]! Based on your route, here are 3 rides available near you."*

**Backend changes:** Add `preferences` column to `users` table.
**Value:** Reduces first-session drop-off by making the app feel immediately relevant.

---

## Summary Table

| # | Feature | Where | Effort | Value |
|---|---------|-------|--------|-------|
| 1 | Natural language ride search | Mobile — Home screen | Low | High |
| 2 | Route proximity matching | Backend — search | Medium | Critical |
| 3 | Support chatbot | Backend + Mobile — new screen | Medium | High |
| 4 | Driver price suggestion | Backend + Mobile — Offer form | Low | Medium |
| 5 | Fraud / safety flags | Backend — background service | Medium | High |
| 6 | KYC error hints | Backend — KYC service | Low | High |
| 7 | Review summarisation | Backend — new endpoint | Low | Medium |
| 8 | Smart push notifications | Backend — cron job | Medium | Medium |
| 9 | Chat moderation | ms-server | Medium | High |
| 10 | Personalised onboarding | Mobile — new screen | Low | Medium |

---

## Where These Fit in the Implementation Phases

> Phase numbers reference `IMPLEMENTATION_PHASES.md`. Auth is already complete. Phases 1–4 are next.

| AI Feature | Earliest it can be built | Status |
|------------|--------------------------|--------|
| Feature 6 (KYC hints) | Phase 9 — wired inside `KycService.verifyNIN()` + `FaceCaptureScreen` | Unblocked — NIN + face screens already exist |
| Feature 1 (NL search) | Phase 5 — inside `RideSearchForm` (screen exists, needs wiring) | Unblocked after Phase 2 API hooks |
| Feature 4 (Price suggestion) | Phase 6 — new backend endpoint + `AmountInput` in OfferRide | Needs Phase 6 form to be complete first |
| Feature 3 (Support chatbot) | Phase 10 — Profile → Support stub screen | Needs Phase 10 profile work first |
| Feature 2 (Route matching) | Phase 5 or standalone backend improvement | Backend-only — can ship independently |
| Feature 5 (Fraud flags) | After Phases 5–8 — rides + wallet data needs to exist | Backend-only — add `FraudDetectionService` after core loop is live |
| Feature 8 (Smart notifications) | Phase 11 — push tokens registered (Phase 4) + ride history exists (Phase 7+) | Add alongside Phase 11 notification deep links |
| Feature 10 (Onboarding) | Between Phase 4 and Phase 5 — after auth stable, before home screen | Small addition: questionnaire + `PATCH /users/me` preferences field |
| Feature 7 (Review summary) | After a ratings system is built — not yet planned | Blocked — no ratings model |
| Feature 9 (Chat moderation) | Phase 12 — inside `ms-server` message pipeline | Blocked until ms-server audit (Phase 12a) |

---

## Recommended Quick Wins (Build First)

These have the highest value-to-effort ratio and are immediately unblocked:

1. **Feature 6 — KYC error hints** — `PersonalInfoScreen` and `FaceCaptureScreen` already exist. One Claude API call inside `KycService.verifyNIN()` wrapping the provider error. Can be added right now during Phase 9, or even before — it's isolated.
2. **Feature 1 — Natural language search** — `RideSearchForm` already exists. One Claude call on the frontend parses the user's text into form fields. No backend changes. Build during Phase 5 when the form is being wired up.
3. **Feature 4 — Price suggestion** — One new backend endpoint in the rides module + one Claude call for the explanation copy. Build during Phase 6 when the OfferRide form is being completed.
