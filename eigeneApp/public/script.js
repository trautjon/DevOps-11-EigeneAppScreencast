let questions = [];
let current = 0;
let score = 0;

document.title = "Quiz App von Jonas";

fetch('/api/questions')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const q = questions[current];
  document.getElementById('question').innerText = q.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = questions[current];
  const optionsDiv = document.getElementById('options');
  const buttons = optionsDiv.querySelectorAll('button');

  buttons.forEach(btn => {
    btn.disabled = true; // Alle Buttons deaktivieren nach Auswahl

    if (btn.innerText === q.answer) {
      btn.classList.add('correct-flash');

      setTimeout(() => {
        btn.classList.remove('correct-flash');
        btn.classList.add('correct');
      }, 500); // 0.5s grüner "Blink" dann dauerhaft grün

    } else if (btn.innerText === selected) {
      btn.classList.add('wrong');
    }
  });

  if (selected === q.answer) {
    score++;
  }

  document.getElementById('score').innerText = `Punktestand: ${score}`;

  // "Nächste Frage"-Button einblenden
  document.getElementById('next-btn').style.display = 'inline-block';

}

function resetUI() {
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  document.getElementById('question').innerText = '';
  document.getElementById('next-btn').style.display = 'none'; // Button verstecken
}


function nextQuestion() {
  current++;

  if (current < questions.length) {
    resetUI();
    showQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  const quizCard = document.querySelector('.quiz-card');
  quizCard.innerHTML = `
    <h2>Fertig!</h2>
    <p>Dein Punktestand: ${score} von ${questions.length}</p>
    <button onclick="restartQuiz()">Quiz neu starten</button>
  `;
}


function restartQuiz() {
  current = 0;
  score = 0;

  // Originales Layout wiederherstellen
  const quizCard = document.querySelector('.quiz-card');
  quizCard.innerHTML = `
    <h1>Quiz</h1>
    <p id="question"></p>
    <div id="options" class="options-grid"></div>
    <p id="score">Punktestand: 0</p>
    <button id="next-btn" onclick="nextQuestion()" style="display:none;">Nächste Frage</button>
  `;

  // Quiz starten
  showQuestion();
}

