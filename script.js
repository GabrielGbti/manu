

let siteLiberado = document.getElementById('tela-carregamento') ? false : true;


const telaCarregamento = document.getElementById('tela-carregamento');
const btnEntrar = document.getElementById('btn-entrar');
let tempo = 5;

window.scrollTo(0, 0);
// 1. Trava o scroll do site para ela não descer antes da hora
document.body.style.overflow = 'hidden';

// 2. O Relógio (Contagem Regressiva)
const intervalo = setInterval(() => {
    tempo--;
    if (tempo > 0) {
        btnEntrar.innerText = `Continuar (em ${tempo}...)`;
    } else {
        // 3. Quando chega no zero: para de contar, libera o botão e muda a cor!
        clearInterval(intervalo);
        btnEntrar.innerText = "Continuar";
        btnEntrar.disabled = false;
        btnEntrar.classList.add('liberado'); 
    }
}, 1000); // Isso faz o código rodar a cada 1000 milissegundos (1 segundo)

// 4. O Clique Mágico
btnEntrar.onclick = function() {
    window.scrollTo(0, 0);
    siteLiberado = true;
    // Faz a tela ficar invisível (efeito de fade graças ao CSS)
    telaCarregamento.style.opacity = "0";
    
    // Destrava a barra de rolagem pro site voltar a funcionar
    document.body.style.overflow = 'auto';

    // Espera a animação de sumir terminar (0.8s) e remove a tela de vez
    setTimeout(() => {
        telaCarregamento.style.display = "none";
    }, 800);
};




























// Pega o áudio e o botão pelo ID
var musica = document.getElementById("musica");
var btnPlay = document.getElementById("btn-play");
var textoDica = document.getElementById("texto-dica");


btnPlay.onclick = function() {
    if (musica.paused) {
        // Se estiver pausado: Toca a música e troca a foto pro Pause
        musica.play();
        btnPlay.src = "img/play-go.png";
        
        textoDica.innerText = "agora sim, pode continuar descendo...";
    } else {
        // Se estiver tocando: Pausa a música e volta a foto pro Play
        musica.pause();
        btnPlay.src = "img/play.png";
        textoDica.innerText = "clique no play, sorriso!";
    }
}







const girassol = document.querySelector('.Girassol1');
const folhas = document.querySelector('.folhas3');

girassol.addEventListener('click', () => {
    folhas.classList.add('tremendo');
    girassol.classList.add('girassol-balancando'); // Adiciona o balanço!

    setTimeout(() => {
        folhas.classList.remove('tremendo');
        girassol.classList.remove('girassol-balancando');
    }, 600); // 600ms pra dar tempo da planta balançar inteira
});

// ----------------------------------------------------

const girassol2 = document.querySelector('.Girassol2');
const folhas2 = document.querySelector('.folhas2');

girassol2.addEventListener('click', () => {
    folhas2.classList.add('tremendo');
    girassol2.classList.add('girassol-balancando'); // Adiciona o balanço!

    setTimeout(() => {
        folhas2.classList.remove('tremendo');
        girassol2.classList.remove('girassol-balancando');
    }, 600);
});








const frase = "Seu astral ilumina todos como o sol, Manuela. Por isso te amar é tão fácil. Quer uma prova?";
const elementoTexto = document.getElementById("texto-digitado");
let jaDigitou = false;

function efeitoMaquina(texto, elemento, velocidade) {
    let i = 0;
    elemento.textContent = "";

    function digitar() {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        }
    }
    digitar();
}

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting && !jaDigitou && siteLiberado) {
            jaDigitou = true;
            efeitoMaquina(frase, elementoTexto, 80);
        }
    });
}, { threshold: 0.5 });

const secao = document.getElementById("secao-2");
if (secao) observador.observe(secao);
