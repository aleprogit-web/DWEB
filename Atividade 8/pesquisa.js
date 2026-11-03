

let enviar = document.querySelector('.enviar');

let avaliações = [];
let cont = 0;
let contM = 0;
let contF = 0;
let contOutros = 0;
let maiorIdade = 0;
let menorIdade = 1000;
let somaIdades = 0;
let contPessimo = 0;
let contBom = 0;
let contOtimo = 0;


enviar.addEventListener('click', () => {

  let sexo = document.querySelector('.sexo').value;
  let idade = document.querySelector('.idade-input').value;
  let opinião = document.querySelector('.opinião').value;
  let idadeHTML = document.querySelector('.idade-input').value;

  if(sexo != "M" && sexo != "F" && sexo != "Outros" &&sexo != "m" && sexo != "f" && sexo != "outros" ){
    alert("O campo sexo deve ser preenchido apenas com M, F ou Outros.")
  }else if(opinião > 4 || opinião < 0){
    alert("O valor da opinião deve estar entre 1 e 4");
  }else if(idade < 0){
    alert("A idade deve ser um valor positivo");
  }else{

    avaliações.push({
      Sexo: sexo,
      Idade: idade,
      Opinião: opinião
    });

    idadeHTML.innerText = '';

    cont++;

    if(cont >= 5){
      mostrarRestultados();
    };

    console.log(avaliações);

  }

  

});

function mostrarRestultados () {
  avaliações.forEach((avaliação) => {
    if(avaliação.Sexo == "M" || avaliação.Sexo == "m" ){
      contM ++;
    };

    if(avaliação.Sexo == "F" || avaliação.Sexo == "f" ){
      contF ++;
    };

    if(avaliação.Sexo == "Outros" || avaliação.Sexo == "outros" ){
      contOutros ++;
    };

    somaIdades += Number(avaliação.Idade);

    if(avaliação.Idade > maiorIdade){
      maiorIdade = avaliação.Idade;
    }

    if(avaliação.Idade < menorIdade){
      menorIdade = avaliação.Idade;
    }

    if(avaliação.Opinião == 1){
      contPessimo ++;
    }

    if(avaliação.Opinião == 3){
      contBom++;
    }

    if(avaliação.Opinião == 4){
      contOtimo++;
    }

  });

  contBom = (contBom *100) / 5;

  contOtimo = (contOtimo *100) / 5;

  let media = somaIdades/5;

  console.log(`Homens: ${contM}`);
  console.log(`Mulheres: ${contF}`);
  console.log(`Outros: ${contOutros}`);
  console.log(`Maior idade: ${maiorIdade}`);
  console.log(`Menor Idade: ${menorIdade}`);
  console.log(`Media das idades: ${media}`);
  console.log(`Pessoas que responderam péssimo: ${contPessimo}`)
  console.log(`Porcetagem de ótimo: ${contOtimo}%`);
  console.log(`Porcetagem de bom: ${contBom}%`);

};


  














