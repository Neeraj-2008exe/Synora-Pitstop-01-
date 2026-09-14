import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  MapPin,
  Flag,
  Trophy,
  Users,
  Zap,
  Code2,
  Clock3,
  Plus,
  Menu,
  X,
  Download,
  ExternalLink,
  Music2,
  Mic2,
  Gamepad2,
  Clapperboard,
  MessageCircleHeart,
  Sparkles,
  ShieldCheck,
  Search,
  Globe2,
  UtensilsCrossed,
} from "lucide-react";
import { F1Loader } from "./F1Loader";
import {
  event,
  announcements,
  schedules,
  teams,
  rules,
  faqs,
  resources,
  domains,
} from "./content";
import {
  CardContainer,
  CardItem,
  CanvasText,
  CurvedLoop,
  LineSidebar,
  RegistrationLink,
  Reveal,
  Terminal,
  navItems,
  safeExternalUrl,
} from "./components";

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="SYNORA — back to top"
    >
      <span className="brand-stripes" aria-hidden="true">
        ///
      </span>
      SYNORA<span className="brand-edition">PITSTOP 01</span>
    </a>
  );
}

function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };
  return (
    <>
      <header className="header">
        <Brand />
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#overview">The experience</a>
          <a href="#tracks">Domains</a>
          <a href="#schedule">Schedule</a>
          <a href="#teams">The grid</a>
          <a href="#rules">Rulebook</a>
        </nav>
        <div className="header-actions">
          <RegistrationLink className="button-small">
            Join the grid
          </RegistrationLink>
          <button
            className="menu-toggle icon-button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        aria-label="Site navigation"
        ref={dialog}
        className="mobile-menu"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="menu-content">
          <div className="menu-heading">
            <span className="eyebrow">EXPLORE SYNORA</span>
            <button
              className="icon-button"
              onClick={close}
              aria-label="Close navigation"
            >
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navItems.map((item, i) => (
              <a key={item.id} href={`#${item.id}`} onClick={close}>
                <span>0{i + 1}</span>
                {item.label}
                <ArrowUpRight size={22} />
              </a>
            ))}
          </nav>
          <RegistrationLink onClick={close}>Register for ₹329</RegistrationLink>
        </div>
      </dialog>
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 135]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  return (
    <section
      id="home"
      className="hero"
      ref={ref}
      aria-labelledby="hero-heading"
    >
      <div className="hero-grain" />
      <div className="hero-topline">
        <span>
          <span className="red-square" />
          MICROSOFT STUDENT COMMUNITY / SRM AP
        </span>
        <span>01 / THE STARTING GRID</span>
      </div>
      <motion.div className="hero-car" style={reduce ? {} : { y, rotate }}>
        <img
          src="/assets/synora-race-car.png"
          width="1672"
          height="941"
          fetchPriority="high"
          alt="A red and white open-wheel race car under dramatic studio lighting"
        />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-copy">
        <div className="edition-pill">
          <Flag size={13} /> PITSTOP 01 <span>SEPTEMBER 2026</span>
        </div>
        <h1 id="hero-heading">
          SYN<span>O</span>RA<span className="h1-period">.</span>
        </h1>
        <h2>
          YOUR FIRST HACKATHON.
          <br />
          <span>YOUR NEXT BIG THING.</span>
        </h2>
        <p>
          An idea. A team. A night that changes everything.
          <br />
          From your first line of code to the finish line.
        </p>
        <div className="hero-cta">
          <RegistrationLink>
            Get on the grid <span className="button-price">₹329</span>
          </RegistrationLink>
          <a className="text-link" href="#overview">
            Explore the experience <ArrowDown size={16} />
          </a>
        </div>
        <div className="hero-facts">
          <span>
            <CalendarDays size={15} />
            17—18 SEPTEMBER
          </span>
          <span>
            <MapPin size={15} />
            SRM UNIVERSITY-AP
          </span>
        </div>
      </div>
      <div className="car-caption">
        <span className="caption-line" />
        <span>
          BUILT FOR THE BOLD.
          <br />
          <b>DRIVEN BY IDEAS.</b>
        </span>
      </div>
      <div className="hero-bottom">
        <span className="scroll-cue">
          <span className="mouse-wheel" />
          SCROLL TO FIND YOUR RACING LINE
        </span>
        <span>CODE / INNOVATE / COMPETE</span>
        <span className="start-lights" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((n) => (
            <i key={n} style={{ animationDelay: `${n * 0.13}s` }} />
          ))}
        </span>
      </div>
    </section>
  );
}

function SectionHeading({
  index,
  label,
  title,
  accent,
  description,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{index}</span> / {label}
        </p>
        <h2>
          {title}
          {accent && (
            <>
              <br />
              <em>{accent}</em>
            </>
          )}
        </h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function Tracks() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <section className="section tracks-section" id="tracks" ref={ref}>
      <Reveal>
        <SectionHeading
          index="02"
          label="CHOOSE YOUR LANE"
          title="YOUR IDEA."
          accent="YOUR TRACK."
          description="Pick a domain and define your own problem statement. There is no fixed challenge list."
        />
      </Reveal>
      <div
        className="tracks-route"
        role="img"
        aria-label="Event journey: workshops at 11 AM, hackathon at 5 PM, finish at 5 AM"
      >
        <div className="tracks-route-labels">
          <span>
            <b>11 AM</b> / LEARN
          </span>
          <span>
            <b>5 PM</b> / BUILD
          </span>
          <span>
            <b>5 AM</b> / FINISH
          </span>
        </div>
        <div className="tracks-route-line" aria-hidden="true">
          <motion.div
            className="tracks-route-progress"
            style={{ scaleX: reduce ? 1 : scrollYProgress }}
          />
          <i />
          <i />
          <i />
        </div>
      </div>
      <ol className="track-list" aria-label="Project domains">
        {domains.map((domain, i) => (
          <motion.li
            key={domain.id}
            className="track-row"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.045, 0.2) }}
          >
            <span className="track-number">{domain.id}</span>
            <h3>{domain.name}</h3>
            <span className="track-category">{domain.category}</span>
            <span className="track-flag" aria-hidden="true">
              <Flag size={19} />
            </span>
          </motion.li>
        ))}
      </ol>
      <div className="track-perks">
        <div>
          <Globe2 size={26} strokeWidth={1.5} />
          <p>
            <strong>ONE FREE DOMAIN / TEAM</strong>
            <span>Use it for your project website. Valid for one year.</span>
          </p>
        </div>
        <div>
          <UtensilsCrossed size={26} strokeWidth={1.5} />
          <p>
            <strong>FOOD PROVIDED</strong>
            <span>Fuel for your team during the event.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  const [tab, setTab] = useState<keyof typeof schedules>("workshops");
  const reduce = useReducedMotion();
  const keys = Object.keys(schedules) as (keyof typeof schedules)[];
  const panel = schedules[tab];
  return (
    <section className="section schedule-section light-section" id="schedule">
      <Reveal>
        <SectionHeading
          index="04"
          label="THE RACE WEEKEND"
          title="EVERY LAP"
          accent="COUNTS."
          description="From the first workshop to the finish line. Here’s how your SYNORA experience unfolds."
        />
      </Reveal>
      <div className="schedule-layout">
        <div className="schedule-date">
          <CalendarDays />
          <span>SEPTEMBER</span>
          <strong>
            17<span>—</span>18
          </strong>
          <span>2026 / SRM UNIVERSITY-AP</span>
          <div className="timezone">
            <Clock3 size={14} />
            ALL TIMES IN IST (UTC+5:30)
          </div>
          <p>
            Workshops start at 11 AM. The hackathon begins at 5 PM and ends at 5
            AM. Room and check-in details will follow.
          </p>
          <a className="text-link dark-link" href="#announcements">
            Read event updates <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="schedule-card">
          <div
            className="schedule-tabs"
            role="tablist"
            aria-label="Event schedule"
          >
            {keys.map((key) => (
              <button
                id={`tab-${key}`}
                key={key}
                role="tab"
                aria-controls={`panel-${key}`}
                aria-selected={key === tab}
                tabIndex={key === tab ? 0 : -1}
                onClick={() => setTab(key)}
                onKeyDown={(e) => {
                  const i = keys.indexOf(key);
                  let next: typeof key | undefined;
                  if (e.key === "ArrowRight")
                    next = keys[(i + 1) % keys.length];
                  if (e.key === "ArrowLeft")
                    next = keys[(i - 1 + keys.length) % keys.length];
                  if (e.key === "Home") next = keys[0];
                  if (e.key === "End") next = keys[keys.length - 1];
                  if (next) {
                    e.preventDefault();
                    setTab(next);
                    document.getElementById(`tab-${next}`)?.focus();
                  }
                }}
              >
                {schedules[key].label}
              </button>
            ))}
          </div>
          <motion.div
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            tabIndex={0}
            className="schedule-panel"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className="schedule-note">{panel.note}</p>
            {panel.entries.map((entry, i) => (
              <div className="schedule-entry" key={entry.title}>
                <div className="schedule-time">
                  <strong>{entry.time}</strong>
                  <span>{entry.end}</span>
                </div>
                <span className="timeline-node" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="schedule-footer">
            <Flag size={14} />
            <span>LEARN THE TOOLS. TRUST YOUR TEAM. ENJOY THE RACE.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Teams() {
  const [query, setQuery] = useState("");
  const approved = teams;
  const results = approved.filter((team) =>
    `${team.name} ${team.track ?? ""}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <section className="section teams-section" id="teams">
      <Reveal>
        <SectionHeading
          index="05"
          label="TEAMS ON THE GRID"
          title="GREAT IDEAS."
          accent="BETTER TOGETHER."
          description="Three to five people. Different strengths. One shared finish line."
        />
      </Reveal>
      <div className="team-rules-row">
        <span>
          <Users size={17} />
          3—5 MEMBERS PER TEAM
        </span>
        <span>
          <Zap size={17} />
          UP TO 1 SENIOR MENTOR, INCLUDED IN TEAM SIZE
        </span>
      </div>
      {approved.length > 0 ? (
        <>
          <label className="team-search">
            <Search size={18} />
            <span className="sr-only">Search public team names</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a team on the grid"
            />
          </label>
          <div className="team-grid">
            {results.map((team, i) => (
              <article className="team-card" key={team.id}>
                <span className="team-position">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{team.name}</h3>
                {team.track && <p>{team.track}</p>}
                <span className="tag">{team.status}</span>
              </article>
            ))}
          </div>
          {results.length === 0 && (
            <p role="status">No teams match “{query}”. Try another name.</p>
          )}
        </>
      ) : (
        <div className="grid-empty">
          <div className="empty-lanes" aria-hidden="true">
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
          <div className="grid-empty-copy">
            <span className="tag">GRID REVEAL / COMING SOON</span>
            <h3>YOUR CREW COULD BE NEXT.</h3>
            <p>
              Registered teams will appear here after organizer approval.
              <br />
              Only teams that opt in will be shown.
            </p>
            <RegistrationLink className="button-outline">
              Join the starting grid
            </RegistrationLink>
          </div>
        </div>
      )}
    </section>
  );
}

function Accordions({
  entries,
}: {
  entries: { title: string; text: string }[];
}) {
  return (
    <div className="accordion-list">
      {entries.map((entry, i) => (
        <details key={entry.title}>
          <summary>
            <span className="accordion-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            {entry.title}
            <Plus size={19} aria-hidden="true" />
          </summary>
          <p>{entry.text}</p>
        </details>
      ))}
    </div>
  );
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const { scrollYProgress } = useScroll();
  const registrationUrl = safeExternalUrl(event.registrationUrl);
  return (
    <>
      {showLoader && (
        <F1Loader onEnterSite={() => setShowLoader(false)} />
      )}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div
        className="page-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <Header />
      <main id="main">
        <Hero />
        <div className="stats-strip">
          <div>
            <strong>
              12<span>HRS</span>
            </strong>
            <span>BUILD SOMETHING REAL</span>
          </div>
          <div>
            <strong>
              04<span>HRS</span>
            </strong>
            <span>LEARN FROM THE BEST</span>
          </div>
          <div>
            <strong>
              30<span>+</span>
            </strong>
            <span>MENTORS IN YOUR CORNER</span>
          </div>
          <div>
            <strong>
              ₹30<span>K</span>
            </strong>
            <span>PRIZE POOL UP FOR GRABS</span>
          </div>
        </div>
        <div className="story-layout">
          <aside className="rail">
            <LineSidebar />
          </aside>
          <div className="story-content">
            <section className="section overview-section" id="overview">
              <Reveal>
                <SectionHeading
                  index="01"
                  label="FROM IDEAS TO INNOVATION"
                  title="YOU DON’T NEED"
                  accent="A HEAD START."
                />
                <div className="overview-columns">
                  <div>
                    <p className="big-copy">
                      Just a little curiosity.
                      <br />
                      And the courage to <CanvasText>start.</CanvasText>
                    </p>
                    <p className="body-copy">
                      Welcome to SYNORA, an 18-hour technology experience by the
                      Microsoft Student Community at SRM University-AP. Your pit
                      stop for learning, building and finding your people.
                    </p>
                    <p className="body-copy">
                      First hackathon? We’ve got you. Explore the tools, team
                      up, and turn an idea into something you can actually show
                      the world.
                    </p>
                    <div className="beginner-note">
                      <Sparkles size={18} />
                      <span>FRESHER FRIENDLY. AMBITION ENCOURAGED.</span>
                    </div>
                  </div>
                  <Terminal />
                </div>
              </Reveal>
              <CurvedLoop />
              <div className="feature-grid">
                {[
                  {
                    icon: Code2,
                    kicker: "THE WARM-UP",
                    title: "Learn it. Then build it.",
                    text: "Four hours from the basics: hackathons, ideation, tools, and teamwork.",
                  },
                  {
                    icon: Users,
                    kicker: "YOUR PIT CREW",
                    title: "Never race alone.",
                    text: "30+ seniors and mentors to guide you throughout the hackathon.",
                  },
                  {
                    icon: Trophy,
                    kicker: "THE PODIUM",
                    title: "Ideas worth backing.",
                    text: "₹30,000 in the prize pool. Industry experts for workshops, judging and tech sessions.",
                  },
                ].map(({ icon: Icon, kicker, title, text }) => (
                  <CardContainer key={title}>
                    <article className="feature-card">
                      <CardItem translateZ={35}>
                        <div className="feature-icon">
                          <Icon size={24} />
                        </div>
                        <span className="eyebrow">{kicker}</span>
                        <h3>{title}</h3>
                      </CardItem>
                      <CardItem translateZ={18}>
                        <p>{text}</p>
                      </CardItem>
                    </article>
                  </CardContainer>
                ))}
              </div>
            </section>
            <Tracks />
            <section
              className="section announcements-section"
              id="announcements"
            >
              <Reveal>
                <SectionHeading
                  index="03"
                  label="ANNOUNCEMENTS"
                  title="RACE CONTROL."
                  description="The latest briefings for your time on the grid. Keep this space on your radar."
                />
              </Reveal>
              <div className="announcement-list">
                {announcements.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.06}>
                    <article className="announcement">
                      <span className="announcement-number">0{i + 1}</span>
                      <div>
                        <span className="tag">{item.tag}</span>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                      <a
                        href={item.link}
                        className="announcement-link"
                        aria-label={item.linkLabel}
                      >
                        <ArrowUpRight size={23} />
                      </a>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>
            <Schedule />
            <Teams />
            <section className="section rules-section light-section" id="rules">
              <Reveal>
                <SectionHeading
                  index="06"
                  label="THE RULEBOOK"
                  title="A FAIR RACE."
                  accent="A GREAT EXPERIENCE."
                  description="Know your team setup and event format before you take your place on the grid."
                />
              </Reveal>
              <div className="rules-layout">
                <div className="rules-aside">
                  <ShieldCheck size={42} strokeWidth={1.3} />
                  <h3>
                    ALL ON THE
                    <br />
                    SAME TRACK.
                  </h3>
                  <p>
                    The full competition rulebook and judging criteria will be
                    published here when released by the organizers.
                  </p>
                  <span className="tag tag-light">
                    FULL RULEBOOK / COMING SOON
                  </span>
                </div>
                <Accordions entries={rules} />
              </div>
            </section>
            <section className="section after-dark-section" id="after-dark">
              <Reveal>
                <p className="eyebrow">
                  <span>07</span> / OFF THE TRACK. ON A DIFFERENT FREQUENCY.
                </p>
                <div className="after-dark-heading">
                  <h2>
                    CODE ALL DAY.
                    <br />
                    <em>VIBE ALL NIGHT.</em>
                  </h2>
                  <span className="night-badge">
                    <Clock3 size={20} />
                    AFTER
                    <br />
                    <strong>11 PM</strong>
                  </span>
                </div>
                <p className="after-dark-intro">
                  When the laptops need a breather, the night finds its rhythm.
                  <br />
                  Welcome to After Dark: SYNORA.
                </p>
                <div className="night-grid">
                  {[
                    {
                      icon: Music2,
                      title: "Jamming sessions",
                      caption: "Find your frequency.",
                    },
                    {
                      icon: Sparkles,
                      title: "Dance performances",
                      caption: "Bring your energy.",
                    },
                    {
                      icon: MessageCircleHeart,
                      title: "Confession nights",
                      caption: "A little honesty. A lot of fun.",
                    },
                    {
                      icon: Gamepad2,
                      title: "Gaming nights",
                      caption: "A different kind of competition.",
                    },
                    {
                      icon: Clapperboard,
                      title: "Movie nights",
                      caption: "Sit back. Switch scenes.",
                    },
                    {
                      icon: Mic2,
                      title: "Open mic",
                      caption: "The stage is yours.",
                    },
                  ].map(({ icon: Icon, title, caption }, i) => (
                    <div className="night-item" key={title}>
                      <span className="night-item-index">0{i + 1}</span>
                      <Icon size={30} strokeWidth={1.5} />
                      <h3>{title}</h3>
                      <p>{caption}</p>
                    </div>
                  ))}
                </div>
                <div className="night-footer">
                  <span>SAME PEOPLE. DIFFERENT ENERGY.</span>
                  <a
                    href="/assets/synora-after-dark-poster.png"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the After Dark poster <ArrowUpRight size={16} />
                  </a>
                </div>
              </Reveal>
            </section>
            <section className="section faq-section" id="faq">
              <Reveal>
                <SectionHeading
                  index="08"
                  label="BEFORE LIGHTS OUT"
                  title="A FEW QUICK"
                  accent="PIT STOPS."
                  description="First time on the grid? Here’s what you need to know."
                />
              </Reveal>
              <Accordions entries={faqs} />
            </section>
            <section className="section resources-section">
              <SectionHeading
                index="09"
                label="THE PADDOCK"
                title="YOUR RACE KIT."
              />
              <div className="resource-grid">
                {resources.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={21} />
                    <span>
                      <small>{item.meta}</small>
                      <strong>{item.title}</strong>
                    </span>
                    <ArrowUpRight size={18} />
                  </a>
                ))}
              </div>
              <p className="resources-note">
                Choose your own problem statement. Submission instructions,
                judging criteria, and the full rulebook will be added when
                confirmed.
              </p>
            </section>
          </div>
        </div>
        <section className="registration-section" id="register">
          <div className="registration-checker" aria-hidden="true" />
          <div className="registration-copy">
            <span className="eyebrow">THIS IS YOUR STARTING LINE.</span>
            <h2>
              BIG IDEAS.
              <br />
              <span>START HERE.</span>
            </h2>
            <p>
              New people. New skills. Bigger possibilities.
              <br />
              Get your place at SYNORA — Pitstop 01.
            </p>
            <div className="registration-meta">
              <span>
                <CalendarDays size={16} />
                17—18 September 2026
              </span>
              <span>
                <MapPin size={16} />
                SRM University-AP
              </span>
            </div>
          </div>
          <div className="registration-pass">
            <div className="pass-top">
              <Flag size={20} />
              <span>THE SYNORA PASS</span>
              <span>01</span>
            </div>
            <span className="pass-label">
              ONE PERSON. THE WHOLE EXPERIENCE.
            </span>
            <strong className="pass-price">
              ₹329<span>/ person</span>
            </strong>
            <div className="pass-includes">
              <span>4-hour workshops</span>
              <span>12-hour hackathon</span>
              <span>30+ mentors</span>
              <span>After Dark</span>
              <span>Food provided</span>
              <span>One-year domain / team</span>
            </div>
            {event.registrationOpen ? (
              registrationUrl ? (
                <RegistrationLink className="button-light">
                  Register now
                </RegistrationLink>
              ) : (
                <a
                  className="button button-light"
                  href="/assets/synora-event-poster.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View registration QR <ExternalLink size={18} />
                </a>
              )
            ) : (
              <span className="registration-closed">Registration closed</span>
            )}
            <p className="payment-note">
              {!event.registrationOpen
                ? "Registration is currently closed. Check Race Control for updates."
                : registrationUrl
                  ? "Opens the external registration page. Review the final payment terms there."
                  : "Scan the QR in the official poster to register. A direct link will be added when confirmed."}
            </p>
            <div className="pass-bottom">
              <ShieldCheck size={14} />
              <span>PAYMENT DETAILS ARE NEVER COLLECTED ON THIS SITE.</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <Brand footer />
          <p>FROM IDEAS TO INNOVATION.</p>
          <a className="back-to-top" href="#home">
            BACK TO THE GRID <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="organizers">
          <span>
            ORGANISED BY
            <br />
            <b>Microsoft Student Community</b>
            <small>SRM University-AP</small>
          </span>
          <span>
            INSTITUTION
            <br />
            <b>SRM University-AP</b>
            <small>Andhra Pradesh, India</small>
          </span>
          <span>
            FEATURED IN THE EVENT MATERIALS
            <br />
            <b>Directorate of Alumni Relations</b>
            <small>SRM University-AP</small>
          </span>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SYNORA. CODE. INNOVATE. COMPETE.</span>
          <a href="/privacy.html">Privacy</a>
          <span>A student-organised, motorsport-inspired experience.</span>
        </div>
      </footer>
      <div className="mobile-register">
        <span>
          SYNORA / <b>₹329</b>
        </span>
        <RegistrationLink className="button-small">
          Join the grid
        </RegistrationLink>
      </div>
      <div className="corner-mark" aria-hidden="true">
        <ArrowRight size={13} />
        SYNORA 01
      </div>
    </>
  );
}
