const select = document.querySelector("#language"); // select element
const body = document.querySelector("body");
console.log(body)
const container = document.querySelector(".container");
const btn_2 = document.querySelector(".btn_2");
const intro = document.querySelector(".intro");
const quiz = document.querySelector(".quiz");
const introMessage = document.querySelector(".introMessage");
const quizImage = document.querySelector(".quizImage img");
const multipleChoice = [...document.querySelector(".multipleChoice").children];
const quizLength = multipleChoice.length;
const circleContainer = document.querySelector(".circleContainer")
const circleBar = 360 / quizLength; // if five question value is 72degree;
const finalScore = document.querySelector(".finalScore");
const bubble = document.querySelector(".bubble");
const gif = document.querySelector(".gif");
const coloredElements = document.querySelector(".coloredElements");
const timer = document.querySelector(".timer");
const questionAnswered = document.querySelector(".questionAnswered");
const btn_1 = document.querySelector(".btn_1");
const landingPage = document.querySelector(".landingPage");
const input = document.querySelector("input");


let [counter, count, clock, timeUp] = [0, 0, 0, 10];

import {japaneseAnimeJapanese, japaneseAnimeEnglish} from "./index-2.js"

btn_1.addEventListener("click", slideFunction);
btn_2.addEventListener("click", startQuiz);
select.addEventListener("change", displayButton);

function slideFunction() {
  landingPage.classList.toggle("slides");
}

function quizClock() {
  clock < timeUp ? clock++ : clock = 0;
  timer.innerHTML = clock;
  circleContainer.style.background = `conic-gradient(red ${clock*36}deg, blue ${clock*36}deg)`
  if(clock === timeUp) {
    wrongAnswer()
    update()
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
  clock = 0;
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
    displayUniqueChoices();
    trackQuestion();
  } else {
    displayFinalScore();
  }
}

function trackQuestion() {
  if(counter < quizLength) {
    questionAnswered.innerHTML = `question ${counter+1} of ${quizLength}`;
  }
}

function displayFinalScore() {
  let userName = input.value;
  let score = count/quizLength
  localStorage.setItem("name", userName);
  localStorage.setItem("score", score*100)
  quiz.style.display = "none";
  finalScore.style.display = "flex";
  bubble.innerHTML = `<h1>Well done ${localStorage.name} Your final score is ${(score)*100}%</h1>`
  gif.innerHTML = `<img src="images/dragon-ball-z-goku.gif" alt="">`
  document.body.style.backgroundColor = "#368dda";
  console.log(localStorage)
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
  for(var i = 0; i < quizLength; i++) {
    coloredElements.innerHTML += `<div id=${i} class="roundBoxes"></div>`
  }
}

function displayButton() {
  if(input.value === "") {
    alert("enter a user name")
  } else {
    btn_2.style.display = "block";
    introMessage.style.display = "none";
  }
}

function startQuiz() {
    quiz.style.display = "flex";
    container.style.display = "none";
    intro.style.display = "none";
    displayUniqueChoices();
    userChoice();
    displayRoundElements();
    trackQuestion()
    setInterval(quizClock, 1000);
}

body.addEventListener("click", function(e) {
  if(input.value === "" && e.key !== "Enter") return;
  input.style.display = "none";
  select.style.display = "block";
})
