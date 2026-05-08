# 4 PLAY · Design Fidelity Audit

This is the gate that blocks Step 17 submission. Every row must reach
**pass** before the app goes to Apple / Google review. Capture the
mobile screenshots in **iPhone 15 Pro simulator (393×852)** and the
web shots at 1280×800, 768×1024, 375×812.

## How to capture

```bash
pnpm -F @4play/mobile dev          # then press `i` for iOS
pnpm -F @4play/web dev              # http://localhost:3000
open design/index.html              # reference mockups, side by side
```

Drop screenshots in `docs/audit/<screen>/` and update the table below.

## Mobile screens

| # | Screen | Mockup ref | Mobile route | Reference (`design/`) | Real | Status | Notes |
|---|--------|-----------|--------------|----------------------|------|--------|-------|
| 1 | Onboarding | screen 01 | `/(auth)/onboarding` | `design/screens.jsx#ScreenOnboarding` | ⏳ | pending | court lines, lime CTA, tracking |
| 2 | Login | aux | `/(auth)/login` | inferred | ⏳ | pending | reuses field tokens |
| 3 | Register | aux | `/(auth)/register` | inferred | ⏳ | pending |
| 4 | Profile setup wizard | aux | `/(auth)/profile-setup` | aux | ⏳ | pending | 3 pasos |
| 5 | Home greeting | aux | `/(tabs)/index` | aux | ⏳ | pending |
| 6 | Swipe deck | screen 02 | `/(tabs)/swipe` | `ScreenSwipe` | ⏳ | pending | level pill, dist pill, action row |
| 7 | Profile (own) | screen 03 | `/(tabs)/profile` | `ScreenProfile` | ⏳ | pending | photo header, stat strip |
| 8 | Profile (other) | aux | `/profile/[userId]` | aux | ⏳ | pending |
| 9 | Bookings list | screen 04 | `/(tabs)/calendar` | `ScreenBook` | ⏳ | pending | mini-map mock |
| 10 | Venue detail | aux | `/venue/[venueId]` | aux | ⏳ | pending |
| 11 | New booking | aux | `/booking/new` | aux | ⏳ | pending |
| 12 | Booking checkout | aux | `/booking/[id]/checkout` | aux | ⏳ | pending |
| 13 | Chats list | screen 05 (variant) | `/(tabs)/chat` | aux | ⏳ | pending |
| 14 | Chat detail | screen 05 | `/chat/[conversationId]` | `ScreenChat` | ⏳ | pending | bubble shapes, status pill |
| 15 | Match modal | screen 02 overlay | (overlay) | aux | ⏳ | pending | hero italic lime |
| 16 | Filters modal | aux | `/(modals)/filters` | aux | ⏳ | pending |
| 17 | Settings modal | aux | `/(modals)/settings` | aux | ⏳ | pending | rows + logout coral |
| 18 | Report modal | aux | `/(modals)/report` | aux | ⏳ | pending |
| 19 | Paywall | screen 06 | `/paywall` | `ScreenPaywall` | ⏳ | pending | ink bg, lime glow, benefits |

## Web screens

| # | Screen | Route | Reference | Real | Status |
|---|--------|-------|-----------|------|--------|
| 1 | Landing 1280×800 | `/` | `design/landing.jsx` | ⏳ | pending |
| 2 | Landing 768×1024 | `/` | collapsed grids | ⏳ | pending |
| 3 | Landing 375×812 | `/` | mobile breakpoint | ⏳ | pending |
| 4 | Auth · login | `/auth/login` | aux | ⏳ | pending |
| 5 | Auth · register | `/auth/register` | aux | ⏳ | pending |
| 6 | Subscription checkout | `/checkout/subscription` | mirrors paywall | ⏳ | pending |
| 7 | Booking checkout | `/checkout/booking/[id]` | aux | ⏳ | pending |
| 8 | Checkout success | `/checkout/success` | aux | ⏳ | pending |
| 9 | Legal · terms | `/legal/terms` | aux | ⏳ | pending |
| 10 | Legal · privacy | `/legal/privacy` | aux | ⏳ | pending |
| 11 | Dev · design check | `/dev/design-check` | mirrors design canvas | ⏳ | pending |

## Brand & system

| Item | Status | Notes |
|------|--------|-------|
| App icon (iOS home screen) | ⏳ | rendered from `assets/images/icon.png` |
| App icon (Android adaptive) | ⏳ | foreground/background/monochrome triplet |
| Splash screen | ⏳ | court bg + LogoMark center |
| Favicon (web) | ⏳ | 32×32 + 64×64 |
| Status bar contrast | ⏳ | dark on cream, light on court/ink |
| Tab bar | ⏳ | matches `BottomNav` component, court pill |

## Steps after audit

1. Mark every row `pass`. If any are `delta`, attach a screenshot pair and
   open a fix issue.
2. Re-run `pnpm -r typecheck && pnpm -r lint`.
3. `eas build --profile production` for both platforms.
4. Step 17 submission.
