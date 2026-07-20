---
title: "Zylinder abdrehen mit einem 3D-gedruckten Spreizdorn"
description: "Wenn die Quetschkante des Zylinders nicht passt und klassisches Einspannen auf der Drehbank zu riskant ist, hilft der 3D-Drucker."
pubDate: "2026-07-20"
author: "Daniel Wellermann"
category: "Maker"
image: "/blog/Zylinder-3D-Druck1.jpg"
tags: ["3D-Druck", "Drehbank", "ASA-X", "Scootertuning", "Werkstatt", "Malossi"]
---

# Custom-Werkzeug aus dem 3D-Drucker: Die perfekte Quetschkante

**Kurzfassung:** Die 1,3 mm Quetschkante meines Malossi Sport 70ccm Zylinders war mir für den Alltag zu ineffizient. Um 0,3 mm auf der Drehbank plan und sicher abzutragen, habe ich mir kurzerhand einen Spreizdorn aus ASA-X gedruckt. Ein perfektes Zusammenspiel aus klassischer Zerspanung und modernem 3D-Druck.

## Das Problem mit dem Einspannen

Grauguss-Zylinder lassen sich auf der Drehbank wunderbar zerspanen, aber das Einspannen ist oft ein heikles Thema. Spannt man außen an den empfindlichen Kühlrippen, machen sie bei etwas zu viel Druck schnell "Knack". Nimmt man stattdessen das dünne Kolbenhemd (den Laufbuchsen-Ansatz), droht man die feine Laufbahn unrund zu quetschen.

Das Abdrehen des Zylinderkopfs wäre eine Alternative (z. B. sicher eingespannt über einen Dorn im Zündkerzengewinde), jedoch verringert man dabei gleichzeitig die Tiefe der O-Ring-Nut. Diese müsste dann aufwendig auf den Zehntelmillimeter exakt nachgestochen werden.

Die eleganteste Lösung ist also, den Zylinder schonend, formschlüssig und zentriert von *innen* in der Laufbahn zu fixieren. Klassischerweise dreht man sich dafür einen Spreizdorn aus POM. Da bei mir aber ein 3D-Drucker steht, dachte ich mir: Warum an der Drehbank mühsam sägen und feilen, wenn man das Werkzeug im CAD auch smart konstruieren und drucken kann?

## Die Konstruktion: Smarter Vorrichtungsbau

Ich habe mich als Material für **ASA-X (von CR3D)** entschieden. Es ist extrem temperaturstabil, schlagfest, hat eine bombastische Layerhaftung und lässt sich (im Gegensatz zu PLA) hervorragend auf der Drehbank zerspanen, ohne weich zu werden oder zu schmieren.

Das Design im CAD war simpel, aber mit einigen technischen Kniffen versehen:
* **Massiver Spannschaft:** Ein solider Block für den festen Sitz im 4-Backenfutter der Drehbank.
* **Anschlagbund:** Ein breiter Teller, an dem der Zylinderfuß absolut plan im 90°-Winkel anliegen kann.
* **Spreiz-Schaft:** Der Teil, der nachher saugend in die Zylinderbohrung ragt.
* **Der 60°-Konus:** Vorne im Schaft direkt integriert, passend für die mitlaufende Körnerspitze meines Reitstocks.
* **Integrierte Längsschlitze:** Vier Schlitze auf 75 % der Länge, die den vorderen Schaft flexibel machen.

**Ein extrem wichtiges Detail (Der Kerbspannungsabbau):** Am Ende jedes Schlitzes, kurz vor dem Anschlagbund, habe ich Entlastungsbohrungen (kleine runde Löcher) eingefügt. Würden die Schlitze in einer harten 90°-Ecke enden, würde der Kunststoff beim Spreizen entlang der Schichten aufplatzen. Durch die kleine Rundung verteilt sich die Kraft im Material perfekt – das ASA-X federt, bricht aber niemals.

## Slicer-Settings für die Zerspanung

Damit ein 3D-gedrucktes Teil auf einer Drehbank funktioniert und spanend bearbeitet werden kann, braucht es vor allem eins: Fleisch. Die Slicer-Einstellungen müssen darauf ausgelegt sein:

* **6 Außenwände (Perimeter):** Das ergibt knapp 2,4 mm massives Material am Rand. Wenn ich den Dorn später überdrehe, kratze ich nur die obersten Wände an, ohne das hohle Infill freizulegen.
* **30 % Kreuzgitter-Infill:** Das war der absolute Sweet-Spot. Zu viel Infill, und der Dorn wird so steif, dass der Reitstock ihn nicht mehr auseinanderdrücken kann. 30 % stützen die Wände perfekt beim Abdrehen ab und lassen dem Dorn trotzdem die nötige Flexibilität.
* **6 Schichten (Boden/Decke) bei 0,2 mm Schichthöhe:** Sorgt für maximale Stabilität an den Auflageflächen.

![Der 3D-gedruckte ASA-X Spreizdorn in der Hand](/blog/Zylinder-3D-Druck1.jpg)
*Frisch aus dem Drucker: Der fertige ASA-X Spreizdorn. Gut zu erkennen sind die Entlastungsbohrungen am Ende der Schlitze, die ein Einreißen des Kunststoffs verhindern.*

## Perfektion durch absichtliches Übermaß

Ein 3D-Drucker produziert immer kleine Z-Naht-Pickel oder minimale Schrumpfungen. Um einen 100 % perfekten Plan- und Rundlauf für das Werkzeug zu garantieren, habe ich den Spreiz-Schaft absichtlich mit Übermaß (47,3 mm) gedruckt.

Ab damit ins 4-Backenfutter. Bei laufender Spindel habe ich den Anschlagbund einmal kurz plangezogen und den Schaft auf saugende ~46,95 mm abgedreht. Dadurch eliminiert man im Handumdrehen jede noch so kleine Druckungenauigkeit. Der Dorn lief fortan in meiner Maschinenspindel auf den Hundertstelmillimeter genau rund.

## Der Moment der Wahrheit

Zylinder aufgeschoben, Reitstock-Spitze nachgeführt und in den konischen ASA-X Schaft gedrückt. Die gedruckten Lamellen bogen sich butterweich nach außen und pressten sich flächig gegen die Hohnung des Grauguss-Zylinders. Da wackelte absolut nichts mehr.

![Grauguss-Zylinder aufgespannt auf der Drehbank mit dem 3D-gedruckten Dorn](/blog/Zylinder-3D-Druck1.jpg)
*Bombenfester Sitz: Durch die mitlaufende Körnerspitze im Reitstock wird das ASA-X von innen gegen die Zylinderlaufbahn gepresst. Zentriert und bereit zum Abdrehen.*

Mit einem scharfen Meißel und moderatem Vorschub ließen sich die 0,3 mm von der Zylinderoberkante völlig stressfrei abdrehen. Ein letzter Handgriff mit feinem Schleifpapier, um die messerscharfe Innenkante der Laufbahn leicht zu entgraten und das Projekt war erfolgreich beendet.

## Ein unaufgeregtes Fazit

Aus den werkseitigen 1,3 mm ist nun eine knackige, alltagstaugliche 0,9-0,95 mm Quetschkante geworden.

Aber fast noch mehr Freude als das reine Tuning-Ergebnis macht mir das Werkzeug selbst. Es beweist einmal mehr, wie genial man traditionelle Zerspanungstechnik und modernen 3D-Druck miteinander verheiraten kann. Anstatt ewig lange herumzufeilen, reichte ein kurzer Ausflug ins CAD und an den Drucker. Das Resultat ist ein passgenaues Spezialwerkzeug, das von nun an einen festen Platz in meiner Werkstattschublade hat.
