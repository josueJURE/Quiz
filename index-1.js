const select = document.querySelector("#language"); // select element
const body = document.querySelector("body");
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
let [ratio, counter, count, clock, score, timeUp] = [0, 0, 0, 0, 0, 10];

// let score = count/quizLength;

console.log(input.value)

let japaneseAnimeJapanese = [
{
  name: "ドラゴンボール",
  picture: "https://dbgbh.bn-ent.net/assets/img/news/news_thumb_kv.png"
},
{
  name: "進撃の巨人",
  picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYjy_bS8t3ScWyG7q94fIltnar3ChaOHmGA&usqp=CAU"
},
{
  name: "ナルト",
  picture: "https://res.cloudinary.com/jerrick/image/upload/v1616592065/605b3cc118e784001e22da0d.jpg"
},
{
  name: "鬼滅の刃",
  picture: "https://cdn.vox-cdn.com/thumbor/gcVHhhZ4VwVswvbDPvI-RfQ7ECQ=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19721018/Tanjiro__Demon_Slayer_.png"
},
{
  name: "攻殻機動隊",
  picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VBbI5HMki5cmjP_Gq0TdyA6VZn_0_fmkhg&usqp=CAU"
}
]

let japaneseAnimeEnglish = [
{
  name: "Dragon ball",
  picture: "https://dbgbh.bn-ent.net/assets/img/news/news_thumb_kv.png"
},
{
  name: "Attack On Titans",
  picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYjy_bS8t3ScWyG7q94fIltnar3ChaOHmGA&usqp=CAU"
},
{
  name: "naruto",
  picture: "https://res.cloudinary.com/jerrick/image/upload/v1616592065/605b3cc118e784001e22da0d.jpg"
},
{
  name: "Demon Slayer",
  picture: "https://cdn.vox-cdn.com/thumbor/gcVHhhZ4VwVswvbDPvI-RfQ7ECQ=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19721018/Tanjiro__Demon_Slayer_.png"
},
{
  name: "Ghost in the shell",
  picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VBbI5HMki5cmjP_Gq0TdyA6VZn_0_fmkhg&usqp=CAU"
}
]

// export {japaneseAnimeJapanese, japaneseAnimeEnglish};
// import {japaneseAnimeJapanese, japaneseAnimeEnglish} from "./index-2.js"

const ranking = JSON.parse(localStorage.getItem("userObject")) || [];

function userRanking() {
  ranking.push({
    userName: input.value,
    userScore: (score / quizLength) * 100,
  })
  localStorage.setItem("userObject", JSON.stringify(ranking))
}

btn_1.addEventListener("click", slideFunction);
btn_2.addEventListener("click", startQuiz);
select.addEventListener("change", displayButton);

function slideFunction() {
  landingPage.classList.toggle("slides");
}

function quizClock() {
  timer.innerHTML = timeUp;
  circleContainer.style.background = `conic-gradient(red ${ratio*36}deg, blue ${ratio*36}deg)`
  if(timeUp > 0) {
    timeUp--;
    ratio++;
  } else {
    timeUp = 10;
    ratio = 0;
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
    count++;
    score++;
  } else {
    wrongAnswer();
  }
  update();
  ratio = 0;
  timeUp = 10;
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
//
function displayFinalScore() {
  quiz.style.display = "none";
  finalScore.style.display = "flex";
  bubble.innerHTML = `<h1>Well done ${input.value} Your final score is ${(score/quizLength)*100}%</h1>`
  gif.innerHTML = `<img src="images/dragon-ball-z-goku.gif" alt="">`
  document.body.style.backgroundColor = "#368dda";
  userRanking()
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
  btn_2.style.display = "block";
  introMessage.style.display = "none";
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
