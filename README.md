# SYNORA — Pitstop 01

An F1-inspired, animated event website for SYNORA at SRM University-AP, 17–18 September 2026. It includes event details, seven project domains, announcements, a tabbed schedule, team grid, rules, FAQs, resources, and registration through the organizer-provided Easebuzz form.

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

The confirmed schedule is four hours of beginner-friendly workshops starting at 11 AM (11 AM–1 PM and 2–4 PM), followed by a 12-hour hackathon from 5 PM on 17 September to 5 AM on 18 September. Teams choose their own problem statement in Python, Machine Learning, Data Science, Blockchain, Generative AI, Embedded Systems, or DevOps. Food is provided. Each team gets one complimentary domain for its project website, valid for one year. The organizers still need to confirm room and check-in details, judging and submission procedures, the full rulebook, meal arrangements, and the domain-claim process. The supplied posters are included as event resources.

The linked registration form asks for a team name and first-year student details and offers an optional senior-student field. Keep the website's eligibility copy in sync if the organizer changes that form.

## Design and accessibility

The site uses React, Vite, Motion, Lucide, and locally hosted fonts. Scroll progress, track reveals, and schedule transitions respect reduced-motion preferences; touch layouts avoid hover-only interactions and account for iPhone safe areas. The race-car artwork was generated for this project; the event posters were supplied by the organizer. React Bits–inspired elements and a 3D card treatment were adapted to the site rather than copied as a full template. This is a motorsport-inspired event design, not an official Formula 1 website.
