---
title: "HeatSync PWM Translator — Statusbericht Phase 2"
description: "Projektdokumentation: Stabiler 500Hz PWM-Ausgang, Tester-Sketch und nächste Schritte."
pubDate: "2025-12-20"
author: "Daniel Wellermann"
category: "Embedded"
tags: ["Heizung", "PWM", "Arduino", "Prototyp"]
---

# HeatSync PWM Translator — Statusbericht Phase 2

**Kurzfassung:** Das Projekt löst die Inkompatibilität zwischen der Viessmann EM‑SM1 Solarsteuerung und modernen OEG‑Umwälzpumpen. Die Steuerung liefert ein proprietäres PWM‑Signal; moderne Pumpen erwarten ein standardisiertes. Phase 2 ist abgeschlossen: stabiler 500 Hz PWM‑Ausgang, automatisierter Tester‑Sketch, erster Praxislauf erfolgreich.

## Ergebnis — Phase 2

- **Status:** Phase 2 — Abgeschlossen. Erster Praxislauf über mehrere Geschwindigkeitsstufen erfolgreich.
- **PWM‑Output:** Stabiler 500 Hz PWM mit Timer1 (Fast PWM, TOP über `ICR1`).
- **Tester‑Sketch:** `arduino_code/src/main.cpp` enthält ein Testprogramm, das automatisiert Duty‑Cycle‑Stufen (98%, 70%, 33%, 5%) durchläuft und die Werte seriell protokolliert.
- **Repo:** PlatformIO‑Konfiguration: `arduino_code/platformio.ini`.

## Technische Details

> Hinweis: Ich bin kein Profi im Embedded‑Bereich; Learnings und KI‑Hilfen sind dokumentiert.

- **Timer:** Timer1 im Fast PWM Mode (Mode 14). Mit `ICR1 = 3999`, F_CPU = 16 MHz und Prescaler = 8 ergibt sich ~500 Hz.
- **Pin:** PWM auf OC1A (Arduino Pin `9`).
- **Duty‑Cycle:** Berechnung: `OCR1A = (ICR1 * percentage) / 100`.

Code‑Auszug (aus `arduino_code/src/main.cpp`):

```cpp
// TOP für ~500 Hz
ICR1 = 3999; // bei F_CPU=16MHz, Prescaler=8
// Duty setzen (Beispiel)
unsigned long ocrValue = ((unsigned long)ICR1 * percentage) / 100;
OCR1A = ocrValue;
```

## Roadmap

- **Phase 3:** Optokoppler‑Eingangstest (z. B. `ILD213T`) — galvanische Trennung prüfen.
- **Phase 4:** Eingangsmessung und Ausgangs‑Mapping in einem Sketch; Validierung mit realer Pumpe.
- **Phase 5:** Portierung auf Arduino Nano, Platinenlayout und Gehäuseentwurf.
- **Phase 6:** Feldtest und Abschlussdokumentation.

## Sicherheit

> ⚠️ Dieses Gerät beeinflusst ein Heizungssystem. Galvanische Trennung (Optokoppler) und ein externes 5 V‑Netzteil sind vorgesehen. Arbeiten am System nur mit entsprechender Vorsicht und Fachkenntnis durchführen.

## Links

- GitHub: https://github.com/dwellermann/HeatSync-PWM
- Sketch: `arduino_code/src/main.cpp`
- PlatformIO: `arduino_code/platformio.ini`
