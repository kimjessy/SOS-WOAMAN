document.addEventListener('DOMContentLoaded', () => {
    const narrationElement = document.getElementById('narration');
    const choicesContainer = document.getElementById('choices');
    const narrationImage = document.getElementById('narration-image');
    const toggleAudioButton = document.getElementById('toggle-audio');
    const introAudio = document.getElementById('intro-audio');
    let audioEnabled = false; // Variável para controlar se o áudio está ativado
    const synth = window.speechSynthesis; // API de narração de texto

    const narrations = {
        narracao1: {
            text: "Esta é a narração inicial do jogo. Escolha uma das opções abaixo.",
            image: "gui sem fundo.png",
            choices: [
                { text: "Opção 1 (A)", next: "narracao2", key: "A" },
                { text: "Opção 2 (B)", next: "narracao3", key: "B" }
            ]
        },
        narracao2: {
            text: "Você escolheu a primeira opção. Aqui está a nova narração. Escolha novamente.",
            image: "imagem2.jpg",
            choices: [
                { text: "Opção 1.1 (A)", next: "narracao4", key: "A" },
                { text: "Opção 1.2 (B)", next: "narracao5", key: "B" }
            ]
        },
        narracao3: {
            text: "Você escolheu a segunda opção. Aqui está outra narração. Escolha novamente.",
            image: "imagem3.jpg",
            choices: [
                { text: "Opção 2.1 (A)", next: "narracao6", key: "A" },
                { text: "Opção 2.2 (B)", next: "narracao7", key: "B" }
            ]
        },
        narracao4: {
            text: "Você escolheu a opção 1.1. Fim do caminho para esta escolha.",
            image: "imagem4.jpg",
            choices: []
        },
        narracao5: {
            text: "Você escolheu a opção 1.2. Fim do caminho para esta escolha.",
            image: "imagem5.jpg",
            choices: []
        },
        narracao6: {
            text: "Você escolheu a opção 2.1. Fim do caminho para esta escolha.",
            image: "imagem6.jpg",
            choices: []
        },
        narracao7: {
            text: "Você escolheu a opção 2.2. Fim do caminho para esta escolha.",
            image: "imagem7.jpg",
            choices: []
        }
    };

    // Toca o áudio de introdução ao carregar a página
    introAudio.play();

    function typeWriter(text, callback) {
        let i = 0;
        narrationElement.innerHTML = "";
        choicesContainer.style.display = 'none'; // Oculta os botões até a narração ser concluída

        function type() {
            if (i < text.length) {
                narrationElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                // Quando o texto terminar, exibe os botões
                choicesContainer.style.display = 'flex';
                if (callback) callback();
            }
        }
        type();
    }

    function narrateText(text) {
        if (audioEnabled && !synth.speaking) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR'; // Define o idioma
            synth.speak(utterance); // Inicia a narração
        }
    }

    function updateNarration(narrationKey) {
        const narration = narrations[narrationKey];
        typeWriter(narration.text, () => {
            choicesContainer.innerHTML = ""; // Limpa os botões antigos
            narration.choices.forEach(choice => {
                const button = document.createElement('button');
                button.className = 'choice-button';
                button.textContent = choice.text;
                button.dataset.next = choice.next;
                button.dataset.key = choice.key;
                choicesContainer.appendChild(button);
                button.addEventListener('click', () => {
                    updateNarration(choice.next);
                });
            });
        });

        // Atualiza a imagem de acordo com a narração
        narrationImage.src = narration.image;
        narrationImage.style.width = '800px';
        narrationImage.style.height = 'auto';
        narrationImage.style.maxWidth = '600px';

        // Se o áudio estiver ativado, narra o texto
        narrateText(narration.text);
    }

    // Listener para tecla espaço ativar/desativar narração do texto
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            toggleAudio();
        } else {
            const choiceButton = Array.from(document.querySelectorAll('.choice-button'))
                .find(button => button.dataset.key.toUpperCase() === event.key.toUpperCase());
            if (choiceButton) {
                updateNarration(choiceButton.dataset.next);
            }
        }
    });

    // Função para alternar o estado do áudio de narração
    function toggleAudio() {
        audioEnabled = true; // Garante que a narração fique ativada
        toggleAudioButton.textContent = "Narração Ativada (Pressione Espaço para desativar)";
        narrateText(narrationElement.textContent); // Narra o texto atual
    }

    // Listener para botão ativar/desativar narração do texto
    toggleAudioButton.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        if (!audioEnabled) {
            toggleAudioButton.textContent = "Narração Desativada (Pressione Espaço para ativar)";
            synth.cancel(); // Interrompe qualquer narração ativa
        } else {
            toggleAudio();
        }
    });

    // Inicia a narração
    const urlParams = new URLSearchParams(window.location.search);
    const episode = urlParams.get('episode');
    if (episode === '1') {
        updateNarration('narracao1');
    }
});

 