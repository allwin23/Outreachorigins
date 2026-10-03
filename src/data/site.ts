// All editable content lives here. Swap names, copy and media for your own.

export const site = {
  name: 'Outreach', // wordmark: first part upright…
  nameAccent: 'origins', // …last part in italic serif
  title: 'Outreachorigins — independent web design & development',
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
    { label: 'Projects', href: '/projects/' },
    { label: 'Services', href: '/services/' },
    { label: 'Studio', href: '/studio/' },
  ],
  cta: { label: 'Start a project', href: '/#contact' },
};

export const hero = {
  top: 'Digital',
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
  cats: ('branding' | 'web' | 'motion')[];
  blurb: string;
  roles: string[];
};

export const projects: Project[] = [
  { slug: 'northwind', name: 'Northwind', tag: 'Editorial redesign', year: '2026', shape: 'wide', tone: ['#4b5a3c', '#e9e2cf'], cats: ['web', 'motion'], blurb: 'An editorial redesign for an independent magazine: a reading experience first, a catalogue second.', roles: ['Web design', 'Development'] },
  { slug: 'atelier-lune', name: 'Atelier Lune', tag: 'Branding & web', year: '2026', shape: 'portrait', tone: ['#c98a4b', '#f3e7d6'], cats: ['branding', 'web'], blurb: 'A warm identity and a quiet shop for a ceramics atelier working in small batches.', roles: ['Branding', 'Web'] },
  { slug: 'helix-lab', name: 'Helix Lab', tag: 'UX/UI & SEO', year: '2025', shape: 'portrait', tone: ['#dfe7ee', '#34506b'], cats: ['web'], blurb: 'Clearer navigation, faster pages and a content structure built to rank for a research lab.', roles: ['UX/UI', 'SEO'] },
  { slug: 'mara-voss', name: 'Mara Voss', tag: 'Creator platform', year: '2026', shape: 'wide', tone: ['#d8ecf3', '#1f3552'], cats: ['web', 'motion'], blurb: 'A creator platform where every card, cursor and scroll gesture was designed together.', roles: ['Web design', 'Motion'] },
  { slug: 'ferro', name: 'Ferro', tag: 'UX & conversion', year: '2026', shape: 'portrait', tone: ['#fbf1de', '#e0503a'], cats: ['branding', 'web'], blurb: 'A conversion-led storefront for a hardware maker, from logo to checkout.', roles: ['Branding', 'Web'] },
];

export const strip = {
  eyebrow: ['02', 'Work in motion'],
  titleTop: 'Show,',
  titleBottom: "don't tell.",
  intro: 'A handful of recent launches — scroll to flip through them.',
  foot: 'Selected work · 05 projects',
  more: { label: 'All projects', count: '(05)', href: '/projects/' },
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
  lead: 'Outreachorigins is an independent web design and development studio. I work with brands, founders and cultural projects who want a site that feels considered, fast and unmistakably theirs, from the first conversation to launch and beyond.',
};

export const contact = {
  avail: 'One slot open this month',
  hook: 'Have a project in mind?',
  sub: 'Three questions, two minutes. I reply personally.',
  note: 'Reply within 48 working hours.',
  kinds: ['Website', 'UI design', 'Other'],
  budgets: ['1.5k – 3k', '3k – 5k', '5k – 15k', '> 15k'],
};

export const projectsPage = {
  title: 'Custom',
  titleSerif: 'websites',
  count: '(05)',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'branding', label: 'Logo & branding' },
    { id: 'web', label: 'Web design & dev' },
    { id: 'motion', label: 'Motion' },
  ],
};

export const servicesPage = {
  label: '(The services)',
  title: ['Services', 'of the studio'],
  place: 'Outreachorigins · Independent, remote-first',
  intro:
    'Five services, one person: the art direction, the interface and the code of a site live in the same hands, from the first call to launch.',
  principleLabel: '(The principle)',
  principle:
    'Every project deserves better than an assembly of blocks. I design bespoke interfaces, then build them so the intent survives all the way to the browser.',
  listLabel: '(Five services)',
  items: [
    { name: 'Custom websites', tags: 'Showcase sites, portfolios, landing pages', text: 'A site shaped around your trade, not a theme bent to fit it. Architecture, interface and code are written for what you have to show.' },
    { name: 'UI / UX design', tags: 'Interface mock-ups, user flows, prototypes', text: 'Drawing an interface means deciding what people look at first. Flow, hierarchy and states are settled before any code editor opens.' },
    { name: 'Web development', tags: 'Front-end, back-end, performance, editable content', text: 'Code written by hand, project by project. No plugin stacked on a plugin: what the browser loads is what serves the page.' },
    { name: 'Motion design & WebGL', tags: 'GSAP, animation, 3D experiences', text: 'Motion guides the eye and never fills the screen. It comes after structure, once we know what it needs to make clear.' },
    { name: 'Art direction', tags: 'Web identity, colour, typography, logo', text: 'Before pages, a language: a palette, two or three typefaces, a rhythm. What makes a site recognisable fits in those few decisions.' },
  ],
  faqLabel: '(Questions)',
  faqTitle: 'Frequently asked questions about the services',
  faqLead:
    'Outreachorigins is the independent web design and development studio of a single designer-developer. Five services, led by the same person from the first call to launch.',
  faq: [
    { q: 'Which services does the studio offer?', a: 'Five: art direction, UI/UX design, web development, motion design & WebGL, and bespoke websites. They can be booked together or one at a time.' },
    { q: 'Do you work from templates?', a: 'No. Every layout, component and animation is designed and built for the project, which keeps sites fast and unmistakably yours.' },
    { q: 'How long does a project take?', a: 'A showcase site usually takes four to eight weeks, depending on content readiness and the amount of motion involved.' },
    { q: 'Can I edit the content myself?', a: 'Yes. Sites ship with a lightweight CMS so your team can edit text, images and pages without touching code.' },
  ],
};

export const studioPage = {
  label: '(Behind the studio)',
  title: ['Independent', 'studio'],
  place: 'Remote-first · Since 2020 · UI/UX, motion & code',
  intro:
    'Outreachorigins is the name of my studio. I work alone and directly with clients, from the first call to launch: art direction, UI/UX design and bespoke web development.',
  beliefLabel: '(My conviction)',
  belief:
    'Good design is felt before it is noticed. It earns trust before a single word is read. That feeling is what I chase, project after project.',
  approachLabel: 'How I work',
  approach: [
    { name: 'Few, but well', text: 'I deliberately limit the number of projects in progress. It is the best way to keep the level of detail that separates a correct site from a memorable one.' },
    { name: 'Substance leads form', text: 'No gratuitous animation, no trend applied without a reason. Every visual decision serves your message and your goals, not my portfolio.' },
    { name: 'A single contact', text: 'From first sketch to launch you talk to the person who designs and builds. No project manager between your idea and its realisation.' },
    { name: 'Design survives production', text: 'I design and I develop. What you approve in the mock-up stays faithful once it is live, right down to details and interactions.' },
  ],
  teamTitle: 'Behind Outreachorigins',
  teamTag: '(01) independent · several hats',
  teamLead: 'No team to coordinate: the three crafts of a website live in the same hands and answer each other at every step.',
  team: [
    { name: 'Art direction', text: 'Colour, typography & essential logo' },
    { name: 'Web development', text: 'Bespoke front-end & editable content' },
    { name: 'Motion & WebGL', text: 'GSAP, interactions & 3D experiences' },
  ],
  guaranteeTitle: 'What the solo format guarantees',
  guarantees: [
    { value: '01', text: 'contact from brief to launch' },
    { value: '0', text: 'templates, themes or page builders' },
    { value: '48h', text: 'maximum reply time on working days' },
  ],
  ctaHook: 'Shall we talk about your project?',
};
