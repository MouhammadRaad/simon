document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("play");
  const tiles = document.querySelectorAll(".tile"); 
  const infoText = document.getElementById("info");
  const highScoreElement = document.getElementById("high-score");
  const levelElement = document.getElementById("level");

  let sequence = [];
  let playerSequence = [];
  let level = 0;
  let highScore = 0;

  const sounds = {
    blue: new Audio("sounds/blue.mp3"),
    gameOver: new Audio("sounds/game-over.wav"),
    gameWin: new Audio("sounds/game-win.wav"),
    green: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"),
    wrong: new Audio("sounds/wrong.mp3"),
    yellow: new Audio("sounds/yellow.mp3")
  };

  function playSound(sound) {
    sounds[sound].play();
  }

  function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    updateLevel();
    updateHighScore();
  }

  function updateLevel() {
    levelElement.textContent = level;
  }

  function updateHighScore() {
    if (level > highScore) {
      highScore = level;
      highScoreElement.textContent = highScore;
    }
  }

  function startGame() {
    resetGame();
    infoText.textContent = "Watch the sequence...";
    generateSequence();
    playSequence();
  }

  function generateSequence() {
    for (let i = 0; i <= level; i++) {
      sequence.push(tiles[Math.floor(Math.random() * tiles.length)].dataset.tile);
    }
  }

  function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
      if (i === sequence.length) {
        clearInterval(interval);
        infoText.textContent = "Repeat the sequence!";
        return;
      }
      playSound(sequence[i]);
      i++;
    }, 1000);
  }

  function handleTileClick() {
    const color = this.dataset.tile;
    playerSequence.push(color);
    playSound(color);
    checkSequence();
  }

  function checkSequence() {
    if (playerSequence.length === sequence.length) {
      if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
        level++;
        updateLevel();
        playerSequence = [];
        infoText.textContent = "Correct! Watch the sequence...";
        setTimeout(() => {
          generateSequence();
          playSequence();
        }, 1000);
      } else {
        endGame();
      }
    }
  }

  function endGame() {
    playSound("wrong");
    infoText.textContent = "Game Over! Click PLAY to restart.";
    sequence = [];
    playerSequence = [];
    if (level > highScore) {
      highScore = level;
      highScoreElement.textContent = highScore;
    }
    level = 0;
    updateLevel();
  }

  playButton.addEventListener("click", () => {
    startGame();
    playSound("blue");
  });

  tiles.forEach(tile => {
    tile.addEventListener("click", handleTileClick);
  });
});
