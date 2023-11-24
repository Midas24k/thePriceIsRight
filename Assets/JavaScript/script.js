var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var restartButton = document.getElementById('restart-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex

// this is for the start button duh
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
  currentQuestionIndex++
  setNextQuestion()
})
// this button needs to be added in the mix
// restartButton.addEventListener('click', restartGame)

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])

}
// shows question and what happens when ...
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// how the question and answers work and the "Next" button apparence starts here
function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.lenght > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
  } else{
    startButton.innerText = 'Next'
    startButton.classList.remove('hide')
  }
  
}
// changes the color of background based on correct (green) or wrong (red)
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// this is where I need to utilize the restart button
function restartButton() {

}

var questions = [
  {
    question: 'What is the correct way to declare a variable in JavaScript?',
    answers: [
      { text: 'var x = 5', correct: true },
      { text: 'let x = 5', correct: false },
      { text: 'const x = 5', correct: false },
      { text: 'int x = 5', correct: false }
    ]
  },

  {
    question: 'How do you check if two variables are strictly equal in both value and type?',
    answers: [
      { text: 'x == y', correct: false },
      { text: 'x === y', correct: true },
      { text: 'x = y', correct: false },
      { text: 'x !== y', correct: false }
    ]
  },
  
  {
    question: 'What does the “DOM” stand for in JavaScript?',
    answers: [
      { text: 'Document Object Model', correct: true },
      { text: 'Data Object Model', correct: false },
      { text: 'Document Oriented Model', correct: false },
      { text: 'Dynamic Object Manipulation', correct: false }
    ]
  },

  {
    question: 'Which function is used to add an element to the end of an array in JavaScript?',
    answers: [
      { text: 'addElement()', correct: false },
      { text: 'push()', correct: true },
      { text: 'append()', correct: false },
      { text: 'insertAtEnd()', correct: false}
    ]
  } 
]

