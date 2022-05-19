const select = document.querySelector("select");
const button = document.querySelector("button");
const intro = document.querySelector(".intro");
const quiz = document.querySelector(".quiz");
const introMessage = document.querySelector(".introMessage");
const quizImage = document.querySelector(".quizImage img");
const multipleChoice = [...document.querySelector(".multipleChoice").children];
const quizLength = multipleChoice.length;
const finalScore = document.querySelector(".finalScore");
const coloredElements = document.querySelector(".coloredElements");
const timer = document.querySelector(".timer");

let [counter, count, clock, timeUp] = [0, 0, 0, 10];

import {japaneseAnimeJapanese, japaneseAnimeEnglish} from "./index-2.js"

select.addEventListener("change", displayButton);
button.addEventListener("click", startQuiz);


function quizClock() {
  if(clock < timeUp) {
    clock++
    timer.innerHTML = clock;
  } else {
    clock = 0;
  }
}



function userChoice(e) {
  for(var i = 0; i < multipleChoice.length; i++) {
    multipleChoice[i].addEventListener("click", checkUserAnswer)
  }
}

function checkUserAnswer(e) {
  let answer = e.target;
  if(answer.innerHTML === japaneseAnimeEnglish[counter].name) {
    correctAnswer();
    count++
  } else {
    wrongAnswer();
  }
  update();
}

function wrongAnswer() {
  document.getElementById(counter).style.background = "red";
}

function correctAnswer() {
  document.getElementById(counter).style.background = "green";
}

function update() {
  if(counter < quizLength - 1) {
    counter++;
    displayUniqueChoices()
  } else {
    displayFinalScore()
  }
}

  console.log(quizLength)

function displayFinalScore() {
  quiz.style.display = "none";
  finalScore.style.display = "flex";
  finalScore.innerHTML = `<h1>Your final score is ${(counter/quizLength)*100}%</h1>`
}

function randomNumbers() {
  return  Math.floor(Math.random()*quizLength);
}

function generateRandomNumbers() {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < quizLength) {
    uniqueNumbers.add(randomNumbers())
  }
  return [...uniqueNumbers]
}

function displayUniqueChoices() {
  quizImage.src = japaneseAnimeEnglish[counter].picture;
  const arrayUniqueDigits = generateRandomNumbers();
  multipleChoice.forEach((choice, i) => {
    choice.innerHTML = japaneseAnimeEnglish[arrayUniqueDigits[i]].name
  })
}

function displayRoundElements() {
  var i = 0
  while( i < quizLength) {
    let element = document.createElement("div");
    element.setAttribute("class", "roundBoxes");
    element.setAttribute("id", i);
    coloredElements.append(element);
    i++
  }
}

function displayButton() {
  button.style.display = "block"
  introMessage.style.display = "none"
}

function startQuiz() {
  button.style.display = "none";
  quiz.style.display = "flex";
  intro.style.display = "none";
  displayUniqueChoices();
  userChoice();
  displayRoundElements();
  setInterval(quizClock, 1000)
}
