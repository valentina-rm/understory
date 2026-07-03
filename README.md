# UnderStory

A curated intellectual commons exploring our bonds with the earth, with each
other, and with ourselves. Static site built with **Jekyll** for **GitHub Pages**.

> A space for bold ideas and courageous voices brewing below the mainstream.

---

## Run it locally

This repo is a separate Jekyll site from `valentina-rm.github.io`. Same toolchain
as your other site (bash, not zsh).

```bash
cd understory
bundle install
bundle exec jekyll serve --port 4001 --livereload
# → http://localhost:4001/understory/
```

GitHub Pages builds the site for you on push — you don't need to build anything
to deploy. Just push to the repo's Pages branch.

---

## The one setting to decide: `baseurl`

In `_config.yml`:

- **Project repo** at `valentina-rm.github.io/understory` → keep `baseurl: "/understory"`.
- **Its own Pages site or a custom domain** (e.g. `understory.xyz`) → set `baseurl: ""`
  and update `url:` accordingly. (If you use a custom domain, add a `CNAME` file.)

Every internal link uses `relative_url`, so flipping this one value fixes all links.

`email:` in `_config.yml` is set to `valentina.ramirez.m@protonmail.com` (the address
the **Get in touch** button opens). It will be publicly visible on the live site — swap it
for a dedicated inbox if you'd rather keep your personal address off a public page.

---

## Add a contributor

Drop one Markdown file into `_contributions/`. The index and its filters update
themselves. Filename becomes the URL slug (`_contributions/jane-doe-climate.md`
→ `/index/jane-doe-climate/`).

```markdown
---
title: "Short title"
contributor: "Full Name"
contributor_role: "What they do"
location: "City / country"          # optional
topic: climate                       # climate | power | meaning
type: misconception                  # misconception | recommendation | vision
question: "The prompt they answered, verbatim."
photo: /assets/img/contributors/their-photo.jpg
date: 2026-07-15                      # controls order (newest first)
excerpt: "One line shown on the index card."
books:                               # up to three
  - { title: "Book title", author: "Author", note: "Why, in one line." }
  - { title: "...",        author: "...",    note: "..." }
  - { title: "...",        author: "...",    note: "..." }
cartoon: /assets/img/cartoons/their-cartoon.jpg   # optional
cartoon_caption: "Caption."
cartoon_credit: "Artist / source."
---

The contribution itself, in the contributor's own words. Markdown is fine —
*italics*, paragraphs, and > blockquotes all render. Keep it to ~2,500 characters.
```

Topic and reflection-type **labels** live in one place: `_data/taxonomy.yml`.
Change a label there and it updates on every card and page.

### Images

Put portraits in `assets/img/contributors/` and cartoons in `assets/img/cartoons/`.
Square portraits (≈400×400) look best; they're shown in an 84px circle. The three
`placeholder-*.svg` files and `placeholder-cartoon.svg` are demo art — delete them
once you have real images.

The two forest scenes in `assets/img/scenery/` (`understory-hero.svg` on the home
page, `understory-about.svg` on the About page) are **original illustrations**, not
photographs — they're licence-clean and load offline. To use a real photo instead,
drop a licensed image (your own, or e.g. Unsplash) into that folder and point the
`src` at it: the hero image is in `index.html`, and the About image is set via the
`figure:` field in the front matter of `about.md`. Portrait-ish crops (~4:5) fit the
boxes best.

---

## Two things flagged on delivery

1. **The contributor list is not published as a roster.** Your V2 deck names real
   people as "initial contributors in mind" and itself notes *"none have been
   approached/consulted."* The live site therefore does **not** list them as
   contributors — that would imply participation no one has agreed to. Replace the
   three `Sample Voice` entries in `_contributions/` with real pieces as they're
   confirmed.

2. **The "Get in touch" button is a `mailto:` link**, because GitHub Pages can't
   process form submissions on its own. When you want a real form, wire the
   button to a backend like Formspree, a Google Form, or Netlify Forms — happy to
   set that up.

---

## Structure

```
understory/
├── _config.yml            site config + nav + baseurl
├── _data/taxonomy.yml     topic & reflection-type labels (single source)
├── _layouts/              default · page · contribution
├── _includes/             head · header · footer
├── _contributions/        one Markdown file per piece  ← you mostly edit here
├── index.html             landing page (the descent)
├── the-index.html         the archive at /index/ (filterable)
├── about.md               curatorial vision
├── contribute.md          invitation + how to submit
└── assets/                css · js · images
```

Curated by Valentina Ramírez & Sophie Legros.
