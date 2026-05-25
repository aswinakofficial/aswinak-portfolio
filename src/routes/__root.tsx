import { Outlet, HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/lib/theme'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/lib/seo'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: siteConfig.name },
      { property: 'og:site_name', content: siteConfig.title },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.title,
          url: siteConfig.url,
          description: siteConfig.description,
          inLanguage: 'en',
          author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
        }),
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);var r=d?'dark':'light';document.documentElement.classList.add(r);document.documentElement.style.colorScheme=r}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main><Outlet /></main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
