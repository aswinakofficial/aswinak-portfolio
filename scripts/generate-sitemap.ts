import { writeFileSync } from 'fs'
import { glob } from 'glob'

const BASE_URL = 'https://aswin.xpar.in'
const STATIC_ROUTES = ['/', '/about', '/projects', '/blog', '/services', '/contact']

async function generateSitemap() {
  const blogFiles = await glob('src/content/blog/*.mdx')
  const projectFiles = await glob('src/content/projects/*.mdx')

  const blogRoutes = blogFiles.map(
    (f) => `/blog/${f.split('/').pop()?.replace('.mdx', '')}`
  )
  const projectRoutes = projectFiles.map(
    (f) => `/projects/${f.split('/').pop()?.replace('.mdx', '')}`
  )

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
}

generateSitemap().catch(console.error)
