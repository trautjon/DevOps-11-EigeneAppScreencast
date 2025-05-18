const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// API-Endpunkt: Fragen abrufen
app.get('/api/questions', (req, res) => {
  const questions = JSON.parse(fs.readFileSync('questions.json'));
  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Server läuft unter http://localhost:${PORT}`);
});
