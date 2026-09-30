# vamapoma portfolio

Astro + Lenis + GSAP ScrollTrigger + Three.js.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build && npm run preview
```

## Where things live

| What | File |
| --- | --- |
| All text, projects, services, email | `src/data/site.ts` |
| Logo mark (SVG) | `src/components/Mark.astro` |
| Same mark in 3D (hero) | `src/scripts/mark3d.ts` (`MARK_POINTS`) |
| Colours, fonts, spacing tokens | top of `src/styles/global.css` |
| Scroll animations, preloader, cursor, form | `src/scripts/main.ts` |

## Project media

Put files in `public/media/` and set `video: '/media/name.mp4'` or `image: '/media/name.jpg'`
on a project in `site.ts`. Without media, a coloured placeholder panel is shown.

## Contact form

The 3-step form validates and shows a success state, but does not send anything yet.
Hook it up at the `TODO` in `src/scripts/main.ts` (Formspree, Netlify Forms, your own API…).

## Notes

- The preloader runs once per browser session (`sessionStorage`).
- Pinned/3D scroll effects are desktop only (≥ 901px); mobile gets a swipeable project rail.
- `prefers-reduced-motion` disables the heavy motion.
- Fonts are from Fontshare (free for commercial use).
# portfolio_main_studior
