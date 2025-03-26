const calendar_body = document.querySelector('.calendar');
const calendar_cab = document.querySelectorAll('.dia-cabecalho');
const titulo_mes = document.querySelector(".calendar h1");
const datas = document.querySelector(".dias-do-calendario");
const navs = document.querySelectorAll("#anterior, #proximo")

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

let date = new Date();
let mes = date.getMonth();
let ano = date.getFullYear();



function coresMes() {
    const dia_invalido = document.querySelectorAll('.dia-invalido');
    
    const calendarColors = ['#9d64f8', '#f89a64', '#3438ff', '#64f878', '#ffee00',
        '#fc883a', '#64f864', 'gold', 'yellow', '#f864f1', 'blue', '#f81e30'
    ]

    const diaInvColors = ['#d7ccf5', '#ffddaa', '#acaaff', '#c9ffc2', '#fff4b8',
        '#ffe9b8', '#b8ffca', '#ffeeb8', '#fffbc7', '#ffdfff', '#dfe1ff', '#ffdfdf'
        ]
    calendar_body.style.background = `linear-gradient(to bottom, 
    white -150%,
    ${calendarColors[mes]}, 
    #000 350%)`;
    //calendar_body.style.opacity = '0.95';

    const mes_titulo_contraste = [4, 5, 7, 8, 11]

    if (mes_titulo_contraste.includes(mes)) {
        titulo_mes.classList.add('constrast')
    } else {
        titulo_mes.classList.remove('constrast')
    }

                
    calendar_cab.forEach((dia, index) => {
        dia.style.background = calendarColors[mes];
        dia.style.border =  '3px solid '+calendarColors[mes];
        if (mes_titulo_contraste.includes(mes)) {
            dia.classList.add('constrast')
        } else{
            dia.classList.remove('constrast')
        }
    });

    dia_invalido.forEach((dia, index) => {
        dia.style.background = diaInvColors[mes];
    });

}
function crieCalendario() {
    const dia_inicio = new Date(ano, mes, 1).getDay();
    const prox_mes = new Date(ano, mes + 1, 0).getDate();
    const dia_fim = new Date(ano, mes, prox_mes).getDay();

    const dias_do_mes_anterior = new Date(ano, mes, 0).getDate();
    
    let dias_nomes = '';

    titulo_mes.textContent = `${meses[mes]} ${[ano]}`;

    // dias anteriores
    for(let i = dia_inicio; i > 0; i--){
        dias_nomes += `<li class="dia-invalido">${dias_do_mes_anterior - i + 1}`;
    }

    // dias atuais
    for(let i = 1; i <= prox_mes; i++){
        let hoje = i === date.getDate() && mes === new Date().getMonth() && ano === new Date().getFullYear()
        ? ', dia-hoje'
        : "";
        dias_nomes += `<li class="dia ${hoje}">${i}`;
    }
    // dias posteriores
    for(let i = dia_fim; i < 6; i++){
        dias_nomes += `<li class="dia-invalido">${i - dia_fim + 1}`;
    }

    datas.innerHTML = dias_nomes;
    coresMes();
}


navs.forEach(nav => {
    nav.addEventListener('click', () => {
        mes = nav.id === 'proximo'? mes + 1 : mes - 1;

        if (mes < 0 || mes > 11){
            date = new Date(ano, mes, new Date().getDate());
            mes = date.getMonth();
            ano = date.getFullYear();
        } else {
            date = new Date();
        }

        crieCalendario();

    })
});

crieCalendario();
