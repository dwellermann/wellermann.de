---
title: "Mein Wechsel zu Fedora"
description: "Blog über den Wechsel zu Fedora - Die Suche nach der goldenen Mitte zwischen Arch und Ubuntu"
pubDate: "2024-11-15"
author: "Daniel Wellermann"
category: "Linux"
tags: ["Linux", "Fedora", "Ubuntu", "Arch", "Desktop"]
---

# Mein Wechsel zu Fedora:

## Kurzfassung

Ich nutze Linux seit 2005. Nach vielen Jahren mit Arch (XFCE u. Gnome) wollte ich was neues auf dem Desktop vorallem mit Gnome als DE. Ein Jahr mit Ubuntu zeigte mir, dass dessen Entscheidungen (Snap, starke Patches) nicht zu meinem Workflow passen.

Ich respektiere Ubuntu, damit bin ich in die Linux‑Welt gestartet und es hat mich die ersten Jahre begleitet. Allerdings zwangen mich Ubuntu-Versionen 25.04 und 25.10 zweimal, den Kernel zurückzurollen. Das war mir in den letzten Jahren unter Arch nicht passiert.

Ich hätte bei Arch bleiben könnnen und fast wäre ich von Ubuntu wieder zurückgekehrt.
Doch Fedora hatte ich noch nie wirklich ausprobiert. Kurzerhand entschied ich mich für Fedora 43.

## Warum Fedora

- **Vanilla GNOME:** GNOME so, wie die Entwickler es vorgesehen haben — sauber und vorhersehbar.
- **Leading edge mit QA:** Aktuelle Technologien (Wayland, PipeWire, Btrfs) werden früh geliefert, aber getestet.
- **Flatpak statt Snap:** Bessere Integrations- und Paketphilosophie für Desktops.

## Server vs. Desktop

Meine Server laufen weiter auf Ubuntu LTS oder Debian. Desktop und Server müssen nicht dieselbe Distribution haben. Für servernahe Tests nutze ich Container (z. B. Distrobox oder LXC):

```bash
distrobox create --image ubuntu:22.04 --name server-env
distrobox enter server-env
```

## Fazit

Fedora ist derzeit mein Daily Driver. Es liefert moderne Software und fühlt sich schnell und stabil an.
Gnome läuft viel runder als unter Ubuntu. Ich bin gespannt wie lange ich Fedora nutzen werde und ob ich doch am Ende wieder zu Arch zurückkehre.

👋 Bye bye apt,pacman — hello dnf.

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
