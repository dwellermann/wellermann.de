import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
    excerpt: true,
    transform(rawData) {
        return rawData
            .filter(({ url }) => url !== '/blog/')
            .sort((a, b) => {
                return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
            })
            .map((page) => {
                return {
                    title: page.frontmatter.title,
                    url: page.url,
                    excerpt: page.frontmatter.description || page.excerpt, // Use description as fallback
                    frontmatter: page.frontmatter
                }
            })
    }
})
