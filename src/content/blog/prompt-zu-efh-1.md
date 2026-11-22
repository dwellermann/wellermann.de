---
title: 'Vom Prompt zu Bauzeichnung(3D)'
description: 'Über 20 Jahre am Bau, aber rudimentäre CAD-Kenntnisse: Ein Praxis-Test mit BIMCraft, Goose, MCP und den wahren Kosten von Gemini 4 Hydrogen und Mistral Large.'
pubDate: 2026-11-21
image: "/blogs/bimcraft-efh-hero.png"
tags: ['BIM', 'Open Source', 'KI', 'MCP', 'Goose', 'BIMCraft', 'CachyOS']
author: "Daniel Wellermann"
---

## Kurzfassung

Ich bin schon so lange im Baugeschäft (über 20 Jahre), habe aber nur rudimentäre CAD-Kenntnisse. Als BIM-Experte liebe ich offene Standards und Schnittstellen – und Kollisionsprüfungen sind für mich Süßigkeiten, denn ich habe selbst schon genug Kernbohrungen gemacht. Aber CAD und das gerade in der Bauwirtschaft ist eben ein ganz anderes Spiel.

Als ich gesehen habe, wie zuletzt selbst komplexe Kreativ-Tools wie die Adobe-Suite-Welt mit Rust und KI neu gedacht wurden, musste es doch auch etwas Vergleichbares für die Bauwirtschaft geben: Da bin ich über **BIMCraft** gestolpert. Und wenn **MCP (Model Context Protocol)** ohnehin am Start ist – wofür sich mühsam in die Tool-Bedienung einarbeiten, wenn die KI das Modellieren übernehmen kann? :-P


## Problemstellung

Ein klassisches zweigeschossiges Einfamilienhaus (10,00 × 8,50 m, EG + Vollgeschoss OG + Satteldach ohne Ausbau, mehrschichtige 47-cm-Außenwand mit Klinker, Luftschicht, Dämmung und Kalksandstein) sauber als BIM-Modell aufzubauen, kostet im CAD enorm viel Klickarbeit: Ebenen anlegen, Wandschichten korrekt nach außen ausrichten, Deckenöffnungen über der Treppe freischneiden, Fenster setzen und Giebel an die Dachfläche anschneiden.

Mein konkretes Problem: **Kann ich diese gesamte Modellier-Arbeit per natürlicher Sprache über MCP an einen KI-Agenten abgeben – und kommt dabei am Ende ein brauchbares, stimmiges BIM-Modell heraus?**

## Systeminfo & Setup

Damit sich das Setup nachvollziehen lässt, hier die Kurzfassung:

- **System:** CachyOS (Linux)
- **BIM-Software:** [IPedrax/BIMCraft](https://github.com/IPedrax/BIMCraft) (Open-Source-BIM in Rust, gestartet mit `--control 40747` für die lokale Agenten-Brücke)
- **KI-Agent:** Goose Desktop (Flatpak, per `flatpak-spawn --host` an `bimcraft-cli mcp --connect` gekoppelt)

![Verbindung zwischen Goose und BIMCraft über MCP](/blog/goose-bimcraft-workflow.png)

## Was passiert, wenn die KI einfach loslegt

### 1. Kostenlose API-Tarife bremsen Agenten aus
Im kostenlosen Free Tier (z. B. bei Google Gemini) klingt der Test erstmal verlockend. In der Praxis prallt man damit aber schnell gegen eine Wand: Für ein ganzes Haus schickt Goose nicht *eine* Frage, sondern **20 bis 40 einzelne Tool-Aufrufe** hintereinander. Das Ergebnis sind ständige `429`-Rate-Limits und `503`-Wartezeiten. Erst mit einem aktiven Pay-as-you-go-API-Plan lief der Ablauf flüssig durch.

### 2. Vage Prompts bauen krumme Grundrisse
Mein erster Versuch ohne feste Koordinaten (*„Mach mal Diele, HWR, Gäste-WC und Wohnen im EG, darüber Schlafzimmer, zwei Kinderzimmer und Bad“*) zeigte sofort die Grenzen:

- **Komische Raumaufteilungen:** Schmale Restschläuche und unlogische Raumübergänge.
- **Vergessene Schichten:** Auf der Dachebene bekamen die Giebeldreiecke plötzlich eine einfache Standardwand statt des definierten Klinker-Aufbaus.

Erst als ich dem Prompt **klare Zonen-Koordinaten** (Nordzone für Eingang, Treppe, HWR und WC; Südzone komplett fürs Wohnen; im OG ein kompakter Mittelflur über der Treppe) sowie explizite Regeln für den Giebelanschluss (`attach to roof`) mitgegeben habe, entstand ein richtig sauberes Modell.

![Fertiges Einfamilienhaus im 3D-Viewport von BIMCraft](/blog/bimcraft-efh-3d-ergebnis.png)

![Grundriss und Raumaufteilung im Erd- und Obergeschoss](/blog/bimcraft-efh-grundriss.png)

## Modellvergleich & echte Kosten

Den verbesserten Prompt habe ich am Ende gegen **Mistral Large** und **Google Gemini (`gemini-4-hydrogen`)** getestet:

- **Qualität:** Bei exakt gleichem Prompt lieferte **`Gemini 4 Hydrogen`** das deutlich bessere Ergebnis. Die Raumproportionen passten besser, und der Klinker zog sich sauber bis in die Giebelspitzen hoch. *(Bei Mistral Large klemmte zusätzlich noch, dass Goose das ganz neue Large-4-Modell samt Thinking-Steuerung noch nicht nativ kannte.)*
- **Die echten Kosten:** Im Netz liest man oft, solche KI-Workflows würden nur „ein paar Cent“ kosten. Bei kurzen Textfragen stimmt das – **nicht aber bei komplexen MCP-Agenten**. Durch die vielen Runden, Denk-Tokens und den mitwachsenden Projektkontext kostete **ein einzelner, sauberer Durchlauf mit `Gemini 4 Hydrogen` etwa 1,50 bis 2,00 €**. Alle Tests und Fehlversuche zusammen lagen am Ende bei rund **5 €**.

| Punkt | Praxisergebnis |
| :--- | :--- |
| **Besseres Modell im Test** | `Gemini 4 Hydrogen` (sauberere Räume & Klinker-Giebel) |
| **Kosten pro sauberem Haus-Lauf** | ca. **1,50 – 2,00 €** |
| **Gesamtkosten der Tests** | ca. **5,00 €** |
| **Wichtigstes Learning** | Feste Zonen-Koordinaten schlagen vage Wünsche |

## Mein Fazit – und Ausblick auf Part 2

**Zum ersten Mal habe ich mich wie ein echter Vibe Coder gefühlt.**

Ja, ich verstehe sehr viel vom Bau – aber was weiß ich im Detail, wie groß ein Fenster wirklich passend dimensioniert sein muss? Wann eine Treppe als gerader Lauf sinnvoller ist als eine U-Treppe? Oder welche Mindestmaße ein Gäste-WC braucht, damit man sich darin noch umdrehen kann?

Beim KI-unterstützten Programmieren kenne ich jedes Detail: Frameworks, Algorithmen, Architektur. Da habe ich jederzeit die volle Kontrolle und merke sofort, wenn die KI Unsinn schreibt. Aber genau hier – in einem Bereich, in dem ich eigentlich über 20 Jahre Erfahrung mitbringe – stand ich bei der Entwurfsplanung plötzlich selbst da und wusste es gar nicht so genau.

**Aus meiner Sicht gilt deshalb genau dasselbe wie in der Softwareentwicklung: Genausowenig wie gute Programmierer oder Softwareentwickler durch KI ersetzt werden, werden gute Bauzeichner oder Architekten ersetzt.** Echte Kreativität beim Lösen von Problemen ist **NOCH** ein klarer Vorteil des Menschen *(Behaltet trotzdem Matrix und I, Robot im Hinterkopf ;-) )*.

Trotzdem steht für mich fest: **Gerade das reine Aufsetzen eines Projekts über KI und MCP kann enorm viel Fleißarbeit abnehmen.** Ebenen, Wandaufbauten, Grundgerüst – das steht in wenigen Minuten, und man kann direkt per Hand oder mit `Strg+Z` eingreifen.

Damit bleiben für mich direkt zwei spannende Fragen offen, denen ich als Nächstes nachgehen will:
1. **Wie weit kommt man mit vorgefertigten Assistenten und wiederverwendbaren Bauteil-Familien**, damit die KI nicht bei jedem Projekt bei null anfängt?
2. **Kriege ich die DIN 276 direkt an das Modell dran** – also eine automatisierte Kostengliederung bis in die Kostengruppen direkt aus den BIMCraft-Bauteilen und Mengen?

Genau das wird sich in **Part 2** zeigen!
