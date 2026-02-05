import { createContentLoader } from 'vitepress'

export default createContentLoader('projects/*.md', {
    excerpt: true,
    transform(rawData) {
        return rawData
            .filter(({ url }) => url !== '/projects/')
            .sort((a, b) => {
                return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
            })
            .map((page) => {
                return {
                    title: page.frontmatter.title,
                    url: page.url,
                    excerpt: page.frontmatter.description || page.excerpt,
                    frontmatter: page.frontmatter
                }
            })
    }
})
