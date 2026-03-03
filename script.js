

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
// PLAYER DE ÁUDIO (MÚSICA 1 E 2)
// ==========================================

// Elementos da Música 1
const musica = document.getElementById("musica");
const btnPlay = document.getElementById("btn-play");
const textoDicaAudio = document.getElementById("texto-dica");

// Elementos da Música 2
const musica2 = document.getElementById("musica2");
const btnPlay2 = document.getElementById("btn-play-2"); // Agora no lugar certo!
const textoDica2 = document.getElementById("texto-dica-2");

// Função inteligente para pausar TUDO e voltar os textos/imagens pro padrão
function pausarTudo() {
    // 1. Pausa as duas músicas
    if (musica) musica.pause();
    if (musica2) musica2.pause();
    
    // 2. Reseta a imagem dos dois botões de play
    if (btnPlay) btnPlay.src = "img/play.png";
    if (btnPlay2) btnPlay2.src = "img/play.png";
    
    // 3. Reseta o texto da Música 1
    if (textoDicaAudio) {
        textoDicaAudio.innerText = "clique no play, sorriso!";
        textoDicaAudio.classList.remove("fonte-romantica");
        textoDicaAudio.classList.add("fonte-normal");
    }

    // 4. Reseta o texto da Música 2
    if (textoDica2) {
        textoDica2.innerText = "aperte no play para conseguir ler a carta";
        textoDica2.classList.remove("fonte-romantica");
        textoDica2.classList.add("fonte-normal");
    }
}

// ==========================================
// AÇÃO DA MÚSICA 1
// ==========================================
if (btnPlay) {
    btnPlay.onclick = function() {
        if (musica.paused) {
            pausarTudo(); // Cala a música 2 antes de tocar a 1
            musica.play();
            btnPlay.src = "img/play-go.png";
            if (textoDicaAudio) {
                textoDicaAudio.innerText = "agora sim, pode descer 💛🔊";
                textoDicaAudio.classList.remove("fonte-normal");
                textoDicaAudio.classList.add("fonte-romantica");
            }
        } else {
            pausarTudo(); // Se já estava tocando, só pausa e reseta
        }
    }
}

// ==========================================
// AÇÃO DA MÚSICA 2 (Com a carta aparecendo)
// ==========================================
if (btnPlay2) {
    btnPlay2.onclick = function() {
        if (musica2.paused) {
            pausarTudo(); // Cala a música 1 antes de tocar a 2
            musica2.play();
            btnPlay2.src = "img/play-go.png"; 
            
            if (textoDica2) {
                textoDica2.innerText = "lendo a carta com a nossa música 💛🔊";
                textoDica2.classList.remove("fonte-normal");
                textoDica2.classList.add("fonte-romantica");
            }

            // === A MÁGICA DA CARTA ACONTECE AQUI ===
            const cartaSecreta = document.getElementById("texto-carta");
            if (cartaSecreta) {
                cartaSecreta.style.display = "block"; // Faz o texto aparecer!
            }

        } else {
            pausarTudo(); // Pausa a música, mas repare que NÃO escondemos a carta de novo!
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







// ==========================================
// SCROLL MÁGICO: Plantas do Container 2
// ==========================================

// Criamos o "Vigia" que olha a tela
const observadorDePlantas = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            // Se entrou na tela: Adiciona a classe (Surge e Treme)
            entrada.target.classList.add('surgiu-na-tela');
        } else {
            // Se saiu da tela: Remove a classe (Retrai/Some para o próximo scroll)
            entrada.target.classList.remove('surgiu-na-tela');
        }
    });
}, {
    threshold: 0.1 // Dispara a animação quando pelo menos 10% da planta aparecer
});

// Selecionamos toda a tropa de enfeites do Container 2
const enfeitesContainer2 = document.querySelectorAll(`
    .girassol1-container2, .girassol2-container2, .girassol3-container2,
    .girassol4-container2, .girassol5-container2, .girassol6-container2, .girassol7-container2,
    .folhas1-container2, .folhas2-container2, .folhas3-container2,
    .folhas4-container2, .folhas5-container2
`);

// Mandamos o vigia ficar de olho em cada uma delas
enfeitesContainer2.forEach((enfeite) => {
    observadorDePlantas.observe(enfeite);
});








// ==========================================
//  =======> ANIMAÇÕES CONTAINER 3 --- AMIGOS  <=======
// ==========================================


// ==========================================================
// PARES DE ANIMAÇÃO (MÃO DUPLA) - CONTAINER 3 para o midia pc after
// ==========================================================

// ============================= > MARCELA < =
const girassol1_c3 = document.querySelector('.girassol1-container3');
const folhas2_c3 = document.querySelector('.folhas2-container3');
if (girassol1_c3 && folhas2_c3) ativarAnimacao(girassol1_c3, folhas2_c3);

const girassol3_c3 = document.querySelector('.girassol3-container3');
const folhas1_c3 = document.querySelector('.folhas1-container3');
if (girassol3_c3 && folhas1_c3) ativarAnimacao(girassol3_c3, folhas1_c3);






// ============================= > LELE < =
const girassol2_c3 = document.querySelector('.girassol2-container3');
const folhas7_c3 = document.querySelector('.folhas7-container3');
if (girassol2_c3 && folhas7_c3) ativarAnimacao(girassol2_c3, folhas7_c3);





// ============================= > CLARA < =
const girassol4_c3 = document.querySelector('.girassol4-container3');
const folhas8_c3 = document.querySelector('.folhas8-container3');
if (girassol4_c3 && folhas8_c3) ativarAnimacao(girassol4_c3, folhas8_c3);






// ============================= > TABATA < =
const girassol5_c3 = document.querySelector('.girassol5-container3');
const folhas10_c3 = document.querySelector('.folhas10-container3');
if (girassol5_c3 && folhas10_c3) ativarAnimacao(girassol5_c3, folhas10_c3);

const girassol6_c3 = document.querySelector('.girassol6-container3');
const folhas9_c3 = document.querySelector('.folhas9-container3');
if (girassol6_c3 && folhas9_c3) ativarAnimacao(girassol6_c3, folhas9_c3);


// EFEITO ISOLADO: Folhas 5 e 6 (Sem par de Girassol)

const folhasSolitariasC3 = document.querySelectorAll('.folhas5-container3, .folhas6-container3');

folhasSolitariasC3.forEach((folha) => {
    let tempoFolhaSolitaria;

    function tremerSolitaria() {
        folha.classList.add('tremendo'); // Usa a sua animação original!
        
        clearTimeout(tempoFolhaSolitaria); 
        
        tempoFolhaSolitaria = setTimeout(() => {
            folha.classList.remove('tremendo');
        }, 600);
    }

    // Gatilhos
    folha.addEventListener('click', tremerSolitaria);
    folha.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 900) tremerSolitaria();
    });
});








/* =========================================
======================================           CONTAINER 4 - SENHA
========================================= */


// ==========================================================
// SISTEMA DE SENHA (MÁSCARA DE DATA + SHA-256)
// ==========================================================

const inputSenha = document.getElementById('input-senha');
const btnSenha = document.getElementById('btn-senha');
const erroSenha = document.getElementById('erro-senha');
const secaoCarta = document.getElementById('secao-carta');

// 1. MÁSCARA INTELIGENTE: Coloca as barras (/) automaticamente
if (inputSenha) {
    inputSenha.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, ''); // Arranca tudo que não for número
        
        // Coloca a primeira barra depois do dia
        if (valor.length > 2) valor = valor.slice(0, 2) + '/' + valor.slice(2);
        
        // Coloca a segunda barra depois do mês
        if (valor.length > 5) valor = valor.slice(0, 5) + '/' + valor.slice(5);
        
        e.target.value = valor; // Devolve pro campo formatado bonitinho
    });
}

// 2. FUNÇÃO DE VALIDAÇÃO
async function validar() {
    const senhaDigitada = inputSenha.value;

    // Verifica se ela digitou a data inteira (10 caracteres contando as barras)
    if (senhaDigitada.length !== 10) {
        erroSenha.textContent = "Por favor, digite a data completa (DD/MM/AAAA).";
        erroSenha.style.display = 'block';
        return;
    }

    // Transforma a data (ex: 11/10/2025) em um Hash SHA-256
    const msgBuffer = new TextEncoder().encode(senhaDigitada);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashGerado = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // DICA: Digite a data no site, olhe o Console (F12) e copie o Hash novo!
    console.log("O Hash da data " + senhaDigitada + " é:", hashGerado);

    // COLE O HASH NOVO AQUI DENTRO DAS ASPAS:
    const hashCorreto = "1c575020c7b336b630e3ed2c6f7b042b8ffacb774765216674103b777bec313e"; 

    if (hashGerado === hashCorreto) {
        // ACERTOU!
        erroSenha.style.display = 'none'; 
        secaoCarta.style.display = 'flex'; 
        secaoCarta.scrollIntoView({ behavior: 'smooth' });
    } else {
        // ERROU!
        erroSenha.textContent = "Data incorreta. Tente novamente!";
        erroSenha.style.display = 'block'; 
    }
}

if (btnSenha) {
    btnSenha.addEventListener('click', validar);
}