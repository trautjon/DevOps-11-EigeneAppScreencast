# DevOps-11-EigeneAppScreencast

## 🎯 Ziel und Aufbau

Diese kleine WebApp habe ich in Anlehnung an die WebApp der aus der Vorlsung entwickelt. 
Ich habe eine neue Reporistory erstellen, um klarzumachen, dass es sich hierbei um mein eigenes Projekt handelt. 

Ziel ist es diese App über die GitHub Actions Pipleine auf Azure zu veröffentlichen. <br>
Ich möchte damit die wesentlichen Lerneffekte von DevOps verfestigen und diesen Weg durch:

- Build Tools 
- Containers
- Unit Tests (Integration Tests)
- CI
- Deployment

nutzen, um meinen Screencast aufzuwerten.

## Entwicklung EigeneApp




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

