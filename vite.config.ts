import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    // MDX must come before viteReact
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      rehypePlugins: [rehypeSlug, rehypePrettyCode],
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        // Skip non-HTML assets discovered during link crawl
        filter: (page) => !page.path.match(/\.(pdf|png|jpg|svg|ico|xml|txt|json|css|js)$/),
      },
    }),
    viteReact({ include: /\.(jsx|tsx)$/ }),
  ],
})
