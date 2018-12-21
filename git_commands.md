Git Commands Zusammenfassung
===

## Einleitung


Git ist ein Version Controll System, mit dem Änderung in einer History nachverfolgt werden können.

Für jedes Projekt mit Git, gibt es ein eigenes **Repository**.  
In diesem Repository gibt es weiter sogenannte **Branches**, welche als momentane Version des Projekts angesehen werden können.  
Aufgrund der Art wie Git funktioniert, kann ein Branch auf GitHub und die lokale Version desselben, als Unterschiedlich angesehen werden. Deswegen kann es auch bei einem Push zu einem Merge-Konflickt kommen. Um das zu Verhindern, sollte der lokale Branch immer auf dem neusten Stand sein und Änderungen sollten, sobald sie stabil sind, auf GitHub gepusht werden.  


## Neues Repository

Um ein ganz neues Repository zu erstellen muss im gewünschten Verzeichniss zu erstellen wird
```shellsession
$ git init
```
aufgerufen.  
Danach muss das neue Repository auf einen Server gestellt werden. `TBD`

Die einfachste Variante ist das Clonen eines Vorhendenen Repositorys. Hierzu wird die URL benötigt.
```
$ git clone https://github.com/mesopotato/desescalator.git
```

## Arbeiten mit Git

Als erstes muss klar gestellt werden, das Git ohne explizite Commands gar nichts macht.  
Es gibt ein paar Stadien der Files in Git:  
1. Untracked:  
Die Datei wurde von Git noch nicht registriert.
1. Ignored:  
Die Datei wird über .gitignore von Git ignoriert.
1. Unstaged:  
Dateien und Änderungen, welche noch nicht in die History aufgenommen wurden.
1. Noch nicht gepusht  
Änderungen, welche aufgenommen wurden, aber noch nicht auf dem Remote-Repository sind.

### Tracking

Damit eine neue Datei von Git nachverfolgt wird, muss sie zuerst hinzugefügt werden:
```shell
$ git add readme.md
# oder alle neuen Dateien
$ git add --all
```

### Staging

Alle Änderungen müssen jetzt in die Git-Versionierung aufgenommen werden. In dieser Phase werden die Änderungen, durch den Entwickler angenommen.  
```shell
$ git commit -m "kurze Beschreibung"
```
Mit Commit werden alle Änderungen übernommen und können auf das Remot-Repository gepusht werden.  
Mit der Option `-m`  wird eine kurze Beschreibung der Änderungen mitgegeben. Diese Beschreibung sollte kurz und aussagekräftig sein, denn sie wird oft für die Nachverfolgung benötigt.  
Bei minimalen Änderungen reicht ein "nop" oder ähnliches.

### Pull und Push

Pull holt die neusten Änderungen aus dem Remote-Repository.  
Status zeigt geänderte Files an und zeigt ob diese bereits gestaged sind.  
Push lädt gestagte Änderungen auf das Remote-Repository.
```shell
$ git pull
$ git status
$ git push
```