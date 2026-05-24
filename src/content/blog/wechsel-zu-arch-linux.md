---
title: "Wechsel zu Arch Linux"
description: "Ein persönlicher Blick auf digitale Souveränität, pragmatische Entscheidungen und die Frage, warum das Arch-Ökosystem plötzlich wieder so vertraut wirkt."
pubDate: "2026-05-24"
author: "Daniel Wellermann"
category: "Linux"
image: "/blog/default.png"
tags: ["Linux", "CachyOS", "Arch", "COSMIC", "Fedora", "Desktop"]
---

# Gedanken zum Wechsel: Warum ich von Fedora zu CachyOS gewandert bin

**Kurzfassung:** Nach einer wirklich guten und stabilen Zeit mit Fedora nutze ich aktuell CachyOS mit der COSMIC Desktop-Umgebung. Kein Drama, kein "Fedora ist plötzlich schlecht". Es ist vielmehr eine kleine Reise zurück zu den eigenen Open-Source-Wurzeln, getrieben von einem leisen Bauchgefühl. 

## Die Zeit mit Fedora: Ein ehrliches Danke

Vielleicht erinnerst du dich an meinen [Beitrag über den Wechsel zu Fedora](/blog/wechsel-zu-fedora). Und um es gleich vorwegzunehmen: Ich nehme kein Wort davon zurück. Fedora hat mir exakt das geliefert, was ich damals gesucht habe. Es war die viel zitierte goldene Mitte. Eine Distribution, die einfach funktioniert, aktuelle Pakete liefert und mich nie im Stich gelassen hat. 

Warum also wechseln, wenn doch alles läuft? 

Manchmal ändern sich nicht die Systeme, sondern das Umfeld – und der eigene Blick darauf. Kürzlich wurde bekannt, dass Microsoft für seine Azure 4.0 Infrastruktur stark auf Fedora als Basis setzt. Versteh mich nicht falsch: Das ist für Fedora als Projekt vermutlich gut. Es beweist die technische Exzellenz der Distribution. 

Aber bei mir persönlich hat das den finalen Anstoß gegeben. Das Thema digitale Souveränität und Unabhängigkeit auf meinem privaten Desktop war mir schon immer extrem wichtig. Um ehrlich zu sein: Fedora war in diesem Bereich durch die tiefe Verwurzelung mit Red Hat (und IBM) für mich ohnehin immer schon ein kleiner Kompromiss, eine ständige Gratwanderung. Wenn nun aber weitere globale Tech-Giganten beginnen, massiv Ressourcen in ein Projekt zu leiten, verschiebt sich unweigerlich das Zentrum der Aufmerksamkeit. Es entsteht oft eine Enterprise-Lobby. Für mich war das schlicht der Moment einzusehen, dass die Balance für mich nun gekippt ist. Es ist kein Boykott gegen Fedora. Es ist einfach der konsequente Schritt zurück zu einem System, das komplett unabhängig agiert.

## Pragmatismus trifft auf Arch-Nostalgie

So rückte das Arch-Ökosystem wieder in mein Blickfeld. Arch ist in seiner Struktur herrlich unaufgeregt und unpolitisch. Eine reine Community-Meritokratie. 

Früher hätte ich mir nun einen Kaffee gemacht und Arch liebevoll über das Terminal von Grund auf neu aufgebaut. Heute bin ich da ehrlich gesagt pragmatischer. Ich schätze meine Zeit. Und genau hier holte mich **CachyOS** ab. 

CachyOS nimmt mir die Fleißarbeit ab. Es liefert unter der Haube pures Arch Linux, optimiert für moderne Hardware, mit einer unglaublich hilfsbereiten Community im Rücken. Dass bei der Installation anfangs ein paar Pakete mehr auf der Platte landen als bei einem streng asketischen Vanilla-Arch, sehe ich mittlerweile sehr entspannt. Das System fühlt sich einfach unheimlich rund und flüssig an.

Ein beruhigender Gedanke im Hinterkopf: Da CachyOS zu 100 % auf den Arch-Repositories aufbaut, habe ich keinen Vendor-Lock-in. Sollte das Projekt jemals einschlafen, nutze ich einfach Arch weiter. Keine Neuinstallation, kein Stress.

## Das Sicherheitsnetz: Btrfs, Snapper und Limine

Wer an Rolling Releases denkt, hat oft sofort Sorge vor zerschossenen Updates. Zu meinen alten Arch-Zeiten habe ich dem entgegengewirkt, indem ich mir mühsam eigene Update-Skripte geschrieben und mit Btrfs-Snapshots sowie der GRUB-Integration hantiert habe. Das funktionierte, war aber mit ordentlich Pflegeaufwand verbunden.

Es ist unglaublich erfrischend, dass ich das im Jahr 2026 nicht mehr muss. CachyOS bringt dieses Sicherheitsnetz direkt mit – und zwar augenscheinlich perfekt vorkonfiguriert. Vor jedem Paket-Update wird nun durch Snapper vollautomatisch ein Snapshot erstellt. Sollte ein neuer Kernel wirklich mal streiken, wähle ich im **Limine**-Bootmenü (das übrigens angenehm schlicht und modern ist) einfach den Stand von gestern. 

Es ist genau das Setup, das ich mir früher händisch gebaut habe – nur dass es heute einfach out-of-the-box funktioniert und mir die nötige Ruhe für den Arbeitsalltag gibt.

## COSMIC: Tiling, aber nur wenn ich will

Auch auf dem Desktop gab es einen kleinen Wechsel. GNOME war lange mein Zuhause, aber ich wollte der neuen **COSMIC** Desktop-Umgebung eine echte Chance geben. 

Was mich daran hält? Die absolute Unaufgeregtheit, mit der es sich an *mich* anpasst, nicht umgekehrt. Das Tiling-System ist fantastisch durchdacht. Aber das Beste daran: Wenn ich an einem müden Freitagabend einfach nur klassische, schwebende Fenster herumschieben möchte, schalte ich das Tiling mit einem Tastendruck ab. Keine starren Konzepte, keine Kompromisse. Einfach ein Werkzeug, das funktioniert.

## Ein unaufgeregtes Fazit

Es fühlt sich an wie nach Hause zu kommen, aber in eine renovierte Wohnung. Ich habe das grenzenlose AUR zurück, gepaart mit einem pragmatischen Setup und der Gewissheit, ein OS zu nutzen, das von der Community für die Community gebaut wird. 

Ist CachyOS nun die ultimative, fehlerfreie Lösung für alle Zeiten? Wahrscheinlich nicht. Die Reise mit Linux hört ja glücklicherweise nie wirklich auf. Aber für den Moment passt es einfach perfekt.

---

## Mein Setup (So wenig wie möglich, so viel wie nötig)

Früher habe ich Stunden in Konfigurationsdateien verbracht und seitenlange Install-Skripte gepflegt. Heute lautet meine Devise: Wenn der Standard gut ist, bleibt er.

Die Zeiten, in denen ich für Node.js externe Versionsmanager wie NVM brauchte oder Go umständlich als Tarball laden musste, sind unter Arch schlicht vorbei. Die Repositories sind so aktuell, dass ich meine gesamte Entwicklungsumgebung ganz entspannt und direkt über den Paketmanager beziehen kann.

Auch bei der Shell halte ich es simpel. Statt wie gewohnt Zsh mit diversen Plugins aufzubohren, nutze ich dieses Mal schlicht **Fish**. Komplett ohne Plugins. Es ist out-of-the-box pfeilschnell, bringt grandioses Highlighting sowie Autovervollständigung mit und macht genau das, was es soll. Selbst die Konfiguration von `pacman` habe ich bisher nicht angerührt – es passt einfach.

Mein System besteht aktuell aus einer überschaubaren Handvoll an Werkzeugen, die einfach ihren Job machen:

- **Entwicklung:** Node.js, Go, Git und VS Code (als proprietäre Version entspannt aus dem AUR via `paru` bezogen).
- **Kommunikation & Orga:** Thunderbird für E-Mails und KeePassXC als Passwort-Manager.
- **Medien & Kreation:** VLC (oder mpv) für Medien und OBS Studio für Screencasts.
- **System & Isolation:** Flatpak für alles, was strikt isoliert bleiben soll.
- **Terminal:** `btop` – ein kleines bisschen System-Monitoring im Terminal darf dann doch nicht fehlen.

*Das reicht erst einmal. Falls ich in den nächsten Wochen doch noch den Drang verspüre, tiefer in das System einzugreifen, gibt es dazu sicher irgendwann einen Nachtrag.*