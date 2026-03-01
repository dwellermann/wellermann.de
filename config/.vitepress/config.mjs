import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "../things",
  title: "Daniel Wellermann",
  description: `
  Internetpräsenz von Daniel Wellermann, BIM-Koordinator und Entwickler aus Velen. Experte für DESITE MD/VDC Manager, IFC, BIM-Prozesse, Softwareentwicklung im Bauwesen, Linux, Open Source, 3D-Druck und Home-Server-Infrastruktur.
  `,
  lang: "de-DE",
  appearance: "force-dark",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { name: 'og:image:width', content: '1200' }],
    ['meta', { name: 'og:image:height', content: '630' }],
    ['meta', { name: 'og:image:type', content: 'image/png' }],
    ['meta', { name: 'og:site_name', content: 'wellermann.de' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@D_Wellermann' }],
    ['meta', { name: 'twitter:creator', content: '@D_Wellermann' }]

  ],
  transformHead: (ctx) => {
    // Add custom meta tags based on page frontmatter
    const tags = []

    const frontmatter = ctx.pageData.frontmatter

    // Description
    if (frontmatter.description) {
      tags.push(['meta', { name: 'description', content: frontmatter.description }])
      tags.push(['meta', { property: 'og:description', content: frontmatter.description }])
      tags.push(['meta', { name: 'twitter:description', content: frontmatter.description }])
    }

    // Title
    if (frontmatter.title) {
      const title = frontmatter.title
      tags.push(['meta', { property: 'og:title', content: title }])
      tags.push(['meta', { name: 'twitter:title', content: title }])
    }

    // Keywords (from tags)
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      tags.push(['meta', { name: 'keywords', content: frontmatter.tags.join(', ') }])
    }

    // Author
    const author = frontmatter.author || "Daniel Wellermann"
    tags.push(['meta', { name: 'author', content: author }])
    tags.push(['meta', { name: 'twitter:creator', content: '@D_Wellermann' }]) // Static for now, could be dynamic

    // Image
    if (frontmatter.image || frontmatter.cover) {
      const imageUrl = frontmatter.cover || (typeof frontmatter.image === 'string' ? frontmatter.image : null)
      if (imageUrl) {
        tags.push(['meta', { property: 'og:image', content: imageUrl }])
        tags.push(['meta', { name: 'twitter:image', content: imageUrl }])
      }
    }

    // Canonical URL + og:url
    const siteUrl = 'https://wellermann.de'
    const rawPath = ctx.pageData.relativePath
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '')
    const pageUrl = rawPath ? `${siteUrl}/${rawPath}` : siteUrl
    tags.push(['link', { rel: 'canonical', href: pageUrl }])
    tags.push(['meta', { property: 'og:url', content: pageUrl }])

    // Schema.org JSON-LD
    if (frontmatter.title) {
      const relativePath = ctx.pageData.relativePath
      const isBlog = relativePath.startsWith('blog/')
      const schemaType = isBlog ? 'BlogPosting' : 'TechArticle'
      const datePublished = frontmatter.date
        ? new Date(frontmatter.date).toISOString()
        : undefined
      const dateModified = ctx.pageData.lastUpdated
        ? new Date(ctx.pageData.lastUpdated).toISOString()
        : datePublished

      const schema = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        headline: frontmatter.title,
        description: frontmatter.description || '',
        author: {
          '@type': 'Person',
          name: author,
          url: siteUrl
        },
        publisher: {
          '@type': 'Person',
          name: 'Daniel Wellermann',
          url: siteUrl
        },
        url: pageUrl,
        datePublished: datePublished,
        dateModified: dateModified,
        keywords: frontmatter.tags ? frontmatter.tags.join(', ') : '',
        inLanguage: 'de-DE'
      }
      // Felder ohne Wert entfernen
      Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k])
      tags.push(['script', { type: 'application/ld+json' }, JSON.stringify(schema)])
    }

    return tags
  },
  sitemap: {
    hostname: 'https://wellermann.de',
    transformItems: (items) => {
      return items.map(item => {
        const url = item.url
        const isBlog = url.includes('/blog/')
        const isHome = url === '/' || url === ''
        return {
          ...item,
          changefreq: isHome || isBlog ? 'weekly' : 'monthly',
          priority: isHome ? 1.0 : isBlog ? 0.8 : 0.6,
        }
      })
    }
  },
  themeConfig: {
    footer: {
      message: '',
      copyright: '2012-now © Daniel Wellermann'
    },
    lastUpdated: {
      text: 'Zuletzt aktualisiert',
      dateStyle: 'full',
      timeStyle: 'medium'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog', activeMatch: '/blog/' },
      { text: 'Docs', link: '/docs', activeMatch: '/docs/' },
      { text: 'Projects', link: '/projects', activeMatch: '/projects/' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: 'Blog Posts',
          collapsed: false,
          items: [
            { text: 'HeatSync PWM — Statusbericht Phase 2', link: '/blog/heastsync-PWM-Post1' },
            { text: 'Mein Wechsel zu Fedora', link: '/blog/wechsel-zu-fedora' },
            { text: 'OpenCloud Test #4', link: '/blog/opencloud-test-4' },
          ]
        }
      ],
      '/docs/': [
        {
          text: 'Server & Cloud',
          collapsed: false,
          items: [
            { text: 'Haus IT', link: '/docs/server/haus-it' },
            { text: 'LXC Setup', link: '/docs/server/lxc-setup' },
            { text: 'Photoprism & Syncthing', link: '/docs/server/syncthing-photoprism' },
          ]
        },
        {
          text: 'Development',
          collapsed: false,
          items: [
            { text: 'WebApp Deploy Script', link: '/docs/development/webapp-deploy-script' },
          ]
        },
        {
          text: 'Snippets & Tools',
          collapsed: false,
          items: [
            { text: 'zsh Setup', link: '/docs/snippets/zsh' },
          ]
        }
      ],
      '/projects/': [
        {
          text: 'Projekte',
          items: [
            { text: 'NUC Server', link: '/projects/NUC_Server' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/wellermann/' },
      { icon: 'github', link: 'https://github.com/dwellermann' },
      { icon: 'instagram', link: 'https://www.instagram.com/daniel.wellermann/' },
      { icon: 'facebook', link: 'https://www.facebook.com/wellermann.daniel' },


    ]
  }
})
