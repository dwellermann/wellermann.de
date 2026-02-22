---
title: Universal WebApp deploy Script
description: Ein universelles Bash-Skript für moderne Web-Apps mit lftp
date: 2024-01-01
author: Daniel Wellermann
tags:
  - Deployment
  - Bash
  - lftp
  - WebApp
layout: doc
footer: true
lastupdated: true
---
# Smarter Deployen: Ein universelles Bash-Skript für moderne Web-Apps mit lftp

Als Entwickler liebst du es, an deiner Web-App zu feilen – egal ob mit React, Vue, Svelte oder einem anderen modernen Framework. Das Deployment hingegen kann schnell zu einer lästigen, fehleranfälligen Routine werden.

Die moderne Webentwicklung predigt uns dafür eine klare Lösung: Continuous Integration und Continuous Deployment (CI/CD). Werkzeuge wie GitHub Actions, Azure DevOps Pipelines oder die Google Cloud Build-Plattform sind unglaublich mächtig und für große, kollaborative Projekte oft unerlässlich.

Aber Hand aufs Herz: Ist es wirklich immer die beste Lösung, für ein kleines bis mittelgroßes Projekt eine komplexe CI/CD-Pipeline aufzusetzen? Manchmal ist ein einfacher, transparenter und robuster Ansatz nicht nur ausreichend, sondern für den produktiven Einsatz sogar überlegen. Gerade wenn das Ziel ein klassischer Webspace ohne Git-Integration ist und die Bereitstellung per SFTP erfolgen muss, kann ein lokales Skript Gold wert sein. Es gibt dir die volle Kontrolle, ist blitzschnell eingerichtet und erfordert keine Abhängigkeit von externen Diensten oder komplexen YAML-Konfigurationen.

In diesem Beitrag zeige ich dir, wie du genau so einen smarten Weg gehst. Wir erstellen ein universelles Bash-Skript, das deinen Deployment-Prozess in einen einzigen, verlässlichen Befehl verwandelt: ./deploy.sh. Effizient, sicher und für fast jedes Projekt anpassbar.

## Teil 1: Die Grundlage – Sichere `lftp`-Bookmarks einrichten (einmalig)

Anstatt Passwörter direkt in unser Skript zu schreiben (ein absolutes No-Go!), nutzen wir die Bookmark-Funktion von `lftp`. Wir speichern eine Verbindung unter einem Alias, und `lftp` kümmert sich sicher um die Anmeldedaten.

**Wichtiger Sicherheitshinweis:** `lftp` speichert das Passwort im Klartext in seiner Konfigurationsdatei (`~/.local/share/lftp/bookmarks` oder `~/.lftp/bookmarks`). Diese Datei wird jedoch standardmäßig mit restriktiven Rechten (`chmod 600`) angelegt, sodass nur du sie lesen kannst. Dies ist ein gewaltiger Sicherheitsgewinn gegenüber einem Passwort im Skript und für die meisten Hosting-Umgebungen ein exzellenter Kompromiss.

**Schritt 1: Manuelle Verbindung für den Setup**
Öffne dein Terminal und verbinde dich **einmalig** manuell mit deinem SFTP-Server. Ersetze die Platzhalter mit deinen Daten.

```bash
lftp -u dein-benutzername sftp://sftp.dein-server.de
```

`lftp` wird dich nach deinem Passwort fragen. Gib es ein und drücke Enter.

**Schritt 2: Passwortspeicherung aktivieren**
Gib in der `lftp`-Kommandozeile (`lftp :~>`) folgenden Befehl ein. Er weist `lftp` an, bei der Erstellung des nächsten Bookmarks das Passwort mitzuspeichern.

```lftp
lftp :~> set bmk:save-passwords true
```

**Schritt 3: Bookmark speichern**
Speichere nun die Verbindung unter einem leicht merkbaren Namen. Diesen Namen brauchst du später im Skript.

```lftp
lftp :~> bookmark add mein-projekt
```

**Schritt 4: Beenden und Testen**
Verlasse `lftp` mit `exit`. Teste nun, ob der Bookmark funktioniert:

```bash
lftp mein-projekt
```

Wenn du ohne Passwortabfrage verbunden wirst, hat alles geklappt! Verlasse die Sitzung wieder mit `exit`.

---

## Teil 2: Das Herzstück – Das universelle `deploy.sh`-Skript

Speichere den folgenden Code in einer Datei namens `deploy.sh` im Hauptverzeichnis deines Projekts. Die Konfiguration ist so gestaltet, dass du sie leicht für dein spezifisches Framework anpassen kannst.

```bash
#!/bin/bash

#==============================================================================
# Simple WebApp SFTP Deployment Script with LFTP
# Version: 3.0
# Author: Daniel Wellermann / wellermann.de
#==============================================================================

# --- KONFIGURATION ----------------------------------------------------------
# Passe diese Variablen an dein Projekt und deine Serverumgebung an.

# PROJEKT-EINSTELLUNGEN
# Passe diese Befehle und Pfade an dein Framework an!
# ----------------------------------------------------------------------------
# Der Build-Befehl für dein Projekt.
# Beispiele:
#   -> "npm run build" (Standard für viele Frameworks wie Vite, Vue CLI, Create React App)
#   -> "npm run generate" (Standard für Nuxt)
#   -> "astro build"
NODE_ENV="production"
NODE_COMMAND="npm run generate"

# Das lokale Verzeichnis, das nach dem Build hochgeladen werden soll.
# Beispiele:
#   -> "dist" (Vite, Vue CLI, Astro)
#   -> "build" (Create React App)
#   -> ".output/public" (Nuxt 3 Static)
#   -> "out" (Next.js Static Export)
LOCAL_DIR="dist"

# SERVER-EINSTELLUNGEN
# ----------------------------------------------------------------------------
# LFTP-Bookmark (BEVORZUGTE METHODE)
# Trage hier den Namen deines lftp-Bookmarks aus Teil 1 ein.
# Wenn dieser Wert gesetzt ist, werden die unteren SFTP-Daten ignoriert.
LFTP_BOOKMARK="mein-projekt"

# Zielverzeichnis auf dem Server (z.B. /httpdocs, /public_html, /var/www/html)
REMOTE_DIR="/"

# --- ODER: MANUELLE SFTP-DATEN (Fallback, falls kein Bookmark genutzt wird) ---
# Lasse LFTP_BOOKMARK leer, um diese Daten zu verwenden.
# ACHTUNG: Das Passwort wird bei jeder Ausführung interaktiv abgefragt.
HOST="sftp.dein-server.de"
USER="u123456"
PORT="22"

# --- ENDE DER KONFIGURATION -------------------------------------------------


# --- UI FUNKTIONEN ---------------------------------------------------

# Farben für die Ausgabe
C_GREEN="\033[0;32m"
C_RED="\033[0;31m"
C_BLUE="\033[0;34m"
C_YELLOW="\033[1;33m"
C_CYAN="\033[0;36m"
C_NC="\033[0m" # No Color

# banner und Statusmeldungen
print_banner() {
    echo -e "${C_GREEN}"
    cat << "EOF"
__        __   _       _                  ____             _
\ \      / /__| |__   / \   _ __  _ __   |  _ \  ___ _ __ | | ___  _   _
 \ \ /\ / / _ \ '_ \ / _ \ | '_ \| '_ \  | | | |/ _ \ '_ \| |/ _ \| | | |
  \ V  V /  __/ |_) / ___ \| |_) | |_) | | |_| |  __/ |_) | | (_) | |_| |
   \_/\_/ \___|_.__/_/   \_\ .__/| .__/  |____/ \___| .__/|_|\___/ \__, |
                           |_|   |_|                |_|            |___/
EOF
    echo -e "${C_CYAN}  :: Simple WebApp Deploy SCRIPT :: ${C_NC}"
    echo
}

print_step() {
    echo -e "${C_YELLOW}[*] $1${C_NC}"
    sleep 1 # Kurze Pause für den "Denk"-Effekt
}

print_success() {
    echo -e "${C_GREEN}[✓] $1${C_NC}"
}

print_error() {
    echo -e "${C_RED}[!] $1${C_NC}"
}

# --- ENDE DER UI FUNKTIONEN -------------------------------------------------
# --- SICHERHEIT -------------------------------------------------------------
# Sicherheitsabfrage für das Passwort falls kein Bookmark verwendet wird

if [[ -z "$LFTP_BOOKMARK" ]]; then
    print_step "Sicherheitsabfrage: Passwort wird benötigt"
    read -sp "Passwort für ${USER}@${HOST}: " PASSWORD
    echo
    if [[ -z "$PASSWORD" ]]; then
        print_error "Kein Passwort eingegeben. Abbruch."
        exit 1
    fi
fi

# --- SKRIPT-LOGIK -----------------------------------------------------------

clear
print_banner

# 1. System-Check: Ist lftp installiert?
print_step "System-Check wird durchgeführt..."
if ! command -v lftp &> /dev/null; then
    print_error "lftp nicht gefunden. Bitte installieren Sie es."
    echo "    -> Auf Debian/Ubuntu: sudo apt-get install lftp"
    echo "    -> Auf CentOS/RHEL:   sudo yum install lftp"
    echo "    -> Auf macOS (Homebrew): brew install lftp"
    exit 1
fi
print_success "System-Check erfolgreich. lftp ist verfügbar."
echo

# 1.5 Frage nach npm ci Ausführung
read -p "Möchten Sie 'npm ci' ausführen, um die Abhängigkeiten zu installieren? (j/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Jj]$ ]]; then
    print_step "Führe 'npm ci' aus..."
    echo -e "${C_BLUE}----------------------------------------------------------------------${C_NC}"
    echo -e "${C_CYAN}  npm ci Ausgabe:${C_NC}"
    echo -e "${C_BLUE}----------------------------------------------------------------------${C_NC}"

    npm ci
    NPM_CI_EXIT_CODE=$?

    echo -e "${C_BLUE}----------------------------------------------------------------------${C_NC}"

    if [ $NPM_CI_EXIT_CODE -ne 0 ]; then
        print_error "npm ci fehlgeschlagen! Bitte überprüfen Sie die Fehler oben."
        exit 1
    fi
    print_success "Abhängigkeiten wurden erfolgreich installiert."
    echo
fi

# 2. Build-Prozess: Führe npm build aus
print_step "Starte Build-Prozess mit ${NODE_COMMAND}..."
echo -e "${C_BLUE}----------------------------------------------------------------------${C_NC}"
echo -e "${C_CYAN}  Build-Ausgabe:${C_NC}"
echo -e "${C_BLUE}----------------------------------------------------------------------${C_NC}"

# Setze NODE_ENV und führe den Build-Befehl aus
NODE_ENV=$NODE_ENV $NODE_COMMAND
BUILD_EXIT_CODE=$?

echo -e "${C_BLUE}----------------------------------------------------------------------${C_NC}"

if [ $BUILD_EXIT_CODE -ne 0 ]; then
    print_error "Build-Prozess fehlgeschlagen! Bitte überprüfen Sie die Fehler oben."
    exit 1
fi
print_success "Build-Prozess erfolgreich abgeschlossen."
echo

# 3. Konfigurations-Check: Existiert das lokale Verzeichnis?
print_step "Überprüfe Konfiguration und lokale Dateien..."
if [ ! -d "$LOCAL_DIR" ]; then
    print_error "Lokales Verzeichnis '${LOCAL_DIR}' nicht gefunden!"
    echo "    -> Wurde der Build-Prozess korrekt ausgeführt?"
    exit 1
fi
print_success "Lokales Verzeichnis '${LOCAL_DIR}' gefunden. Bereit zum Upload."
echo -e "${C_BLUE}======================================================================${C_NC}"
echo -e "${C_CYAN}  Deployment-Zusammenfassung:${C_NC}"
echo -e "${C_BLUE}----------------------------------------------------------------------${C_NC}"
echo -e "  - ${C_YELLOW}Lokaler Ordner:${C_NC}  ${LOCAL_DIR}"
echo -e "  - ${C_YELLOW}Server:${C_NC}          ${HOST}:${PORT}"
echo -e "  - ${C_YELLOW}Benutzer:${C_NC}        ${USER}"
echo -e "  - ${C_YELLOW}Zielordner:${C_NC}      ${REMOTE_DIR}"
echo -e "${C_BLUE}======================================================================${C_NC}"
echo

read -p "Soll der Upload gestartet werden? (j/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Jj]$ ]]; then
    print_error "Abbruch durch Benutzer."
    exit 1
fi

echo

# 4. Starte den LFTP Mirror-Prozess
print_step "Verbindung zum SFTP-Server wird aufgebaut..."
print_step "Starte Synchronisation (Mirror)... Dies kann einen Moment dauern."

# Der LFTP Befehl
# -u user,pass: Setzt Benutzer und Passwort
# sftp://host:port: Legt das Protokoll, den Host und den Port fest
# -e '...': Führt die folgenden Befehle in lftp aus
#   set sftp:auto-confirm yes: Bestätigt neue SSH-Host-Keys automatisch
#   mirror -R --delete --verbose --parallel=5: Der eigentliche Spiegel-Befehl
#     -R, --reverse: Upload von lokal nach remote
#     --delete: Löscht Dateien auf dem Server, die lokal nicht existieren
#     --verbose: Zeigt jede Dateiübertragung an (perfekt für die Hacker-UI!)
#     --parallel=5: Bis zu 5 Dateien gleichzeitig hochladen für mehr Speed
#   quit: Beendet die lftp-Sitzung sauber

if [[ -n "$LFTP_BOOKMARK" ]]; then
    print_step "Verwende lftp-Bookmark: ${LFTP_BOOKMARK}"
    lftp -c "open ${LFTP_BOOKMARK}; \
         set sftp:auto-confirm yes; \
         mirror -R --delete --verbose --parallel=5 '${LOCAL_DIR}' '${REMOTE_DIR}'; \
         quit"
else
    print_step "Keine lftp-Bookmarks verwendet. Direktverbindung zum Server."
    lftp -u "${USER},${PASSWORD}" sftp://"${HOST}":"${PORT}" \
     -e "set sftp:auto-confirm yes; \
         mirror -R --delete --verbose --parallel=5 '${LOCAL_DIR}' '${REMOTE_DIR}'; \
         quit"
fi
# 5. Ergebnis auswerten
if [ $? -eq 0 ]; then
    echo
    print_success "DEPLOYMENT ERFOLGREICH!"
    echo -e "${C_CYAN}Die Seite wurde erfolgreich auf ${HOST} aktualisiert.${C_NC}"
    echo
    echo -e "${C_GREEN}"
    cat << "EOF"
 ____                        __          __
|  _ \  ___  _ __   ___     | _|_      _|_ |
| | | |/ _ \| '_ \ / _ \    | |\ \ /\ / /| |
| |_| | (_) | | | |  __/    | | \ V  V / | |
|____/ \___/|_| |_|\___|    | |  \_/\_/  | |
                            |__|        |__|
EOF
    echo -e "${C_CYAN}  :: Besuch gerne wellermann.de :: ${C_NC}"
    echo -e "${C_NC}"
else
    echo
    print_error "DEPLOYMENT FEHLGESCHLAGEN!"
    echo -e "${C_RED}Beim Hochladen sind Fehler aufgetreten. Bitte prüfen Sie die Ausgabe oben.${C_NC}"
fi

exit 0

```

## Teil 3: Anwendung in der Praxis

Jetzt, wo alles vorbereitet ist, ist das Deployment ein Kinderspiel.

1.  **Skript konfigurieren:**
    *   Öffne die Datei `deploy.sh`.
    *   **Passe die `PROJEKT-EINSTELLUNGEN` an!** Überprüfe die Kommentare im Skript und setze den korrekten `NODE_COMMAND` und `LOCAL_DIR` für dein spezifisches Framework.
    *   Trage bei `LFTP_BOOKMARK` den Namen ein, den du in Teil 1 gewählt hast.
    *   Setze das `REMOTE_DIR` auf den Zielordner deines Webservers (z.B. `httpdocs`).

2.  **Skript ausführbar machen:**
    Führe diesen Befehl **einmalig** im Terminal aus, um dem System zu erlauben, das Skript zu starten:
    ```bash
    chmod +x deploy.sh
    ```

3.  **Deployment starten:**
    Ab sofort ist dein gesamter Deployment-Prozess nur noch einen Befehl entfernt. Führe einfach aus:
    ```bash
    ./deploy.sh
    ```

Das Skript kümmert sich um alles Weitere: Es baut deine Anwendung, stellt eine sichere Verbindung her und synchronisiert die Dateien auf deinen Server. Effizient, sicher und für fast jedes Projekt anpassbar. Viel Spaß beim Coden
