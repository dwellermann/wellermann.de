---
title: Syncthing & Photoprism Setup (nicht Vollständig)
description: Anleitung zur Installation und Konfiguration von Syncthing und Photoprism auf einem Ubuntu Server
date: 2024-01-01
author: Daniel Wellermann
tags:
  - Syncthing
  - Photoprism
  - Ubuntu
  - Backup
layout: doc
footer: true
lastupdated: true
---

# Syncthing & Photoprism Setup

::: danger
**Hinweis: Dies ist keine Anleitung! Es ist eine Sammlung von Schritten und Hinweisen zur Installation und Konfiguration die ich mir gemacht habe.**

**Eigentlich hätte ich das hier nicht veröffentlicht, aber vielleicht hilft es ja dem ein oder anderen weiter.
Vorallem was die struktur und die Ports angeht.**
:::

## Voraussetzungen

1. **Virtuelle Maschine:**
   - Proxmox VM mit folgenden Spezifikationen:
     - 3 vCPUs
     - 10240 MB RAM
     - 900 GB SSD
2. **Betriebssystem:**
   - Ubuntu 24.04 LTS Server installieren
3. **Ordnerstruktur:**
   - Ordner für zukünftige Handy- und PC-Backups erstellen, z. B.:
     ```
     /home/{user}/Daniel/
     ```

## Syncthing Installation

1. **Syncthing aus dem inoffiziellen Repository installieren.**
   - Beachte die Syncthing-Konfiguration, insbesondere die IP-Adresse.

2. **Konfigurationsdatei bearbeiten:**
   - Öffne die Datei:
     ```bash
     nano /root/.local/state/syncthing/config.xml
     ```
   - Finde folgende Zeile:
     ```xml
     <address>127.0.0.1:8384</address>
     ```
   - Ersetze sie durch:
     ```xml
     <address>your-server-ip:8384</address>
     ```

3. **Firewall-Regeln hinzufügen:**
   ```bash
   sudo ufw allow syncthing
   sudo ufw allow syncthing-gui
   ```

4. **Syncthing-Dienst aktivieren und starten:**
   ```bash
   systemctl enable syncthing@{user}.service
   systemctl start syncthing@{user}.service
   systemctl status syncthing@{user}.service
   ```

## Photoprism Installation

1. **Docker-Image verwenden:**
   - Photoprism wird über ein Docker-Image installiert.

2. **Ordnerstruktur erstellen:**
   - Zwei separate Ordner für die Benutzer anlegen, z. B.:
     ```
     Daniel/Bilder
     Laura/Bilder
     ```
   - Diese Ordner werden für die individuellen Bilder der Benutzer genutzt.

3. **Docker-Compose-Datei anpassen:**
   - Pfade für die oben erstellten Ordner, die Datenbank und die Konfiguration anpassen.

4. **Ports konfigurieren:**
   - Standard-Port für Photoprism ist `2342`. Für mehrere Benutzer:
     - Daniel: `2342`
     - Laura: `2343`
   - In der Konfigurationsdatei die Ports wie folgt ändern:
     ```
     ports:
       - "2342:2342"  # Für Daniel
       - "2343:2342"  # Für Laura
     ```
