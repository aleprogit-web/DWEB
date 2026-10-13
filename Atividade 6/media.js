
let nome = prompt("digite seu nome: ");

let nota = parseFloat(prompt("digite a nota :"));
let nota2 = parseFloat(prompt("digite a nota 2:"));
let nota3 = parseFloat(prompt("digite a nota 3:"));
let nota4 = parseFloat(prompt("digite a nota 4:"));


let media = (nota + nota2 + nota3 +nota4) / 4;

alert(`Média ${nome}: ${media.toFixed(2)}`);