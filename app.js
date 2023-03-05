const quadrants = document.querySelectorAll(".quadrant");
const startButton = document.getElementById("start-button");
const gamePattern = [];
let userPattern = [];
let level = 0;
let isGameStarted = false;

// Función para generar un patron de juego aleatorio.
function generateGamePattern() {
  const colors = ["red", "green", "blue", "yellow"];
  const randomNum = Math.floor(Math.random() * 4);
  const randomColor = colors[randomNum];
  gamePattern.push(randomColor);
}

// Función para animar el patron de juego
function animateGamePattern() {
  let i = 0;
  const interval = setInterval(() => {
    const quadrant = document.getElementById(gamePattern[i]);
    quadrant.style.filter = "brightness(125%)";
    setTimeout(() => {
      quadrant.style.filter = "brightness(100%)";
    }, 500);
    i++;
    if (i >= gamePattern.length) {
      clearInterval(interval);
    }
  }, 1000);
}

// Función para comparar el patron del usuario y el del juego
function checkPattern() {
  for (let i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

// Función para resetear el juego
function resetGame() {
  gamePattern.length = 0;
  userPattern.length = 0;
  level = 0;
  isGameStarted = false;
}

// Event listener del boton Start
startButton.addEventListener("click", () => {
  if (!isGameStarted) {
    isGameStarted = true;
    generateGamePattern();
    animateGamePattern();
    level++;
  }
});

//Event listener para los botones de colores
quadrants.forEach((quadrant) => {
  quadrant.addEventListener("click", () => {
    if (isGameStarted) {
      userPattern.push(quadrant.id);
      quadrant.style.filter = "brightness(125%)";
      setTimeout(() => {
        quadrant.style.filter = "brightness(100%)";
      }, 500);
      if (userPattern.length === gamePattern.length) {
        if (checkPattern()) {
          userPattern = [];
          generateGamePattern();
          animateGamePattern();
          level++;
        } else {
          resetGame();
        }
      }
    }
  });
});
