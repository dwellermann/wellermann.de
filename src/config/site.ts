import { link } from "node:fs";
import ogImage from "../assets/og-image.png";
import { describe } from "node:test";

export const siteConfig = {
  name: "Daniel Wellermann",
  description:
    "Internetpräsenz von Daniel Wellermann, BIM-Koordinator und Entwickler aus Velen. Experte für DESITE MD/VDC Manager, IFC, BIM-Prozesse, Softwareentwicklung im Bauwesen, Linux, Open Source, 3D-Druck und Home-Server-Infrastruktur.",
  url: "https://wellermann.de",
  lang: "de-DE",
  locale: "de_DE",
  author: "Daniel Wellermann",
  twitter: "@danielwellermann",
  ogImage: ogImage,
  socialLinks: [
    { icon: "lucide:linkedin",
      href: "https://www.linkedin.com/in/wellermann/" ,
      name: "LinkedIn",
      describe: "Verbinden Sie sich mit mir auf LinkedIn, um berufliche Updates und Einblicke zu erhalten."
    },
    { icon: "lucide:instagram", href: "https://www.instagram.com/daniel.wellermann/" , name: "Instagram" ,
      describe: "Folgen Sie mir auf Instagram, um Einblicke in meine Projekte, Reisen und persönlichen Interessen zu erhalten."

    },
    { icon: "lucide:github", href: "https://github.com/dwellermann/" , name: "GitHub",
      describe: "Besuchen Sie mein GitHub-Profil, um meine Projekte und Beiträge zu Open-Source-Initiativen zu sehen."
    },
    { icon: "lucide:facebook", href: "https://www.facebook.com/wellermann.daniel" , name: "Facebook",
      describe: "Folgen Sie mir auf Facebook, um Updates und Einblicke in meine Aktivitäten zu erhalten."
    },
  ],
  navLinks: [
    { text: "Home", href: "/" },
  //  { text: "About", href: "/about" },
//    { text: "Services", href: "/services" },
    { text: "Blog", href: "/blog" },
  { text: "Kontakt", href: "/contact" },
//    { text: "Widgets", href: "/widgets" },
  ],
};
