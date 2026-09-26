# Style guide

## Voice

First person, engineer to engineer. Direct, specific, and honest about trade-offs and limits.

- ✅ "Chunking by heading cut our irrelevant retrievals noticeably, but it broke on scanned PDFs with no heading structure."
- ❌ "Chunking is a crucial aspect of RAG that can significantly enhance performance."

Avoid filler and AI-sounding phrasing: "in today's fast-paced world", "delve", "unlock", "game-changer", "revolutionize", "seamless", "robust" (unless literally about robustness), "it's important to note that", "in conclusion". Don't open with a definition the reader already searched past.

## Structure

- Open with the problem or result, not background. The first screen should tell the reader what they'll get.
- A 2–3 sentence summary near the top (can be a blockquote starting **TL;DR:**).
- `##` for sections, `###` sparingly. Headings describe content; question headings are fine when they're what readers ask.
- Short paragraphs (1–4 sentences). Lists for steps and options; tables for comparisons.
- End with something useful — next step, trade-off summary, or what the author would do differently — not a recap.

## Code

- Language tag on every fenced block; filename as a first-line comment when it matters (`# app/retriever.py`).
- Show the smallest complete snippet that proves the point; mark omissions with `// ...` or `# ...`.
- Explain *why* after the block, not line-by-line narration of *what*.
- Commands in ` ```bash ` blocks, one logical step per block, no `$` prompt.
- Consistent naming across a post; real package names; state versions ("tested with `langchain==0.3.x`, Python 3.12").
- Secrets via env vars only.

## Numbers and claims

- Give scope with every number: dataset size, hardware, model, date.
- Distinguish "we measured", "the docs state", "in my experience" — never blur them.
- Model names, prices and limits change — verify at writing time and date them ("as of September 2026").

## Diagrams and screenshots

- Prefer one clear architecture diagram over several decorative images.
- Crop screenshots to the relevant area; redact anything internal.
- Alt text is shown as the caption: describe what the image shows in one sentence.

## Consistency across posts

- Tag vocabulary: reuse existing spellings (e.g. `RAG`, `LangChain`, `Python`, `Azure`); add new tags sparingly.
- Titles: sentence-style specificity ("How I cut RAG latency by caching embeddings"), no clickbait.
- Slugs: lowercase, hyphenated, keyword-first, no dates or stop-word padding.
