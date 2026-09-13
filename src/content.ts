export const event = {
  name: "SYNORA",
  edition: "PITSTOP 01",
  tagline: "From Ideas to Innovation",
  date: "17—18 September 2026",
  shortDate: "SEP 17—18, 2026",
  venue: "SRM University-AP",
  price: 329,
  prizePool: "₹30,000",
  workshopStart: "11:00 AM",
  hackathonStart: "05:00 PM",
  hackathonFinish: "05:00 AM",
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
    title: "Start from the basics at 11 AM.",
    body: "Four hours of beginner-friendly workshops cover hackathon essentials, ideation, tools, and teamwork. Sessions run 11 AM–1 PM and 2–4 PM. OD will be provided.",
    link: "#schedule",
    linkLabel: "Explore the schedule",
  },
  {
    id: "build-your-way",
    tag: "BUILD YOUR WAY",
    title: "Your problem. Your solution.",
    body: "Choose your own problem statement in one of seven domains. Every team receives one complimentary domain for its project website, valid for one year. Food is provided.",
    link: "#tracks",
    linkLabel: "Explore the domains",
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
    note: "17 September · Four hours of beginner-friendly learning. Rooms and the detailed workshop agenda will be announced.",
    entries: [
      {
        time: "11:00 AM",
        end: "— 01:00 PM",
        title: "Session 01 / Start with the basics",
        description:
          "Learn how a hackathon works and how to turn a real problem into a clear project idea. No prior hackathon experience is needed.",
      },
      {
        time: "02:00 PM",
        end: "— 04:00 PM",
        title: "Session 02 / Tools, teams, and the build",
        description:
          "Work through the essential tools and teamwork basics, shape your own problem statement, and get ready to build.",
      },
    ],
  },
  hackathon: {
    label: "Hackathon",
    note: "17 September, 5 PM to 18 September, 5 AM · 12 hours to build. Check-in, submission, and judging details will be announced.",
    entries: [
      {
        time: "05:00 PM",
        end: "17 SEP / START",
        title: "Lights out. Start building.",
        description:
          "The 12-hour hackathon begins. Choose your own problem statement and build a solution with your team and mentor support.",
      },
      {
        time: "OVERNIGHT",
        end: "FOOD PROVIDED",
        title: "Build, test, and take a pit stop.",
        description:
          "Keep iterating with your team. Food is provided; meal timing and service details will be shared by the organizers.",
      },
      {
        time: "05:00 AM",
        end: "18 SEP / FINISH",
        title: "Cross the finish line.",
        description:
          "The 12-hour build window ends. Submission instructions and the judging schedule will be shared before the event.",
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

export const domains = [
  { id: "01", name: "Python", category: "SOFTWARE" },
  { id: "02", name: "Machine Learning", category: "INTELLIGENCE" },
  { id: "03", name: "Data Science", category: "DATA" },
  { id: "04", name: "Blockchain", category: "WEB3" },
  { id: "05", name: "Generative AI", category: "CREATIVE TECH" },
  { id: "06", name: "Embedded Systems", category: "HARDWARE" },
  { id: "07", name: "DevOps", category: "INFRASTRUCTURE" },
] as const;

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
    title: "Can we choose our own problem statement?",
    text: "Yes. Teams choose their own problem statement within any listed domain: Python, Machine Learning, Data Science, Blockchain, Generative AI, Embedded Systems, or DevOps. The organizers will announce the submission format and judging criteria before the event.",
  },
  {
    title: "What is included for each team?",
    text: "Food is provided during the event. Each team also receives one complimentary domain for its project website, valid for one year. The organizers will share the domain-claim process and hosting guidance.",
  },
  {
    title: "Where are the full competition policies?",
    text: "The organizer’s complete rulebook is still to be published. It will cover conduct, originality, use of AI and existing code, intellectual property, attendance, and any disqualification or refund conditions.",
  },
];

export const faqs = [
  {
    title: "Is this a good first hackathon?",
    text: "Yes. The four-hour workshop starts at 11 AM and teaches the essentials from the basics. You will learn how hackathons work, develop an idea, use the tools, and build with a team. More than 30 mentors will be there to help.",
  },
  {
    title: "Where and when is SYNORA?",
    text: "SYNORA takes place at SRM University-AP on 17–18 September 2026. Workshops start at 11 AM on the 17th, and the 12-hour hackathon runs from 5 PM to 5 AM. Specific rooms, check-in, and judging times will be announced.",
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
    text: "The event runs from 11 AM on 17 September to 5 AM on 18 September. It includes four hours of workshops (11 AM–1 PM and 2–4 PM) and a 12-hour hackathon (5 PM–5 AM), with breaks between sessions.",
  },
  {
    title: "Is food provided? What about accommodation?",
    text: "Food is provided. Meal details, an equipment checklist, and any accommodation arrangements have not yet been published; check Race Control and the registration page for updates.",
  },
  {
    title: "How does the free domain work?",
    text: "Each team receives one complimentary domain for its project website, valid for one year. The organizers will explain how to claim it and connect it to a hosted site. Domain registration does not itself include website hosting unless the organizers confirm it.",
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
