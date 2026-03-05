---
title: "NUC im Servergehäuse"
description: "Dokumentation des Umbaus eines Intel NUC in ein kompaktes Servergehäuse. Ziel: Integration in eine bestehende Infrastruktur und eine saubere Bauform."
pubDate: "2023-11-15"
author: "Daniel Wellermann"
category: "Hardware"
tags: ["Hardware", "Server", "DIY", "Homelab"]
---
# Projekt: NUC im Servergehäuse

Ein Intel NUC ist leistungsstark und effizient, aber sein Desktop-Gehäuse ist für einen strukturierten Aufbau unpraktisch. Das Ziel dieses Projekts war es, einen NUC in ein Server-Chassis zu integrieren. Das Resultat ist ein kompakter, leiser und wartungsfreundlicher Server.

![Der fertige NUC Server im Gehäuse](/images/NUC_server_1.jpeg)

## Die Komponenten

Eine überschaubare Liste an Hardware war für den Umbau notwendig.

-   **Basis:** Intel NUC (hier: Modell mit i3-4010U)
-   **Gehäuse:** Ein kompaktes Servergehäuse (z.B. ein altes Firewall- oder Router-Chassis)
-   **Speicher (SSD):** `HP S700 1TB SATA`
-   **Arbeitsspeicher (RAM):** `motoeagle 16GB Kit (2x8GB) DDR3L 1600 MHz SODIMM`
-   **Befestigung:** Starkes, doppelseitiges Industrie-Klebepad
-   **Verkabelung:**
    -   Gewinkeltes SATA- und Stromkabel für die SSD
    -   Gewinkelter Pin-Header-Adapter für Front-Panel-Anschlüsse (Power, LED)

## Der Umbau: Schritt für Schritt

Der Prozess ist mechanisch und erfordert nur grundlegende Anpassungen.

### 1. Demontage und Vorbereitung des NUC

Die Vorbereitung ist einfach. Es muss nur die Bodenplatte entfernt werden, um Zugang zur Platine zu erhalten.

### 2. Montage im Gehäuse

Der NUC wurde kopfüber im Servergehäuse platziert. Dies ermöglicht einen direkten Zugang zu den Anschlüssen und eine bessere Luftzirkulation.

-   **Befestigung der Platine:** Der NUC wird von einem starken, doppelseitigen Klebepad sicher an seinem Platz gehalten. Eine Verschraubung war nicht nötig.
-   **Befestigung des Netzteils:** Das komplette externe Netzteil (Trafo) wurde ebenfalls mit einem Klebepad im Gehäuse befestigt. Es wurde nicht geöffnet.

<!-- ![Interner Aufbau des NUC Servers](/pfad/zum/internen_aufbau.jpg) -->

### 3. Anschluss der Peripherie

Die größte Herausforderung war die Verkabelung auf engstem Raum. Standardkabel waren zu sperrig.

-   **SATA-SSD:** Die `HP S700 1TB SSD` wurde mit einem gewinkelten SATA- und Stromkabel an die NUC-Platine angeschlossen. Die SSD selbst ist fest im Gehäuse verschraubt. Ein Foto der Verschraubung reiche ich nach, sobald die nächste Wartung ansteht und das Gehäuse geöffnet wird.
-   **Front-Panel (Power & LED):** Die Pins für den Power-Button und die Status-LEDs auf der NUC-Platine sind schwer zugänglich. Ein gewinkelter Pin-Adapter war die Lösung. Dieser musste mechanisch leicht angepasst (zugefeilt) werden, um exakt zu passen.

## Ergebnis

Der umgebaute NUC läuft stabil und leise als mein primärer Proxmox-Server. Die Integration in das Servergehäuse sorgt für eine saubere Optik, besseres Kabelmanagement und eine einfache Wartung.

Ein simpler Umbau mit signifikantem praktischem Nutzen.
