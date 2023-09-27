// Obtenha os elementos da imagem e do áudio
const imagensMusicas = document.querySelectorAll('.musicas li img');
const audiosMusicas = document.querySelectorAll('.musicas li audio');
const mensagemMusica = document.getElementById('mensagemMusica');

// Variável para rastrear o estado de reprodução da música
let musicaTocando = false;
let musicaAtual = null;

// Função para atualizar a mensagem
function atualizarMensagem(musicaNome) {
    mensagemMusica.textContent = `Tocando agora - ${musicaNome}`;
    mensagemMusica.style.display = 'block';
}

// Função para parar a música atual
function pararMusica() {
    if (musicaAtual) {
        musicaAtual.pause();
        musicaAtual.style.display = 'none';
    }
}

// Adicione um ouvinte de evento de clique a todas as imagens de música
imagensMusicas.forEach((imagem, index) => {
    imagem.addEventListener('click', () => {
        pararMusica();
        if (musicaAtual !== audiosMusicas[index]) {
            // Inicie a reprodução da música automaticamente
            audiosMusicas[index].style.display = 'block';
            audiosMusicas[index].play();
            // Atualize a variável de estado da música
            musicaTocando = true;
            // Atualize a mensagem com o nome da música
            atualizarMensagem(imagensMusicas[index].nextElementSibling.textContent);
            // Atualize a música atual
            musicaAtual = audiosMusicas[index];
        } else {
            // Oculte o áudio para a música clicada
            audiosMusicas[index].style.display = 'none';
            // Pausa a reprodução da música, se estiver tocando
            audiosMusicas[index].pause();
            // Redefina a variável de estado da música
            musicaTocando = false;
            // Oculte a mensagem
            mensagemMusica.style.display = 'none';
            // Redefina a música atual
            musicaAtual = null;
        }
    });
});

// Adicione um ouvinte de evento 'ended' a todas as músicas
audiosMusicas.forEach((audio, index) => {
    audio.addEventListener('ended', () => {
        // Redefina a variável de estado da música quando a música termina
        musicaTocando = false;
        // Oculte a mensagem quando a música termina
        mensagemMusica.style.display = 'none';

        // Toca automaticamente a próxima música, se houver uma
        if (index < audiosMusicas.length - 1) {
            const proximoAudio = audiosMusicas[index + 1];
            const proximaImagem = imagensMusicas[index + 1];
            proximoAudio.style.display = 'block';
            proximoAudio.play();
            atualizarMensagem(proximaImagem.nextElementSibling.textContent);
            musicaTocando = true;
            musicaAtual = proximoAudio;
        }
    });
});
