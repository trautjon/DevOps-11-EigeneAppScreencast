# DevOps-11-EigeneAppScreencast

## 🎯 Ziel und Aufbau

Diese kleine WebApp habe ich in Anlehnung an die WebApp aus der Vorlesung entwickelt.  
Ich habe ein neues Repository erstellt, um klarzumachen, dass es sich hierbei um mein eigenes Projekt handelt.  

Ziel ist es, diese App über die GitHub Actions Pipeline auf Azure zu veröffentlichen.  
Ich möchte damit die wesentlichen Lerneffekte von DevOps verfestigen und diesen Weg durch:

- Build-Tools  
- Container  
- Integrationstests  
- CI  
- Deployment  

nutzen, um meinen Screencast aufzuwerten.

## 🛠️ Entwicklung EigeneApp (Quiz)

### 1. Build-Tools  

Die WebApp der Vorlesung hat mir gezeigt, wie man schnell und einfach eine WebApp mittels JavaScript entwickeln kann.  
Anders als bei DevOpsDemo wollte ich nicht Backend und Frontend getrennt (Java + JavaScript) entwickeln und habe mich daher für einen ähnlichen Ansatz über Node.js und Express entschieden.  

Erster Schritt war das initiale Aufsetzen von npm:

```bash
npm init 
```

Anschliessend habe ich noch Express installiert:

```bash
npm install express 
```

Mein Quiz habe ich dann aus folgenden Komponenten zusammengebaut:

- [index.html](/eigeneApp/public/index.html) (Grundlegendes Frontend)  
- [script.js](/eigeneApp/public/script.js) (Grundlegende Frontend-Logik)  
- [style.css](/eigeneApp/public/style.css) (Formate und grafische Anforderungen)  

- [server.js](/eigeneApp/server.js) (Grundlegendes Backend + Logik)  
- [questions.json](/eigeneApp/questions.json) (Katalog für Quizfragen)  

### 2. Container  

Nachdem mein kleines Quiz nun funktioniert, möchte ich es in ein Docker-Image verpacken.  

Dazu habe ich folgendes [Dockerfile](/Dockerfile) erstellt.  

Nun kann ich es mit folgendem Befehl bauen lassen:

```bash
docker build -t jonas-quiz-app .
```

Und im Anschluss in einem Container laufen lassen:

```bash
docker run -d -p 3000:3000 jonas-quiz-app
```

### 3. Unit-Testing  

Ich wollte meine kleine App nicht mit Sonar testen, sondern etwas Ähnliches wie JaCoCo für JavaScript finden.  
Während meiner Suche bin ich mit [Jest](https://jestjs.io/) fündig geworden.  

Installation:

```bash
npm install --save-dev jest
```

Im `package.json` ergänzen:

```bash
"scripts": {
  "test": "jest --coverage"
}
```

>[!Important]  
Da meine [script.js](/eigeneApp/public/script.js)-Datei viele DOM-abhängige (browserabhängige) Codes enthält, habe ich die grundlegende Logik ohne Browserabhängigkeiten in die Datei [logic.js](/eigeneApp/logic.js) kopiert. So ist es mir möglich, auch ohne Browser über [logic.test.js](/eigeneApp/tests/logic.test.js) zu testen.  

Jest-Test mit Coverage:

```bash
npm test -- --coverage
```

### 4. CI  

Um einen Teil von Continuous Integration umzusetzen, werden Docker-Build und das Pushen auf DockerHub automatisiert.  

Für dieses Projekt habe ich mich für Jenkins entschieden (da es einen besseren Einblick in die Vorgänge gibt).  

#### Jenkins-Projekt: QuizAppDockerBuild  

In diesem Jenkins-Projekt werden folgende Schritte unternommen:

- Führt einen Jest-Test mit Coverage (`jest --coverage`) aus  
- Das Image `trautjon/jonas-quiz-app` wird mittels Dockerfile zusammengebaut  
- Das Image wird als Container gestartet  
- Vorherige Container werden gelöscht  
- Es wird auf die Verfügbarkeit des Webservices mittels Port gewartet  

#### Jenkins-Projekt: QuizAppDockerPushOnHub  

In diesem Jenkins-Projekt werden folgende Schritte unternommen:

- Das lokale Image wird geholt  
- Ein Login auf DockerHub findet statt  
- Das Image wird auf `trautjon/jonas-quiz-app:latest` gepusht  

### 5. Deployment  

Für das Deployment habe ich wieder Render.com verwendet, da dies einfacher aufzusetzen und zu verwalten ist als Azure.  

#### Jenkins-Projekt: QuizAppRenderDeployment  

In diesem Jenkins-Projekt werden folgende Schritte unternommen:

- Render.com wird mittels Webhook getriggert, das neueste `trautjon/jonas-quiz-app:latest` zu deployen  

## 🧠 Nice to know  

#### NPM Dev-Modus  

In `package.json`:

```bash
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Dann kannst du mit `npm run dev` automatisch bei Dateiänderungen neu starten  
(wenn du `nodemon` installierst mit `npm install --save-dev nodemon`).
