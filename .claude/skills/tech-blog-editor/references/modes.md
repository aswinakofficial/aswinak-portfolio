# Modes

## A — Ideas (no files)

Goal: make "what do I write next?" a two-minute decision.

1. Mine real work: `src/content/projects/*.mdx`, the author's public GitHub repos (`gh repo list aswinakofficial --limit 50`), recent commits in this repo, and anything the author mentions. Every idea must come from something the author actually built, debugged or decided.
2. Check what's already published (`ls src/content/blog`) — no duplicates; prefer ideas that link to existing posts/projects.
3. Return 5–8 ideas, ranked, each with:
   - working title and slug
   - post type (see post-types.md)
   - the one thing the reader will learn
   - primary keyword and who searches it
   - source material that already exists vs. what the author must supply
   - rough effort: S (≤1 h from existing material) / M / L
4. Suggest a sustainable cadence (e.g. one S/M post every two weeks) and, where natural, a series (e.g. "RAG in production, part 1–3").

## B — Material → post

Input can be bullet notes, a code snippet, a repo, a PR, a project page, or a talk.

1. Identify the post type and pick its template (post-types.md).
2. Extract: the problem, the context/constraints, what was tried, what worked, numbers, gotchas, what the author would do differently. Tag each as first-hand, from source, or needs verification.
3. Ask the author (in the report, or up front if blocking) for the missing first-hand pieces — don't fill them.
4. Choose the primary keyword; write title, slug, description.
5. Write the post: summary near the top, then the template's sections. Use the author's real code, trimmed. Verify APIs/versions against official docs.
6. Create `src/content/blog/<slug>.mdx`, add images under `public/images/blog/<slug>/` if provided.
7. Run the checklist; report open `TODO(author)` items and anything untested.

## C — Draft → edit

Evaluate first — accuracy, structure, clarity, code quality, redundancy, voice, SEO — then change only what improves it. Preserve the author's strong passages and opinions verbatim. Tighten intros and conclusions; fix code issues; add missing versions/prerequisites; bump `updatedAt`. Report changes grouped as accuracy / structure / code / cuts / SEO / frontmatter.

## D — Technical review (report only)

For each issue give location, severity (❌ wrong · ⚠️ misleading/outdated · 💡 improvement) and a concrete fix:

- factual/technical claims — verified against official docs (cite URL) or flagged
- code: syntax, missing imports, deprecated APIs, wrong parameters, security (secrets, injection, unsafe defaults), whether it would run as shown
- versions and dates — anything that will age badly
- confidentiality — client/internal details that should be generalised
- missing prerequisites, edge cases, or failure modes a reader will hit

## E — SEO audit (report only)

Primary keyword and intent match; title/description/slug; heading structure; early plain-language answer; internal links (posts ↔ projects); official external links; image alt/captions; thin or duplicated sections; tag consistency. Rank by impact. No keyword stuffing.

## F — Share

Write a platform summary that drives readers to the canonical post:

- **LinkedIn:** hook line from the real problem, 3–5 short lines of the key insight, the link `https://aswin.xpar.in/blog/<slug>/`, 3–5 hashtags. First person, no emoji walls.
- **Medium/Dev.to cross-post:** only if asked; remind the author to set the platform's canonical URL to the post on this site.
- **X/short:** one or two sentences + link.

Never publish or post anything yourself — return the text.
