const { isCorrectAnswer, hasNextQuestion } = require('../logic');

test('richtige Antwort wird erkannt', () => {
  expect(isCorrectAnswer('Berlin', 'Berlin')).toBe(true);
});

test('falsche Antwort wird erkannt', () => {
  expect(isCorrectAnswer('Hamburg', 'Berlin')).toBe(false);
});

test('es gibt eine nächste Frage', () => {
  expect(hasNextQuestion(2, 5)).toBe(true);
});

test('es gibt keine nächste Frage', () => {
  expect(hasNextQuestion(4, 5)).toBe(false);
});
