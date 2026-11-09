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
    siteConfig.description,
    "",
    "## Fachliche Schwerpunkte",
    "- Digitale Bauprozesse, BIM-Koordination, IFC und strukturierte Daten.",
    "- GNU/Linux, Self-Hosting, Proxmox, Container und nachvollziehbare Infrastruktur.",
    "- Softwareentwicklung als Werkzeug für fachliche Probleme.",
    "- Open Source, digitales Handwerk und 3D-Druck.",
    "",
    "## Kanonische Seiten",
    `- ${absoluteUrl("/")}`,
    `- ${absoluteUrl("/blog")}`,
    `- ${absoluteUrl("/contact")}`,
    "",
    "## Blogartikel",
    ...posts.flatMap((post) => [
      `### ${post.data.title}`,
      `URL: ${absoluteUrl(`/blog/${post.id}`)}`,
      `Datum: ${post.data.pubDate.toISOString().slice(0, 10)}`,
      `Zusammenfassung: ${post.data.description}`,
      "",
      post.body,
      "",
    ]),
  ].join("\n");
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
