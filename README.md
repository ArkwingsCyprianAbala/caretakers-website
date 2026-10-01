# Caretakers' Kindergarten website

Static HTML/CSS/JS, no build step. Open `index.html` in a browser.

## Pages
| File | Sections |
|---|---|
| `index.html` | Hero, stats strip, testimonials, CTA band |
| `about.html` | About + values, Why choose us |
| `programmes.html` | Four programme cards |
| `gallery.html` | Photo grid |
| `contact.html` | Contact details, enquiry form |

## CSS (`css/`)
- `base/`       variables (colours/fonts), reset, typography
- `layout/`     shared section wrapper, inner-page spacing
- `components/` nav, buttons, forms, footer, social pills, WhatsApp button
- `pages/`      one file per section (home-hero, home-stats, about, why, programmes, gallery, contact ...)

Each page links only the CSS it needs (see the `<link>` list in its `<head>`).
Responsive rules live inside each file, next to the styles they affect.

## Notes
- Nav and footer are repeated in each HTML file. If you change a link, update all five.
- Add the logo as `images/LG.jpg`.
- The enquiry form is a placeholder (alert only) - connect it to Formspree/EmailJS/backend.
