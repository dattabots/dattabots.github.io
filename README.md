# WK Legal site v1.6 (static HTML/CSS/JS)

Design: concept 15 v2 "Blue Lattice" from the WLK > Website concepts Drive folder: midnight/cobalt/azure blues, animated dot-lattice (halftone) pattern, Fraunces + Plus Jakarta Sans + JetBrains Mono, glass stats bar, bento practice grid, lender strip, attorney cards with real headshots from wlklegal.com (assets/team). The home page reuses the concept's markup and CSS with factual corrections (firm phone, 7 attorneys). The portal uses the same tokens (midnight dotted sidebar, light cards, gradient pill buttons). Images and credits: Wikimedia Commons, see `assets/IMAGE_CREDITS.md`.
Firm content (practice areas, attorney bios, contact, hours) is summarized from wlklegal.com. Placeholders are marked in brackets (e.g. headshots, Jacqueline Newmark's education/bar admission).

## Structure
- `index.html`, `practice.html`, `attorneys.html`, `contact.html`: public site
- `login.html`: sign-in page
- `portal/index.html`: logged-in portal (single page, hash routes: `#dashboard #matters #intake #prospects #calendar #docket #documents #social #reviews #reminders #time #bots`)
- `css/site.css`, `css/portal.css`; `js/auth.js` (login gate), `js/portal.js` (portal app)
- `shots/`: desktop (1280) and mobile (390) screenshots

Run locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

## Login: demo gate, NOT real security
The demo credentials are shown on purpose on the home page and login screen (owner request; demo site only).
Username `Marc`. Only a SHA-256 hash of the password is stored in `js/auth.js`. The check runs in the browser and the session is a sessionStorage flag, so anyone with the files can bypass it. Logout clears the session; portal pages redirect to login if you're not signed in. Use real server-side auth before production.

## Scope: administrative bots only (v1.4)
Grok Bots in this portal handle back-office tasks only (search, filing, drafting routine admin messages, recording dates, time drafts). They give no legal advice and make no legal judgments; every output waits for attorney or staff approval in Reviews. All legal work is performed by WK Legal attorneys (also stated in the portal footer).

v1.4 additions (all simulated, sample data): 24/7 chat and email intake widget with an admin-criteria fit score, consult booking and a feed into Prospects; records search across contacts, matter notes, calendar and sample emails, listing name matches for an attorney to clear; "Convert to matter" with a preview once the engagement letter is Signed; Client view preview (uploads, e-sign status, closing milestones, wire-instructions warning); Admin emails (routine status updates to clients, agents and lenders, approved in Reviews); per-matter admin document checklist; flat-fee draft invoices per closing with internal-only time; Playbooks & commands; Reviews audit trail (who approved, when, and what was edited). Real versions need: an email provider (Gmail), e-sign (e.g. DocuSign), a client-portal backend with per-client access controls, and a billing system.

## What's mocked vs. what needs real integrations
A persistent "Confidential · demo data" banner sits at the top of the portal. Sample domains use `.example`.

Review gates (v1.2): social drafts must be approved in Reviews before they can be scheduled (rejected drafts are locked), and every post ends with "Attorney advertising. Not legal advice." Reminder texts and LinkedIn outreach drafts also go through Reviews; nothing is sent. Leads added by hand are labeled "Manual entry". On mobile, Time Capture rows show as cards.

All portal data is **sample data in the browser's localStorage** ("Reset sample data" restores it). Nothing is sent anywhere.
**Real client data needs a real backend with access controls** (auth, per-user permissions, encryption, audit logging, backups) before any of this is used for actual matters.

| Module | Works now (in browser) | Needs a real integration |
|---|---|---|
| Matters / Deals | Pipeline board + table (Inquiry, Conflict check, Engagement, Diligence, Closing, Matter open / Declined), add/edit, notes, and a detail drawer with meetings, reminders and documents | Backend database |
| Intake & Conflict Check | Inquiry form; simple name matching against a small sample client/adverse list flags Clear / Possible / Conflict; on approval the inquiry becomes a Matter | Email intake, party extraction, the firm's real conflicts database. A real check needs attorney review |
| Prospects | Builds a LinkedIn people-search URL (opens a new tab) and saves the search as a queued "Grok Bot task"; leads table; draft prospects go to Reviews first, then to Leads with source = LinkedIn | **LinkedIn**: no scraping or LinkedIn API is used. A bot would need an approved way to research and draft leads |
| Calendar | Week/month views, add meetings, "Add to Google Calendar" link (opens a prefilled event), .ics download | **Google Calendar** OAuth + API for two-way sync. The "Connect" button only changes a state label |
| Reminders | Create reminders (date/time, phone, matter), default days-before and send time, statuses. Everything stays **Queued**; nothing is sent | **Twilio** (or other SMS) through Grok Bot once connected |
| Documents | Client/matter folders, sample attachment list, email-organizer on/off, rules (client name or domain → folder), and a simulated proposed filing that waits for review | **Gmail** API access to read attachments, plus file storage (e.g. Drive) |
| Social | Template-based drafts (LinkedIn default; X and Instagram optional), tone, optional "Attorney advertising. Not legal advice." footer, copy, planned dates, list + calendar view | Platform APIs to publish. "Scheduled" only means planned here |
| Reviews | Approve/reject queue for prospect drafts, proposed filings and social drafts | Bot back end |
| Time Capture | Sample draft time entries from sample emails, calls and meetings (matter, date, 0.1-h duration, description, placeholder rate); edit / approve / reject; weekly totals per matter for approved entries; CSV export | **Gmail** and **Google Calendar** (plus a call log) for real capture. No billing integration; nothing is auto-billed |
| My Bots | Activity log of what each (sample) bot did and when | Real bot event records |
| Date Docketing (**Demo**) | Concept preview: the bot copies admin dates (closings, lender and board scheduling) from sample emails into a list and the calendar for an attorney to confirm, with text reminders that go through Reviews | Email integration; attorneys confirm every date. Not a docketing system |

Not deployed anywhere.
