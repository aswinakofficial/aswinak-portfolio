import { writeFileSync, readFileSync } from 'fs'
import { glob } from 'glob'

const BASE_URL = 'https://aswin.xpar.in'
const STATIC_ROUTES = ['/', '/about', '/projects', '/blog', '/services', '/contact', '/resume']

// Parse MDX frontmatter
function parseMDX(filePath: string) {
  const content = readFileSync(filePath, 'utf-8')
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/)
  if (!match) return { frontmatter: {} as any, body: content }

  const yaml = match[1]
  const body = content.slice(match[0].length).trim()
  const frontmatter: Record<string, any> = {}

  yaml.split('\n').forEach((line) => {
    const divider = line.indexOf(':')
    if (divider === -1) return
    const key = line.slice(0, divider).trim()
    let val = line.slice(divider + 1).trim()

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }

    if (val.startsWith('[') && val.endsWith(']')) {
      frontmatter[key] = val
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
    } else {
      frontmatter[key] = val
    }
  })

  return { frontmatter, body }
}

async function generateAll() {
  const blogFiles = await glob('src/content/blog/*.mdx')
  const projectFiles = await glob('src/content/projects/*.mdx')

  const parsedBlogs = blogFiles.map((file) => {
    const slug = file.split('/').pop()?.replace('.mdx', '') || ''
    const { frontmatter, body } = parseMDX(file)
    return { slug, frontmatter, body }
  })

  const parsedProjects = projectFiles.map((file) => {
    const slug = file.split('/').pop()?.replace('.mdx', '') || ''
    const { frontmatter, body } = parseMDX(file)
    return { slug, frontmatter, body }
  })

  // 1. Generate Sitemap
  const blogRoutes = parsedBlogs.map((b) => `/blog/${b.slug}`)
  const projectRoutes = parsedProjects.map((p) => `/projects/${p.slug}`)
  const allRoutes = [...STATIC_ROUTES, ...blogRoutes, ...projectRoutes]
  const today = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  writeFileSync('public/sitemap.xml', xml)
  console.log(`Sitemap generated with ${allRoutes.length} routes`)

  // 2. Generate llms.txt
  const llmsTxt = `# Aswin AK — AI Engineer & Full-Stack Developer

AI Engineer specializing in RAG pipelines, Agentic AI, LLM orchestration, and full-stack development. Azure AI-102 certified.

- URL: ${BASE_URL}
- GitHub: https://github.com/aswinakofficial
- LinkedIn: https://linkedin.com/in/aswinakofficial

## About

AI Engineer experienced in building enterprise semantic systems, RAG, agentic LLM flows, and full-stack applications.

## Technical Skills

- **AI/ML:** RAG Pipelines, LangChain, LlamaIndex, Databricks, LLMs, Vector Databases, Prompt Engineering.
- **Languages:** TS/JS, Python, SQL, HTML/CSS.
- **Frontend/Backend:** React, TanStack Start, Next.js, FastAPI, Node.js.
- **Cloud:** Azure, AWS, Netlify.

## Projects
${parsedProjects
  .map((p) => `- [${p.frontmatter.title}](${BASE_URL}/projects/${p.slug}): ${p.frontmatter.description}`)
  .join('\n')}

## Blog Posts
${parsedBlogs
  .map((b) => `- [${b.frontmatter.title}](${BASE_URL}/blog/${b.slug}): ${b.frontmatter.description} (Published: ${b.frontmatter.publishedAt})`)
  .join('\n')}
`

  writeFileSync('public/llms.txt', llmsTxt)
  console.log(`llms.txt generated successfully`)

  // 3. Generate llms-full.txt
  const llmsFullTxt = `${llmsTxt}

---

## Full Details of Projects & Articles

${parsedProjects
  .map(
    (p) => `### Project: ${p.frontmatter.title}
- **URL**: ${BASE_URL}/projects/${p.slug}
- **Description**: ${p.frontmatter.description}
- **Tags**: ${(p.frontmatter.tags || []).join(', ')}

${p.body}

---`
  )
  .join('\n\n')}

${parsedBlogs
  .map(
    (b) => `### Blog: ${b.frontmatter.title}
- **URL**: ${BASE_URL}/blog/${b.slug}
- **Date**: ${b.frontmatter.publishedAt}
- **Tags**: ${(b.frontmatter.tags || []).join(', ')}

${b.body}

---`
  )
  .join('\n\n')}
`

  writeFileSync('public/llms-full.txt', llmsFullTxt)
  console.log(`llms-full.txt generated successfully`)
}

generateAll().catch(console.error)
