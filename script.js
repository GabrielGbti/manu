

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
        musica.play();
        btnPlay.src = "img/play-go.png";
        
        textoDica.innerText = "agora sim, pode descer 💛💛💛";
        textoDica.classList.remove("fonte-normal");
        textoDica.classList.add("fonte-romantica");

    } else {
        musica.pause();
        btnPlay.src = "img/play.png";
        
        textoDica.innerText = "clique no play, sorriso!";
        textoDica.classList.remove("fonte-romantica");
        textoDica.classList.add("fonte-normal");
    }
}













// Função inteligente que serve para qualquer girassol e folha
function ativarAnimacao(girassol, folha) {
    let tempoAnimacao; // Variável para controlar o tempo e não bugar

    // A mágica acontece aqui
    function dispararEfeito() {
        folha.classList.add('tremendo');
        girassol.classList.add('girassol-balancando');

        clearTimeout(tempoAnimacao); // Reseta o cronômetro se passar o mouse de novo rápido
        
        tempoAnimacao = setTimeout(() => {
            folha.classList.remove('tremendo');
            girassol.classList.remove('girassol-balancando');
        }, 600); // Nossos 600ms cravados
    }

    // 1. Mantém o CLIQUE funcionando perfeitamente (para o Celular)
    girassol.addEventListener('click', dispararEfeito);

    // 2. Adiciona o PASSAR O MOUSE (mouseenter) exclusivamente para o PC
    girassol.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) { // Checa se a tela é de PC
            dispararEfeito();
        }
    });
}

// Aplicando no Girassol 1
const girassol1 = document.querySelector('.Girassol1');
const folhas3 = document.querySelector('.folhas3');
if (girassol1 && folhas3) ativarAnimacao(girassol1, folhas3);

// Aplicando no Girassol 2
const girassol2 = document.querySelector('.Girassol2');
const folhas2 = document.querySelector('.folhas2');
if (girassol2 && folhas2) ativarAnimacao(girassol2, folhas2);

















/* ====================================================
   MÁQUINA DE ESCREVER COM FADE-IN DO TEXTO
   ==================================================== */
const frase = "Seu astral ilumina todos como o sol, Manuela. Por isso te amar é tão fácil. Quer uma prova?";
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