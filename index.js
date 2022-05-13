const select = document.querySelector("select");
const button = document.querySelector("button");
const intro = document.querySelector(".intro")

select.addEventListener("change", displayButton);
button.addEventListener("click", startQuiz);

function displayButton() {
  button.style.display = "block"
}

function startQuiz() {
  button.style.display = "none"
  intro.style.display = "none"

}
