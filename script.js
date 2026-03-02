

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


















// ==========================================
// PLAYER DE ÁUDIO
// ==========================================
var musica = document.getElementById("musica");
var btnPlay = document.getElementById("btn-play");
var textoDicaAudio = document.getElementById("texto-dica"); // O texto embaixo do play

if (btnPlay) {
    btnPlay.onclick = function() {
        if (musica.paused) {
            musica.play();
            btnPlay.src = "img/play-go.png";
            if (textoDicaAudio) {
                textoDicaAudio.innerText = "agora sim, pode descer 💛🔊";
                textoDicaAudio.classList.remove("fonte-normal");
                textoDicaAudio.classList.add("fonte-romantica");
            }
        } else {
            musica.pause();
            btnPlay.src = "img/play.png";
            if (textoDicaAudio) {
                textoDicaAudio.innerText = "clique no play, sorriso!";
                textoDicaAudio.classList.remove("fonte-romantica");
                textoDicaAudio.classList.add("fonte-normal");
            }
        }
    }
}










// ==========================================
// EFEITO ISOLADO: Apenas para a Folhas 1 (Primeiro Container)
// ==========================================
const folha1 = document.querySelector('.folhas1');

if (folha1) {
    let tempoFolha1;

    function tremerFolha1() {
        // Usa a NOVA classe que não briga com o transform original
        folha1.classList.add('tremendo-folhas1');
        
        clearTimeout(tempoFolha1); 
        
        tempoFolha1 = setTimeout(() => {
            folha1.classList.remove('tremendo-folhas1');
        }, 600);
    }

    // Gatilhos
    folha1.addEventListener('click', tremerFolha1);
    
    folha1.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) tremerFolha1();
    });
}




// Função inteligente de MÃO DUPLA (Girassol <-> Folha)
function ativarAnimacao(girassol, folha) {
    let tempoAnimacao;

    // A mágica: os dois balançam juntos
    function dispararEfeito() {
        folha.classList.add('tremendo');
        girassol.classList.add('girassol-balancando');

        clearTimeout(tempoAnimacao); 
        
        tempoAnimacao = setTimeout(() => {
            folha.classList.remove('tremendo');
            girassol.classList.remove('girassol-balancando');
        }, 600);
    }

    // ==========================================
    // FORÇA BRUTA: Transforma a folha em um "botão" clicável ignorando o CSS!
    // ==========================================
    folha.style.pointerEvents = "auto";
    folha.style.cursor = "pointer";

    // 1. Gatilhos se encostar no GIRASSOL
    girassol.addEventListener('click', dispararEfeito);
    girassol.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) dispararEfeito();
    });

    // 2. Gatilhos se encostar na FOLHA (O INVERSO!)
    folha.addEventListener('click', dispararEfeito);
    folha.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) dispararEfeito();
    });
}

// Aplicando no Girassol 1 e Folhas 3
const girassol1 = document.querySelector('.Girassol1');
const folhas3 = document.querySelector('.folhas3');
if (girassol1 && folhas3) ativarAnimacao(girassol1, folhas3);

// Aplicando no Girassol 2 e Folhas 2
const girassol2 = document.querySelector('.Girassol2');
const folhas2 = document.querySelector('.folhas2');
if (girassol2 && folhas2) ativarAnimacao(girassol2, folhas2);





















/* ====================================================
   MÁQUINA DE ESCREVER COM FADE-IN DO TEXTO
   ==================================================== */
const frase = "Seu astral ilumina todos como o sol, Manuela.\nPor isso te amar é tão fácil. Quer uma prova?";
const elementoTexto = document.getElementById("texto-digitado");

// Puxando exatamente a CLASSE do seu h6
const textoContinue = document.querySelector(".efeito-fantasma");
let jaDigitou = false;

function efeitoMaquina(texto, elemento, velocidade) {
    let i = 0;
    elemento.textContent = "";

    function digitar() {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        } else {
            // A MÁGICA: Acabou de digitar a frase? Acende o h6!
            if (textoContinue) {
                textoContinue.classList.add("aparecer");
            }
        }
    }
    digitar();
}

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        // Usa o siteLiberado para garantir que a tela inicial já passou
        if (entrada.isIntersecting && !jaDigitou && siteLiberado) {
            jaDigitou = true;
            efeitoMaquina(frase, elementoTexto, 80);
        }
    });
}, { threshold: 0.5 });

const secao = document.getElementById("secao-2");
if (secao) observador.observe(secao);