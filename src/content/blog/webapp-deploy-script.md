---
title: "Universal WebApp Deploy Script"
description: "Ein universelles Bash-Skript für moderne Web-Apps mit lftp"
pubDate: "2024-01-01"
author: "Daniel Wellermann"
category: "DevOps"
tags: ["Deployment", "Bash", "lftp", "WebApp"]
---
# Universal WebApp Deploy Script

**Kurzfassung:** Ein Bash-Skript, das Build und SFTP-Upload per `lftp` in einem einzigen Befehl zusammenfasst. Sinnvoll für Projekte auf klassischen Webspaces ohne Git-Integration – kein CI/CD-Overhead, volle Kontrolle.

## Ausgangslage

CI/CD-Pipelines sind mächtig, aber für ein kleines Projekt auf einem klassischen Webspace oft überdimensioniert. Ich wollte einen einfachen, transparenten Deployment-Prozess: bauen, hochladen, fertig – mit einem Befehl.

Das Ergebnis ist `deploy.sh`: ein universelles Bash-Skript für moderne Web-Apps, das per `lftp` deployt.

## Teil 1: lftp-Bookmark einrichten (einmalig)

Passwörter gehören nicht ins Skript. Stattdessen nutze ich die Bookmark-Funktion von `lftp`: Verbindung unter einem Alias speichern, `lftp` kümmert sich um die Anmeldedaten.

> Hinweis: `lftp` speichert das Passwort im Klartext in `~/.local/share/lftp/bookmarks` oder `~/.lftp/bookmarks`. Die Datei wird standardmäßig mit `chmod 600` angelegt – nur du kannst sie lesen. Deutlich besser als ein Passwort direkt im Skript.

**Schritt 1: Einmalig manuell verbinden**
Verbinde dich einmalig manuell mit deinem SFTP-Server. Platzhalter ersetzen:

```bash
lftp -u dein-benutzername sftp://sftp.dein-server.de
```

`lftp` fragt nach dem Passwort. Eingeben und Enter.

**Schritt 2: Passwortspeicherung aktivieren**
In der `lftp`-Kommandozeile (`lftp :~>`):

```lftp
lftp :~> set bmk:save-passwords true
```

**Schritt 3: Bookmark speichern**
Verbindung unter einem leicht merkbaren Namen speichern – diesen Namen brauchst du später im Skript:

```lftp
lftp :~> bookmark add mein-projekt
```

**Schritt 4: Testen**
`lftp` mit `exit` verlassen. Dann testen:

```bash
lftp mein-projekt
```

Wenn du ohne Passwortabfrage verbunden wirst, hat alles geklappt. Sitzung mit `exit` beenden.

---

## Teil 2: Das `deploy.sh`-Skript

`deploy.sh` im Hauptverzeichnis des Projekts ablegen. Die Konfiguration ist so gestaltet, dass sie sich leicht für verschiedene Frameworks anpassen lässt.

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

## Teil 3: Deployment starten

1.  **Skript konfigurieren:**
    *   `deploy.sh` öffnen.
    *   `PROJEKT-EINSTELLUNGEN` anpassen: korrekten `NODE_COMMAND` und `LOCAL_DIR` für das jeweilige Framework setzen.
    *   `LFTP_BOOKMARK` auf den Namen aus Teil 1 setzen.
    *   `REMOTE_DIR` auf den Zielordner des Webservers setzen (z. B. `httpdocs`).

2.  **Skript ausführbar machen** (einmalig):
    ```bash
    chmod +x deploy.sh
    ```

3.  **Deployment starten:**
    ```bash
    ./deploy.sh
    ```

Das Skript baut die Anwendung, stellt eine sichere Verbindung her und synchronisiert die Dateien auf den Server.
