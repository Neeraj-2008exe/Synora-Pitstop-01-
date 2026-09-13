# SYNORA — Pitstop 01

An F1-inspired, animated event website for SYNORA at SRM University-AP, 17–18 September 2026. It includes event details, announcements, a tabbed schedule, team grid, rules, FAQs, resources, and registration through the organizer-provided Easebuzz form.

## Run locally

Requires Node.js 20.19+.

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Release checks

```bash
npm run build
npm test
npm run audit:runtime
```

Deploy the repository to Vercel as a Vite project. `vercel.json` sets the build output and security headers. Confirm the headers on the deployed domain, and test the external registration flow in a normal browser before announcing the site.

## Update event information

Edit `src/content.ts` for announcements, schedule entries, FAQs, rules, and the registration URL. Add teams to the public `teams` array only after organizer approval and each team's opt-in; never include names, emails, phone numbers, or payment data. The website itself does not handle registration or payments.

Some event details are deliberately marked as **to be announced** because the supplied posters do not confirm the workshop date/room, exact hackathon timetable, problem statements, judging criteria, full rulebook, or attendance conditions. Replace these only with confirmed organizer information. The supplied posters are included as event resources.

The linked registration form asks for a team name and first-year student details and offers an optional senior-student field. Keep the website's eligibility copy in sync if the organizer changes that form.

## Design and accessibility

The site uses React, Vite, Motion, Lucide, and locally hosted fonts. Motion respects reduced-motion preferences. The race-car artwork was generated for this project; the event posters were supplied by the organizer. React Bits–inspired elements and a 3D card treatment were adapted to the site rather than copied as a full template. This is a motorsport-inspired event design, not an official Formula 1 website.
