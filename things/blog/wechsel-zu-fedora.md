---
title: Mein Wechsel zu Fedora
description: Blog über den Wechsel zu Fedora - Die Suche nach der goldenen Mitte zwischen Arch und Ubuntu
date: 2024-11-15
category: Linux
tags: 
  - Linux
  - Fedora
  - Ubuntu
  - Arch
  - Desktop
layout: doc
footer: true
lastupdated: true
---

# Mein Wechsel zu Fedora: 

## Die Suche nach der goldenen Mitte

Als Linux-Nutzer der ersten Stunde (seit 2005 dabei!) habe ich die wilden Zeiten miterlebt – damals, als man WLAN-Treiber noch selbst kompilierte und die `xorg.conf` per Hand editierte.

Meine Reise war lange Zeit geprägt von **Arch Linux**. Es war wie ein selbstgebauter Hot Rod in der Garage: Schnell, puristisch, genau nach meinen Wünschen geschraubt. Mein Setup lief wie ein Uhrwerk – Btrfs, GNOME, 700 Pakete, drei Snapshots. Wenn es klemmte, wusste ich warum.

Doch irgendwann kam der Punkt, an dem man "erwachsen" wird. Man will nicht mehr schrauben, man will einfach nur fahren. Ich wollte ein gemachtes Nest. Also beging ich, was viele Veteranen als "Vernunftehe" bezeichnen würden: **Ich wechselte zu Ubuntu.**

## Das Ubuntu-Jahr: Eine Ehe mit Handbremse

Ein Jahr lang habe ich Ubuntu (Non-LTS) auf dem Desktop genutzt. Der Plan war: Weniger Wartung, mehr "It just works".
Die Realität fühlte sich jedoch anders an. Der Umzug vom Arch-Tiny-House in den Ubuntu-Plattenbau mit Hausmeister-Service war ein Kulturschock.

Ubuntu wirkte oft wie ein guter Wille mit schlechtem Timing. Es war solide wie ein **VW Golf**, aber einer, bei dem der Hersteller die Motorhaube zugeschweißt hat.

### Was mich wirklich gestört hat

*   **Der "Snap"-Zwang:** Firefox oder Thunderbird als Snap zu starten, fühlte sich an, als würde man einen Güterzug anschieben. Es nimmt dem System die Spritzigkeit.
*   **Die "Nanny"-Mentalität:** Ubuntu bevormundet. Es liefert stark gepatchte Software und hält an Versionen fest, die sich für einen Ex-Arch-User wie ein Museumsbesuch anfühlen.
*   **Stabilität vs. Realität:** Ironischerweise musste ich in diesem einen Jahr Ubuntu öfter Kernel zurückrollen als in zehn Jahren Arch. Auch Drucker (CUPS) liefen unzuverlässiger. Es war paradox: Ich wollte Stabilität, bekam aber Trägheit gepaart mit kleinen Bugs.

::: info Der Server-Unterschied
Um das klarzustellen: Auf meinen Servern läuft weiterhin **Ubuntu LTS** oder **Debian**. Dort ist Konservatismus Gold wert. Aber auf dem Desktop, wo ich entwickle und moderne Hardware nutze, fühlte sich Ubuntu an wie Fahren mit angezogener Handbremse.
:::

## Auftritt Fedora: Der BMWunter den Distros

Und dann kam Fedora.
Wenn Arch der Bastel-Hot-Rod ist und Ubuntu der langsame VW Golf, dann ist Fedora der **moderne BMW M5**.

Es ist die perfekte Balance. Professionell genug für den Business-Einsatz, aber unter der Haube steckt ein Sportwagen. Fedora hat mir gezeigt, dass man nicht zwischen "Bleeding Edge" (Arch) und "Ancient History" (Ubuntu) wählen muss. Es gibt einen "Leading Edge" Mittelweg.

### Warum Fedora für Entwickler der Sweetspot ist

1.  **Vanilla GNOME:** Fedora liefert GNOME so aus, wie die Entwickler es gedacht haben. Keine Themes, keine Docks, keine Patches. Einfach, sauber, workflow-orientiert.
2.  **Technologie-Vorreiter:** Wayland, PipeWire, Systemd, Btrfs – Fedora implementiert die Standards von morgen schon heute, aber (anders als Arch) mit einer QA-Abteilung, die sicherstellt, dass es auch funktioniert.
3.  **Flatpak statt Snap:** Fedora setzt auf offene Standards. Flatpaks fühlen sich schneller an und integrieren sich besser in das Ökosystem als der "Walled Garden" von Canonicals Snap Store.

## Aber... Fedora und Ubuntu-Server?

Ein häufiger Einwand war: *"Aber ich muss doch das gleiche OS nutzen wie auf dem Server!"*
Nein, muss man nicht. Das ist ein Mythos aus dem Jahr 2015.

Jetzt teste ich **Distrobox** (oder vllt Toolbx mal schauen).
Wenn ich etwas für den Ubuntu-Server testen muss, starte ich einfach einen Container:

```bash
distrobox create --image ubuntu:22.04 --name server-env
distrobox enter server-env
```

Bin gespannt im zweifel LXC und fertig. 

## Zwischenfazit: Die Probefahrt beginnt

Um ehrlich zu bleiben: Ich bin noch in der Einfahrphase. Mein Fedora-System läuft erst seit kurzem, und wir befinden uns quasi noch in den Flitterwochen.

Der erste Eindruck ist jedoch vielversprechend. Wenn Arch der selbstgebaute Hot Rod war und Ubuntu der solide, aber etwas träge VW Golf, dann fühlt sich Fedora aktuell an wie ein **neuer Dienstwagen aus der Oberklasse**. Er hat genug PS unter der Haube, um Spaß zu machen, wirkt aber seriös genug, um nicht jeden Morgen vor der Arbeit schrauben zu müssen.

**Der Plan für die nächsten Monate:**
Ich werde testen, ob dieser "Sweetspot" zwischen Aktualität und Stabilität auch im harten Alltag hält.
*   Nervt `dnf` irgendwann doch?
*   Brechen GNOME-Extensions beim nächsten Update?
*   Vermisse ich die Debian-Stabilität meiner Server?

Aktuell genieße ich die frische Luft ohne Snap-Zwang und mit einem Vanilla-GNOME, das einfach "flutscht". Ob Fedora wirklich der "Daily Driver" für die nächsten Jahre bleibt oder ob ich doch reumütig zu Arch wechsle, wird sich zeigen.

Ich werde berichten. Bis dahin:

👋 *Bye bye `apt`, hello `dnf` (zumindest vorerst).*


## System-Setup: Was ich konfiguriert habe

Nach der Installation habe ich mein System nach meinen Bedürfnissen eingerichtet. 

###   **Hier ein Überblick:**

### DNF-Konfiguration anpassen

Zuerst habe ich die DNF-Konfiguration optimiert, um schnellere Downloads und bessere Paketverwaltung zu gewährleisten:

```bash
sudo nano /etc/dnf/dnf.conf
```

```ini
[main]
gpgcheck=True
installonly_limit=3
clean_requirements_on_remove=True
best=False
skip_if_unavailable=False
max_parallel_downloads=10
fastestmirror=True
```

Anschließend ein Update durchgeführt:

```bash
sudo dnf upgrade --refresh
```

### Shell-Umgebung: zsh + Oh My Zsh

Als langjähriger zsh-Nutzer war das einer der ersten Schritte:

```bash
sudo dnf install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Zusätzlich habe ich `eza` als modernen `ls`-Ersatz installiert und entsprechende Aliases konfiguriert.

### GNOME Extensions

Um GNOME noch produktiver zu machen, habe ich folgende Tools und Extensions installiert:

```bash
sudo dnf install gnome-tweaks
sudo dnf install gnome-extensions-app
sudo dnf install gnome-shell-extension-appindicator
sudo dnf install gnome-shell-extension-gsconnect
```

**Nautilus-Erweiterungen:**

```bash

sudo dnf install nautilus-extension 
```

### Entwicklungsumgebung

Als Entwickler brauchte ich natürlich meine gewohnte Toolchain:

**Git-Konfiguration**
```bash
git config user.name "Daniel Wellermann"
git config user.email "..."
```

SSH-Keys konfiguriert für GitHub und meine Server (PVE, AdGuard, etc.)

**Node.js via NVM**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install node
```

**Go Language**
```bash
wget https://go.dev/dl/go1.25.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.25.5.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

**Visual Studio Code**

Über das offizielle Microsoft-Repository installiert, damit Updates automatisch über DNF kommen.

### Anwendungen

Die wichtigsten Programme für meinen Alltag:

- **Thunderbird**: E-Mail-Client
- **KeePassXC**: Passwort-Manager
- **VLC**: Multimedia-Player
- **OBS Studio**: Für Screencasts und Aufnahmen
- **Shotcut**: Video-Editing
- **Gradia**: Screenshot-Tool (als Flatpak)
- **btop**: System-Monitoring im Terminal
