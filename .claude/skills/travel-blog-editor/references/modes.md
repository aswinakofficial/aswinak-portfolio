# Editorial modes

## A — Raw notes → post

Notes may be out of order, repetitive, conversational, uncertain or ungrammatical. Don't mirror the mess; extract the story.

1. List the facts in the notes, tagging each with its evidence category (first-hand, opinion, told-by, uncertain).
2. Pick the structure (see style-guide.md → Structure) and the primary keyword (see seo.md).
3. Give each practical fact one home; decide what is narrative and what is a practical section.
4. Write the post in the author's voice, reusing the author's own phrasing wherever it's good.
5. Missing facts → `{/* TODO(author): … */}`, never invented.
6. Create `src/content/blog/<slug>.mdx` with full frontmatter (schema in SKILL.md). If photos were provided, add them to `public/images/blog/<slug>/` and to `photos:` with `alt`.
7. Run the pre-publish checklist; deliver the SEO package (seo.md).

## B — Draft → edit

First evaluate — story, structure, redundancy, readability, voice, factual risk, search intent — then change only what improves the article.

- Preserve the strongest writing verbatim.
- Remove repetition, fix awkward phrasing, improve transitions and section order.
- Don't expand unless a reader question is genuinely unanswered.
- Bump `updatedAt` if the content changed materially.
- Report: a short list of changes grouped as structure / cuts / facts / SEO / frontmatter, and anything the author must confirm.

## C — SEO audit (report only)

Report on:

- primary keyword and search intent — does the post satisfy it?
- `title` and `description` quality (length, specificity, truthfulness)
- heading structure (no body H1, descriptive `##`)
- keyword placement: title, slug, description, first 100 words, one or two headings — naturally
- missing reader questions (cost, how to reach, booking, difficulty, what to carry…)
- internal link opportunities (only to existing posts) and official external links
- photo `alt` text and Memory Lane metadata
- thin or repetitive sections

Rank findings by impact. Never recommend keyword stuffing.

## D — Fact check (report only)

For every factual claim, classify:

- ✅ verified — cite the URL
- ⚠️ likely but unverified
- 🧭 personal experience (not checkable, keep as-is)
- ⌛ possibly outdated (was true at trip time; may have changed)
- ❓ uncertain / conflicting — show both versions

Use WebSearch/WebFetch against authoritative sources (see SKILL.md → Fact-checking). Suggest exact replacement wording for anything that should be re-labelled; never rewrite an uncertain claim as fact.

## E — Redundancy audit

Identify repeated information, repeated phrases, overlapping sections, repeated conclusions and unnecessary transitions. For each, quote the locations and recommend exactly one action: remove, shorten to a callback, merge into section X, or move to section Y. Apply the changes only if the author asks.

Final questions for any edit:

1. What can be removed without losing meaning, personality, useful information or story?
2. What has already been explained elsewhere?
3. Does every section earn its place? If yes, keep the length.
