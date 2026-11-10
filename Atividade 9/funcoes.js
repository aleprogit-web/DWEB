/*-------------------- FUNÇÃO 1 --------------------*/

let array = [];
let maior = 0;
let i =0;

let add1 = document.querySelector('.add1');
let numeros = document.querySelector('.numeros');

function funcao1(){
  let numfunc1 = Number(document.querySelector('.input-numero').value);

  array.push(numfunc1);

  let html = `
    <p>${numfunc1} </p>
  `
  numeros.innerHTML += html;

  i++;

  if(i == 3){
    array.forEach((num) => {
        if(maior < num){
        maior = num;
      }

    })
    
    html = `<p class="resultado1">Maior número: ${maior} </p>`

    numeros.innerHTML = html;

  }

}

add1.addEventListener('click', () => {
  funcao1();
})

/*-------------------- FUNÇÃO 2 --------------------*/

let j = 0;
let array2 = [];
let maior2 = [];
let add2 = document.querySelector('.add2');
let numeros2 = document.querySelector('.numeros2');

function funcao2() {
  let numfunc2 = Number(document.querySelector('.input-numero2').value);

  array2.push(numfunc2);

  let html = `
    <p>${numfunc2} </p>
  `
  numeros2.innerHTML += html;

  j++;

  if(j == 3){
    
    array2.sort((a,b) => a - b);
   
    html = `<p>Ordem crescente: ${array2} </p>`

    numeros2.innerHTML = html;

  }
}

add2.addEventListener('click', () => {
  funcao2();
})

/*-------------------- FUNÇÃO 3 --------------------*/

let palin = document.querySelector('.palin');

function funcao3() {
  let palavra = document.querySelector('.input-palavra').value;
  let resultado = document.querySelector('.resultado');

  let copia = palavra.split(" ").join("");
  let copia2 = copia.split("").reverse().join("");
  console.log(copia);

  if(copia2 == copia){
    resultado.innerHTML = "A palavra é um palíndromo."
  }else{
    resultado.innerHTML = "A palavra não é um palíndromo."
  }

}

palin.addEventListener('click', () => {
  funcao3();
})

/*-------------------- FUNÇÃO 4 --------------------*/

let sub = document.querySelector('.sub');
let k = 0;
let array3 = [];
let resultado2 = document.querySelector('.resultado2');

function funcao4() {
  let palavra = document.querySelector('.input-sub').value;

  array3.push(palavra);

  let html = `
    <p>${palavra} </p>
  `
  resultado2.innerHTML += html;

  k++;

  if(k == 2){

    if((array3[0] == "" || array3[1] == "")){
      resultado2.innerHTML = "Uma ou as duas strings estão indefinidas."
    }else if(array3[0].includes(array3[1])){
      resultado2.innerHTML = "É um subconjunto."
    }else{
      resultado2.innerHTML = "Não é um subconjunto."
    } 

  }


}

sub.addEventListener('click', () => {
  funcao4();
})


/*-------------------- FUNÇÃO 5 --------------------*/

let semana = document.querySelector('.semana');
let resultado3 = document.querySelector('.resultado3');

function funcao5() {
  let data = document.querySelector('.data').value;
  let dataConvertida = new Date(data + 'T00:00:00');
  

  let numeroDia = dataConvertida.getDay();
  let dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  console.log(data);
  console.log(numeroDia);
  console.log(dias[numeroDia]);

  resultado3.innerHTML = `${dias[numeroDia]}`

}

semana.addEventListener('click', () => {
  funcao5();
})

  





