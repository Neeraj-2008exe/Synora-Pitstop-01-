import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const registrationUrl =
  "https://forms.easebuzz.in/register/SRMAPIA9oJ/synora-registration";

test("all public registration paths use the organizer-provided HTTPS form", () => {
  const content = read("src/content.ts");
  const html = read("index.html");
  assert.match(content, /registrationOpen: true/);
  assert.ok(content.includes(registrationUrl));
  assert.ok(html.includes(registrationUrl));
  assert.equal(new URL(registrationUrl).protocol, "https:");
  assert.doesNotMatch(content, /registrationUrl:\s*['"]\s*['"]/);
});

test("core public facts and all required sections are present", () => {
  const content = read("src/content.ts");
  const app = read("src/App.tsx");
  for (const fact of [
    "17—18 September 2026",
    "SRM University-AP",
    "₹30,000",
    "329",
    "11:00 AM",
    "05:00 PM",
    "05:00 AM",
    "Food is provided",
    "valid for one year",
    "Embedded Systems",
    "Generative AI",
  ]) {
    assert.ok(content.includes(fact), `Missing event fact: ${fact}`);
  }
  for (const id of [
    "announcements",
    "tracks",
    "schedule",
    "teams",
    "rules",
    "faq",
    "register",
  ]) {
    assert.match(app, new RegExp(`id="${id}"`), `Missing section: ${id}`);
  }
  assert.match(content, /teams: Team\[\] = \[\]/);
  assert.match(content, /choose their own problem statement/i);
});

test("release assets and Vercel security headers are configured", () => {
  for (const asset of [
    "public/assets/synora-race-car.png",
    "public/assets/synora-event-poster.png",
    "public/assets/synora-workshop-poster.png",
    "public/assets/synora-after-dark-poster.png",
    "public/assets/f1-engine-sound.mp3",
    "public/privacy.html",
  ])
    assert.ok(existsSync(join(root, asset)), `Missing ${asset}`);

  const config = JSON.parse(read("vercel.json"));
  assert.equal(config.framework, "vite");
  const headers = Object.fromEntries(
    config.headers[0].headers.map(({ key, value }) => [key, value]),
  );
  for (const name of [
    "Content-Security-Policy",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "Strict-Transport-Security",
  ])
    assert.ok(headers[name], `Missing ${name}`);
  assert.match(headers["Content-Security-Policy"], /object-src 'none'/);
  assert.match(headers["Content-Security-Policy"], /frame-ancestors 'none'/);
});

test("built site contains the canonical registration URL", () => {
  const assetDir = join(root, "dist/assets");
  assert.ok(existsSync(assetDir), "Run npm run build before npm test");
  const scripts = readdirSync(assetDir).filter((name) => name.endsWith(".js"));
  assert.ok(scripts.length > 0);
  assert.ok(
    scripts.some((name) =>
      readFileSync(join(assetDir, name), "utf8").includes(registrationUrl),
    ),
  );
});

test("mobile and reduced-motion fallbacks remain available", () => {
  const css = read("src/styles.css");
  const app = read("src/App.tsx");
  assert.ok(css.includes("-webkit-text-size-adjust: 100%"));
  assert.ok(css.includes("env(safe-area-inset-bottom)"));
  assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"));
  assert.ok(css.includes("@media (hover: none)"));
  assert.ok(app.includes("useReducedMotion"));
  assert.ok(app.includes("tracks-route-progress"));
});
