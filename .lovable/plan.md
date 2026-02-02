

# Trip Cost Calculator for PolicyMarket - Implementation Plan

## Overview
A Serbian-language trip cost calculator ("Koliko Košta Putovanje") that estimates travel expenses for 6 popular destinations. The tool positions travel insurance as a natural, low-cost line item while providing genuine value to travelers planning their trips.

---

## Pages to Build (7 Total)

### 1. Main Calculator Page (`/koliko-kosta-putovanje`)
- Generic calculator with no destination pre-selected
- Clean hero section with title "Koliko košta tvoje putovanje?"
- Form with 4 inputs: Destination dropdown, Days slider (3-21), Travelers dropdown (1-6), Travel style radio buttons

### 2-7. Destination-Specific Pages
Each destination page shares the same calculator component but with:
- Destination pre-selected and results auto-displayed
- Unique SEO meta tags for that destination
- URLs: `/koliko-kosta-putovanje-u-grcku`, `/koliko-kosta-putovanje-u-tursku`, `/koliko-kosta-putovanje-u-egipat`, `/koliko-kosta-putovanje-u-spaniju`, `/koliko-kosta-putovanje-u-italiju`, `/koliko-kosta-putovanje-u-crnu-goru`

---

## Calculator Features

### Input Form
- **Destinacija (Destination)**: Dropdown with 6 options - Grčka, Turska, Egipat, Španija, Italija, Crna Gora
- **Broj dana (Days)**: Smooth slider from 3-21 days with step of 1, default 7
- **Putnika (Travelers)**: Dropdown 1-6 people, default 2
- **Stil putovanja (Travel style)**: Radio buttons - Budget, Mid-range, Komfor, default Mid-range
- **Izračunaj button**: Green primary CTA button

### Results Display with Animation
When user clicks "Izračunaj", costs appear one-by-one with a running total:
1. ✈ Letovi (Flights) - appears first
2. 🏠 Smeštaj (Accommodation) - appears second
3. 🍽 Hrana (Food) - appears third
4. 🚌 Prevoz (Local transport) - appears fourth
5. 📱 SIM / Internet - appears fifth (hidden if 0 for EU countries)
6. 🏥 Putno osiguranje (Insurance) - appears last, shown as "od X din/osoba"

The total animates up as each category appears, completing in 3-4 seconds.

### Miško Quote Boxes
Two styled callout cards featuring the uploaded Miško avatar:
1. **Cost context quote**: "Osiguranje je manje od 1% ukupnog troška — a pokriva medicinske račune do €30,000."
2. **Destination-specific tip**: Unique message per destination (e.g., for Greece: "U Grčkoj, poseta lekaru bez osiguranja košta €80-300. Sa osiguranjem: 0 din.")

### Call-to-Action
- Primary CTA: "Uporedi putno osiguranje za [Destination] →" linking to PolicyMarket comparison page
- Email capture: Simple form with "📧 Pošalji sebi detaljan plan" - collects email + destination (UI only, no backend integration)

---

## Calculation Logic (No Backend Required)
All calculations run client-side using a JSON data file:
- Flights: cost per person × travelers (flat, doesn't scale with duration)
- Accommodation: cost per night × (days-1) × rooms (rooms = ceiling of travelers/2)
- Food: cost per day × days × travelers
- Local transport: cost per day × days (shared, not multiplied by travelers)
- SIM/Data: flat rate per trip
- Insurance: Display only ("od X din/osoba"), not included in total

Each cost shows the midpoint of the range with "~" prefix (e.g., "~40,000 din").

---

## Visual Design (Matching PolicyMarket Reference)
- **Color palette**: Dark navy backgrounds, white text, green accent color for CTAs
- **Typography**: Clean, modern sans-serif matching PolicyMarket's site
- **Cards**: Light background callout boxes for Miško quotes
- **Buttons**: Green "Uporedi" style for primary actions
- **Icons**: Emoji icons for each cost category (✈, 🏠, 🍽, 🚌, 📱, 🏥)
- **Avatar**: Miško (the schnauzer in business attire) at ~48-64px desktop, ~40px mobile
- **Footer**: Dark footer matching PolicyMarket's style with contact info

---

## Mobile & Desktop Experience
- Fully responsive design with equal priority for mobile and desktop
- Mobile: Single-column layout, touch-friendly slider and radio buttons, large tap targets
- Desktop: Wider layout without feeling sparse
- Standard 768px breakpoint
- Respects `prefers-reduced-motion` for the animation

---

## SEO Implementation
Each page includes:
- Unique `<title>` and `<meta description>` in Serbian
- Proper heading hierarchy
- Destination-specific canonical URLs
- UTM parameters on all outbound links to PolicyMarket comparison pages

---

## What's Included in This Build
✅ All 7 pages with routing
✅ Full calculator with all 6 destinations
✅ Animated results reveal with running total
✅ Miško avatar integration
✅ Simple email capture form UI (no backend/MailerLite)
✅ Responsive design matching PolicyMarket's style
✅ SEO meta tags for all pages
✅ Cost data in maintainable JSON format

## What's NOT Included (Per PRD Scope)
❌ MailerLite/email integration backend
❌ GA4 custom event tracking
❌ FAQ schema markup
❌ User accounts or saved trips
❌ Real-time price APIs

