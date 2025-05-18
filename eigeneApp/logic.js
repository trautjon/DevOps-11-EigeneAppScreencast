//Für Tests
// Diese Datei enthält die Logik für die Quiz-App.

/**
 * Prüft, ob die ausgewählte Antwort korrekt ist.
 * @param {string} selected - Die vom Nutzer gewählte Antwort
 * @param {string} correct - Die richtige Antwort aus der Frage
 * @returns {boolean}
 */
function isCorrectAnswer(selected, correct) {
  return selected === correct;
}

/**
 * Gibt zurück, ob es noch eine nächste Frage gibt.
 * @param {number} current - Der aktuelle Fragenindex
 * @param {number} total - Anzahl der Fragen insgesamt
 * @returns {boolean}
 */
function hasNextQuestion(current, total) {
  return current + 1 < total;
}

module.exports = { isCorrectAnswer, hasNextQuestion };
