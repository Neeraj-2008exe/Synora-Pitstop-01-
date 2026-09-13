export const event = {
  name: "SYNORA",
  edition: "PITSTOP 01",
  tagline: "From Ideas to Innovation",
  date: "17—18 September 2026",
  shortDate: "SEP 17—18, 2026",
  venue: "SRM University-AP",
  price: 329,
  prizePool: "₹30,000",
  registrationUrl:
    "https://forms.easebuzz.in/register/SRMAPIA9oJ/synora-registration", // Final URL supplied by the organizers.
  registrationOpen: true,
  contacts: [] as { label: string; url: string }[],
  // No countdown until an exact, organizer-approved start timestamp exists.
};

export const announcements = [
  {
    id: "first-grid",
    tag: "REGISTRATION",
    title: "Your first hackathon starts here.",
    body: "Join SYNORA for ₹329 per person. Bring your curiosity; we’ll bring the workshops, mentors, and a whole new crew.",
    link: "#register",
    linkLabel: "Get your paddock pass",
  },
  {
    id: "workshops",
    tag: "WORKSHOPS",
    title: "Four hours. A head start.",
    body: "Learn about hackathons, ideation, tools and teamwork. Sessions run 11 AM–1 PM and 2–4 PM. OD will be provided.",
    link: "#schedule",
    linkLabel: "Explore the schedule",
  },
  {
    id: "night",
    tag: "AFTER DARK",
    title: "The energy stays up after 11 PM.",
    body: "Jamming, dance performances, games, movies, confession nights, and open-mic sessions. Same people. A different kind of energy.",
    link: "#after-dark",
    linkLabel: "See what’s after dark",
  },
];

export const schedules = {
  workshops: {
    label: "Workshops",
    note: "Workshop session times are confirmed in the event poster. The workshop date and room will be announced here.",
    entries: [
      {
        time: "11:00 AM",
        end: "— 01:00 PM",
        title: "Session 01 / Find your racing line",
        description:
          "Hackathon fundamentals, ideation, tools, and teamwork with guidance from industry experts.",
      },
      {
        time: "02:00 PM",
        end: "— 04:00 PM",
        title: "Session 02 / Ready for the grid",
        description:
          "Continue learning, explore your ideas and get ready to build with your team.",
      },
    ],
  },
  hackathon: {
    label: "Hackathon",
    note: "September 17–18 · 12 hours of hacking. Exact check-in, start, submission and judging times will be announced.",
    entries: [
      {
        time: "PITSTOP 01",
        end: "TIME TBA",
        title: "Check-in & race briefing",
        description:
          "Get the event briefing, team guidance, and problem-statement details from the organizers.",
      },
      {
        time: "12 HOURS",
        end: "START TIME TBA",
        title: "Code. Innovate. Compete.",
        description:
          "Build a functional project with your crew, supported by seniors and mentors throughout the hackathon.",
      },
      {
        time: "THE FINISH",
        end: "TIME TBA",
        title: "Showcase & judging",
        description:
          "Present what you built. Submission instructions and judging criteria will be published before the event.",
      },
    ],
  },
  afterDark: {
    label: "After Dark",
    note: "During the SYNORA hackathon · after 11 PM. Activity slots and venue details will be announced.",
    entries: [
      {
        time: "11:00 PM+",
        end: "AFTER DARK",
        title: "Take a pit stop. Make a memory.",
        description:
          "Jamming sessions, dance performances, confession nights, games, movies, and open-mic sessions.",
      },
    ],
  },
};

export type Team = {
  id: string;
  name: string;
  track?: string;
  status: "Registered" | "Confirmed";
};
// This file is public. Add only organizer-approved, opt-in teams; never include personal contact data.
export const teams: Team[] = [];

export const rules = [
  {
    title: "Who can join?",
    text: "SYNORA is designed for first-year students and first-time participants. The registration form asks for first-year student details for core team members and offers an optional senior student. Check the form for the latest eligibility requirements before paying.",
  },
  {
    title: "How big can a team be?",
    text: "Teams have 3–5 members. Your team may include one senior mentor, who counts within the total of 3–5 members.",
  },
  {
    title: "What does registration cost?",
    text: "Registration is ₹329 per person, as advertised in the event posters. Review the final amount, any applicable fees, and payment terms on the registration page before paying.",
  },
  {
    title: "What are the submission and judging rules?",
    text: "The organizers will announce the final problem statements, judging criteria, submission deadline, and required deliverables. We’ll add them to Race Control and the resources section when released.",
  },
  {
    title: "Where are the full competition policies?",
    text: "The organizer’s complete rulebook is still to be published. It will cover conduct, originality, use of AI and existing code, intellectual property, attendance, and any disqualification or refund conditions.",
  },
];

export const faqs = [
  {
    title: "Is this a good first hackathon?",
    text: "Yes. SYNORA is designed with first-time participants in mind. Four hours of workshops and 30+ mentors will help you learn the process, meet people, and start building.",
  },
  {
    title: "Where and when is SYNORA?",
    text: "SYNORA takes place at SRM University-AP on September 17–18, 2026. Specific rooms, check-in time, and the full event timetable will be announced.",
  },
  {
    title: "Do I need a team before I register?",
    text: "The published team size is 3–5 members, and the registration form requests a team name and member details. Arrange your team before completing the form; ask the organizers if you need help finding teammates.",
  },
  {
    title: "Will OD be provided for the workshops?",
    text: "Yes. The workshop poster states that on-duty attendance (OD) will be provided. The organizers will share the attendance process and any eligibility conditions.",
  },
  {
    title: "How long is the event?",
    text: "SYNORA is advertised as an 18-hour technology experience, including a 12-hour hackathon and four hours of workshops. The detailed timetable for the remaining activities will be announced.",
  },
  {
    title: "What should I bring? Are food and accommodation included?",
    text: "The organizers have not yet published an equipment checklist or details about food and accommodation. Check Race Control and the registration page for confirmed information before attending.",
  },
  {
    title: "Where do I find payment help or refund terms?",
    text: "Payments and registration are handled by the external registration provider. Review its terms and use the organizer/support contact shown there. This website does not collect payment details.",
  },
];

export const resources = [
  {
    title: "Event overview",
    meta: "THE OFFICIAL EVENT POSTER",
    url: "/assets/synora-event-poster.png",
  },
  {
    title: "Workshop briefing",
    meta: "SESSIONS, TIMINGS & OD",
    url: "/assets/synora-workshop-poster.png",
  },
  {
    title: "After Dark guide",
    meta: "THE OTHER SIDE OF SYNORA",
    url: "/assets/synora-after-dark-poster.png",
  },
];
