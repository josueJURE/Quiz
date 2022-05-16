const select = document.querySelector("select");
const button = document.querySelector("button");
const intro = document.querySelector(".intro");
const quiz = document.querySelector(".quiz");
const introMessage = document.querySelector(".introMessage");
const quizImage = document.querySelector(".quizImage img");
const multipleChoice = [...document.querySelector(".multipleChoice").children];

import {japaneseAnimeJapanese, japaneseAnimeEnglish} from "./index-2.js"


// let japaneseAnimeJapanese = [
// {
//   name: "ドラゴンボール",
//   picture: "https://dbgbh.bn-ent.net/assets/img/news/news_thumb_kv.png"
// },
// {
//   name: "進撃の巨人",
//   picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYjy_bS8t3ScWyG7q94fIltnar3ChaOHmGA&usqp=CAU"
// },
// {
//   name: "ナルト",
//   picture: "https://res.cloudinary.com/jerrick/image/upload/v1616592065/605b3cc118e784001e22da0d.jpg"
// },
// {
//   name: "鬼滅の刃",
//   picture: "https://cdn.vox-cdn.com/thumbor/gcVHhhZ4VwVswvbDPvI-RfQ7ECQ=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19721018/Tanjiro__Demon_Slayer_.png"
// },
// {
//   name: "攻殻機動隊",
//   picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VBbI5HMki5cmjP_Gq0TdyA6VZn_0_fmkhg&usqp=CAU"
// }
// ]

// let japaneseAnimeEnglish = [
// {
//   name: "dragon ball",
//   picture: "https://dbgbh.bn-ent.net/assets/img/news/news_thumb_kv.png"
// },
// {
//   name: "Attack On Titans",
//   picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYjy_bS8t3ScWyG7q94fIltnar3ChaOHmGA&usqp=CAU"
// },
// {
//   name: "naruto",
//   picture: "https://res.cloudinary.com/jerrick/image/upload/v1616592065/605b3cc118e784001e22da0d.jpg"
// },
// {
//   name: "Demon Slayer",
//   picture: "https://cdn.vox-cdn.com/thumbor/gcVHhhZ4VwVswvbDPvI-RfQ7ECQ=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19721018/Tanjiro__Demon_Slayer_.png"
// },
// {
//   name: "Ghost in the shell",
//   picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VBbI5HMki5cmjP_Gq0TdyA6VZn_0_fmkhg&usqp=CAU"
// }
// ]

select.addEventListener("change", displayButton);
button.addEventListener("click", startQuiz);



function randomNumbers() {
  return  Math.floor(Math.random()*multipleChoice.length);
}

function generateRandomNumbers() {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < multipleChoice.length) {
    uniqueNumbers.add(randomNumbers())
  }
  return uniqueNumbers
}

generateRandomNumbers()

multipleChoice.forEach((choice, i) => {
  const arrayUniqueDigits = [...generateRandomNumbers()];
  console.log(arrayUniqueDigits)
  console.log(arrayUniqueDigits[0])
  choice.innerHTML = japaneseAnimeEnglish[arrayUniqueDigits[i]].name
})

function displayButton() {
  button.style.display = "block"
  introMessage.style.display = "none"
}

function startQuiz() {
  button.style.display = "none";
  quiz.style.display = "flex";
  intro.style.display = "none";
  quizImage.src = japaneseAnimeEnglish[randomNumbers()].picture

}
