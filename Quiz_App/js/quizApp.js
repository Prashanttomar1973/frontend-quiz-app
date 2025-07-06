// js/quizApp.js

import { quizData } from './data.js';

const params = new URLSearchParams(window.location.search);
const subject = params.get('subject') || 'html';

const questions = quizData[subject];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');

function loadQuestion() {
  const current = questions[currentQuestionIndex];
  questionElement.textContent = current.question;
  optionsElement.innerHTML = "";

  current.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.onclick = () => handleOptionClick(option, current.answer, li);
    optionsElement.appendChild(li);
  });
}

function handleOptionClick(selected, correct, element) {
  const allOptions = optionsElement.querySelectorAll('li');
  allOptions.forEach(opt => opt.classList.remove('correct', 'wrong'));

  if (selected === correct) {
    element.classList.add('correct');
    score++;
  } else {
    element.classList.add('wrong');
  }

  nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    nextButton.disabled = true;
  } else {
    window.location.href = `result.html?score=${score}&total=${questions.length}`;
  }
});

loadQuestion();
