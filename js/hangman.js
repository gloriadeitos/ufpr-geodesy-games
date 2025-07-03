// hangman.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const startHangmanBtn = document.getElementById('start-hangman');
    const hangmanContainer = document.getElementById('hangman-container');
    const hangmanTopicSelect = document.getElementById('hangman-topic');
    const hangmanPlaceholder = document.getElementById('hangman-placeholder');
    const hangmanContent = document.getElementById('hangman-content');
    const hangmanWordDisplay = document.getElementById('hangman-word-display');
    const hangmanKeyboard = document.getElementById('hangman-keyboard');
    const wrongLettersDisplay = document.getElementById('wrong-letters');
    const remainingAttemptsDisplay = document.getElementById('remaining-attempts');
    const hangmanNewGameBtn = document.getElementById('hangman-new-game');
    const hangmanShowWordBtn = document.getElementById('hangman-show-word');
    const hangmanResult = document.getElementById('hangman-result');
    const hangmanResultTitle = document.getElementById('hangman-result-title');
    const hangmanResultMessage = document.getElementById('hangman-result-message');
    const hangmanResultWord = document.getElementById('hangman-result-word');
    const hangmanResultAttempts = document.getElementById('hangman-result-attempts');
    const hangmanPlayAgainBtn = document.getElementById('hangman-play-again');
    const hangmanNewThemeBtn = document.getElementById('hangman-new-theme');
    const hangmanBackBtn = document.getElementById('hangman-back');
    
    // Variáveis do jogo
    let currentWord = '';
    let guessedLetters = [];
    let wrongLetters = [];
    let remainingAttempts = 6;
    let gameEnded = false;
    
    // Palavras por tema
    const hangmanWords = {
        basic: ['GEODESIA', 'DATUM', 'ELIPSOIDE', 'GRAVIDADE', 'NIVELAMENTO', 'ALTIMETRIA', 'GEOMETRICO', 'FISICO'],
        cartesian: ['COORDENADA', 'ABSCISSA', 'ORDENADA', 'COTA', 'TRANSFORMACAO', 'PROJECAO', 'CARTOGRAFICA', 'GEOCENTRICO'],
        spherical: ['LATITUDE', 'LONGITUDE', 'AZIMUTE', 'TRIANGULACAO', 'ESFERICO', 'ARCO', 'MERIDIANO', 'PARALELO']
    };
    
    // Partes do boneco (ordem de exibição)
    const hangmanParts = [
        'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg',
        'eye1', 'eye2', 'mouth'
    ];
    
    // Inicializa o teclado
    function initKeyboard() {
        hangmanKeyboard.innerHTML = '';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        letters.forEach(letter => {
            const button = document.createElement('button');
            button.className = 'hangman-key';
            button.textContent = letter;
            button.dataset.letter = letter;
            button.addEventListener('click', () => handleGuess(letter));
            hangmanKeyboard.appendChild(button);
        });
    }
    
    // Atualiza a exibição da palavra
    function updateWordDisplay() {
        let display = '';
        
        for (const letter of currentWord) {
            if (guessedLetters.includes(letter) || letter === ' ') {
                display += letter + ' ';
            } else {
                display += '_ ';
            }
        }
        
        hangmanWordDisplay.textContent = display.trim();
        
        // Verifica se o jogador ganhou
        if (!display.includes('_') && currentWord !== '') {
            endGame(true);
        }
    }
    
    // Atualiza o status do jogo
    function updateStatus() {
        wrongLettersDisplay.textContent = wrongLetters.join(', ');
        remainingAttemptsDisplay.textContent = remainingAttempts;
    }
    
    // Processa um palpite
    function handleGuess(letter) {
        if (gameEnded) return;
        
        const keyButton = document.querySelector(`.hangman-key[data-letter="${letter}"]`);
        if (!keyButton || keyButton.disabled) return;
        
        keyButton.disabled = true;
        
        if (currentWord.includes(letter)) {
            // Letra correta
            keyButton.classList.add('correct');
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                updateWordDisplay();
            }
        } else {
            // Letra errada
            keyButton.classList.add('wrong');
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                remainingAttempts--;
                updateStatus();
                drawNextPart();
                
                if (remainingAttempts <= 0) {
                    endGame(false);
                }
            }
        }
    }
    
    // Desenha a próxima parte do boneco
    function drawNextPart() {
        const partIndex = 6 - remainingAttempts - 1;
        if (partIndex >= 0 && partIndex < hangmanParts.length) {
            const partId = hangmanParts[partIndex];
            const part = document.getElementById(partId);
            if (part) part.style.display = '';
        }
    }
    
    // Finaliza o jogo
    function endGame(win) {
        gameEnded = true;
        hangmanNewGameBtn.disabled = false;
        
        if (win) {
            hangmanResultTitle.textContent = 'Parabéns!';
            hangmanResultMessage.textContent = 'Você adivinhou a palavra corretamente!';
            document.querySelector('.result-icon i').className = 'fas fa-trophy';
            document.querySelector('.result-icon').className = 'result-icon text-success';
        } else {
            hangmanResultTitle.textContent = 'Fim de Jogo!';
            hangmanResultMessage.textContent = 'Você não conseguiu adivinhar a palavra.';
            document.querySelector('.result-icon i').className = 'fas fa-skull';
            document.querySelector('.result-icon').className = 'result-icon text-danger';
        }
        
        hangmanResultWord.innerHTML = `Palavra: <span class="fw-bold">${currentWord}</span>`;
        hangmanResultAttempts.innerHTML = `Tentativas erradas: <span class="fw-bold">${wrongLetters.length}</span>`;
        hangmanResult.style.display = 'block';
    }
    
    // Reinicia o jogo com uma nova palavra
    function startNewGame() {
        // Escolhe uma palavra aleatória do tema selecionado
        const topic = hangmanTopicSelect.value;
        let words = [];
        
        if (topic === 'all') {
            words = [...hangmanWords.basic, ...hangmanWords.cartesian, ...hangmanWords.spherical];
        } else {
            words = hangmanWords[topic] || [];
        }
        
        if (words.length === 0) return;
        
        currentWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = [];
        wrongLetters = [];
        remainingAttempts = 6;
        gameEnded = false;
        
        // Reseta o boneco
        hangmanParts.forEach(partId => {
            const part = document.getElementById(partId);
            if (part) part.style.display = 'none';
        });
        
        // Reseta o teclado
        document.querySelectorAll('.hangman-key').forEach(button => {
            button.disabled = false;
            button.classList.remove('correct', 'wrong');
        });
        
        updateWordDisplay();
        updateStatus();
        hangmanResult.style.display = 'none';
        hangmanNewGameBtn.disabled = true;
        hangmanShowWordBtn.disabled = false;
    }
    
    // Mostra a palavra atual
    function showCurrentWord() {
        if (gameEnded) return;
        
        for (const letter of currentWord) {
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
            }
        }
        
        updateWordDisplay();
        endGame(false);
    }
    
    // Event listeners
    startHangmanBtn.addEventListener('click', function() {
        document.getElementById('game-selection').style.display = 'none';
        hangmanContainer.style.display = 'block';
        initKeyboard();
    });
    
    hangmanTopicSelect.addEventListener('change', function() {
        if (this.value) {
            hangmanPlaceholder.style.display = 'none';
            hangmanContent.style.display = 'block';
            startNewGame();
        } else {
            hangmanPlaceholder.style.display = 'block';
            hangmanContent.style.display = 'none';
        }
    });
    
    hangmanNewGameBtn.addEventListener('click', startNewGame);
    hangmanShowWordBtn.addEventListener('click', showCurrentWord);
    hangmanPlayAgainBtn.addEventListener('click', startNewGame);
    
    hangmanNewThemeBtn.addEventListener('click', function() {
        hangmanResult.style.display = 'none';
        hangmanTopicSelect.value = '';
        hangmanPlaceholder.style.display = 'block';
        hangmanContent.style.display = 'none';
    });
    
    hangmanBackBtn.addEventListener('click', function() {
        hangmanContainer.style.display = 'none';
        document.getElementById('game-selection').style.display = 'flex';
    });
    
    // Teclado físico
    document.addEventListener('keydown', function(e) {
        if (!hangmanContainer.style.display || hangmanContainer.style.display === 'none') return;
        
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
            handleGuess(key);
        }
    });
});