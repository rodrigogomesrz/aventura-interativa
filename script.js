
const cenas = {
    inicio: {
        titulo: "O início da jornada",
        texto: "Você encontra uma floresta misteriosa ao anoitecer. Dois caminhos aparecem à sua frente. Qual deles escolher?",
        opcoes: [
            { texto: "Seguir o som do rio", destino: "rio" },
            { texto: "Explorar uma caverna", destino: "caverna" }
        ]
    },

    rio: {
        titulo: "O rio encantado",
        texto: "Você chega a um rio brilhante. Uma pequena ponte leva a um castelo, enquanto uma trilha segue para uma árvore gigante.",
        opcoes: [
            { texto: "Atravessar a ponte", destino: "castelo" },
            { texto: "Seguir até a árvore", destino: "arvore" }
        ]
    },

    caverna: {
        titulo: "A caverna misteriosa",
        texto: "Dentro da caverna, você encontra uma passagem iluminada por cristais e uma porta antiga com símbolos estranhos.",
        opcoes: [
            { texto: "Seguir os cristais", destino: "cristais" },
            { texto: "Abrir a porta antiga", destino: "porta" }
        ]
    },

    castelo: {
        titulo: "O castelo esquecido",
        texto: "Você encontra uma sala cheia de livros mágicos. Um deles revela a saída da floresta. Você venceu a aventura!",
        opcoes: [],
        final: true
    },

    arvore: {
        titulo: "A árvore ancestral",
        texto: "A árvore fala com você e oferece uma semente mágica. Ela ilumina o caminho para fora da floresta. Você venceu!",
        opcoes: [],
        final: true
    },

    cristais: {
        titulo: "A câmara dos cristais",
        texto: "Os cristais revelam um portal secreto. Você atravessa o portal e descobre um novo mundo. Aventura concluída!",
        opcoes: [],
        final: true
    },

    porta: {
        titulo: "A porta selada",
        texto: "A porta se abre e revela um tesouro antigo. Você encontra a chave que liberta a floresta do encantamento. Você venceu!",
        opcoes: [],
        final: true
    }
};

const aventura = document.querySelector("#aventura");
const tituloCena = document.querySelector("#titulo-cena");
const textoCena = document.querySelector("#texto-cena");
const opcoes = document.querySelector("#opcoes");
const progresso = document.querySelector("#progresso");
const mensagem = document.querySelector("#mensagem");
const botaoReiniciar = document.querySelector("#reiniciar");

let historico = [];

function mostrarCena(idCena) {
    const cena = cenas[idCena];

    if (!cena) {
        return;
    }

    aventura.dataset.cena = idCena;
    tituloCena.textContent = cena.titulo;
    textoCena.textContent = cena.texto;
    progresso.textContent = cena.final
        ? "Aventura concluída"
        : `Etapa ${historico.length + 1}`;

    mensagem.textContent = cena.final
        ? "Parabéns! Você chegou ao final da história."
        : "";

    opcoes.replaceChildren();

    cena.opcoes.forEach(function(opcao) {
        const botao = document.createElement("button");

        botao.classList.add("botao-escolha");
        botao.textContent = opcao.texto;
        botao.dataset.destino = opcao.destino;

        opcoes.appendChild(botao);
    });
}

opcoes.addEventListener("click", function(evento) {
    const botao = evento.target.closest("button[data-destino]");

    if (!botao || !opcoes.contains(botao)) {
        return;
    }

    const destino = botao.dataset.destino;

    if (!cenas[destino]) {
        return;
    }

    historico.push(aventura.dataset.cena);
    mostrarCena(destino);
});

botaoReiniciar.addEventListener("click", function() {
    historico = [];
    mostrarCena("inicio");
});

mostrarCena("inicio");
