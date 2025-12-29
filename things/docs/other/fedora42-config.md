## System-Setup: Was ich konfiguriert habe

Nach der Installation habe ich mein System nach meinen Bedürfnissen eingerichtet. 

###   **Hier ein Überblick:**

### DNF-Konfiguration anpassen

Zuerst habe ich die DNF-Konfiguration optimiert, um schnellere Downloads und bessere Paketverwaltung zu gewährleisten:

```bash
sudo nano /etc/dnf/dnf.conf
```

```ini
[main]
gpgcheck=True
installonly_limit=3
clean_requirements_on_remove=True
best=False
skip_if_unavailable=False
max_parallel_downloads=10
fastestmirror=True
```

Anschließend ein Update durchgeführt:

```bash
sudo dnf upgrade --refresh
```

### Shell-Umgebung: zsh + Oh My Zsh

Als langjähriger zsh-Nutzer war das einer der ersten Schritte:

```bash
sudo dnf install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Zusätzlich habe ich `eza` als modernen `ls`-Ersatz installiert und entsprechende Aliases konfiguriert.

### GNOME Extensions

Um GNOME noch produktiver zu machen, habe ich folgende Tools und Extensions installiert:

```bash
sudo dnf install gnome-tweaks
sudo dnf install gnome-extensions-app
sudo dnf install gnome-shell-extension-appindicator
sudo dnf install gnome-shell-extension-gsconnect
```

**Nautilus-Erweiterungen:**

```bash

sudo dnf install nautilus-extension 
```

### Entwicklungsumgebung

Als Entwickler brauchte ich natürlich meine gewohnte Toolchain:

**Git-Konfiguration**
```bash
git config user.name "Daniel Wellermann"
git config user.email "..."
```

SSH-Keys konfiguriert für GitHub und meine Server (PVE, AdGuard, etc.)

**Node.js via NVM**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install node
```

**Go Language**
```bash
wget https://go.dev/dl/go1.25.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.25.5.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

**Visual Studio Code**

Über das offizielle Microsoft-Repository installiert, damit Updates automatisch über DNF kommen.

### Anwendungen

Die wichtigsten Programme für meinen Alltag:

- **Thunderbird**: E-Mail-Client
- **KeePassXC**: Passwort-Manager
- **VLC**: Multimedia-Player
- **OBS Studio**: Für Screencasts und Aufnahmen
- **Shotcut**: Video-Editing
- **Gradia**: Screenshot-Tool (als Flatpak)
- **btop**: System-Monitoring im Terminal
