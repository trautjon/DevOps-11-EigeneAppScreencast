# DevOps-11-EigeneAppScreencast

## 🎯 Ziel und Aufbau

Diese kleine WebApp habe ich in Anlehnung an die WebApp der aus der Vorlesung entwickelt. 
Ich habe eine neue Reporistory erstellen, um klarzumachen, dass es sich hierbei um mein eigenes Projekt handelt. 

Ziel ist es diese App über die GitHub Actions Pipleine auf Azure zu veröffentlichen. <br>
Ich möchte damit die wesentlichen Lerneffekte von DevOps verfestigen und diesen Weg durch:

- Build Tools 
- Containers
- Integration Tests
- CI
- Deployment

nutzen, um meinen Screencast aufzuwerten.

## Entwicklung EigeneApp (Quiz)

### 1. Build Tools 

Die WebApp der Vorlesung hat mir gezeigt, wie man schnell und einfach eine WebApp mittels JavaScript entwickeln kann. 
Anders wie bei DevOpsDemo, wollte ich nicht Backend und Frontend getrennt (Java + Javascript) entwickeln und habe mich daher für einen ähnlichen Ansatz über NodeJs und Express entschieden. 

Erster Schritt war das initiale aufsetzen von npm:

```bash
npm init 
```
Anschliessend habe ich noch express installiert:

```bash
npm install express 
```

Mein Quiz habe ich dann aus folgenden Komponenten zusammengebaut:

- [index.html](/eigeneApp/public/index.html) (Grundlegendes Fontend)
- [script.js](/eigeneApp/public/script.js) (Grundlegende Frontend Logik)
- [style.css](/eigeneApp/public/style.css) (Formate und Grafische Anforderungen)

- [server.js](/eigeneApp/server.js) (Grundlegendes Backend + Logik)
- [questions.json](/eigeneApp/questions.json) (Katalog für Quizfragen)


### 2. Containers

Nachdem mein kleines Quiz nun funktioniert, möchte ich es in ein Docker Image verpacken.

Dazu habe ich folgendes [Dockerfile](/Dockerfile) erstellt.

Nun kann ich es mit folgendem Befehl bauen lassen.

```bash
docker build -t jonas-quiz-app .
```

Und im Anschluss in einem Container laufen lassen.

```bash
docker run -d -p 3000:3000 jonas-quiz-app
```


### 3. Unit Testing

Ich wollte meine kleine App nicht mit Sonar testen, sondern etwas ähnliches wie JaCoCo für Javascript finden. <br>
Während meiner suche bin ich mit [Jest](https://jestjs.io/) fündig geworden.

Installation:

```bash
npm install --save-dev jest
```

Im package.json ergänzen:

```bash
"scripts": {
  "test": "jest --coverage"
}
```
>[!Important]
Da meine [script.js](/eigeneApp/public/script.js) Datei viele DOM Abhänigen (Browserabhänigen) Code enthält, habe ich die grundlegende Logik ohne Browserabhänigkeiten in die Datei [logic.js](/eigeneApp/logic.js) kopiert. So ist es mir möglich auch ohne Browser über [logic.test.js](/eigeneApp/tests/logic.test.js) zu testen.


jest Test mit Coverage:

```bash
npm test -- --coverage
```


### 4. CI

Um einen Teil von Continuous Integration umzusetzen wird Docker build und das Pushen auf Dockerhub automatisiert.

Für dieses Projekt habe ich mich für Jenkins entschieden (Da es einen besseren Einblick in die Vorgänge gibt).

#### Jenkins Projekt: QuizAppDockerBuild

In diesem Jenkinsprojekt werden folgende Schritte unternommen:

- Das Image trautjon/jonas-quiz-app wird mittels Dockerfile zusammengebaut.
- Das Image wird als Container gestartet
- Vorherige Container werden gelöscht
- Es wird auf die Verfügbarkeit des Webservices mittels Port gewartet

#### Jenkins Projekt: QuizAppDockerPushOnHub

In diesem Jenkinsprojekt werden folgende Schritte unternommen:

- Das lokale Image wird geholt
- Ein Login auf Dockerhub findet statt
- Das Image wird auf trautjon/jonas-quiz-app:latest gepusht

### 5. Deployment

Für das Deployment habe ich wieder Render.com verwendet, da dies einfacher aufzusetzen und zu verwalten ist als Azure.

#### Jenkins Projekt: QuizAppDockerPushOnHub

In diesem Jenkinsprojekt werden folgende Schritte unternommen:

- Render.com wird mittels Webhook getriggert das neuste trautjon/jonas-quiz-app:latest zu deployen

## 🧠 Nice to know

####  NPM Dev Modus

In package.json:
```bash
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
Dann kannst du mit `npm run dev` automatisch bei Dateiänderungen neu starten <br> (wenn du nodemon installierst mit `npm install --save-dev nodemon`).

