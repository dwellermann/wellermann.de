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
    if (frontmatter.image) {
        // Handle both object (src/alt) and string formats if necessary, standard VP is usually local path
        // For OG tags we generally want a full URL if possible, or a path.
        // Assuming frontmatter.image might be a simple string path in some contexts or object in others.
        // VitePress default theme often uses image: { src: '', alt: '' } for hero but simple strings for custom fields.
        // let's assume we might add an explicit 'cover' field or use 'image'.
        // For safely, let's look for a specific 'cover' or 'image' field that is a string URL.
        const imageUrl = frontmatter.cover || (typeof frontmatter.image === 'string' ? frontmatter.image : null)
        if (imageUrl) {
            tags.push(['meta', { property: 'og:image', content: imageUrl }])
            tags.push(['meta', { name: 'twitter:image', content: imageUrl }])
        }
    }

    return tags
  },
  sitemap: {
    hostname: 'https://wellermann.de',
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
