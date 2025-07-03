// Initialize jsPDF
const { jsPDF } = window.jspdf;

// Quiz data based on the PDF content
const quizzes = {
    basic: {
        title: "Conceitos Básicos de Geodésia",
        questions: [
            {
                question: "Qual é a definição original do metro baseada em Geodésia?",
                options: [
                    "1/10.000.000 da distância do equador ao polo norte medida no meridiano de Paris",
                    "Comprimento do trajeto percorrido pela luz no vácuo durante 1/299792458 do segundo",
                    "Distância entre duas marcas em uma barra de platina-irídio",
                    "1/40.000.000 da circunferência da Terra"
                ],
                answer: 0,
                explanation: "A definição original do metro (século XVIII) era baseada em Geodésia, como 1/10.000.000 do quadrante de meridiano da Terra (distância do equador ao polo norte medida no meridiano de Paris)."
            },
            {
                question: "Qual é a diferença entre um sistema dextrogiro e levogiro?",
                options: [
                    "Dextrogiro segue a regra da mão direita, levogiro da mão esquerda",
                    "Dextrogiro tem eixo Z para cima, levogiro para baixo",
                    "Dextrogiro usa metros, levogiro usa pés",
                    "Não há diferença, são termos intercambiáveis"
                ],
                answer: 0,
                explanation: "Um sistema dextrogiro segue a regra da mão direita: se você curvar os dedos da mão direita do eixo X para o Y, o polegar apontará para o eixo Z positivo. O levogiro segue a regra da mão esquerda."
            },
            {
                question: "Qual é o valor de 1 hectare em metros quadrados?",
                options: [
                    "10.000 m²",
                    "1.000 m²",
                    "100 m²",
                    "1 m²"
                ],
                answer: 0,
                explanation: "1 hectare equivale a 10.000 m² (100m x 100m). É uma unidade de área comumente usada em medições de terrenos."
            },
            {
                question: "Qual destes NÃO é um tipo de norte mencionado nos materiais?",
                options: [
                    "Norte astronômico",
                    "Norte geodésico",
                    "Norte magnético",
                    "Norte de quadrícula"
                ],
                answer: 0,
                explanation: "Os tipos de norte mencionados são: geodésico (verdadeiro), magnético, de quadrícula e topográfico (local/arbitrário). Norte astronômico não foi especificamente mencionado."
            },
            {
                question: "Qual é a fórmula para calcular a distância horizontal entre dois pontos em coordenadas cartesianas 2D?",
                options: [
                    "√[(X₂-X₁)² + (Y₂-Y₁)²]",
                    "(X₂-X₁) + (Y₂-Y₁)",
                    "√[(X₂+X₁)² - (Y₂+Y₁)²]",
                    "(X₂² + Y₂²) - (X₁² + Y₁²)"
                ],
                answer: 0,
                explanation: "A distância horizontal (ou distância euclidiana no plano) entre dois pontos 1 e 2 é calculada por dh₁₂ = √[(X₂-X₁)² + (Y₂-Y₁)²], que vem do teorema de Pitágoras."
            }
        ]
    },
    cartesian: {
        title: "Sistemas Cartesianos",
        questions: [
            {
                question: "Em um sistema cartesiano tridimensional geodésico, qual eixo normalmente coincide com o eixo de rotação da Terra?",
                options: [
                    "Eixo Z",
                    "Eixo X",
                    "Eixo Y",
                    "Nenhum dos eixos"
                ],
                answer: 0,
                explanation: "No sistema cartesiano tridimensional geodésico, o eixo Z é fixado na direção do eixo de rotação da Terra, positivo para o Polo Norte (PN)."
            },
            {
                question: "Qual é a sequência correta de transformações na fórmula de Bursa-Wolf?",
                options: [
                    "Escala → Rotação → Translação",
                    "Translação → Rotação → Escala",
                    "Rotação → Translação → Escala",
                    "Escala → Translação → Rotação"
                ],
                answer: 0,
                explanation: "O modelo de transformação Bursa-Wolf segue a sequência: (1 + δ) para escala, depois rotação (R₃(εz)R₂(εy)R₁(εx)), e finalmente translação (x₀,y₀,z₀)."
            },
            {
                question: "Qual matriz representa uma rotação de θ graus em torno do eixo Z?",
                options: [
                    "[cosθ sinθ 0; -sinθ cosθ 0; 0 0 1]",
                    "[1 0 0; 0 cosθ sinθ; 0 -sinθ cosθ]",
                    "[cosθ 0 -sinθ; 0 1 0; sinθ 0 cosθ]",
                    "[cosθ -sinθ 0; sinθ cosθ 0; 0 0 1]"
                ],
                answer: 0,
                explanation: "A matriz de rotação em torno do eixo Z é R₃(θ) = [cosθ sinθ 0; -sinθ cosθ 0; 0 0 1]. Note que a rotação é positiva no sentido anti-horário (dextrogiro)."
            },
            {
                question: "Como se converte coordenadas polares (Az, di, Z) para cartesianas 3D?",
                options: [
                    "X = di·senZ·senAz; Y = di·senZ·cosAz; Z = di·cosZ",
                    "X = di·cosZ·cosAz; Y = di·cosZ·senAz; Z = di·senZ",
                    "X = di·cosAz; Y = di·senAz; Z = di·tanZ",
                    "X = di·senAz; Y = di·cosAz; Z = di"
                ],
                answer: 0,
                explanation: "As fórmulas de conversão são: X = di·senZ·senAz; Y = di·senZ·cosAz; Z = di·cosZ, onde di é distância inclinada, Z é ângulo zenital e Az é azimute."
            },
            {
                question: "Qual é a principal característica de uma transformação de Helmert (similaridade)?",
                options: [
                    "Preserva ângulos mas não tamanhos",
                    "Preserva tamanhos mas não ângulos",
                    "Não preserva nem ângulos nem tamanhos",
                    "Preserva tanto ângulos quanto tamanhos"
                ],
                answer: 0,
                explanation: "A transformação de Helmert (ou de similaridade) preserva ângulos (é isogonal) mas não preserva tamanhos, pois inclui um fator de escala uniforme."
            }
        ]
    },
    spherical: {
        title: "Terra Esférica",
        questions: [
            {
                question: "Qual é a definição de um círculo máximo na Terra esférica?",
                options: [
                    "Circunferência que contém o centro da esfera",
                    "Circunferência paralela ao equador",
                    "Circunferência com raio igual ao da Terra",
                    "Circunferência que passa pelos polos"
                ],
                answer: 0,
                explanation: "Um círculo máximo (ou circunferência máxima) é qualquer circunferência na superfície esférica que contém o centro da esfera. Exemplos: equador e meridianos."
            },
            {
                question: "Como se calcula o raio de um paralelo (Rₚ) em função da latitude (φ)?",
                options: [
                    "Rₚ = R·cosφ",
                    "Rₚ = R·senφ",
                    "Rₚ = R·tanφ",
                    "Rₚ = R/cosφ"
                ],
                answer: 0,
                explanation: "O raio de um paralelo diminui conforme aumenta a latitude: Rₚ = R·cosφ, onde R é o raio da Terra e φ é a latitude geográfica."
            },
            {
                question: "Qual é a característica principal de uma linha loxodrômica?",
                options: [
                    "Mantém um ângulo constante com todos os meridianos",
                    "Representa a menor distância entre dois pontos",
                    "Sempre cruza os meridianos a 90 graus",
                    "É um círculo máximo"
                ],
                answer: 0,
                explanation: "A loxodrômica é uma linha na superfície terrestre que faz um ângulo constante (rumo/azimute) com todos os meridianos, tendo formato de espiral."
            },
            {
                question: "Qual é a distância esférica (d) entre dois pontos A e B na Terra esférica?",
                options: [
                    "d = arccos[senφₐ·senφᵦ + cosφₐ·cosφᵦ·cosΔλ]",
                    "d = √[senφₐ·senφᵦ + cosφₐ·cosφᵦ·cosΔλ]",
                    "d = R·[senφₐ + senφᵦ + cosΔλ]",
                    "d = R·arccos[φₐ - φᵦ + Δλ]"
                ],
                answer: 0,
                explanation: "A distância esférica (arco de circunferência máxima) é calculada por: cos(d) = senφₐ·senφᵦ + cosφₐ·cosφᵦ·cosΔλ, onde Δλ = λᵦ - λₐ."
            },
            {
                question: "Como Eratóstenes calculou o raio da Terra em 200 a.C.?",
                options: [
                    "Medindo sombras em duas cidades no solstício",
                    "Observando navios desaparecerem no horizonte",
                    "Calculando a curvatura em eclipses lunares",
                    "Medindo o tempo de viagem entre cidades"
                ],
                answer: 0,
                explanation: "Eratóstenes comparou a sombra de uma vareta em Alexandria com a ausência de sombra em Siena (Assuã) no solstício, calculando o raio terrestre com impressionante precisão."
            }
        ]
    }
};

// Word search data
const wordSearchData = {
    basic: {
        title: "Conceitos Básicos",
        words: ["METRO", "GEODESIA", "NORTE", "AZIMUTE", "DISTANCIA", "ANGULO", "SISTEMA", "COORDENADA", "ALTURA", "PLANIMETRIA"],
        description: "Termos básicos de Geodésia e Topografia"
    },
    cartesian: {
        title: "Sistemas Cartesianos",
        words: ["DEXTROGIRO", "LEVOGIRO", "TRANSFORMACAO", "ROTACAO", "TRANSLACAO", "ESCALA", "HELMERT", "BURSAWOLF", "MATRIZ", "VETOR"],
        description: "Termos sobre sistemas de coordenadas e transformações"
    },
    spherical: {
        title: "Terra Esférica",
        words: ["ESFERA", "MERIDIANO", "PARALELO", "EQUADOR", "LOXODROMICA", "ORTODROMICA", "LATITUDE", "LONGITUDE", "RAIO", "ERATOSTENES"],
        description: "Termos sobre o modelo esférico da Terra"
    },
    all: {
        title: "Todos os Temas",
        words: ["GEODESIA", "METRO", "NORTE", "AZIMUTE", "DEXTROGIRO", "ROTACAO", "ESFERA", "MERIDIANO", "LATITUDE", "LONGITUDE"],
        description: "Termos mistos de todos os temas"
    }
};

// Game state variables
let currentQuiz = null;
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let quizData = [];
let wordSearchGame = null;

// DOM elements
const gameSelection = document.getElementById('game-selection');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackDiv = document.getElementById('feedback');
const questionCounter = document.getElementById('question-counter');
const scoreCounter = document.getElementById('score-counter');
const quizProgress = document.getElementById('quiz-progress');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const resultScore = document.getElementById('result-score');
const resultIcon = document.getElementById('result-icon');
const restartBtn = document.getElementById('restart-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const downloadQuestionsPdfBtn = document.getElementById('download-questions-pdf-btn');
const downloadFullPdf = document.getElementById('download-full-pdf');
const downloadQuestionsOnly = document.getElementById('download-questions-only');
const startWordsearchBtn = document.getElementById('start-wordsearch');
const wordsearchContainer = document.getElementById('wordsearch-container');
const wordsearchBackBtn = document.getElementById('wordsearch-back');
const quizBackBtn = document.getElementById('quiz-back');
const quizTitle = document.getElementById('quiz-title');
const wordsearchTopicSelect = document.getElementById('wordsearch-topic');
const wordsearchWordsDiv = document.getElementById('wordsearch-words');
const wordsearchBoard = document.getElementById('wordsearch-board');
const wordsearchResetBtn = document.getElementById('wordsearch-reset');
const wordsearchDownloadBtn = document.getElementById('wordsearch-download');
const wordsearchShowAnswerBtn = document.getElementById('wordsearch-show-answer');

// Start quiz button (único card agora)
document.getElementById('start-quiz').addEventListener('click', function() {
    showQuizThemeSelection();
});

// Função para mostrar a seleção de temas do quiz
function showQuizThemeSelection() {
    // Criar modal para seleção de tema
    const modalHtml = `
        <div class="modal fade" id="quizThemeModal" tabindex="-1" aria-labelledby="quizThemeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="quizThemeModalLabel">Selecione o Tema do Quiz</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-grid gap-2">
                            <button class="btn btn-geodesic mb-2 start-quiz-theme" data-quiz="basic">
                                <i class="fas fa-crosshairs"></i> Conceitos Básicos
                            </button>
                            <button class="btn btn-geodesic mb-2 start-quiz-theme" data-quiz="cartesian">
                                <i class="fas fa-vector-square"></i> Sistemas Cartesianos
                            </button>
                            <button class="btn btn-geodesic mb-2 start-quiz-theme" data-quiz="spherical">
                                <i class="fas fa-globe"></i> Terra Esférica
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('quizThemeModal'));
    modal.show();
    
    // Adicionar event listeners aos botões de tema
    document.querySelectorAll('.start-quiz-theme').forEach(button => {
        button.addEventListener('click', function() {
            currentQuiz = this.getAttribute('data-quiz');
            modal.hide();
            startQuiz(currentQuiz);
            
            // Remover modal do DOM após ocultar
            document.getElementById('quizThemeModal').addEventListener('hidden.bs.modal', function() {
                this.remove();
            });
        });
    });
}

// Start a new quiz
function startQuiz(quizType) {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    quizData = quizzes[quizType].questions;
    
    gameSelection.style.display = 'none';
    quizContainer.style.display = 'block';
    wordsearchContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    
    // Update quiz title
    quizTitle.innerHTML = `<i class="fas fa-question-circle"></i> ${quizzes[quizType].title}`;
    
    updateQuestionCounter();
    updateScore();
    loadQuestion();
}

// Load the current question
function loadQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswers[currentQuestion] !== undefined && userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Hide feedback when loading new question
    feedbackDiv.style.display = 'none';
    feedbackDiv.className = 'feedback';
    feedbackDiv.innerHTML = '';
    
    // Update counters and progress
    updateQuestionCounter();
    updateScore();
    
    // Update button states
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finalizar' : 'Próxima';
    
    // If user already answered this question, show feedback
    if (userAnswers[currentQuestion] !== undefined) {
        showFeedback();
    }
}

// Select an option
function selectOption(index) {
    // Remove selected class from all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    document.querySelectorAll('.option')[index].classList.add('selected');
    
    // Store user's answer
    userAnswers[currentQuestion] = index;
    
    // Update score immediately after selection
    updateScore();
    
    // Show feedback immediately
    showFeedback();
}

// Show feedback for the current question
function showFeedback() {
    const question = quizData[currentQuestion];
    const userAnswer = userAnswers[currentQuestion];
    
    // Remove all feedback classes
    feedbackDiv.className = 'feedback';
    
    if (userAnswer !== undefined) {
        // Mark correct and incorrect answers
        document.querySelectorAll('.option').forEach((option, index) => {
            if (index === question.answer) {
                option.classList.add('correct');
            } else if (index === userAnswer && index !== question.answer) {
                option.classList.add('incorrect');
            }
        });
        
        // Show feedback message
        feedbackDiv.style.display = 'block';
        if (userAnswer === question.answer) {
            feedbackDiv.classList.add('correct');
            feedbackDiv.innerHTML = `<i class="fas fa-check-circle"></i> Correto! ${question.explanation}`;
        } else {
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.innerHTML = `<i class="fas fa-times-circle"></i> Incorreto. A resposta correta é: ${question.options[question.answer]}. ${question.explanation}`;
        }
    }
}

// Navigate to previous question
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

// Navigate to next question or finish quiz
nextBtn.addEventListener('click', () => {
    // Check if current question was answered
    if (userAnswers[currentQuestion] === undefined) {
        alert('Por favor, selecione uma resposta antes de continuar.');
        return;
    }
    
    if (currentQuestion === quizData.length - 1) {
        finishQuiz();
    } else {
        currentQuestion++;
        loadQuestion();
    }
});

// Finish the quiz and show results
function finishQuiz() {
    // Calculate final score
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].answer) {
            score++;
        }
    });
    
    // Show result container
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    // Set result message based on score
    resultScore.innerHTML = `Sua pontuação: <span class="fw-bold">${score}</span>/${quizData.length}`;
    
    if (score === quizData.length) {
        resultTitle.textContent = 'Excelente!';
        resultMessage.textContent = 'Você acertou todas as perguntas! Dominou completamente o assunto.';
        resultIcon.className = 'result-icon text-success';
        resultIcon.innerHTML = '<i class="fas fa-trophy"></i>';
    } else if (score >= quizData.length * 0.7) {
        resultTitle.textContent = 'Muito bom!';
        resultMessage.textContent = 'Você demonstrou um bom conhecimento do assunto, mas ainda pode melhorar.';
        resultIcon.className = 'result-icon text-primary';
        resultIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    } else if (score >= quizData.length * 0.5) {
        resultTitle.textContent = 'Bom esforço!';
        resultMessage.textContent = 'Você acertou mais da metade, mas precisa revisar alguns conceitos.';
        resultIcon.className = 'result-icon text-warning';
        resultIcon.innerHTML = '<i class="fas fa-book-open"></i>';
    } else {
        resultTitle.textContent = 'Continue estudando!';
        resultMessage.textContent = 'Você precisa revisar os conceitos básicos. Não desanime!';
        resultIcon.className = 'result-icon text-danger';
        resultIcon.innerHTML = '<i class="fas fa-redo"></i>';
    }
}

// Update question counter
function updateQuestionCounter() {
    questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    quizProgress.style.width = `${progress}%`;
}

// Update score counter
function updateScore() {
    let currentScore = 0;
    // Count all correct answers up to current question or all questions if quiz is complete
    const maxIndex = Math.min(currentQuestion + 1, quizData.length);
    for (let i = 0; i < maxIndex; i++) {
        if (userAnswers[i] !== undefined && userAnswers[i] === quizData[i].answer) {
            currentScore++;
        }
    }
    scoreCounter.textContent = `Pontuação: ${currentScore}`;
}

// Restart quiz button
restartBtn.addEventListener('click', () => {
    startQuiz(currentQuiz);
});

// Back to menu button
backToMenuBtn.addEventListener('click', () => {
    gameSelection.style.display = 'flex';
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    wordsearchContainer.style.display = 'none';
});

// Download PDF buttons
downloadPdfBtn.addEventListener('click', generateResultsPdf);
downloadQuestionsPdfBtn.addEventListener('click', generateQuestionsOnlyPdf);
downloadFullPdf.addEventListener('click', generateFullContentPdf);
downloadQuestionsOnly.addEventListener('click', generateAllQuestionsOnlyPdf);

// Generate PDF with quiz results
function generateResultsPdf() {
    const doc = new jsPDF();
    
    // Adiciona suporte a caracteres especiais
    doc.setFont('helvetica', 'normal');
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(42, 82, 152);
    doc.text('Resultados do Quiz Geodésico', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(quizzes[currentQuiz].title, 105, 30, { align: 'center' });
    
    // Score
    doc.setFontSize(12);
    doc.text('Pontuação: ' + score + ' de ' + quizData.length, 105, 40, { align: 'center' });
    
    // Date
    const today = new Date();
    doc.text('Data: ' + today.toLocaleDateString('pt-BR'), 105, 50, { align: 'center' });
    
    // Add line
    doc.setDrawColor(42, 82, 152);
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);
    
    // Questions and answers
    let yPos = 65;
    
    quizData.forEach((question, index) => {
        // Check if we need a new page
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Question
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        
        const cleanQuestion = (index + 1) + '. ' + question.question;
        const questionLines = doc.splitTextToSize(cleanQuestion, 170);
        doc.text(questionLines, 20, yPos);
        yPos += questionLines.length * 6 + 5;
        
        // User's answer
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;
        
        doc.setTextColor(isCorrect ? 0 : 200, isCorrect ? 150 : 0);
        const cleanUserAnswer = 'Sua resposta: ' + question.options[userAnswer];
        const userAnswerLines = doc.splitTextToSize(cleanUserAnswer, 165);
        doc.text(userAnswerLines, 25, yPos);
        yPos += userAnswerLines.length * 5 + 3;
        
        // Correct answer if wrong
        if (!isCorrect) {
            doc.setTextColor(0, 150, 0);
            const cleanCorrectAnswer = 'Resposta correta: ' + question.options[question.answer];
            const correctAnswerLines = doc.splitTextToSize(cleanCorrectAnswer, 165);
            doc.text(correctAnswerLines, 25, yPos);
            yPos += correctAnswerLines.length * 5 + 3;
        }
        
        // Explanation
        doc.setTextColor(60, 60, 60);
        const cleanExplanation = 'Explicação: ' + question.explanation;
        const explanationLines = doc.splitTextToSize(cleanExplanation, 165);
        doc.text(explanationLines, 25, yPos);
        yPos += explanationLines.length * 5 + 10;
    });
    
    // Save the PDF
    doc.save('Resultados_Geodesia_' + currentQuiz + '.pdf');
}

// Generate PDF with questions only
function generateQuestionsOnlyPdf() {
    const doc = new jsPDF();
    
    // Adiciona suporte a caracteres especiais
    doc.setFont('helvetica', 'normal');
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(42, 82, 152);
    doc.text('Perguntas do Quiz Geodésico', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(quizzes[currentQuiz].title, 105, 30, { align: 'center' });
    
    // Date
    const today = new Date();
    doc.setFontSize(10);
    doc.text('Data: ' + today.toLocaleDateString('pt-BR'), 105, 40, { align: 'center' });
    
    // Add line
    doc.setDrawColor(42, 82, 152);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    // Questions
    let yPos = 55;
    
    quizData.forEach((question, index) => {
        // Check if we need a new page
        if (yPos > 230) {
            doc.addPage();
            yPos = 20;
        }
        
        // Question
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        
        const cleanQuestion = (index + 1) + '. ' + question.question;
        const questionLines = doc.splitTextToSize(cleanQuestion, 170);
        doc.text(questionLines, 20, yPos);
        yPos += questionLines.length * 6 + 5;
        
        // Options
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        question.options.forEach((option, optIndex) => {
            const letter = String.fromCharCode(97 + optIndex); // a, b, c, d
            const cleanOption = letter + ') ' + option;
            const optionLines = doc.splitTextToSize(cleanOption, 160);
            doc.text(optionLines, 25, yPos);
            yPos += optionLines.length * 5 + 2;
        });
        
        // Space for answer
        yPos += 5;
        doc.setTextColor(100, 100, 100);
        doc.text('Resposta: _____', 25, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 15;
    });
    
    // Save the PDF
    doc.save('Perguntas_Geodesia_' + currentQuiz + '.pdf');
}

// Generate PDF with full content
function generateFullContentPdf() {
    const doc = new jsPDF();
    
    // Adiciona suporte a caracteres especiais
    doc.setFont('helvetica', 'normal');
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(42, 82, 152);
    doc.text('Material Completo de Geodésia', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Baseado nos conteúdos da UFPR', 105, 30, { align: 'center' });
    
    // Date
    const today = new Date();
    doc.setFontSize(10);
    doc.text('Data: ' + today.toLocaleDateString('pt-BR'), 105, 40, { align: 'center' });
    
    // Add line
    doc.setDrawColor(42, 82, 152);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    // Introduction
    let yPos = 55;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Este material contém todas as perguntas e respostas dos quizzes sobre:', 20, yPos);
    yPos += 8;
    doc.text('- Conceitos Básicos de Geodésia', 25, yPos);
    yPos += 6;
    doc.text('- Sistemas Cartesianos', 25, yPos);
    yPos += 6;
    doc.text('- Terra Esférica', 25, yPos);
    yPos += 15;
    
    // Loop through all quizzes
    Object.keys(quizzes).forEach(quizKey => {
        const quiz = quizzes[quizKey];
        
        // Check if we need a new page for quiz title
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Quiz title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(42, 82, 152);
        doc.text(quiz.title, 20, yPos);
        yPos += 12;
        
        // Questions
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        
        quiz.questions.forEach((question, index) => {
            // Check if we need a new page
            if (yPos > 220) {
                doc.addPage();
                yPos = 20;
            }
            
            // Question
            doc.setFont('helvetica', 'bold');
            const cleanQuestion = (index + 1) + '. ' + question.question;
            const questionLines = doc.splitTextToSize(cleanQuestion, 170);
            doc.text(questionLines, 20, yPos);
            yPos += questionLines.length * 5 + 4;
            
            // Options
            doc.setFont('helvetica', 'normal');
            question.options.forEach((option, optIndex) => {
                const letter = String.fromCharCode(97 + optIndex);
                const marker = optIndex === question.answer ? 'CORRETA' : '';
                const optionColor = optIndex === question.answer ? [0, 150, 0] : [0, 0, 0];
                
                doc.setTextColor(...optionColor);
                const cleanOption = letter + ') ' + option + ' ' + marker;
                const optionLines = doc.splitTextToSize(cleanOption, 160);
                doc.text(optionLines, 25, yPos);
                yPos += optionLines.length * 4 + 2;
            });
            
            // Explanation
            doc.setTextColor(60, 60, 60);
            const cleanExplanation = 'Explicação: ' + question.explanation;
            const explanationLines = doc.splitTextToSize(cleanExplanation, 165);
            doc.text(explanationLines, 25, yPos);
            yPos += explanationLines.length * 4 + 10;
        });
        
        // Add space between quizzes
        yPos += 8;
    });
    
    // Save the PDF
    doc.save('Material_Completo_Geodesia.pdf');
}

// Generate PDF with all questions only
function generateAllQuestionsOnlyPdf() {
    const doc = new jsPDF();
    
    // Adiciona suporte a caracteres especiais
    doc.setFont('helvetica', 'normal');
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(42, 82, 152);
    doc.text('Perguntas de Geodésia para Estudo', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Prática e revisão dos conceitos', 105, 30, { align: 'center' });
    
    // Date
    const today = new Date();
    doc.setFontSize(10);
    doc.text('Data: ' + today.toLocaleDateString('pt-BR'), 105, 40, { align: 'center' });
    
    // Add line
    doc.setDrawColor(42, 82, 152);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    // Introduction
    let yPos = 55;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Este material contém todas as perguntas dos quizzes para prática:', 20, yPos);
    yPos += 8;
    doc.text('- Conceitos Básicos de Geodésia', 25, yPos);
    yPos += 6;
    doc.text('- Sistemas Cartesianos', 25, yPos);
    yPos += 6;
    doc.text('- Terra Esférica', 25, yPos);
    yPos += 15;
    
    // Loop through all quizzes
    Object.keys(quizzes).forEach(quizKey => {
        const quiz = quizzes[quizKey];
        
        // Check if we need a new page for quiz title
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Quiz title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(42, 82, 152);
        doc.text(quiz.title, 20, yPos);
        yPos += 12;
        
        // Questions
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        
        quiz.questions.forEach((question, index) => {
            // Check if we need a new page
            if (yPos > 220) {
                doc.addPage();
                yPos = 20;
            }
            
            // Question
            doc.setFont('helvetica', 'bold');
            const cleanQuestion = (index + 1) + '. ' + question.question;
            const questionLines = doc.splitTextToSize(cleanQuestion, 170);
            doc.text(questionLines, 20, yPos);
            yPos += questionLines.length * 5 + 4;
            
            // Options
            doc.setFont('helvetica', 'normal');
            question.options.forEach((option, optIndex) => {
                const letter = String.fromCharCode(97 + optIndex);
                const cleanOption = letter + ') ' + option;
                const optionLines = doc.splitTextToSize(cleanOption, 160);
                doc.text(optionLines, 25, yPos);
                yPos += optionLines.length * 4 + 2;
            });
            
            // Space for answer
            yPos += 5;
            doc.setTextColor(100, 100, 100);
            doc.text('Resposta: _____', 25, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 15;
        });
        
        // Add space between quizzes
        yPos += 8;
    });
    
    // Save the PDF
    doc.save('Perguntas_Geodesia_Estudo.pdf');
}

// Generate Word Search PDF
function generateWordSearchPdf(topic, withSolutions) {
    const data = wordSearchData[topic];
    const doc = new jsPDF();
    
    // Adiciona suporte a caracteres especiais
    doc.setFont('helvetica', 'normal');
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(42, 82, 152);
    doc.text('Caça-Palavras Geodésico', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(data.title, 105, 30, { align: 'center' });
    
    // Date
    const today = new Date();
    doc.setFontSize(10);
    doc.text('Data: ' + today.toLocaleDateString('pt-BR'), 105, 40, { align: 'center' });
    
    // Instructions
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('Encontre as palavras na grade abaixo.', 105, 50, { align: 'center' });
    doc.text('Elas podem estar na horizontal, vertical ou diagonal.', 105, 57, { align: 'center' });
    
    // Words to find
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('Palavras para encontrar:', 20, 70);
    
    let xPos = 20;
    let yPos = 80;
    const wordsPerLine = 3;
    
    data.words.forEach((word, index) => {
        if (index > 0 && index % wordsPerLine === 0) {
            xPos = 20;
            yPos += 8;
        }
        
        doc.setTextColor(0, 0, 0);
        const prefix = withSolutions ? 'OK ' : '- ';
        doc.text(prefix + word, xPos, yPos);
        xPos += 60;
    });
    
    // Add line
    yPos += 12;
    doc.setDrawColor(42, 82, 152);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    
    // Word search grid
    if (wordSearchGame) {
        const cellSize = 7;
        const startY = yPos + 10;
        const gridWidth = wordSearchGame.cols * cellSize;
        
        // Center the grid
        const centerX = (210 - gridWidth) / 2;
        
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        
        // Draw grid
        for (let i = 0; i < wordSearchGame.rows; i++) {
            for (let j = 0; j < wordSearchGame.cols; j++) {
                const x = centerX + j * cellSize;
                const y = startY + i * cellSize;
                
                // Draw cell border
                doc.setDrawColor(150, 150, 150);
                doc.rect(x, y, cellSize, cellSize);
                
                // Add letter
                doc.text(wordSearchGame.board[i][j], x + cellSize/2, y + cellSize/2 + 2, {
                    align: 'center'
                });
            }
        }
    }
    
    // Save the PDF
    doc.save('CaçaPalavras_Geodesia_' + topic + '.pdf');
}

// Initialize word search game
function initWordSearch(topic) {
    const data = wordSearchData[topic];
    wordsearchWordsDiv.innerHTML = '';
    
    // Hide result if visible
    hideWordsearchResult();
    
    // Create word list
    data.words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'wordsearch-word';
        wordDiv.textContent = word;
        wordDiv.dataset.word = word;
        wordsearchWordsDiv.appendChild(wordDiv);
    });
    
    // Initialize game
    wordSearchGame = new WordSearchGame(15, 15, data.words);
    wordSearchGame.renderBoard(wordsearchBoard);
    
    // Re-enable interaction for new game
    document.querySelectorAll('.wordsearch-cell').forEach(cell => {
        cell.style.pointerEvents = 'auto';
    });
}

// Show word search result
function showWordsearchResult() {
    const data = wordSearchData[wordsearchTopicSelect.value];
    const userWordsFound = wordSearchGame.userFoundWords.length; // Only count user-found words
    const totalWords = data.words.length;
    const percentage = Math.round((userWordsFound / totalWords) * 100);
    
    // Update result content
    document.getElementById('wordsearch-result-score').innerHTML = 
        `Palavras encontradas: <span class="fw-bold">${userWordsFound}</span> de <span class="fw-bold">${totalWords}</span>`;
    
    let title, message, iconClass, iconName;
    
    if (percentage === 100) {
        title = "Excelente!";
        message = "Você encontrou todas as palavras antes de ver a resposta!";
        iconClass = "text-success";
        iconName = "fas fa-trophy";
    } else if (percentage >= 75) {
        title = "Muito Bom!";
        message = "Você encontrou a maioria das palavras por conta própria!";
        iconClass = "text-primary";
        iconName = "fas fa-thumbs-up";
    } else if (percentage >= 50) {
        title = "Bom Trabalho!";
        message = "Você encontrou metade das palavras. Continue praticando!";
        iconClass = "text-warning";
        iconName = "fas fa-star";
    } else if (percentage > 0) {
        title = "Continue Tentando!";
        message = "Você encontrou algumas palavras. A prática leva à perfeição!";
        iconClass = "text-info";
        iconName = "fas fa-search";
    } else {
        title = "Não Desista!";
        message = "Tente novamente! O caça-palavras requer paciência e atenção.";
        iconClass = "text-secondary";
        iconName = "fas fa-redo";
    }
    
    document.getElementById('wordsearch-result-title').textContent = title;
    document.getElementById('wordsearch-result-message').textContent = message;
    document.querySelector('#wordsearch-result .result-icon').className = `result-icon ${iconClass}`;
    document.querySelector('#wordsearch-result .result-icon').innerHTML = `<i class="${iconName}"></i>`;
    
    // Show result container
    document.getElementById('wordsearch-result').style.display = 'block';
}

// Hide word search result
function hideWordsearchResult() {
    document.getElementById('wordsearch-result').style.display = 'none';
}

// Generate Word Search Result PDF
function generateWordSearchResultPdf(topic) {
    const data = wordSearchData[topic];
    const doc = new jsPDF();
    
    // Adiciona suporte a caracteres especiais
    doc.setFont('helvetica', 'normal');
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(42, 82, 152);
    doc.text('Resultado do Caça-Palavras', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(data.title, 105, 30, { align: 'center' });
    
    // Date
    const today = new Date();
    doc.setFontSize(10);
    doc.text('Data: ' + today.toLocaleDateString('pt-BR'), 105, 40, { align: 'center' });
    
    // Score - using only user-found words
    const userWordsFound = wordSearchGame.userFoundWords.length;
    const totalWords = data.words.length;
    const percentage = Math.round((userWordsFound / totalWords) * 100);
    
    doc.setFontSize(12);
    doc.text(`Pontuação: ${userWordsFound}/${totalWords} palavras (${percentage}%)`, 105, 50, { align: 'center' });
    
    // Add line
    doc.setDrawColor(42, 82, 152);
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);
    
    // Words found vs not found
    let yPos = 70;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 150, 0);
    doc.text('Palavras Encontradas pelo Usuário:', 20, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    wordSearchGame.userFoundWords.forEach(word => {
        doc.text('- ' + word, 25, yPos);
        yPos += 6;
    });
    
    // Show words revealed by "Show Answer" if any
    const revealedWords = wordSearchGame.foundWords.filter(word => !wordSearchGame.userFoundWords.includes(word));
    if (revealedWords.length > 0) {
        yPos += 5;
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text('Palavras Reveladas (não pontuaram):', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        revealedWords.forEach(word => {
            doc.text('- ' + word, 25, yPos);
            yPos += 6;
        });
    }
    
    // Words not found at all
    const notFound = data.words.filter(word => !wordSearchGame.foundWords.includes(word));
    if (notFound.length > 0) {
        yPos += 5;
        doc.setFontSize(11);
        doc.setTextColor(200, 0, 0);
        doc.text('Palavras Não Encontradas:', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        notFound.forEach(word => {
            doc.text('✗ ' + word, 25, yPos);
            yPos += 6;
        });
    }
    
    // Word search grid with solutions
    if (wordSearchGame) {
        const cellSize = 7;
        const startY = yPos + 15;
        const gridWidth = wordSearchGame.cols * cellSize;
        
        // Center the grid
        const centerX = (210 - gridWidth) / 2;
        
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        
        // Draw grid with solutions highlighted
        for (let i = 0; i < wordSearchGame.rows; i++) {
            for (let j = 0; j < wordSearchGame.cols; j++) {
                const x = centerX + j * cellSize;
                const y = startY + i * cellSize;
                
                // Check if this cell is part of a solution
                const isPartOfSolution = wordSearchGame.placedWords.some(placedWord => 
                    placedWord.positions.some(pos => pos.row === i && pos.col === j)
                );
                
                // Check if this cell is part of a user-found word
                const isUserFound = wordSearchGame.placedWords.some(placedWord => 
                    wordSearchGame.userFoundWords.includes(placedWord.word) &&
                    placedWord.positions.some(pos => pos.row === i && pos.col === j)
                );
                
                // Draw cell border
                doc.setDrawColor(150, 150, 150);
                if (isUserFound) {
                    doc.setFillColor(200, 250, 200); // Verde claro para palavras encontradas pelo usuário
                    doc.rect(x, y, cellSize, cellSize, 'FD');
                } else if (isPartOfSolution) {
                    doc.setFillColor(200, 230, 250); // Azul claro para palavras reveladas
                    doc.rect(x, y, cellSize, cellSize, 'FD');
                } else {
                    doc.rect(x, y, cellSize, cellSize);
                }
                
                // Add letter
                doc.setTextColor(0, 0, 0);
                doc.text(wordSearchGame.board[i][j], x + cellSize/2, y + cellSize/2 + 2, {
                    align: 'center'
                });
            }
        }
    }
    
    // Save the PDF
    doc.save('Resultado_CaçaPalavras_' + topic + '.pdf');
}

// Word Search Game Class
class WordSearchGame {
    constructor(rows, cols, words) {
        this.rows = rows;
        this.cols = cols;
        this.words = words;
        this.board = [];
        this.selectedCells = [];
        this.foundWords = [];
        this.userFoundWords = []; // Track words found by user manually
        this.isDragging = false;
        this.placedWords = []; // Track where words are placed
        
        this.initBoard();
        this.placeWords();
        this.fillEmptyCells();
    }
    
    initBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = '';
            }
        }
    }
    
    placeWords() {
        const directions = [
            { dr: 0, dc: 1 },   // Horizontal
            { dr: 1, dc: 0 },   // Vertical
            { dr: 1, dc: 1 },   // Diagonal \
            { dr: 1, dc: -1 }   // Diagonal /
        ];
        
        this.placedWords = []; // Reset placed words tracking
        
        this.words.forEach(word => {
            let placed = false;
            let attempts = 0;
            const maxAttempts = 200; // Increase attempts
            
            while (!placed && attempts < maxAttempts) {
                attempts++;
                
                // Choose random direction
                const dir = directions[Math.floor(Math.random() * directions.length)];
                
                // Choose random starting position
                let r, c;
                
                if (dir.dc === 1) { // Horizontal
                    r = Math.floor(Math.random() * this.rows);
                    c = Math.floor(Math.random() * (this.cols - word.length + 1));
                } else if (dir.dr === 1 && dir.dc === 0) { // Vertical
                    r = Math.floor(Math.random() * (this.rows - word.length + 1));
                    c = Math.floor(Math.random() * this.cols);
                } else if (dir.dr === 1 && dir.dc === 1) { // Diagonal \
                    r = Math.floor(Math.random() * (this.rows - word.length + 1));
                    c = Math.floor(Math.random() * (this.cols - word.length + 1));
                } else { // Diagonal /
                    r = Math.floor(Math.random() * (this.rows - word.length + 1));
                    c = Math.floor(Math.random() * (this.cols - word.length)) + word.length - 1;
                }
                
                // Check if word fits
                let fits = true;
                for (let i = 0; i < word.length; i++) {
                    const nr = r + dir.dr * i;
                    const nc = c + dir.dc * i;
                    
                    // Check bounds
                    if (nr < 0 || nr >= this.rows || nc < 0 || nc >= this.cols) {
                        fits = false;
                        break;
                    }
                    
                    if (this.board[nr][nc] !== '' && this.board[nr][nc] !== word[i]) {
                        fits = false;
                        break;
                    }
                }
                
                // Place word if it fits
                if (fits) {
                    const wordPosition = [];
                    for (let i = 0; i < word.length; i++) {
                        const nr = r + dir.dr * i;
                        const nc = c + dir.dc * i;
                        this.board[nr][nc] = word[i];
                        wordPosition.push({row: nr, col: nc});
                    }
                    this.placedWords.push({
                        word: word,
                        positions: wordPosition
                    });
                    placed = true;
                }
            }
            
            // If word couldn't be placed after max attempts, place it forcefully
            if (!placed) {
                // Try horizontal placement in first available space
                for (let r = 0; r < this.rows && !placed; r++) {
                    for (let c = 0; c <= this.cols - word.length && !placed; c++) {
                        let canPlace = true;
                        for (let i = 0; i < word.length; i++) {
                            if (this.board[r][c + i] !== '' && this.board[r][c + i] !== word[i]) {
                                canPlace = false;
                                break;
                            }
                        }
                        if (canPlace) {
                            const wordPosition = [];
                            for (let i = 0; i < word.length; i++) {
                                this.board[r][c + i] = word[i];
                                wordPosition.push({row: r, col: c + i});
                            }
                            this.placedWords.push({
                                word: word,
                                positions: wordPosition
                            });
                            placed = true;
                        }
                    }
                }
            }
        });
    }
    
    fillEmptyCells() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.board[i][j] === '') {
                    this.board[i][j] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
    }
    
    renderBoard(container) {
        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'wordsearch-cell';
                cell.textContent = this.board[i][j];
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                // Mouse events for desktop
                cell.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    this.isDragging = true;
                    this.resetSelection();
                    this.toggleCellSelection(cell);
                });
                
                cell.addEventListener('mouseenter', () => {
                    if (this.isDragging) {
                        this.toggleCellSelection(cell);
                    }
                });
                
                cell.addEventListener('mouseup', () => {
                    this.isDragging = false;
                    this.checkSelectedWord();
                });
                
                // Touch events for mobile
                cell.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.isDragging = true;
                    this.resetSelection();
                    this.toggleCellSelection(cell);
                });
                
                cell.addEventListener('touchmove', (e) => {
                    if (this.isDragging) {
                        const touch = e.touches[0];
                        const element = document.elementFromPoint(touch.clientX, touch.clientY);
                        if (element && element.classList.contains('wordsearch-cell')) {
                            this.toggleCellSelection(element);
                        }
                    }
                });
                
                cell.addEventListener('touchend', () => {
                    this.isDragging = false;
                    this.checkSelectedWord();
                });
                
                container.appendChild(cell);
            }
        }
    }
    
    toggleCellSelection(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const index = this.selectedCells.findIndex(c => c.row === row && c.col === col);
        
        if (index === -1) {
            // Only allow selection if it's in a straight line from the first cell
            if (this.selectedCells.length === 0 || this.isInLine(this.selectedCells[0], {row, col})) {
                this.selectedCells.push({ row, col });
                cell.classList.add('selected');
            }
        } else {
            this.selectedCells.splice(index, 1);
            cell.classList.remove('selected');
        }
    }
    
    isInLine(firstCell, newCell) {
        if (this.selectedCells.length === 0) return true;
        
        // Check if the new cell is in line with the first selected cell
        const dx = newCell.col - firstCell.col;
        const dy = newCell.row - firstCell.row;
        
        // Same row or same column or diagonal
        return (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy));
    }
    
    resetSelection() {
        this.selectedCells.forEach(cell => {
            const cellElement = document.querySelector(`.wordsearch-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            if (cellElement && !cellElement.classList.contains('found')) {
                cellElement.classList.remove('selected');
            }
        });
        this.selectedCells = [];
    }
    
    checkSelectedWord() {
        if (this.selectedCells.length < 2) return;
        
        // Sort selected cells
        this.selectedCells.sort((a, b) => {
            if (a.row !== b.row) return a.row - b.row;
            return a.col - b.col;
        });
        
        // Determine direction
        const first = this.selectedCells[0];
        const last = this.selectedCells[this.selectedCells.length - 1];
        
        let dr = last.row - first.row;
        let dc = last.col - first.col;
        
        // Normalize direction
        if (dr !== 0) dr = dr / Math.abs(dr);
        if (dc !== 0) dc = dc / Math.abs(dc);
        
        // Check if selection is in a straight line
        for (let i = 1; i < this.selectedCells.length; i++) {
            const prev = this.selectedCells[i-1];
            const curr = this.selectedCells[i];
            
            const expectedRow = prev.row + dr;
            const expectedCol = prev.col + dc;
            
            if (curr.row !== expectedRow || curr.col !== expectedCol) {
                this.resetSelection();
                return;
            }
        }
        
        // Get the word from the selection
        let word = '';
        this.selectedCells.forEach(cell => {
            word += this.board[cell.row][cell.col];
        });
        
        // Check if word is in the list (both directions)
        const reversedWord = word.split('').reverse().join('');
        let foundWord = null;
        
        if (this.words.includes(word)) {
            foundWord = word;
        } else if (this.words.includes(reversedWord)) {
            foundWord = reversedWord;
        }
        
        if (foundWord && !this.foundWords.includes(foundWord)) {
            // Mark as found
            this.foundWords.push(foundWord);
            this.userFoundWords.push(foundWord); // Track as user-found
            
            // Update UI
            document.querySelectorAll('.wordsearch-word').forEach(wordDiv => {
                if (wordDiv.dataset.word === foundWord) {
                    wordDiv.classList.add('user-found'); // Usar classe específica para usuário
                }
            });
            
            // Highlight cells with user-found class
            this.selectedCells.forEach(cell => {
                const cellElement = document.querySelector(`.wordsearch-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
                cellElement.classList.remove('selected');
                cellElement.classList.add('user-found'); // Usar classe específica para usuário
            });
            
            // Check if all words are found
            if (this.foundWords.length === this.words.length) {
                setTimeout(() => {
                    alert('Parabéns! Você encontrou todas as palavras!');
                    showWordsearchResult();
                }, 300);
            }
        }
        
        this.resetSelection();
    }

    showAllAnswers() {
        // Mark all remaining words as found (but NOT as user-found)
        this.words.forEach(word => {
            if (!this.foundWords.includes(word)) {
                this.foundWords.push(word);
                // Note: NOT adding to userFoundWords since these foram reveladas
                
                // Find and highlight the word in the grid with revealed class
                const placedWord = this.placedWords.find(pw => pw.word === word);
                if (placedWord) {
                    placedWord.positions.forEach(pos => {
                        const cellElement = document.querySelector(`.wordsearch-cell[data-row="${pos.row}"][data-col="${pos.col}"]`);
                        if (cellElement) {
                            cellElement.classList.add('revealed'); // Usar classe específica para reveladas
                        }
                    });
                }
                
                // Update word list UI with revealed class
                document.querySelectorAll('.wordsearch-word').forEach(wordDiv => {
                    if (wordDiv.dataset.word === word) {
                        wordDiv.classList.add('revealed'); // Usar classe específica para reveladas
                    }
                });
            }
        });
        
        // Disable further interaction
        document.querySelectorAll('.wordsearch-cell').forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
    }
    
    resetSelection() {
        this.selectedCells.forEach(cell => {
            const cellElement = document.querySelector(`.wordsearch-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            if (cellElement && !cellElement.classList.contains('user-found') && !cellElement.classList.contains('revealed')) {
                cellElement.classList.remove('selected');
            }
        });
        this.selectedCells = [];
    }
}

// Start word search game
startWordsearchBtn.addEventListener('click', function() {
    gameSelection.style.display = 'none';
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    wordsearchContainer.style.display = 'block';
    
    // Reset topic selector and show placeholder
    wordsearchTopicSelect.value = '';
    document.getElementById('wordsearch-placeholder').style.display = 'block';
    document.getElementById('wordsearch-content').style.display = 'none';
    wordsearchResetBtn.disabled = true;
    wordsearchDownloadBtn.disabled = true;
    document.getElementById('wordsearch-show-answer').disabled = true;
});

// Back button from word search
wordsearchBackBtn.addEventListener('click', function() {
    wordsearchContainer.style.display = 'none';
    gameSelection.style.display = 'flex';
});

// Back button from quiz
quizBackBtn.addEventListener('click', function() {
    quizContainer.style.display = 'none';
    gameSelection.style.display = 'flex';
});

// Word search topic change
wordsearchTopicSelect.addEventListener('change', function() {
    const selectedTopic = this.value;
    
    if (selectedTopic === '') {
        // Show placeholder if no topic selected
        document.getElementById('wordsearch-placeholder').style.display = 'block';
        document.getElementById('wordsearch-content').style.display = 'none';
        wordsearchResetBtn.disabled = true;
        wordsearchDownloadBtn.disabled = true;
        document.getElementById('wordsearch-show-answer').disabled = true;
    } else {
        // Hide placeholder and show game
        document.getElementById('wordsearch-placeholder').style.display = 'none';
        document.getElementById('wordsearch-content').style.display = 'block';
        wordsearchResetBtn.disabled = false;
        wordsearchDownloadBtn.disabled = false;
        document.getElementById('wordsearch-show-answer').disabled = false;
        
        // Initialize game with selected topic
        initWordSearch(selectedTopic);
    }
});

// Word search reset button
wordsearchResetBtn.addEventListener('click', function() {
    if (wordSearchGame && wordsearchTopicSelect.value) {
        wordSearchGame.resetSelection();
        initWordSearch(wordsearchTopicSelect.value);
    }
});

// Word search download button
wordsearchDownloadBtn.addEventListener('click', function() {
    if (wordsearchTopicSelect.value) {
        generateWordSearchPdf(wordsearchTopicSelect.value, false);
    }
});

// Word search show answer button
wordsearchShowAnswerBtn.addEventListener('click', function() {
    if (wordSearchGame) {
        wordSearchGame.showAllAnswers();
        showWordsearchResult();
    }
});

// Word search result buttons
document.getElementById('wordsearch-play-again').addEventListener('click', function() {
    if (wordsearchTopicSelect.value) {
        hideWordsearchResult();
        initWordSearch(wordsearchTopicSelect.value);
    }
});

document.getElementById('wordsearch-new-theme').addEventListener('click', function() {
    hideWordsearchResult();
    wordsearchTopicSelect.value = '';
    document.getElementById('wordsearch-placeholder').style.display = 'block';
    document.getElementById('wordsearch-content').style.display = 'none';
    wordsearchResetBtn.disabled = true;
    document.getElementById('wordsearch-show-answer').disabled = true;
    wordsearchDownloadBtn.disabled = true;
});

document.getElementById('wordsearch-download-result').addEventListener('click', function() {
    if (wordsearchTopicSelect.value) {
        generateWordSearchResultPdf(wordsearchTopicSelect.value);
    }
});

// Hangman event listener
document.getElementById('start-hangman').addEventListener('click', function() {
    document.getElementById('hangman-container').style.display = 'block';
    document.getElementById('game-selection').style.display = 'none';
});