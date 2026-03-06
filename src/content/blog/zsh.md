---
title: "Wechsel zu zsh"
description: "Wechsel von bash zu zsh"
pubDate: "2024-01-01"
author: "Daniel Wellermann"
category: "Linux"
tags: ["zsh", "Shell", "Terminal", "Oh My Zsh"]
---

# Wechsel zu zsh

**Kurzfassung:** Nach fast 25 Jahren bash bin ich auf zsh mit Oh My Zsh gewechselt. Schnelle Ordnernavigation und Autovervollständigung waren der Hauptgrund – der Wechsel lohnt sich.

Ich hab mich endlich dazu durchgerungen, auf meinem Desktop-System zsh mit „Oh My Zsh" zu verwenden. Hier sind die Schritte.

## Installation

1. Installiere zsh:
   ```bash
   sudo apt install zsh
   ```
2. Setze zsh als Standard-Shell:
   ```bash
   chsh -s $(which zsh)
   ```
3. Installiere "Oh My Zsh":

  > ⚠️ Bitte immer vorsichtig sein bei Scripten von Dritten.

  Hier die Installationsanleitung von der offiziellen Seite:
  https://github.com/ohmyzsh/ohmyzsh

   ```bash
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

---

## Themes

Wähle ein Theme aus und setze es in der Datei `~/.zshrc`:
```bash
ZSH_THEME="dein_gewähltes_theme"
```

Meine Favoriten-Themes:

1. `amuse`
2. `bira`
3. `gnzh`
4. `itchy`


## Plugins

Aktiviere Plugins in der Datei `~/.zshrc`:
```bash
plugins=(git ssh ssh-agent npm nvm)
```

Empfohlene Plugins:
1. `git` - Git-Integration
2. `ssh` - SSH-Tools
3. `ssh-agent` - SSH-Agent-Verwaltung
4. `npm` - Node.js Paketmanager
5. `nvm` - Node.js Version Manager


## Fazit

Schnelle Ordnernavigation und Autovervollständigung – das sind die zwei Hauptgründe für den Wechsel. Lohnt sich.
