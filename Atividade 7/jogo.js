const paper = document.querySelector('.paper-js');
const rock = document.querySelector('.rock-js');
const scissors = document.querySelector('.scissors-js');
let win = document.querySelector('.youWon');
let lose = document.querySelector('.youLost');

let youWin = 0;
let youLose = 0;

paper.addEventListener('click', () => {
  let yourMove = document.querySelector('.yourMove-js').innerHTML = "Você = papel.";
  let computer = document.querySelector('.computerMove-js');
  let result = document.querySelector('.result-js');
  

  const computerMove = Math.floor(Math.random() * 3);

  if(computerMove == 0){
    computer.innerHTML = "Computador = papel.";
    result.innerHTML = "Empate.";
  }

  if(computerMove == 1){
    computer.innerHTML = "Computador = pedra.";
    result.innerHTML = "Papel cobre pedra. Você ganhou.";
    youWin += 1;
    win.innerHTML = youWin;
  }

  if(computerMove == 2){
    computer.innerHTML = "Computador = tesoura.";
    result.innerHTML = "Tesoura corta papel. Você perdeu.";
    youLose += 1;
    lose.innerHTML = youLose;
  }
});

rock.addEventListener('click', () => {
  let yourMove = document.querySelector('.yourMove-js').innerHTML = "Você = pedra.";
  let computer = document.querySelector('.computerMove-js');
  let result = document.querySelector('.result-js');
  

  const computerMove = Math.floor(Math.random() * 3);

  if(computerMove == 0){
    computer.innerHTML = "Computador = papel.";
    result.innerHTML = "Papel cobre pedra. Você perdeu.";
    youLose += 1;
    lose.innerHTML = youLose;
  }

  if(computerMove == 1){
    computer.innerHTML = "Computador = pedra.";
    result.innerHTML = "Empate.";
  }

  if(computerMove == 2){
    computer.innerHTML = "Computador = tesoura.";
    result.innerHTML = "Pedra quebra tesoura. Você ganhou.";
    youWin += 1;
    win.innerHTML = youWin;
  }
});

scissors.addEventListener('click', () => {
  let yourMove = document.querySelector('.yourMove-js').innerHTML = "Você = tesoura.";
  let computer = document.querySelector('.computerMove-js');
  let result = document.querySelector('.result-js');
  

  const computerMove = Math.floor(Math.random() * 3);

  if(computerMove == 0){
    computer.innerHTML = "Computador = papel.";
    result.innerHTML = "Tesoura corta papel. Você ganhou.";
    youWin += 1;
    win.innerHTML = youWin;
  }

  if(computerMove == 1){
    computer.innerHTML = "Computador = pedra.";
    result.innerHTML = "Pedra quebra tesoura. Você perdeu.";
    youLose += 1;
    lose.innerHTML = youLose;
  }

  if(computerMove == 2){
    computer.innerHTML = "Computador = tesoura.";
    result.innerHTML = "Empate.";
  }
});