// ---------------------instruction-box------------------

const instruction = document.querySelector(".info");
const rulesBox = document.querySelector(".rules");

function showRules() {
  instruction.addEventListener("mouseenter", () => {
    rulesBox.classList.remove("hide");
  });
  instruction.addEventListener("mouseleave", () => {
    rulesBox.classList.add("hide");
  });
}

showRules();

//---------------------dark-toggle-----------------------------

const darkBtn = document.querySelector("#mode-switch");

function darkToggle() {
  document.body.classList.toggle("dark-mode");
  const changeIcon = darkBtn.getAttribute("aria-hidden");
  if (changeIcon === "false") {
    darkBtn.setAttribute("src", "./images/light-on.png");
    darkBtn.setAttribute("aria-hidden", "true");
  } else {
    darkBtn.setAttribute("src", "./images/light-off.png");
    darkBtn.setAttribute("aria-hidden", "false");
  }
}

darkBtn.addEventListener("click", darkToggle);

//-----------------------game-logic---------------------------------
const allBtn = document.querySelectorAll(".btn");


const startBtn = document.querySelector(".start-btn");


const scoreBox = document.querySelector(".score");


const mainContainer = document.querySelector(".main-container");

const msgContainer = document.querySelector(".msg-container");



let gameSequence = [];
let userSequence = [];
let level = 0;




function nextSequence() {
  userSequence = [];
  level++;
  scoreBox.textContent = `Level: ${level}`;

  const random = Math.floor(Math.random() * allBtn.length);
  allBtn[random].classList.add("flash");
  setTimeout(() => {
    allBtn[random].classList.remove("flash");
  }, 300);

  playSound(allBtn[random].id);
  gameSequence.push(allBtn[random].id);
}




function userClick() {
  allBtn.forEach((button) => {
    button.addEventListener("click", () => {
      userSequence.push(button.id);
      button.classList.add("pressed");
      setTimeout(() => {
        button.classList.remove("pressed");
      }, 300);

      playSound(button.id);
      checkSequence();
    });
  });
}





function checkSequence() {
  let lastIndex = userSequence.length - 1;

  if (gameSequence[lastIndex] !== userSequence[lastIndex]) {
    playSound("wrong");
    showResult();
    return;
  }

  
  if (userSequence.length === gameSequence.length) {
    setTimeout(nextSequence, 1000); 
  }
}





function playGame() {
  startBtn.addEventListener("click", () => {
    resetGame();
    mainContainer.classList.remove("hide");
    msgContainer.classList.add("hide");
    nextSequence();
    
    startBtn.textContent = "Restart Game";
  });
}





function resetGame() {
  gameSequence = [];
  userSequence = [];
  level = 0;
 
}




function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.play();
}






function showResult () {
    mainContainer.classList.add("hide");
    msgContainer.classList.remove("hide");

    if (level < 5) {
        msgContainer.textContent = `Game Over! Your Score: ${level}. You have Low IQ`;
    }else if (level >= 5 && level <10){
        msgContainer.textContent = `Game Over! Your Score: ${level}. You have Good IQ`;
    }else if (level >= 10 && level < 15) {
        msgContainer.textContent = `Game Over! Your Score: ${level}. You have Sharp IQ`;
    }else {
        msgContainer.textContent = `Game Over! Your Score: ${level}. You have Extraordinary IQ`;
    }
}



userClick();
playGame();