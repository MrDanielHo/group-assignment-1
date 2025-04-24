const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");
const questionElement = document.getElementById("question");
const optionsElement = document.createElement("div");
optionsElement.id = "options";
quizContainer.appendChild(optionsElement);

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let quizData = [];

async function generateQuestions() {
  const response = await fetch("http://localhost:3000/games/1");
  const database = await response.json();

  const quizArray = [];
  const numberOfQuestions = 5;

  for (let i = 0; i < numberOfQuestions; i++) {
    const j = Math.floor(Math.random() * database.length); // Fixed: don't go out of range

    const options = [
      database[j]["answer"],
      database[j]["wrong_answer_1"],
      database[j]["wrong_answer_2"],
      database[j]["wrong_answer_3"]
    ];
    shuffleAnswers(options);

    quizArray.push({
      question: database[j]["question"],
      options: options,
      answer: database[j]["answer"]
    });
  }
  return quizArray;
}

function shuffleAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function displayQuestion() {
  if (!quizData || quizData.length === 0) return;

  const questionData = quizData[currentQuestion];

  questionElement.innerText = questionData.question;
  optionsElement.innerHTML = "";

  questionData.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    const optionId = `option-${index}`;
    optionElement.innerHTML = `
      <input type="radio" name="quiz" value="${option}" id="${optionId}">
      <label for="${optionId}">${option}</label>
    `;
    optionsElement.appendChild(optionElement);
  });
}

async function initializeQuiz() {
  quizData = await generateQuestions();
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];

  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";

  displayQuestion();
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    const correct = quizData[currentQuestion].answer;

    if (answer === correct) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: correct
      });
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  } else {
    alert("Please select an answer.");
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
    
  // Show congratulatory message instead of hiding the question box
  questionElement.innerText = "Well Done!";
  questionElement.style.display = "block";

  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  initializeQuiz();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";


  let html = `<p>You scored ${score} out of ${quizData.length}!</p>`;
  html += `<h3>Review Incorrect Answers:</h3>`;
  incorrectAnswers.forEach((item) => {
    html += `
      <p>
        <strong>Q:</strong> ${item.question}<br>
        <strong>Your Answer:</strong> ${item.incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${item.correctAnswer}
      </p>`;
  });

  resultContainer.innerHTML = html;
}

// Event Listeners
submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

// Start the game
initializeQuiz();
