# SEO

The reader comes first. The post should still read naturally if every keyword were removed.

## What the site already handles

The blog route (`src/routes/blog/$slug.tsx`) generates from frontmatter: `<title>`, meta description, canonical URL, Open Graph/Twitter tags (first `photos` entry = share image), `BlogPosting` + `BreadcrumbList` JSON-LD, and sitemap/RSS entries. Don't hand-write any of these in the body. Your SEO levers are the frontmatter fields and the body content.

## Search intent and keywords

Before writing, decide what a searcher actually wants. For a trek: first-hand experience, route, transport, difficulty, booking, distance, cost, what to carry.

- **Primary keyword:** one natural, high-intent phrase (e.g. "Kudremukh trek from Kerala"). Place it in `title`, `slug`, `description`, the first ~100 words, and at most one or two headings — naturally.
- **Secondary keywords:** close variants that answer real questions (… from Mangalore, … booking, … difficulty, … distance, Samse to Kudremukh). Use only where they fit; never force the full list.

## Titles

Specific, truthful, human first; roughly 50–65 characters so it isn't truncated (the site appends " — Aswin AK").

- ✅ "Kudremukh Trek from Kerala: A 22 km Trek and a 240 km Scooter Ride"
- ❌ "Best Kudremukh Trek from Kerala Karnataka Trekking Guide Booking Price Route"

## Headings

`##` for major sections, `###` only when genuinely useful. Headings say what the section contains.

- ✅ "## How We Got from Mangalore to Samse"
- ❌ "## Best Mangalore to Samse Kudremukh Trek Transportation Guide"

## Links

- **Internal:** only to posts that exist (`ls src/content/blog`), as `/blog/<slug>/` with the trailing slash. Link where it helps the reader continue, not to hit a count.
- **External:** official sources for bookings, permits, rail/bus info and regulations.

## Images

Prefer the author's own photos. For body images, suggest placement; for every image, write `alt` that describes what's in the photo.

- ✅ "Lush green Kudremukh hills viewed from the trekking trail"
- ❌ "Kudremukh trek from Kerala best trekking Karnataka travel blog"

Captions are optional and can keep the author's playful tone; `alt` must stay descriptive.

## FAQ

Add a short `## FAQ` section only when there are genuine search questions the narrative doesn't already answer plainly (e.g. "Do you need a guide for Kudremukh?"). Never repeat the article.

## SEO package (deliver with modes A and B)

Map everything to real fields — the site has no separate excerpt or social-title field:

| Deliverable | Where it goes |
|---|---|
| SEO title | `title` |
| Meta description / listing excerpt | `description` (140–160 chars) |
| URL | `slug` (+ filename) |
| Primary + secondary keywords | report only (used to guide the text; tags ≠ keywords) |
| Tags | `tags` (3–6) |
| Share image | first entry in `photos` — pick the strongest landscape shot |
| Image alt text | `photos[].alt` and body `![alt](…)` |
| FAQ | body `## FAQ`, only if warranted |
