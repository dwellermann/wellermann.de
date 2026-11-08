---
title: "3D-Scan trifft Roller-Tuning: Passgenauen Ansaugbogen aus TPU drucken"
description: "Mit Photogrammetrie, Blender, Shapr3D und TPU entsteht ein passgenauer Ansaugbogen für den originalen Piaggio-Herzkasten."
pubDate: "2026-11-08"
author: "Daniel Wellermann"
category: "Maker"
image: "/blog/reverse-tpu-ass/Vergleich-Plan-vs-Auswführung.webp"
tags: ["3D-Druck", "TPU", "Photogrammetrie", "Scootertuning", "Piaggio", "CAD"]
---

# 3D-Scan trifft Roller-Tuning: Passgenauen Ansaugbogen aus TPU drucken

**Kurzfassung:** Wer mich kennt, weiß: Ich liebe es, Probleme zu lösen. Praxisnah, machbar und ohne unnötigen Bullshit. Der originale Piaggio-Luftfilterkasten der ersten Serie, der "Herzkasten", ist in der Szene heilig, passt ab Werk aber an keinen großen Tuning-Vergaser. Statt Heißluftföhn und Baumarkt-Schläuchen habe ich den Einbauraum per Photogrammetrie gescannt und einen strömungsoptimierten Ansaugbogen aus TPU gedruckt.

## Das Problem mit dem Gummi

Wer einen Polini CP 19 auf einem Piaggio-Hyper2-Motor fahren, aber unauffällig und leise unterwegs sein will, behält den originalen Herzkasten. Das Problem: Winkel und Abstand zwischen Vergaserflansch und Luftfilterkasten passen einfach nicht zusammen.

Die Standardlösung aus der Tuning-Szene: Den alten Originalschlauch mit dem Heißluftföhn weichkochen, mit Gewalt über den großen Vergaser würgen, drei Schlauchschellen drum und hoffen, dass das Konstrukt hält. Das sieht nicht nur nach Pfusch aus, es ist auch die Fehlerquelle Nummer eins für Falschluft und abgemagerte Motoren. Ein harter Knick im Ansaugweg sorgt zudem für Strömungsabrisse.

Die Anforderung war für mich also klar: ein perfekt sitzender, strömungsoptimierter Bogen, der den Unterdruck bei 9.000 U/min problemlos aushält – und das mit Mitteln, die für jeden Maker erreichbar sind.

## Der Workflow: High-Tech trifft Low-Tech

Um so einen Bogen im CAD sauber zu zeichnen, braucht man exakte Winkel und Abstände. Mit dem Messschieber im eingebauten Zustand am Moped herumzufuchteln, endet meist in zig fehlerhaften Prototypen. Meine Lösung: den kompletten Bauraum digitalisieren.

Das Geniale an diesem Workflow: Ein Großteil der genutzten Programme ist Freeware oder Open Source. Man braucht keine teuren Lizenzen, um Probleme professionell zu lösen.

![Vergleich zwischen dem digitalen Modell in Blender und dem realen Einbauraum am Roller](/blog/reverse-tpu-ass/Vergleich-Plan-vs-Auswführung.webp)
*Plan gegen Realität: Das CAD-Modell wird direkt mit dem bereinigten 3D-Scan abgeglichen.*

### 3D-Scan & der Zollstock-Trick

Motor, Vergaser und Herzkasten wurden im eingebauten Zustand mit der Photogrammetrie-App Kiri Engine gescannt. Die nötigen Tracking-Marker habe ich mir einfach selbst gebastelt und aufgeklebt.

Der wichtigste Low-Tech-Trick dabei: Ein simpler Zollstock lag mit im Scan-Bereich. Photogrammetrie-Scans haben oft keinen echten Maßstab. Mit dem Zollstock im Bild hatte ich eine perfekte Referenzgröße.

### Bereinigung in Blender

Der rohe Scan ist oft krumpelig und voller Stördaten. In Blender, ebenfalls Open Source, habe ich das Modell anhand des Zollstocks mit wenigen Klicks auf den exakten Millimeter skaliert und bereinigt.

### CAD in Shapr3D

Den maßstabsgetreuen Scan habe ich als 3D-Schablone in Shapr3D importiert. Mit den exakten Anschlusspunkten aus der Realität ließ sich der Radius für den Ansaugbogen millimetergenau modellieren. Kein harter Knick, sondern ein sanfter Sweep, damit die Luftsäule nicht abreißt.

### Kontrolle in Blender

Abschließend wurden CAD-Modell und 3D-Scan noch einmal übereinandergelegt und geprüft. Das digitale Gummiteil saß im virtuellen Raum saugend zwischen Vergaser und Kasten.

## Druck & Material: Warum TPU?

Ein starres Bauteil aus ASA oder PETG würde hier gnadenlos versagen. Der Motor vibriert in Gummi-Silentblöcken, der Kasten ist starr verschraubt – ein hartes Rohr würde brechen oder an den Schellen undicht werden.

Das Material der Wahl: **TPU (Thermoplastisches Polyurethan)**.

- Es ist flexibel genug, um die Motorvibrationen zu entkoppeln.
- Es dichtet durch seine eigene Shore-Härte perfekt am Vergaser ab.
- Es ist resistent gegen Benzin und Öl.

Gedruckt wurde das Ganze mit OrcaSlicer, ebenfalls Open Source. TPU verzeiht keine Fehler bei Flow Rate oder Pressure Advance. Damit der Bogen bei vollem Ansaug-Unterdruck nicht wie ein leerer Strohhalm in sich zusammenfällt, braucht er Wandstärke – Fleisch. Mehrere Außenwände, also Perimeter, sorgen dafür, dass das Gummi flexibel, aber gegen den Unterdruck absolut formstabil bleibt.

## Ein pragmatisches Fazit

Das Ergebnis spricht für sich. Vergaser und Luftfilter sind absolut spannungsfrei und zu 100 % dicht verbunden. Keine Falschluft, keine Strömungsabrisse, keine Kompromisse.

Für mich ist dieses Projekt wieder der beste Beweis für meine Philosophie: Ein konkretes, mechanisches Problem erkennen und es dann mit den passenden, zugänglichen Werkzeugen praxisnah lösen. Handwerk ist Logik zum Anfassen – auch wenn es am Ende "nur ein Gummi" ist.

<video controls preload="metadata" aria-label="Finaler Test des Rollers mit dem TPU-Ansaugbogen">
  <source src="/blog/reverse-tpu-ass/Roller-Final-TPU-ASS.mp4" type="video/mp4" />
  Dein Browser unterstützt dieses Video nicht.
</video>

*Der montierte TPU-Ansaugbogen.*
