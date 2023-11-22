var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
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

function startGame() {
  console.log('start')
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
    startButton.innerText = 'restart'
    startButton.classList.remove('hide')
  }
  
}

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
  element.classList.remove()
}

var questions = [
  {
    question: 'What is 2 + 2',
    answers: [
      { text: '4', correct: true },
      { text: '6', correct: false },
      { text: '8', correct: false },
      { text: '10', correct: false }
    ]
  },

  {
    question: 'On the Periodic table what does AU stand for?',
    answers: [
      { text: 'Kyrptonite', correct: false },
      { text: 'Gold', correct: true },
      { text: 'Vibranium', correct: false },
      { text: 'Silver', correct: false }
    ]
  },
  
  {
    question: 'If you mix blue and red what color do you get?',
    answers: [
      { text: 'black', correct: false },
      { text: 'orange', correct: false },
      { text: 'purple', correct: true },
      { text: 'brown', correct: false }
    ]
  },

  {
    question: 'How long is the adult standard football field?',
    answers: [
      { text: '1 mile', correct: false },
      { text: '5 kilometers', correct: false },
      { text: '1000 ft', correct: false },
      { text: '100 yds', correct: true}
    ]
  } 
]

