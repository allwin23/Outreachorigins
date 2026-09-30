// All editable content lives here. Swap names, copy and media for your own.

export const site = {
  name: 'vamapo', // wordmark: first part upright…
  nameAccent: 'ma', // …last part in italic serif
  title: 'vamapoma — independent web design & development',
  description:
    'Independent studio for interface design and hand-built websites, crafted down to every interaction.',
  email: 'hello@example.com',
  location: 'Your city, Your country',
  year: new Date().getFullYear(),
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
  ],
  cta: { label: 'Start a project', href: '#contact' },
};

export const hero = {
  top: 'Design',
  bottom: 'Studio',
  intro:
    'An independent practice for interface design and web development. I shape the interface, then build it by hand, polished right down to the interactions.',
};

export const manifesto = {
  label: '(Studio)',
  stats: [
    { value: '10+', text: 'years sketching, shipping and refining for the web' },
    { value: '24', text: 'launches, each one built without a template' },
  ],
  statement:
    'Websites should feel made, not assembled. I care about the pixel, the millisecond and the sentence, because that is where people decide whether to trust you.',
  sub: 'Small by choice. You work directly with the person making the thing, which keeps decisions fast and details intact.',
};

export type Project = {
  slug: string;
  name: string;
  tag: string;
  year: string;
  shape: 'wide' | 'portrait';
  /** optional media — put files in /public and reference them like '/media/x.mp4' */
  video?: string;
  image?: string;
  /** placeholder panel colours used when no media is set */
  tone: [string, string];
};

export const projects: Project[] = [
  { slug: 'northwind', name: 'Northwind', tag: 'Editorial redesign', year: '2026', shape: 'wide', tone: ['#4b5a3c', '#e9e2cf'] },
  { slug: 'atelier-lune', name: 'Atelier Lune', tag: 'Branding & web', year: '2026', shape: 'portrait', tone: ['#c98a4b', '#f3e7d6'] },
  { slug: 'helix-lab', name: 'Helix Lab', tag: 'UX/UI & SEO', year: '2025', shape: 'portrait', tone: ['#dfe7ee', '#34506b'] },
  { slug: 'mara-voss', name: 'Mara Voss', tag: 'Creator platform', year: '2026', shape: 'wide', tone: ['#d8ecf3', '#1f3552'] },
  { slug: 'ferro', name: 'Ferro', tag: 'UX & conversion', year: '2026', shape: 'portrait', tone: ['#fbf1de', '#e0503a'] },
];

export const strip = {
  eyebrow: ['02', 'Work in motion'],
  titleTop: 'Show,',
  titleBottom: "don't tell.",
  intro: 'A handful of recent launches — scroll to flip through them.',
  foot: 'Selected work · 05 projects',
  more: { label: 'All projects', count: '(07)', href: '#' },
};

export const process = {
  eyebrow: ['03', 'How I work'],
  promise: 'A clear rhythm so you always know what happens next, and why.',
  titleSerif: 'The',
  titleMain: 'Process',
  subPlain: 'Four steps.',
  subAccent: 'Zero guesswork.',
  steps: [
    { num: '01', phase: 'Research', name: 'Discover', text: 'Calls, questions and a close look at your market. We agree on goals, audience and what success should look like before any pixels move.', meta: 'Kick-off · Interviews · Benchmarks', tone: 'dark' },
    { num: '02', phase: 'Strategy', name: 'Define', text: 'Structure, tone and visual language come together in a direction you can react to early, while changes are still cheap.', meta: 'Sitemap · Moodboards · Style tiles', tone: 'raise' },
    { num: '03', phase: 'Craft', name: 'Develop', text: 'Screens become a living site. Components, motion and content are built together and reviewed on real devices every week.', meta: 'Design system · Code · Motion', tone: 'light' },
    { num: '04', phase: 'Release', name: 'Deliver', text: 'Testing, launch and a proper handover, with docs and a walkthrough so your team feels at home from day one.', meta: 'QA · Go-live · Handover', tone: 'deep' },
  ],
};

export const services = {
  label: 'What I do',
  items: [
    { name: 'Brand & art direction', meta: 'Look, feel and voice for the screen' },
    { name: 'Product & interface design', meta: 'Flows, prototypes and component libraries' },
    { name: 'Marketing websites', meta: 'Launch sites and landing pages that convert' },
    { name: 'Front-end engineering', meta: 'Fast, accessible, CMS-ready builds' },
    { name: 'Interaction & 3D', meta: 'Scroll stories, micro-motion, WebGL' },
  ],
};

export const about = {
  label: '(About)',
  title: 'A quick hello',
  lead: 'vamapoma is an independent web design and development studio. I work with brands, founders and cultural projects who want a site that feels considered, fast and unmistakably theirs, from the first conversation to launch and beyond.',
};

export const contact = {
  avail: 'One slot open this month',
  hook: 'Have a project in mind?',
  sub: 'Three questions, two minutes. I reply personally.',
  note: 'Reply within 48 working hours.',
  kinds: ['Website', 'UI design', 'Other'],
  budgets: ['1.5k – 3k', '3k – 5k', '5k – 15k', '> 15k'],
};
