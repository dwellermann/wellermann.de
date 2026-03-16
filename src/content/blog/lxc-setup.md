---
title: "LXC Setup"
description: "Anleitung zur Einrichtung eines LXC Containers in Proxmox"
pubDate: "2024-01-01"
author: "Daniel Wellermann"
category: "Homelab"
tags: ["LXC", "Proxmox", "Ubuntu", "Container"]
---
# LXC Setup Anleitung

**Kurzfassung:** Einrichtung eines LXC-Containers in Proxmox mit Ubuntu 24.04 LTS – von der Container-Erstellung bis zur SSH-Key-Authentifizierung.

Diese Anleitung beschreibt die Schritte zur Einrichtung eines LXC-Containers in Proxmox mit Ubuntu 24.04 LTS und der Grundkonfiguration des Systems.

## LXC Container in Proxmox erstellen

1. LXC Container erstellen:
   - Ubuntu 24.04 LTS
   - Netzwerk anpassen: statische IPv4, DHCP bei IPv6
     - IPv4 CIDR: `192.168.*.*/24`
     - IPv4 Gateway: `192.168.*.1`
     - IPv6: SLAAC

## Grundkonfiguration (Ubuntu 24.04 LTS)

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


## SSH-Key-Authentifizierung einrichten

SSH-Key vom PC aus kopieren:

```bash
ssh-copy-id username@ip
```

---

## Weiterführende Links

- [Haus IT — Überblick über meine gesamte Heiminfrastruktur](/docs/server/haus-it)
- [Syncthing & Photoprism Setup](/docs/server/syncthing-photoprism)
- [OpenCloud Test #4 — LXC-basiertes Cloud-Deployment](/blog/opencloud-test-4)
