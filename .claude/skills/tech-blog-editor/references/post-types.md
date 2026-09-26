# Post types

Pick one per post. Section names are defaults — rename to fit, keep the order.

## Tutorial / how-to

For "how do I do X" searches. The reader should finish with something working.

1. Summary: what you'll build, the end result (screenshot or output), time needed
2. Prerequisites: tools, versions, accounts, prior knowledge
3. Steps (`## 1. …`, `## 2. …`), each with code and what it does and why
4. Run it / verify: expected output
5. Common errors and fixes (from the author's experience)
6. Next steps: related post/project, official docs

## Deep dive / architecture

For explaining how and why a system is designed a certain way.

1. Summary: the problem and the design in two or three sentences
2. Context and constraints (scale, latency, cost, data, team)
3. The architecture (diagram image if available) and the key components
4. Decisions and trade-offs — what was considered and rejected, and why
5. Results — only real numbers, clearly scoped
6. What I'd change next time

## Lessons learned / postmortem

For "X in production" and "mistakes I made with Y". High credibility, low effort.

1. Summary: the situation and the top lesson
2. What we built / what happened
3. Lessons, each as a `##` with: what went wrong → why → what to do instead (code if relevant)
4. Checklist or takeaway list the reader can reuse

## Comparison (X vs Y)

1. Summary verdict: when to use which
2. Criteria that matter for this decision
3. Side-by-side (GFM table) with versions and date tested
4. Same task implemented in both (short code)
5. Recommendation by use case — honest about the author's bias and experience limits

## Project build log

Companion to a `/projects/<slug>/` page — the story behind it.

1. Summary: what the project does and why it exists
2. The problem it solves (from the author's experience)
3. Stack and why
4. Interesting implementation details (2–4 sections, real code)
5. What didn't work, what's next
6. Links: project page, repo (if public), demo

## Short note / TIL

For consistent posting with minimal effort: 300–700 words, one problem, one solution, one code block. Title states the fix ("Fixing X when Y in Z").
