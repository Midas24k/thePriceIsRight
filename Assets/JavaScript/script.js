var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var restartButton = document.getElementById('restart-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timeElement = document.getElementById("time")
var scoreElement = document.getElementById("score")
const formEl= document.querySelector(".form")
const inputEl= document.getElementById("input")
const submitBtn=document.getElementById("submit-btn")

let shuffledQuestions
let currentQuestionIndex=0
let score= 0;
let timeLeft= 130;


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
 
    shuffledQuestions = questions
  
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])

}
// shows question and what happens when ...
function showQuestion(question) {
console.log("current Index:", currentQuestionIndex, "Questions Index:", questions.length );
 
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
  if(currentQuestionIndex==shuffledQuestions.length){
    console.log(currentQuestionIndex==shuffledQuestions.length);
    endQuiz()
  }
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
  if (shuffledQuestions.length > currentQuestionIndex + 1){
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

function endQuiz(){
  questionContainerElement.classList.add('hide')
  formEl.classList.remove("hide")
}
// this is where I need to utilize the restart button

submitBtn.addEventListener("click", ()=>{
  const userInitials= inputEl.value
  console.log(userInitials);
})


//LOGIC FOR SHUFFLING QUESTIONS

// function shuffleQuestions(array){
//   return array.sort(() => 0.5 - Math.random())
// }

// function getRandomQuestion(prompt){
//   if(prompt.length===0){
//    prompt= shuffleQuestions(questions)
//   }
//   const randomQuestion= prompt.shift()

//   return randomQuestion;
// }
// for (let i = 0; i < question.length; i++) {
//   const randomQuestion= getRandomQuestion(shuffleQuestions)
//   console.log(randomQuestion);
  
// }
// shuffleQuestions(questions)