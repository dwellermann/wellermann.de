---
title: "Mein Wechsel zu Fedora"
description: "Blog über den Wechsel zu Fedora - Die Suche nach der goldenen Mitte zwischen Arch und Ubuntu"
pubDate: "2024-11-15"
author: "Daniel Wellermann"
category: "Linux"
tags: ["Linux", "Fedora", "Ubuntu", "Arch", "Desktop"]
---

# Mein Wechsel zu Fedora

**Kurzfassung:** Nach einem Jahr Ubuntu auf dem Desktop bin ich zu Fedora 43 gewechselt. Vanilla GNOME, Flatpak statt Snap, aktuelle Technologien mit QA – passt besser zu meinem Workflow.

## Ausgangslage

Ich nutze Linux seit 2005. Nach vielen Jahren mit Arch (XFCE und GNOME) wollte ich etwas Neues auf dem Desktop, vor allem mit GNOME als DE. Ein Jahr mit Ubuntu zeigte mir, dass dessen Entscheidungen (Snap, starke Patches) nicht zu meinem Workflow passen.

Ich respektiere Ubuntu – damit bin ich in die Linux‑Welt gestartet und es hat mich die ersten Jahre begleitet. Allerdings zwangen mich Ubuntu-Versionen 25.04 und 25.10 zweimal, den Kernel zurückzurollen. Das war mir in den letzten Jahren unter Arch nicht passiert.

Fedora hatte ich noch nie wirklich ausprobiert. Kurzerhand entschied ich mich für Fedora 43.

## Warum Fedora

- **Vanilla GNOME:** GNOME so, wie die Entwickler es vorgesehen haben — sauber und vorhersehbar.
- **Leading edge mit QA:** Aktuelle Technologien (Wayland, PipeWire, Btrfs) werden früh geliefert, aber getestet.
- **Flatpak statt Snap:** Bessere Integrations- und Paketphilosophie für Desktops.

## Der Knackpunkt: LTS vs. Rolling Release

Zwei Extreme prägen oft die Linux-Desktop-Welt: *LTS* (wie Ubuntu) und *Rolling Release* (wie Arch).
Bei LTS-Versionen rennst du auf dem Desktop nach einem Jahr immer neueren Softwarepaketen hinterher – für Entwickler, die aktuelle Toolchains brauchen, ein echter Krampf. PPA-Chaos vorprogrammiert.
Arch Linux auf der anderen Seite ist großartig, erfordert aber dauerhafte Aufmerksamkeit (*Bleeding Edge*).
Für mich bringt Fedora hier die goldene Mitte: Ein Release alle 6 Monate (*Leading Edge*). Ich habe brandaktuelle Pakete, profitiere von den neuesten Wayland-Optimierungen, aber das System wird vor dem Release gründlich durch die QA-Abteilung getestet. Kein Basteln am Wochenende, um einen zerschossenen Grafiktreiber nach einem Update via Pacman händisch reparieren zu müssen.

## Server vs. Desktop

Meine Server laufen weiter auf Ubuntu LTS oder Debian. Desktop und Server müssen nicht dieselbe Distribution haben. Für servernahe Tests nutze ich Container (z. B. Distrobox oder LXC):

```bash
distrobox create --image ubuntu:22.04 --name server-env
distrobox enter server-env
```

## Fazit

Fedora ist mein aktueller Daily Driver. Moderne Software, fühlt sich schnell und stabil an.
GNOME läuft deutlich runder als unter Ubuntu. Mal sehen, wie lange das so bleibt – und ob mich der Rolling-Release-Charme von Arch irgendwann zurückzieht.

👋 Bye bye apt, pacman — hello dnf.

## System-Setup

Nach der Installation habe ich das System nach meinen Bedürfnissen eingerichtet.

### DNF-Konfiguration

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

Meine gewohnte Toolchain:

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
