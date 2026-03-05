---
title: "OpenCloud Test #4"
description: "Mein OpenCloud Test nummer 4 oder Q4 Test - Deployment und Migration von Nextcloud"
pubDate: "2024-10-05"
author: "Daniel Wellermann"
category: "Cloud"
tags: ["OpenCloud", "Docker", "Nextcloud", "LXC", "Traefik"]
---

> **Status**
>
> ***2025-10-23:*** Test bisher ohne Probleme, Client für Linux funktioniert auf ubuntu 25\* einwandfrei.
>
> **2025-10-05:** Installation und Grundkonfiguration abgeschlossen, Test läuft.

# Open Cloud Test 4

## Vorwort

Dies ist der vierte Test seit dem Release von OpenCloud und der erste, der ernsthaft dokumentiert wird.
Ich deploye ihn auf meinem Produktions‑Proxmox‑Server, da ich eine echte Nextcloud‑Migration testen möchte.

## Vorbereitung

Es wird ein LXC‑Container mit Ubuntu 24.04 LTS erstellt und grundkonfiguriert.
[Anleitung LXC Setup](/docs/server/lxc-setup)

## OpenCloud‑Ordner im LXC anlegen

Bevor wir der OpenCloud‑Anleitung folgen, legen wir den Installationsordner an, damit mehrere Instanzen möglich sind:
```bash
mkdir ~/opencloud4-1 && cd ~/opencloud4-1
```

## Anleitung von OpenCloud

Ich folge der Docker‑Compose‑Anleitung von OpenCloud und nutze Traefik als Reverse‑Proxy.

## Schnelle Schritte in der Konsole

```bash
git clone https://github.com/opencloud-eu/opencloud-compose.git
cd opencloud-compose
cp .env.sample .env
nano .env
```

In der .env die folgenden Variablen anpassen (Beispiele / Platzhalter):

`*Bei mir steht c41 für OpenCloud Test 4 vers. 1 (Cloud 41)*`

- TRAEFIK_DASHBOARD=true
- TRAEFIK_DOMAIN=traefik.c41.DEINE.DOMAIN
- OC_DOMAIN=cloud.c41.DEINE.DOMAIN
- COLLABORA_DOMAIN=collabora.c41.DEINE.DOMAIN
- WOPISERVER_DOMAIN=wopiserver.c41.DEINE.DOMAIN
- INITIAL_ADMIN_PASSWORD=MeinSicheresPasswort

> ⚠️ **ACHTUNG!**
>
> Steht nicht in der Doku
> Eines der COMPOSE_FILE‑Optionen auskommentieren. In meinem Fall mit Collabora:
>
> `COMPOSE_FILE=docker-compose.yml:weboffice/collabora.yml:traefik/opencloud.yml:traefik/collabora.yml`

## DNS‑Einträge anlegen

Beispiel (wildcard auf interne IP zeigen):
```
*.c41.wellermann.de -> 192.168.x.199
```

Starten:

```bash
sudo docker compose up -d
```

Prüfen:

```bash
sudo docker ps
```

## Testen der ereichbarkeit

Rufe die Domain im Browser auf: https://cloud.c41.DEINE.DOMAIN

***Done***

![Test Bild](/images/OpenCloud-Test41-1.png)

## OpenCloud Client für Linux

Für den Test wurde der **OpenCloud Client V.2.0.0** als AppImage verwendet. Die Installation erfolgte gemäß der offiziellen OpenCloud-Dokumentation.

### Einrichtung

Die Einrichtung war einfach und problemlos. Der Client verbindet sich zuverlässig mit der OpenCloud-Instanz.

### Hinweis

Die Version 3.* des Clients befindet sich derzeit noch in der Beta-Phase und wurde nicht getestet.

### Screenshot

Hier ein Screenshot der Desktop-Anwendung:

![OpenCloud Client Screenshot](/images/OpenCloud-Test41-2.png)

---

## Weiterführende Links

- [LXC Setup — Container-Einrichtung auf Proxmox](/docs/server/lxc-setup)
- [Haus IT — Die zugrundeliegende Infrastruktur](/docs/server/haus-it)
