import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'expo.out'; // close to cubic-bezier(.16, 1, .3, 1)

/* ───────────── smooth scroll ───────────── */
const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')!;
    if (id.length < 2) return;
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    lenis.scrollTo(target, { duration: 1.4 });
  }),
);

/* ───────────── mobile menu ───────────── */
const burger = $<HTMLButtonElement>('.nav__burger')!;
function closeMenu() {
  document.documentElement.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  lenis.start();
}
burger.addEventListener('click', () => {
  const open = document.documentElement.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  open ? lenis.stop() : lenis.start();
});
addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

/* ───────────── cursor ───────────── */
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
  const root = document.documentElement;
  root.classList.add('has-cursor');
  const dot = $('.cursor')!, ring = $('.cursor-ring')!, badge = $('.cursor-badge')!;
  const setDot = { x: gsap.quickSetter(dot, 'x', 'px'), y: gsap.quickSetter(dot, 'y', 'px') };
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
  const badgeX = gsap.quickTo(badge, 'x', { duration: 0.6, ease: 'power3' });
  const badgeY = gsap.quickTo(badge, 'y', { duration: 0.6, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    setDot.x(e.clientX); setDot.y(e.clientY);
    ringX(e.clientX); ringY(e.clientY);
    badgeX(e.clientX); badgeY(e.clientY);
  });
  addEventListener('pointerover', (e) => {
    const t = e.target as Element;
    root.classList.toggle('has-badge', !!t.closest('[data-badge]'));
    root.classList.toggle('is-hovering', !t.closest('[data-badge]') && !!t.closest('a, button, label, input, textarea'));
  });
  document.addEventListener('pointerleave', () => root.classList.remove('is-hovering', 'has-badge'));
}

/* ───────────── preloader + intro ───────────── */
const preloader = $('#preloader');
const seen = (() => { try { return sessionStorage.getItem('intro-seen') === '1'; } catch { return false; } })();

gsap.set('.hero__title .line', { yPercent: 110 });
gsap.set('[data-intro]', { y: 22, autoAlpha: 0 });
gsap.set('#nav', { y: -16, autoAlpha: 0 });

function intro() {
  const tl = gsap.timeline({ defaults: { ease: EASE } });
  tl.to('.hero__title .line', { yPercent: 0, duration: 1.4, stagger: 0.12 })
    .to('#nav', { y: 0, autoAlpha: 1, duration: 1.1 }, 0.2)
    .to('[data-intro]', { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.07 }, 0.3)
    .from('.marquee', { autoAlpha: 0, duration: 1.2 }, 0.4);
  return tl;
}

if (!preloader || seen || reduced) {
  preloader?.remove();
  intro();
} else {
  lenis.stop();
  const count = $('#preloader-count')!;
  const state = { v: 0 };
  gsap.timeline({
    onComplete() {
      preloader.remove();
      lenis.start();
      try { sessionStorage.setItem('intro-seen', '1'); } catch {}
    },
  })
    .to(state, { v: 100, duration: 1.9, ease: 'power2.inOut', onUpdate: () => (count.textContent = String(Math.round(state.v))) })
    .to('.preloader__curtain', { scaleY: 1, duration: 0.6, ease: 'power3.inOut' }, '+=0.5')
    .to(preloader, { autoAlpha: 0, duration: 0.35, ease: 'power1.out' })
    .add(intro(), '-=0.25');
}

/* ───────────── hero 3D mark (lazy) ───────────── */
const canvas = $<HTMLCanvasElement>('#hero-canvas');
if (canvas) {
  const load = () => import('./mark3d').then((m) => m.initMark3D(canvas, { reduced }));
  'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 1200 }) : setTimeout(load, 300);
}

/* ───────────── hero parallax out ───────────── */
gsap.to('.hero__inner', {
  y: () => innerHeight * -0.102, autoAlpha: 0.25, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
});

/* ───────────── marquee: drift + scroll velocity ───────────── */
const track = $('#marquee');
if (track && !reduced) {
  const unit = () => (track.firstElementChild as HTMLElement).offsetWidth;
  let x = 0, boost = 0;
  lenis.on('scroll', ({ velocity }: { velocity: number }) => (boost = velocity));
  gsap.ticker.add((_, dt) => {
    boost *= 0.9;
    x -= (0.048 + Math.abs(boost) * 0.02) * dt;
    const u = unit();
    if (u && x <= -u) x += u;
    track.style.transform = `translate3d(${x}px,0,0)`;
  });
}

/* ───────────── manifesto word scrub ───────────── */
gsap.to('#manifesto-text .w', {
  opacity: 1, ease: 'none', stagger: 0.08,
  scrollTrigger: { trigger: '#manifesto-text', start: 'top 75%', end: 'bottom 60%', scrub: true },
});

/* ───────────── generic reveals ───────────── */
$$('[data-reveal]').forEach((el) =>
  gsap.from(el, { y: 24, autoAlpha: 0, duration: 1.1, ease: EASE, scrollTrigger: { trigger: el, start: 'top 88%' } }),
);
$$('.process__title .line, .contact .mask .line').forEach((el) =>
  gsap.from(el, { yPercent: 110, duration: 1.3, ease: EASE, scrollTrigger: { trigger: el.parentElement, start: 'top 85%' } }),
);
gsap.from('.services__item', {
  y: 84, autoAlpha: 0, duration: 1.2, ease: EASE, stagger: 0.08,
  scrollTrigger: { trigger: '.services__list', start: 'top 80%' },
});

/* ───────────── services: centre item is active ───────────── */
$$('.services__item').forEach((item) =>
  ScrollTrigger.create({ trigger: item, start: 'top 55%', end: 'bottom 45%', toggleClass: 'is-active' }),
);

/* ───────────── responsive, scroll-driven set pieces ───────────── */
const mm = gsap.matchMedia();

mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
  /* work strip: pinned diagonal rail with depth focus */
  const pin = $('#strip-pin')!, rail = $('#strip-rail')!, counter = $('#strip-count')!;
  const cards = $$('.strip-card', rail);
  const floats = cards.map((c) => $('.strip-card__float', c)!);
  const n = cards.length;
  const vw = () => innerWidth, vh = () => innerHeight;
  const startX = () => vw() * 0.12, endX = () => -(rail.scrollWidth - vw() * 0.76);
  const startY = () => vh() * 0.42, endY = () => vh() * 0.1;

  const render = (p: number) => {
    gsap.set(rail, { x: gsap.utils.interpolate(startX(), endX(), p), y: gsap.utils.interpolate(startY(), endY(), p) });
    const focus = p * (n - 1);
    cards.forEach((card, i) => {
      const d = i - focus, a = Math.abs(d);
      const z = Math.max(-180, 80 - a * 105);
      gsap.set(card, {
        y: i * vw() * 0.05, z, rotationY: gsap.utils.clamp(-2.5, 2.5, -d * 2.5), rotationZ: -1.4 * Math.sign(d || 1) * Math.min(a, 1),
        scale: 1 - Math.min(a, 1) * 0.056, opacity: Math.max(0.52, 1 - a * 0.24),
      });
      card.classList.toggle('is-dominant', a < 0.5);
    });
    counter.textContent = String(Math.round(focus) + 1).padStart(2, '0');
  };
  render(0);

  const st = ScrollTrigger.create({
    trigger: pin, start: 'top top', end: () => '+=' + vh() * 1.1, pin: true, scrub: 0.6, invalidateOnRefresh: true,
    onUpdate: (self) => render(self.progress),
    onRefresh: (self) => render(self.progress),
  });

  // gentle idle float
  const bob = (t: number) => floats.forEach((f, i) => gsap.set(f, { x: Math.sin(t * 0.8 + i) * 2, y: Math.cos(t * 0.9 + i * 1.3) * 7 }));
  gsap.ticker.add(bob);

  /* process: stacking cards */
  const pcards = $$('.process-card');
  pcards.slice(0, -1).forEach((card, i) => {
    const next = pcards[i + 1];
    gsap.timeline({ scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } })
      .to(card, { scale: 0.93, transformOrigin: '50% 50%', ease: 'none' }, 0)
      .to($('.process-card__shade', card), { opacity: 0.55, ease: 'none' }, 0);
  });
  pcards.forEach((card) =>
    gsap.from($('.process-card__ghost', card), { yPercent: 25, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } }),
  );

  return () => { gsap.ticker.remove(bob); st.kill(); };
});

/* process progress bar */
gsap.to('#process-bar', {
  scaleX: 1, ease: 'none',
  scrollTrigger: { trigger: '#process-cards', start: 'top top', end: 'bottom bottom', scrub: true },
});

/* footer wordmark rises letter by letter */
gsap.from('.fw-piece', {
  yPercent: 60, autoAlpha: 0, ease: 'none', stagger: 0.04,
  scrollTrigger: { trigger: '.footer__wordmark', start: 'top bottom', end: 'bottom bottom', scrub: true },
});

/* ───────────── multi-step contact form ───────────── */
const form = $<HTMLFormElement>('#cform');
if (form) {
  const steps = $$<HTMLFieldSetElement>('.cform__step', form);
  const back = $<HTMLButtonElement>('.cform__back', form)!;
  const next = $('#cform-next')!, label = $('#cform-label')!, num = $('#cform-step')!, bar = $('#cform-progress')!;
  let i = 0;
  const show = (k: number) => {
    i = k;
    steps.forEach((s, j) => s.classList.toggle('is-active', j === k));
    back.hidden = k === 0;
    next.textContent = k === steps.length - 1 ? 'Send' : 'Next';
    label.textContent = steps[k].dataset.label ?? '';
    num.textContent = String(k + 1).padStart(2, '0');
    bar.style.width = `${((k + 1) / steps.length) * 100}%`;
    ($('input, textarea', steps[k]) as HTMLElement | null)?.focus({ preventScroll: true });
  };
  back.addEventListener('click', () => show(Math.max(0, i - 1)));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = $$<HTMLInputElement>('input[required], textarea[required]', steps[i]).find((f) => !f.checkValidity());
    if (invalid) { invalid.reportValidity(); return; }
    if (i < steps.length - 1) return show(i + 1);
    // TODO: send `new FormData(form)` to your endpoint (Formspree, Netlify Forms, your API…)
    form.classList.add('is-done');
  });
}

/* refresh after fonts settle so pin distances are right */
document.fonts?.ready.then(() => ScrollTrigger.refresh());
