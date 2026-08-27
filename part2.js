// ===============================================
// QUESTION DATA
// ===============================================

const questions = [
  {
    category: "Highest mark in hindi",
    question: "In which class did I get the highest mark in Hindi, and how much?",
    options: [
      "Class: 8 [80]",
      "Class: 5 [75]",
      "Class: 6 [78]",
      "Class: 7 [55]",
      "Class: 9 [89]"
    ],
    correct: 2 
  },
  {
    category: "Award for English writing",
    question: "In which class did I win the second prize in the English writing contest?",
    options: [
      "Class 2",
      "Class 1",
      "Class 5",
      "Class 3",
      "Class 7"
    ],
    correct: 1 
  },
  {
    category: "Bicycle",
    question: "From which class i have started to go to the school by cycle?",
    options: [
      "Class 5",
      "Class 3",
      "Class 6",
      "class 4",
      "Class 9"
    ],
    correct: 3 
  },
  {
    category: "EYE COLOUR",
    question: "What is the colour of my eyes?",
    options: [
      "Red",
      "Black",
      "Brown",
      "Dark brown",
      "i am blind"
    ],
    correct: 3 
  },
  {
    category: "Screen time",
    question: "Which phone app do I spend the most time on?",
    options: [
      "📸 Instagram",
      "▶️ YouTube",
      "💬 WhatsApp",
      "🎮 Mobile Games",
      "🎵 Spotify"
    ],
    correct: 0 
  }
];

// =========================================================
// PART 2 — QUIZ ENGINE
// =========================================================

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let isAnswerRevealed = false;

// DOM
const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const btnStart = document.getElementById("btn-start");
const btnBack = document.getElementById("btn-back");
const btnReveal = document.getElementById("btn-reveal");
const btnNext = document.getElementById("btn-next");
const btnRestart = document.getElementById("btn-restart");
const btnPart3 = document.getElementById("btn-part3");
const categoryTag = document.getElementById("category-tag");
const progressCount = document.getElementById("progress-count");
const progressBarFill = document.getElementById("progress-bar-fill");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackMessage = document.getElementById("feedback-message");
const quizCard = document.getElementById("quiz-card");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const bgMusic = document.getElementById("bg-music");

// EVENTS
btnStart.addEventListener("click", startQuiz);
btnBack.addEventListener("click", showIntroScreen);
btnReveal.addEventListener("click", revealAnswer);
btnNext.addEventListener("click", nextQuestion);
btnRestart.addEventListener("click", resetQuiz);
btnPart3.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("fade-out-page");
  setTimeout(() => {
    window.location.href = "part3.html";
  }, 700);
});

// SCREEN CONTROL
function showScreen(screen) {
  [introScreen, quizScreen, resultScreen].forEach(item => {
    item.classList.remove("active");
  });
  screen.classList.add("active");
}

function showIntroScreen() {
  showScreen(introScreen);
}

function startQuiz() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(err => console.log("Audio blocked by browser:", err));
  }
  showScreen(quizScreen);
  loadQuestion(currentQuestionIndex);
}

// LOAD QUESTION
function loadQuestion(index) {
  const data = questions[index];
  selectedOptionIndex = null;
  isAnswerRevealed = false;
  btnReveal.disabled = true;
  btnReveal.classList.remove("hidden");
  btnNext.classList.add("hidden");
  feedbackMessage.textContent = "";
  feedbackMessage.className = "feedback-message";
  categoryTag.textContent = data.category || "ABOUT ME";
  progressCount.textContent = `QUESTION ${index + 1} / ${questions.length}`;
  progressBarFill.style.width = `${((index + 1) / questions.length) * 100}%`;

  quizCard.classList.remove("card-content-fade");
  void quizCard.offsetWidth;
  quizCard.classList.add("card-content-fade");
  questionText.textContent = data.question;
  optionsContainer.innerHTML = "";

  data.options.forEach((optionText, optIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    const number = String(optIndex + 1).padStart(2, "0");
    button.innerHTML = `
      <div class="option-left">
        <span class="option-num">${number}</span>
        <span class="option-label">${optionText}</span>
      </div>
      <span class="status-indicator"></span>
    `;
    button.style.opacity = "0";
    button.style.transform = "translateY(25px) scale(.97)";
    button.style.transition = "opacity .5s ease, transform .6s cubic-bezier(.16,1,.3,1)";
    optionsContainer.appendChild(button);

    setTimeout(() => {
      button.style.opacity = "1";
      button.style.transform = "translateY(0) scale(1)";
    }, 80 + optIndex * 90);

    button.addEventListener("click", () => selectOption(optIndex));
  });
}

// SELECT OPTION
function selectOption(index) {
  if (isAnswerRevealed) return;
  selectedOptionIndex = index;
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach((button, i) => {
    const indicator = button.querySelector(".status-indicator");
    if (i === index) {
      button.classList.add("selected");
      indicator.textContent = "✓";
      indicator.className = "status-indicator status-icon";
    } else {
      button.classList.remove("selected");
      indicator.textContent = "";
      indicator.className = "status-indicator";
    }
  });
  btnReveal.disabled = false;
}

// REVEAL ANSWER
function revealAnswer() {
  if (selectedOptionIndex === null || isAnswerRevealed) return;
  isAnswerRevealed = true;
  const data = questions[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  const correct = selectedOptionIndex === data.correct;

  if (correct) {
    score++;
    feedbackMessage.textContent = "Correct! 🎉 You actually know me!";
    feedbackMessage.className = "feedback-message correct";
  } else {
    feedbackMessage.textContent = "Oops! 😄 You got me wrong!";
    feedbackMessage.className = "feedback-message wrong";
  }

  buttons.forEach((button, index) => {
    button.classList.remove("selected");
    button.disabled = true;
    const indicator = button.querySelector(".status-indicator");
    if (index === data.correct) {
      button.classList.add("correct-state");
      indicator.textContent = "✓";
      indicator.className = "status-indicator status-icon check";
    } else if (index === selectedOptionIndex && !correct) {
      button.classList.add("wrong-state");
      indicator.textContent = "✕";
      indicator.className = "status-indicator status-icon cross";
    }
  });

  btnReveal.classList.add("hidden");
  btnNext.classList.remove("hidden");

  if (correct) {
    createCelebrationBurst();
  }
}

// NEXT
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    showResultScreen();
  }
}

// RESULT
function showResultScreen() {
  showScreen(resultScreen);
  finalScore.textContent = score;
  localStorage.setItem("rakhiQuizScore", score);
  localStorage.setItem("rakhiQuizTotal", questions.length);

  if (score === questions.length) {
    resultMessage.textContent = "You Really Know Me! 🥹 You're officially the best sister!";
  } else if (score >= 3) {
    resultMessage.textContent = "Pretty Good! 😎 You know most of my secrets!";
  } else {
    resultMessage.textContent = "Your brother needs to teach you! 😂 Time for us to hang out more!";
  }
  createResultParticles();
}

// RESET
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedOptionIndex = null;
  isAnswerRevealed = false;
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
  startQuiz();
}

// CORRECT ANSWER BURST
function createCelebrationBurst() {
  const card = document.getElementById("quiz-card");
  if (!card) return;
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");
    particle.style.position = "absolute";
    particle.style.width = "5px";
    particle.style.height = "5px";
    particle.style.borderRadius = "50%";
    particle.style.background = "#45f0a5";
    particle.style.boxShadow = "0 0 15px #45f0a5";
    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "50";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 250;

    particle.animate([
      { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
      { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
    ], { duration: 700 + Math.random() * 500, easing: "cubic-bezier(.16,1,.3,1)" });

    card.appendChild(particle);
    setTimeout(() => particle.remove(), 1300);
  }
}

// RESULT PARTICLES
function createResultParticles() {
  const screen = document.getElementById("result-screen");
  if (!screen) return;
  for (let i = 0; i < 35; i++) {
    const particle = document.createElement("span");
    particle.style.position = "fixed";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.width = Math.random() * 5 + 2 + "px";
    particle.style.height = particle.style.width;
    particle.style.borderRadius = "50%";
    particle.style.background = ["#ff4fa3", "#8b5cf6", "#35d9ff", "#ffd166"][Math.floor(Math.random() * 4)];
    particle.style.boxShadow = "0 0 15px currentColor";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "100";

    document.body.appendChild(particle);

    particle.animate([
      { transform: "translateY(0) scale(1)", opacity: 0 },
      { opacity: 1 },
      { transform: `translateY(${100 + Math.random() * 300}px) scale(0)`, opacity: 0 }
    ], { duration: 1800 + Math.random() * 2000, easing: "ease-out" });

    setTimeout(() => particle.remove(), 4000);
  }
}

// BACKGROUND ENGINE
(function BackgroundEngine() {
  const canvas = document.getElementById("bg-particles");
  const container = document.getElementById("bg-visuals");
  if (!canvas || !container) return;
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let stars = [];
  let animationFrame;
  const mouse = { x: .5, y: .5, targetX: .5, targetY: .5 };
  const colors = ["255,79,163", "139,92,246", "53,217,255", "255,209,102"];

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    createStars();
  }

  function createStars() {
    const count = Math.min(150, Math.max(45, Math.floor(width * height / 9000)));
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + .3,
        speed: Math.random() * .25 + .04,
        alpha: Math.random() * .65 + .15,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStars(time) {
    ctx.clearRect(0, 0, width, height);
    const nebula = ctx.createRadialGradient(width * .5, height * .45, 0, width * .5, height * .45, Math.max(width,height) * .7);
    nebula.addColorStop(0, "rgba(139,92,246,.045)");
    nebula.addColorStop(.45, "rgba(53,217,255,.015)");
    nebula.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * .035;
    mouse.y += (mouse.targetY - mouse.y) * .035;

    stars.forEach(star => {
      star.y -= star.speed;
      if (star.y < -10) {
        star.y = height + 10;
        star.x = Math.random() * width;
      }
      const pulse = .65 + Math.sin(time * .0015 + star.phase) * .35;
      const parallaxX = (mouse.x - .5) * star.size * 18;
      const parallaxY = (mouse.y - .5) * star.size * 18;
      ctx.beginPath();
      ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${star.color},${star.alpha * pulse})`;
      ctx.shadowColor = `rgba(${star.color},.8)`;
      ctx.shadowBlur = star.size * 6;
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    for (let i = 0; i < stars.length; i++) {
      const a = stars[i];
      for (let j = i + 1; j < Math.min(stars.length, i + 7); j++) {
        const b = stars[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 105) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(139,92,246,${(1 - distance / 105) * .07})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
    animationFrame = requestAnimationFrame(drawStars);
  }

  function pointerMove(event) {
    const rect = container.getBoundingClientRect();
    mouse.targetX = (event.clientX - rect.left) / rect.width;
    mouse.targetY = (event.clientY - rect.top) / rect.height;
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", pointerMove, { passive: true });
  resize();
  animationFrame = requestAnimationFrame(drawStars);
  window.addEventListener("pagehide", () => { cancelAnimationFrame(animationFrame); });
})();