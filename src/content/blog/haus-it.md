---
title: "Haus IT"
description: "Ein direkter Einblick in meine private IT-Infrastruktur – Hardware, Software und Architektur. Effizient und unter meiner Kontrolle."
pubDate: "2023-10-01"
author: "Daniel Wellermann"
category: "Homelab"
tags: ["Homelab", "Proxmox", "Netzwerk", "Infrastructure"]
---

# Meine Private Cloud

**Kurzfassung:** Überblick über meine private IT-Infrastruktur – Hardware, Netzwerk, Dienste und WireGuard-Tunnel. Stabil, energieeffizient, unter meiner Kontrolle.

Dies ist die Architektur meiner privaten IT-Infrastruktur. Das Ziel: ein stabiles, energieeffizientes und wartungsarmes System, das mir die volle Kontrolle über meine Daten und Dienste gibt.

## Das Fundament: Hardware und Netzwerk

Die physische Basis muss zuverlässig sein. Ausfälle werden auf ein Minimum reduziert.

### Netzwerktopologie

![Netzwerktopologie](/images/HomeLab.drawio.png)
Der Datenfluss ist linear und einfach gehalten.

**WAN -> AVM Fritz!Box -> Ubiquiti US-16-PoE -> LAN & WLAN**

-   **Fritz!Box:** Dient als reines Modem und Gateway zum Internet. Alle weiteren Funktionen sind deaktiviert.
-   **Ubiquiti UniFi Switch (US-16-PoE):** Das Rückgrat des Netzwerks. Verwaltet alle kabelgebundenen Geräte und versorgt die Access Points via Power over Ethernet (PoE) mit Strom.
-   **Ubiquiti UniFi Access Points:** Drei APs (zwei im Haus, einer im Außenbereich) sorgen für eine lückenlose WLAN-Abdeckung.

### Server-Hardware

Zwei Server nach dem Prinzip der Aufgabenteilung: ein primäres System für den Betrieb und ein sekundäres für Backups.

#### 1. Proxmox Main (Produktivsystem)

Ein Intel NUC, der für diesen Zweck in ein Servergehäuse umgebaut wurde. Der komplette Umbau ist im Projektartikel **[Projekt: NUC Server](/projects/NUC_Server)** detailliert beschrieben.

-   **CPU:** Intel Core i3-4010U
-   **RAM:** 16 GB DDR3
-   **Speicher:**
    -   128 GB NVMe SSD für Proxmox und ISOs.
    -   1 TB SATA SSD für VMs und Container.

#### 2. Proxmox Backup (Datensicherheit)

Ein älteres Supermicro-System, dessen einzige Aufgabe das Sichern von Daten und VMs ist.

-   **CPU:** Intel Celeron 1037U
-   **RAM:** 4 GB DDR3
-   **Speicher:** 4 TB HDD im RAID 1 Verbund (Spiegelung) für Redundanz.

## Das Gehirn: Software und Dienste

Als Virtualisierungsplattform läuft auf beiden Servern `Proxmox VE`. Es ist Open-Source, stabil und bietet eine klare Web-Oberfläche. Alle Dienste sind in schlanken LXC-Containern oder VMs gekapselt.

Die folgenden Dienste laufen auf dem **Proxmox Main** Server:

-   **UniFi Controller:**
    -   **Zweck:** Zentrale Verwaltung der Ubiquiti Netzwerkkomponenten (Switch & APs).
    -   **Status:** Essentiell für den Netzwerkbetrieb.

-   **OpenHab:**
    -   **Zweck:** Steuerung und Automatisierung des Smart Homes.
    -   **Status:** Die Kommandozentrale für Licht, Heizung und Sensoren.

-   **Webserver & Gateway:**
    -   **Zweck:** Dient als `Nginx Reverse Proxy` für den Zugriff auf interne Dienste und als `WireGuard`-Endpunkt.
    -   **Status:** Das sichere Tor zur Außenwelt.

-   **Paperless-ngx:**
    -   **Zweck:** Digitalisierung und Archivierung von Dokumenten. OCR inklusive.
    -   **Status:** Sorgt für ein papierloses Büro.

-   **Syncthing:**
    -   **Zweck:** Dezentrale Synchronisation von Dateien zwischen meinen Geräten (PC, Laptop, Smartphone).
    -   **Status:** In Betrieb. Wird zukünftig durch eine vollwertige Cloud-Lösung (z.B. Nextcloud) ergänzt.

-   **AdGuard Home:**
    -   **Zweck:** Netzwerkweiter DNS-Server zum Blockieren von Werbung und Trackern.
    -   **Status:** Schützt alle Geräte im Netzwerk ohne Client-Software.

## Anbindung: Der WireGuard-Tunnel

Ein permanenter `WireGuard`-Tunnel verbindet mein Heimnetz mit einem gemieteten Root-Server.

**[Heimnetz] <--- WireGuard ---> [Root-Server]**

Dieser Aufbau erfüllt zwei Zwecke:

1.  **VPN-Zugriff:** Sicherer Zugriff auf mein gesamtes LAN von unterwegs.
2.  **Ressourcen-Sharing:** Bestimmte Dienste oder Anfragen können über die feste IP des Root-Servers geleitet werden.

Das System ist eine kontinuierliche Weiterentwicklung. Es ist so konzipiert, dass es funktioniert, ohne ständig Aufmerksamkeit zu erfordern.

---

## Weiterführende Links

- [LXC Setup — Container-Einrichtung auf Proxmox](/docs/server/lxc-setup)
- [Syncthing & Photoprism Setup](/docs/server/syncthing-photoprism)
- [NUC im Servergehäuse — Hardware des Homelabs](/projects/NUC_Server)
