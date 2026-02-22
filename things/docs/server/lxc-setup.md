---
title: LXC Setup
description: Anleitung zur Einrichtung eines LXC Containers in Proxmox
date: 2024-01-01
author: Daniel Wellermann
tags:
  - LXC
  - Proxmox
  - Ubuntu
  - Container
layout: doc
footer: true
lastupdated: true
---
# LXC Setup Anleitung
Diese Anleitung beschreibt die Schritte zur Einrichtung eines LXC Containers in Proxmox mit Ubuntu 24.04 LTS und der Grundkonfiguration des Systems.

##  Erstelle LXC Container in Proxmox.

```markdown
1. Erstelle LXC Container
  - Ubuntu 24.04 LTS
  - Netzwerk anpassen Statische ipv4 und dhcp bei ipv6
    - ipv4 CIDR 192.168.*.*/24
    - ipv4 Gateway 192.168.*.1
    - ipv6 SLAAC
```

## Grundkonfiguration des Systems

2. Konfiguration Ubuntu 24.04 LTS

- Paketlisten aktualisieren.

```bash
apt-get update
```

- Systempakete komplett aktualisieren.

```bash
apt-get dist-upgrade -y
```

- Wichtige Tools und CA-Zertifikate installieren.

```bash
apt-get install curl btop zip unattended-upgrades ca-certificates -y
```

- Zeitzone setzen.

```bash
dpkg-reconfigure tzdata
```

- de_DE Locale in /etc/locale.gen setzen.

```bash
echo "de_DE.UTF-8 UTF-8" > /etc/locale.gen
```

- Locales non-interaktiv generieren.

```bash
dpkg-reconfigure --frontend=noninteractive locales
```

- System-Locale dauerhaft setzen.

```bash
echo -e "LANG=de_DE.UTF-8\nLANGUAGE=\"de_DE:de\"" >> /etc/default/locale
```

- Neuen Benutzer anlegen.

```bash
adduser username
```

- Benutzer zur sudo-Gruppe hinzufügen.

```bash
usermod -aG sudo username
```

- Zur Benutzer-Shell wechseln.

```bash
su - username
```

- Unattended-upgrades konfigurieren.

```bash
sudo dpkg-reconfigure --priority=low unattended-upgrades
```


## SSH Key Authentifizierung einrichten

3. SSH Key generieren (falls noch nicht vorhanden)

```markdown
3. Wechsel zu Terminal von PC
  - `ssh-copy-id username@ip`
```

---

## Weiterführende Links

- [Haus IT — Überblick über meine gesamte Heiminfrastruktur](/docs/server/haus-it)
- [Syncthing & Photoprism Setup](/docs/server/syncthing-photoprism)
- [OpenCloud Test #4 — LXC-basiertes Cloud-Deployment](/blog/opencloud-test-4)
