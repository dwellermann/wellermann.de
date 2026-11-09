import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const absoluteUrl = (path: string) => new URL(path, siteConfig.url).href;
  const content = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Wichtige Seiten",
    `- [Startseite](${absoluteUrl("/")}): Profil, fachliche Schwerpunkte und Kontakt.`,
    `- [Blog](${absoluteUrl("/blog")}): Praxis-Akten zu BIM, Infrastruktur, Linux und Entwicklung.`,
    `- [Kontakt](${absoluteUrl("/contact")}): Öffentliche Kontakt- und Profilwege.`,
    "",
    "## Blog",
    ...posts.map((post) => `- [${post.data.title}](${absoluteUrl(`/blog/${post.id}`)}): ${post.data.description}`),
    "",
  ].join("\n");
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
