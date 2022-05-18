const select = document.querySelector("select");
const button = document.querySelector("button");
const intro = document.querySelector(".intro");
const quiz = document.querySelector(".quiz");
const introMessage = document.querySelector(".introMessage");
const quizImage = document.querySelector(".quizImage img");
const multipleChoice = [...document.querySelector(".multipleChoice").children];
console.log(multipleChoice)
let counter = 0;

import {japaneseAnimeJapanese, japaneseAnimeEnglish} from "./index-2.js"

console.log(japaneseAnimeEnglish)


select.addEventListener("change", displayButton);
button.addEventListener("click", startQuiz);



function randomNumbers() {
  return  Math.floor(Math.random()*multipleChoice.length);
}

console.log(randomNumbers())



function generateRandomNumbers() {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < multipleChoice.length) {
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

function displayButton() {
  button.style.display = "block"
  introMessage.style.display = "none"
}

function startQuiz() {
  button.style.display = "none";
  quiz.style.display = "flex";
  intro.style.display = "none";
  displayUniqueChoices();
}
