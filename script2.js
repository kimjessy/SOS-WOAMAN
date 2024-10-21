document.addEventListener('DOMContentLoaded', () => {
    const narrationText = document.getElementById('narration-text');
    const choicesContainer = document.getElementById('choices');
    const characterImage = document.getElementById('character-image');
    const backgroundAudio = document.getElementById('background-audio');

    let currentScene = 0;

    // Reproduzir o áudio ao carregar a página
    backgroundAudio.play().catch(error => {
        console.log("Erro ao reproduzir o áudio: ", error);
    });

    // Estrutura de cenas do jogo

        const scenes = [
            {
                image: 'fotocasal.png',
                text: 'Depois de dois anos morando de favor, o casal decide que é hora de uma mudança e se muda para uma nova casa, buscando mais privacidade. Contudo, as ofensas de Lucas com Vivian continuam, algo que Vivian já está acostumada e até culpa a si mesma. Em algum momento, as humilhações se transformam em socos e tapas.',
                choices: [
                    { text: 'Continuar', nextScene: 1 }
                ]
            },
            {
                image: 'Lucasbravo.png',
                text: 'Em uma quarta-feira, Lucas chega do trabalho irritado e começa a descontar sua raiva xingando Vivian, dizendo que ela não serve para nada. Ele repara na bagunça da sala e a culpa por isso.',
                choices: [
                    { text: 'Discutir com Lucas', nextScene: 2 },
                    { text: 'Arrumar a bagunça', nextScene: 3 }
                ]
            },
            {
                image: 'discutindo .png',
                text: 'Vivian tenta se defender e entra em uma discussão com Lucas, mas ele se enfurece ainda mais e começa a agredi-la com tapas e socos, deixando hematomas em seu rosto.',
                choices: [
                    { text: 'Se trancar no banheiro com o bebê', nextScene: 4 }
                ]
            },
            {
                image: 'vivian.jpg',
                text: 'Vivian fica calada enquanto Lucas a humilha e começa a organizar a sala, sentindo-se culpada por não ter feito isso antes.',
                choices: [
                    { text: 'Pedir desculpas', nextScene: 5 },
                    { text: 'Acalmar Lucas', nextScene: 6 }
                ]
            },
            {
                image: 'bathroom.jpg',
                text: 'Assustada com o que está acontecendo, Vivian se tranca no banheiro com o bebê, que não para de chorar, enquanto ouve Lucas gritando do lado de fora.',
                choices: [
                    { text: 'Continuar', nextScene: 7 }
                ]
            },
            {
                image: 'copo.jpg',
                text: 'Tentando se desculpar, Vivian esbarra na mesa e quebra um copo. Antes que possa reagir, Lucas a atinge com um tapa, fazendo-a cair no chão, desorientada.',
                choices: [
                    { text: 'Correr para a vizinha', nextScene: 8 }
                ]
            },
            {
                image: 'vivian.jpg',
                text: 'Vivian- Sinto muito, sei que deveria ter feito antes, mas tinha muitas coisas e não dei conta.',
                choices: [
                    { text: '...', nextScene: 8}
                ]
            },

            {
                image: 'Lucasbravo.png',
                text: 'Lucas- Olha o que você fez, sua imprestável..',
                choices: [
                    { text: '...', nextScene: 9 }
                ]
            },

            {
                image: 'vivian.jpg',
                text: 'Vivian- Foi sem querer, você me…    -Lucas a atinge com um tapa, fazendo-a cair no chão, desorientada',
                choices: [
                    { text: ' se levantar e Correr', nextScene: 10}
                ]
            },

            {
                image: 'foofoca.jpg',
                text: 'Vivian corre para a casa da vizinha com seu bebê nos braços, explicando o que aconteceu e se sentindo culpada por ter deixado a casa bagunçada.',
                choices: [
                    { text: 'Explicar o que aconteceu', nextScene: 10 }
                ]
            },
            {
                image: 'panhou.png',
                text: ' A culpa foi minha…. estava com dor de cabeça e não fiz minhas obrigações, se eu não fosse tão preguiçosa.',
                choices: [
                    { text: '>>>', nextScene: 11}
                ]
            },

            {
                image: 'vizinha.jpg',
                text: ' Vizinha- Mas i-isso não é motivo para ele te tratar assim Vivian.',
                choices: [
                    { text: '>>>', nextScene: 12 }
                ]
            },

            {
                image: 'panhou.png',
                text: 'Vivian- Ele só estava estressado do trabalho e juntou tudo e deu nisso, Lucas é bom para mim e para o nosso filho, tenho certeza que ele não fez por querer.',
                choices: [
                    { text: '>>>', nextScene: 13 }
                ]
            },

            {
                image: 'panhou.png',
                text: 'Vivian- E sem o Lucas não sou ninguém, não tenho trabalho e nem falo mais com minha família, não tenho para onde ir.',
                choices: [
                    { text: '>>>', nextScene: 14 }
                ]
            },

            {
                image: 'vizinha.jpg',
                text: 'Vizinha- Claro que ele fez, olha seu estado, vamos a delegacia, lá eles vão te dar apoio.Vizinha- Eu posso te ajudar, te deixo ficar aqui por um tempo e te ajudo a conseguir um emprego.',
                choices: [
                    { text: '>>>', nextScene: 15 }
                ]
            },

            {
                image: 'foofoca.jpg',
                text: 'Vivian aceita a ajuda da vizinha, embora com receio. Ela pensa nos crescentes machucados e nas ações violentas de Lucas. Sua vizinha a leva à delegacia para fazer uma denúncia.',
                choices: [
                    { text: 'Aceiatr Ajuda', nextScene: 16},
                    { text: 'ir para casa', nextScene: 25 }
                ]
            },
            {
                video: 'vivi.mp4',  // Substitua 'video_url.mp4' pelo caminho do seu vídeo
                text: 'Na delegacia, com o apoio da vizinha, Vivian denuncia Lucas e mostra as marcas das agressões. Ela recebe uma medida protetiva e o apoio de uma ONG para recomeçar sua vida.',
                choices: [
                    { text: 'Finalizar', nextScene: null }
                ]
            },
        
        


//pt2 aquiiiiiiiiiiiiiiiii
        {
            image: 'house.jpg',
            text: 'Vivian tenta retomar sua rotina após o ataque, cuidando do bebê e tentando manter a casa em ordem. Quando Lucas volta, ele a enche de elogios, como se nada tivesse acontecido. Mas os episódios de agressão continuam, e ela começa a se sentir cada vez mais deprimida e ansiosa. Uma manhã, o bebê acorda com febre e dor, mas Lucas diz que “é coisa de criança”.',
            choices: [
                { text: 'Continuar insistindo em ligar para Lucas', nextScene: 1 },
                { text: 'Arrumar as coisas e ir ao hospital, deixando um bilhete', nextScene: 2 }
            ]
        },
        {
            image: 'phone.jpg',
            text: 'Após várias tentativas, Lucas finalmente atende, irritado. Vivian pede para ele ir levá-los ao hospital por conta da piora do bebê. Ele diz que resolverá isso quando chegar em casa.',
            choices: [
                { text: 'Voltar para casa e esperar', nextScene: 3 }
            ]
        },
        {
            image: 'hospital.jpg',
            text: 'Vivian decide ir ao hospital por conta própria. Na consulta, a pediatra nota hematomas em seu braço e sob a maquiagem que tenta cobrir o grande roxo no lábio.',
            choices: [
                { text: 'Negar e apaziguar a médica', nextScene: 4 },
                { text: 'Aceitar a ajuda e denunciar', nextScene: 5 }
            ]
        },
        {
            image: 'home.jpg',
            text: 'Vivian volta para casa, agradece à vizinha pelo celular e aguarda Lucas. A tensão aumenta enquanto ela se prepara para o que pode acontecer quando ele chegar.',
            choices: [
                { text: 'Esperar Lucas com ansiedade', nextScene: 6 }
            ]
        },
        {
            image: 'doctor.jpg',
            text: 'Médica: “Notei o hematoma em seu braço. O que aconteceu?” Vivian tenta minimizar: “Foi um esbarrão no ônibus.” A médica insiste, preocupada.',
            choices: [
                { text: 'Insistir que está tudo bem e sair', nextScene: 7 },
                { text: 'Aceitar ajuda', nextScene: 5 }
            ]
        },
        {
            image: 'womens_center.jpg',
            text: 'Na delegacia, Vivian decide fazer uma denúncia com o apoio da vizinha, que se oferece para ajudar. “Vamos conseguir uma medida protetiva para você e seu filho.”',
            choices: [
                { text: 'Continuar para a Casa da Mulher Brasileira', nextScene: 8 }
            ]
        },
        {
            image: 'home.jpg',
            text: 'Lucas chega irritado e pressiona Vivian, ignorando suas desculpas e tentando desqualificar suas ações. Ela sente a ameaça constante e se vê sem opções.',
            choices: [
                { text: 'Continuar enfrentando Lucas', nextScene: 9 },
                { text: 'Tentar apaziguar e evitar confronto', nextScene: 10 }
            ]
        },
        {
            image: 'waiting_room.jpg',
            text: 'Na sala de espera do hospital, Vivian vê outra mulher machucada e ouve as enfermeiras conversando sobre casos de violência doméstica. Ela se pergunta se deveria pedir ajuda.',
            choices: [
                { text: 'Considerar o sinal das enfermeiras e pedir ajuda', nextScene: 5 },
                { text: 'Ignorar e voltar para casa', nextScene: 11 }
            ]
        },
        {
            image: 'safehouse.jpg',
            text: 'A vítima decide buscar apoio na Casa da Mulher Brasileira, onde encontra suporte para proteger a si e ao filho. O processo de recuperação começa.',
            choices: [
                { text: 'Agradecer e se preparar para uma nova vida', nextScene: 12 }
            ]
        },
        {
            image: 'conflict.jpg',
            text: 'Ao enfrentar Lucas, Vivian se vê envolvida em uma discussão intensa, com Lucas ficando cada vez mais agressivo.',
            choices: [
                { text: 'Se defender e tentar sair de casa', nextScene: 13 },
                { text: 'Aceitar o confronto e não reagir', nextScene: 14 }
            ]
        },
        {
            image: 'calm.jpg',
            text: 'Vivian tenta apaziguar Lucas para evitar outra briga, mas a ameaça permanece e ela se sente aprisionada.',
            choices: [
                { text: 'Refletir sobre buscar ajuda', nextScene: 5 },
                { text: 'Aceitar a situação e esperar', nextScene: 15 }
            ]
        }
        // Final do trecho adicional
    ];
    

    

     // Função para exibir texto como uma máquina de escrever
function typeWriterEffect(text, element, speed, callback, afterCallback) {
    const words = text.split(' '); // Divide o texto em palavras
    let index = 0;

    function type() {
        if (index < words.length) {
            element.textContent += words[index] + ' '; // Adiciona a próxima palavra
            speak(words[index]); // Narra a palavra atual
            index++;
            setTimeout(type, speed); // Espera um tempo antes de digitar a próxima palavra
        } else {
            callback(); // Chama o callback após terminar de digitar
            if (afterCallback) afterCallback(); // Chama afterCallback, se existir
        }
    }
    type();
}

// Função para sintetizar a fala
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; // Define a língua para português
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Google')) || null; // Busca por uma voz feminina

    speechSynthesis.speak(utterance);
}
    


   

function renderScene(sceneIndex) {
    const scene = scenes[sceneIndex];
    characterImage.src = scene.image;
    narrationText.textContent = ''; // Limpa o texto anterior
    choicesContainer.innerHTML = '';

    // Oculta os botões de escolha enquanto a narração está sendo digitada
    choicesContainer.style.display = 'none';

    // Exibe o texto com o efeito de máquina de escrever
    typeWriterEffect(scene.text, narrationText, 50, () => {
        // Após a narração principal, exibe os botões de escolha e narra as opções
        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = `${index + 1}. ${choice.text}`; // Adiciona o número antes do texto
            button.classList.add('choice-button');

            // Adiciona evento de clique para narrar a opção e renderizar a próxima cena
            button.addEventListener('click', () => {
                speak(choice.text); // Narra o texto da escolha
                currentScene = choice.nextScene; // Atualiza currentScene
                renderScene(currentScene); // Renderiza a próxima cena
            });

            choicesContainer.appendChild(button);
        });

        // Mostra os botões de escolha apenas se houver escolhas disponíveis
        choicesContainer.style.display = scene.choices.length > 0 ? 'flex' : 'none';

        // Adiciona um listener de teclado para selecionar escolhas
        document.addEventListener('keydown', handleKeyPress);
    }, () => {
        // Após narrar o texto principal, narra as opções
        if (scene.choices.length > 0) {
            speak("Escolha uma opção: " + scene.choices.map(c => c.text).join(", "));
        }
    });
}

// Função para lidar com a pressão de teclas
function handleKeyPress(event) {
    const key = event.key; // Captura a tecla pressionada
    const scene = scenes[currentScene];

    if (key === '1' && scene.choices.length > 0) {
        // Atualiza currentScene e renderiza a próxima cena
        currentScene = scene.choices[0].nextScene;
        renderScene(currentScene);
    } else if (key === '2' && scene.choices.length > 1) {
        // Atualiza currentScene e renderiza a próxima cena
        currentScene = scene.choices[1].nextScene;
        renderScene(currentScene);
    }

    // Remover o listener após uma escolha
    document.removeEventListener('keydown', handleKeyPress);
}

renderScene(currentScene);

});

